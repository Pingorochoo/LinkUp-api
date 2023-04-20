import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.header.authorization.slice(7)
        if (!token) return res.status(403).send('Access denied')
        if (!token.startsWith('Bearer ')) return res.status(403).send('bearer token was not found')
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decode
        next()
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}