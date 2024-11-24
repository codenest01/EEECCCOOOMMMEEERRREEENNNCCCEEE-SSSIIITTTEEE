const jwt = require("jsonwebtoken");

const ensureAuthenticated = (req, res, next) => {
    const auth = req.headers['authorization'];
    
    if (!auth) {
        return res.status(403).json({ msg: "Unauthorized: JWT is required" });
    }

    try {
        const token = auth.split(' ')[1];
        if (!token) {
            return res.status(403).json({ msg: "Token format is invalid" });
        }

        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedData;
        
        next();
    } catch (err) {
        return res.status(401).json({ msg: "JWT token is invalid or expired" });
    }
};

module.exports = ensureAuthenticated;
