const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.aurhorization

    if (!authHeader) {
        return res.status(401).json({
            message: "No Token Provided, Unauthorized"
        })
    }

    const token = authHeader.split(' ')[1]

    jwt.verify(token, 'bazmasecretkey', (error, decode) => {
        if (error) {
            return res.status(403).json({
                message:"Invalid Token, Permission Denied"
            })
        }
    })
}