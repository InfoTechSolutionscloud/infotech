import dbConnect from "@/app/lib/mongoose";
import User from "@/app/models/User";
import bcrypt from "bcryptjs/dist/bcrypt";
import authMiddleware from "@/app/lib/authMiddleware";
async function updateHandler(request) {
    await dbConnect();

    const { _id, email, password, name, role } = await request.json();
    console.log(_id);
    if (!email || !password || !name) {
        return new Response(JSON.stringify({ message: "Missing Fields" }), {
            status: 400,
        });
    }

    const isExist = await User.findById(_id);
    if (!isExist) {
        return new Response(JSON.stringify({ message: "User Not Found!" }), {
            status: 404,
        });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const updateUser = await User.findByIdAndUpdate(
        _id,
        {$set: {
            email,
            password: hashedPassword,
            name,
            role
        }}
    );

    if (!updateUser) {
        return new Response(
            JSON.stringify({ message: "Unable to update user!" }),
            {
                status: 500,
            }
        );
    }

    return new Response(
        JSON.stringify({ message: "User Updated Successfully!" }),
        {
            status: 200,
        }
    );
}

export const PUT = authMiddleware(updateHandler);
