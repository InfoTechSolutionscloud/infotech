import dbConnect from "@/app/lib/mongoose";
import jwt from "jsonwebtoken";
import User from "@/app/models/User";
import bcrypt from "bcryptjs/dist/bcrypt";
//Routes for login page
export async function POST(request) {

    await dbConnect();
    const { email, password } = await request.json();
    const findUser = await User.findOne({ email: email });
    if (!findUser) {
        return new Response(JSON.stringify({ message: "Invalid Email" }), { status: 400 });
    }

    if (!bcrypt.compareSync(password, findUser.password)) {
        return new Response(JSON.stringify({ message: "Invalid Password" }), { status: 400 });
    }

    const token = jwt.sign({ email: findUser.email, id: findUser._id, role: findUser.role }, process.env.JWT_SECRET, { expiresIn: "24h" });

    return new Response(JSON.stringify({ token, email: findUser.email, id: findUser._id }), { status: 200 });
}