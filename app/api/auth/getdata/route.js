import dbConnect from "@/app/lib/mongoose";
import authMiddleware from "@/app/lib/authMiddleware";
import User from "@/app/models/User";

export const userdata  = async (request) => {
    await dbConnect();
    const user = request.user;
    const id = user.id;
    const userdata = await User.findById(id);
    return new Response(JSON.stringify({data: userdata}), {status: 200})
}

export const GET = authMiddleware(userdata);