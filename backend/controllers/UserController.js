const User = require('../models/User');
const bcrypt = require('bcrypt');
const signup = async (req, res) => {
    try{
        const {first_name, last_name, email, phone, password} = req.body;
        if (email != null && password != null) {
            const emailExist = await User.findOne({
                where: {
                    email: email
                }
            });
            if (emailExist != null) {
                res.status(400).send({"error": "email is already associated with an account"});
            }
            else{
                bcrypt.hash(password, 10).then((hash) => {
                    const role = "user";
                    const password = hash;
                    User.create({
                        first_name,
                        last_name,
                        email,
                        phone,
                        role,
                        password
                    }).then((result) => {
                        res.status(200).send(result);
                    })
                })
            }
        } else {
            res.status(400).send({"error": "email or password not found"});
        }
    }catch(error){
        res.status(400).send({"error": error});
    }
}

// const signin = async (req, res) => {
//     try{
//         const {email, password} = req.body;
//         console.log(email);
//         if (email != null && password != null) {
//             const user = await User.findOne({
//                 where: {
//                     email: email,
//                 }
//             });
//             if(user != null){
//                 const result = user.dataValues;
//                 bcrypt.compare(password, result.password).then(
//                     (result) => {
//                         if(result){
//                             res.status(200).send(user);
//                         }
//                         else{
//                             res.status(400).send({"error": "password incorrect"});
//                         }
//                     }
//                 );
//             }
//             else{
//                 res.status(400).send({"error": "email is incorrect"});
//             }
//         }
//     }catch(error){
//         res.status(400).send({"error": error});
//     }
// }

const update = async (req, res) => {
    try {
        const id = req.params.id;
        const {first_name, last_name, email, phone, password} = req.body;
        const user = await User.findOne({
            where: {
                id: id
            }
        });
        if (user) {
            if (first_name != null) {
                user.first_name = first_name;
            }
            if (last_name != null) {
                user.last_name = last_name;
            }
            if (email != null) {
                user.email = email;
            }
            if (phone != null) {
                user.phone = phone;
            }
            if (password != null) {
                bcrypt.hash(password, 10).then((hash) => {
                    user.password = hash;
                    user.save();
                    res.status(200).send(user);
                });
            }
            else{
                user.save();
                res.status(200).send(user);
            }
        } else {
            res.status(400).send({"error": "User not found"});
        }
    } catch (error) {
        res.status(400).send({"error": error});
    }
    
}

const findAll = async (req, res) => {
    try {
        const result = await User.findAll();
        res.status(200).send(result);
    } catch (error) {
        console.log("error: ", error);
        res.status(400).send(error);
    }
    
}

const findSingle = async (req, res) => {
    try {
        const { id } = req.params
        const result = await User.findOne({where: {id: id}});
        res.status(200).send(result);
    } catch (error) {
        console.log("erreur lors de la récupération des données : ", error);
    }
};

const remove = (req, res) => {
    try{
        const id = req.params.id;
        if (id !== null) {
            User.destroy({
                where: {id: id}
            }).then((data) => {
                if (data) {
                    res.status(200).send({'status': 'ok'});
                }
                else{
                    res.status(400).send({'error': 'cannot delete user'});
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

module.exports = {
    findAll,
    findSingle,
    remove,
    signup,
    update
}