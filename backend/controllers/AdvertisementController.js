const { pl, da } = require('date-fns/locale');
const Advertisement  = require('../models/Advertisement');
const { Op } = require('sequelize')

const findAll = async (req, res) => {
    try {
        const result = await Advertisement.findAll();
        res.status(200).send(result);
    } catch (error) {
        console.log("erreur lors de la récupération des données : ", error);
    }
};
const getPagination = async (req, res) => {
    try {
        let limit = 6;
        let offset = 0;
        Advertisement.findAndCountAll()
        .then(data => {
            let page = req.params.page;
            if (!isNaN(page)) {
                let pages = Math.ceil(data.count / limit);
                offset = limit * (page - 1);
                Advertisement.findAll({
                attributes: ["id", "title", "resume", "description", "company_id", "wage", "place", "working_time", "applications_count"],
                limit: limit,
                offset: offset
                })
                .then(users => {
                    res.status(200).json({result: users, count: data.count, pages: pages});
                })
            }
            else{
                return res.status(200).json({});
            }
            
        })
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
}
const findSingle = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Advertisement.findOne({where: {id: id}});
        res.status(200).send(result);
    } catch (error) {
        console.log("erreur lors de la récupération des données : ", error);
    }
};

const create = async (req, res) => {
        try{
            const { title, resume, description, company_id, wage, place, working_time, applications_count} = req.body;
            const newAdvertisement = await Advertisement.create({
                title,
                resume,
                description,
                company_id,
                wage,
                place,
                working_time,
                applications_count
            });
            res.status(200).send(newAdvertisement);
        } catch (error) {
            console.log("error :", error);
            res.status(400).send(error);
        }
}
const remove = (req, res) => {
    try{
        const id = req.params.id;
        if (id !== null) {
            Advertisement.destroy({
                where: {id: id}
            }).then((data) => {
                if (data) {
                    res.status(200).send({'status': 'ok'});
                }
                else{
                    res.status(400).send({'error': 'cannot delete companie'});
                }
            });
        }
        else{
            res.status(400).send({'error': 'id not found'});
        }
    }catch(error){
        console.log("error :", error);
        res.status(400).send(error);
    }
}
const update = async (req, res) => {
    try {
        const id = req.params.id;
        const {title, resume, description, company_id, wage, place, working_time, applications_count} = req.body;
        const advertisement = await Advertisement.findOne({
            where: {
                id, id
            }
        });
        if (advertisement) {
            if (title != null) {
                advertisement.title = title;
            }
            if (resume != null) {
                advertisement.resume = resume;
            }
            if (description != null) {
                advertisement.description = description;
            }
            if (company_id != null) {
                advertisement.company_id = company_id;
            }
            if(wage != null){
                advertisement.wage = wage;
            }
            if (place != null) {
                advertisement.place = place;
            }
            if (working_time != null) {
                advertisement.working_time = working_time;
            }
            if (applications_count != null) {
                advertisement.applications_count = applications_count;
            }
            advertisement.save();
            res.status(200).send(advertisement);
        }
        else{
            res.status(400).send({"error": "advertisement not found"});
        }
    } catch (error) {
        res.status(400).send({"error": error});
    }
}

const incrementApplications = async (req, res) => {
    try {
        const id = req.params.id;

        const advertisement = await Advertisement.findOne({
            where: { id: id }
        });

        if (advertisement) {
            advertisement.applications_count += 1;

            await advertisement.save();

            res.status(200).send();
        } else {
            res.status(404).send({ "error": "advertisement not found" });
        }
    } catch (error) {
        res.status(400).send({ "error": error.message });
    }
}

const decrementApplications = async (req, res) => {
    try {
        const id = req.params.id;

        const advertisement = await Advertisement.findOne({
            where: { id: id }
        });

        if (advertisement) {
            advertisement.applications_count -=  advertisement.applications_count === 0 ? 0 : 1;

            await advertisement.save();

            res.status(200).send();
        } else {
            res.status(404).send({ "error": "advertisement not found" });
        }
    } catch (error) {
        res.status(400).send({ "error": error.message });
    }
}

const search = async(req, res) => {
    try {
        const keyword = req.params.keyword;
        const result = await Advertisement.findAll({
            where:{
                [Op.or]: [
                    {title: {[Op.like]: `%${keyword}%`}},
                    {resume: {[Op.like]: `%${keyword}%`}},
                    {description: {[Op.like]: `%${keyword}%`}}
                ]
            }
        });
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send("internal server error");
    }
}
module.exports = {
    findAll,
    findSingle,
    create,
    remove,
    update,
    getPagination,
    search,
    incrementApplications,
    decrementApplications
};