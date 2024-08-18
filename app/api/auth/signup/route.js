import dbConnect from "@/app/lib/mongoose";
import sendEmail from "@/app/lib/sendEmail";
import User from "@/app/models/User";
import bcrypt from "bcryptjs/dist/bcrypt";

//Signup code
export async function POST(request){
    await dbConnect();

    const {email, password, name} = await request.json();
    if(!email || !password || !name){
        return new Response(JSON.stringify({message: "Missing Fields"}), {
            status: 400,
        })
    }

    const isExist = await User.findOne({email});
    if(isExist){
        return new Response(JSON.stringify({message: "User Already Exist!"}), {status: 400})
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({
        email,
        password: hashedPassword,
        name,
    })
    await newUser.save();
    sendEmail(email, "Registered Successfully!", `You are registered by infotech. Your password is ${password}`);
    return new Response(JSON.stringify({message: "User Registered!"}), {status: 201})
}