const { where } = require("sequelize");
const jwtDecode = require('jwt-decode');
const HTMLEncoderDecoder = require('html-encoder-decoder')
const Application = require("../models/Application");
const ApplicationCommunication = require("../models/ApplicationCommunication");
const User = require('../models/User');
const GetUserInfos = require("../scripts/GetUserInfos");

const apply = async (req, res) => {
    try {
        const {first_name, last_name, email, email_subject, email_body, advertisement_id} = req.body;
        if(first_name != null && last_name != null && email != null && advertisement_id != null){
            const status = 'pending';
            const applied_at = new Date().toISOString().split('T')[0];
            const application_communication = await ApplicationCommunication.create({
                email_subject,
                email_body,
                sent_at: applied_at
            });
            const application = await Application.create({
                advertisement_id,
                status,
                applied_at,
                update_at: applied_at,
                first_name,
                last_name,
                email,
                communication_id: application_communication.id
            });
            await fetch(`http://localhost:3001/advertisements/increment/${advertisement_id}`, {method: 'POST'})
            res.status(200).send({"success": "Apply advertisement successfully"});
        }
        else{
            res.status(400).send({"error": "All fields are required !"});
        }
    } catch (error) {
        res.status(400).send({"An error occurred": error});
    }
}

const findAll = async (req, res) => {
    try {
        const result = await Application.findAll();
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send({"An error occurred": error});
    }
}

const findAllCommunications = async (req, res) => {
    try {
        const result = await ApplicationCommunication.findAll();
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send({"An error occurred": error});
    }
}

const findOne = async (req, res) => {
    try {
        let data = []
        const id = req.params.id;
        const application = await Application.findOne({
            where: {
                id: id
            }
        });
        data.push(application);
        res.status(200).send(data);
    } catch (error) {
        res.status(400).send({"An error occurred": error});
    }
}

const update = async (req, res) => {
    try {
        const id = req.params.id;
        const {advertisement_id, status, applied_at, update_at, first_name, last_name, email} = req.body;
        
        const app = await Application.findOne({
            where: {
                id: id
            }
        });
        
        if (app) {
            if (advertisement_id != null) {
                app.advertisement_id = advertisement_id; 
            }
            if (status != null) {
                app.status = status; 
            }
            if (applied_at != null) {
                app.applied_at = applied_at; 
            }
            if (update_at != null) {
                app.update_at = update_at; 
            }
            if (first_name != null) {
                app.first_name = first_name; 
            }
            if (last_name != null) {
                app.last_name = last_name; 
            }
            if (email != null) {
                app.email = email; 
            }
            await app.save();
            res.status(200).send(app);
        } else {
            res.status(400).send({"error": "Application not found"});
        }
    } catch (error) {
        console.error("Update error:", error);
        res.status(400).send({"error": error.message});
    }
}

const remove = async (req, res) => {
    try{
        const id = req.params.id;
        if (id !== null) {
            const application = await Application.findOne({
                where: {
                    id: id
                }
            });
            await fetch(`http://localhost:3001/advertisements/decrement/${application.advertisement_id}`, {method: 'POST'})
            await Application.update({ communication_id: null }, {
                where: { id: application.id }
            });

            await ApplicationCommunication.destroy({
                where: {id: application.communication_id}
            })
            
            await Application.destroy({
                where: {id: id}
            }).then((data) => {
                if (data) {
                    res.status(200).send({'status': 'ok'});
                }
                else{
                    res.status(400).send({'error': 'cannot delete application'});
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

const create = async (req, res) => {
    try {
        const {advertisement_id, status, applied_at, update_at, first_name, last_name, email} = req.body;
        const newApplication = await Application.create({
            advertisement_id,
            status,
            applied_at,
            update_at,
            first_name,
            last_name,
            email
        });
        res.status(200).send(newApplication);
    } catch (error) {
        console.log("error: ", error);
        res.status(400).send(error);
    }   
}

const findAllByEmail = async (req, res) => {
    const authHeaders = req.headers.authorization || req.headers.Authorization
    let email = ''
    let role = ''
    await GetUserInfos(authHeaders)
    .then(userInfos => {
        email = userInfos.email;
        role = userInfos.role
    })
    .catch(err => {
        console.error(err);
    });

    try {
        const paramEmail = HTMLEncoderDecoder.decode(req.params.email);
        if(paramEmail !== email && role !== "admin")
            throw new Error('Forbidden');

        const applications = await Application.findAll({
            where: {
                email: paramEmail
            }
        });
        if(applications.length === 0)
            return res.status(503).send("No application found")

        res.status(200).send(applications);
    } catch (error) {
        console.log(error)
        res.status(400).send({"An error occured": error});
    }
}

module.exports = {
    apply,
    findAll,
    findAllCommunications,
    findAllByEmail,
    findOne,
    update,
    remove,
    create
}