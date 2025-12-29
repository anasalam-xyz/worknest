import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }
    const token = authHeader.startsWith("Bearer ")?authHeader.slice(7):authHeader;

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token is not valid" });
    }
};

export default authMiddleware;
