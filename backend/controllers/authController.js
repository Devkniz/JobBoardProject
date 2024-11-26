const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

const login = asyncHandler(async (req, res) => {
    try{
        const {email, password} = req.body;
        
        if (email != null && password != null) {
            const user = await User.findOne({
                where: {
                    email: email,
                }
            });
            if(user != null){
                const result = user.dataValues;
                bcrypt.compare(password, result.password).then(
                    (result) => {
                        if(result){

                            const accessToken = jwt.sign(
                                {
                                    "UserInfos": {
                                        "email": user.email,
                                        "role": user.role
                                    }
                                },
                                process.env.ACCESS_TOKEN_SECRET,
                                {expiresIn: '1d'}
                            )

                            res.cookie('jwt', accessToken, {
                                httpOnly: true,
                                secure: true,
                                sameSite: 'None',
                                maxAge: 24 * 60 * 60 * 1000
                            })

                            res.json({accessToken})

                            // res.status(200).send(user);
                        }
                        else{
                            res.status(400).send({"error": "email or password incorrect"});
                        }
                    }
                );
            }
            else{
                res.status(400).send({"error": "email or password is incorrect"});
            }
        }
    }catch(error){
        res.status(400).send({"error": error});
    }
})

// const refresh = (req, res) => {
//     const cookies = req.cookies

//     if(!cookies?.jwt)
//         return res.status(401).json({message: req.cookies})

//     const refreshToken = cookies.jwt

//     jwt.verify(
//         refreshToken,
//         process.env.REFRESH_TOKEN_SECRET,
//         asyncHandler(async (err, decoded) => {
//             if (err) return res.status(403).json({ message: 'Forbidden' })

//             const user = await User.findOne({
//                 where: {
//                     email: decoded.email,
//                 }
//             });

//             if (!user) return res.status(401).json({ message: 'Unauthorized2' })

//             const accessToken = jwt.sign(
//                 {
//                     "UserInfo": {
//                         "email": user.email,
//                         "roles": user.role
//                     }
//                 },
//                 process.env.ACCESS_TOKEN_SECRET,
//                 { expiresIn: '15m' }
//             )

//             res.json({ accessToken })
//         })
//     )
// }

const logout = (req, res) => {
    const cookies = req.cookies
    if(!cookies?.jwt)
        return res.sendStatus(204)

    res.clearCookie('jwt', {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
    })

    res.json({message: 'Cookie cleared'})
}

const me = async(req, res) => {
    try {
        const {email} = req.body;
        const userData = await User.findOne({
            where: {
                email: email
            }
        });
    res.status(200).send(userData);
    } catch (error) {
        res.status(500).send("internal server error");
    }
};

const updateProfil = async(req, res) => {
    try {
        const {id, first_name, last_name, phone, email, password} = req.body;
        if (id != null) {
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
                    });
                }
                else{
                    user.save();
                }
                res.status(200).send(user);
            }
            else{
                res.status(400).send({"error": "No user found"});
            }
        }
        else{
            res.status(400).send({"error": "Id is required"});
        }
    } catch (error) {
        res.status(500).send("Internal server error");
    }
}

module.exports = {
    login,
    logout,
    me,
    updateProfil
}