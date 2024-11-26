const jwt = require('jsonwebtoken');

async function GetUserInfos(authHeaders) {
    if (!authHeaders?.startsWith('Bearer ')) {
        throw new Error("No token found");
    }

    const token = authHeaders.split(' ')[1];

    try {
        const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        return decoded.UserInfos;
    } catch (err) {
        console.error('Token verification error:', err);
        throw new Error("Invalid token");
    }
}


module.exports = GetUserInfos;
