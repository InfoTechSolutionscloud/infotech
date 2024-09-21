import authMiddleware from "@/app/lib/authMiddleware";
import dbConnect from "@/app/lib/mongoose";
import User from "@/app/models/User";

const usersdata = async (request) => {
    await dbConnect();
    const user = request.user;
    if(user.role !== 'admin') {
        return new Response(JSON.stringify({message: "you are not admin"}));
    }
    const users = await User.find({})
    return new Response(JSON.stringify(users))
}

export const GET = authMiddleware(usersdata)