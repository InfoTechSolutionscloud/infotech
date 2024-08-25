import jwt from "jsonwebtoken";
import User from "@/app/models/User";

const authMiddleware = (handler) => {
    return async (request, response) => {
        try {
            const authHeader = request.headers.get("authorization");
            const token = authHeader && authHeader.split(' ')[1];

            if (!token) {
                console.log("No token provided");
                return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            const user = await User.findById(decoded.id).select('-password');
            if (!user) {
                console.log("User not found in database");
                return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
            }

            // Attach user to the request object
            request.user = user;

            // Continue to the next handler
            return handler(request, response);
        } catch (error) {
            console.error("JWT Error:", error.message);
            return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
        }
    };
};

export default authMiddleware;
