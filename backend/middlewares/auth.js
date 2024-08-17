import jwt from 'jsonwebtoken';

export const authMiddleware = async (req, res, next) => {
    // Log the request headers for debugging
    console.log("Request Headers:", req.headers);

    // Extract the token from the 'token' header
    const token = req.headers.token;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Not Authorized User",
        });
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = tokenDecode.id;
        next();
    } catch (error) {
        console.error("Token verification failed:", error);
        return res.status(401).json({
            success: false,
            message: "Token is invalid or expired",
        });
    }
};
