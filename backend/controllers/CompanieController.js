const { where } = require('sequelize');
const Companie = require('../models/Companie');

const findAll = async (req, res) => {
    try {
        const result = await Companie.findAll();
        res.status(200).send(result);
    } catch (error) {
        console.log("error: ", error);
        res.status(400).send(error);
    }
    
}

const findSingle = async (req, res) => {
    try {
        const { id } = req.params
        const result = await Companie.findOne({where: {id: id}});
        res.status(200).send(result);
    } catch (error) {
        console.log("erreur lors de la récupération des données : ", error);
    }
};

const create = async (req, res) => {
    try {
        const {name, description} = req.body;
        const newCompanie = await Companie.create({
            name,
            description
        });
        res.status(200).send(newCompanie);
    } catch (error) {
        console.log("error: ", error);
        res.status(400).send(error);
    }   
}
const remove = (req, res) => {
    try{
        const id = req.params.id;
        if (id !== null) {
            Companie.destroy({
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
        const {name, description} = req.body;
        const companie = await Companie.findOne({
            where: {
                id: id
            }
        });
        if (companie) {
            if (name != null) {
               companie.name = name; 
            }
            if (description != null) {
                companie.description = description;
            }
            companie.save();
            res.status(200).send(companie);
        }
        else{
            res.status(400).send({"error": "Companie not found"});
        }
    } catch (error) {
        res.status(400).send({"error": error});
    }
}
module.exports = {
    findAll,
    findSingle,
    create,
    remove,
    update
}