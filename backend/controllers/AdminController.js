const User = require('../models/User');
const bcrypt = require('bcrypt');
const createAdmin = async (req, res) => {
    try{
        const {first_name, last_name, email, phone, password} = req.body;
        const role = "admin"
        if (email == null || password == null) {
            res.status(400).send({"error": "email or password not found"});
        }
        else{
            bcrypt.hash(password, 10).then((hash) => {
                const password = hash;
                const newAdmin = User.create({
                    first_name,
                    last_name,
                    email,
                    phone,
                    role,
                    password
                });
                res.status(200).send({"status": "ok"});
            });
        }
    } catch(error){
        res.status(400).send({"error": error});
    }
}

module.exports = {
    createAdmin
}