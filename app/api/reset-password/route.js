// import dbConnect from "@/app/lib/mongoose";
// import User from "@/app/models/User";
// import bcrypt from "bcryptjs/dist/bcrypt";

// async function resetPassword(request) {
//   const { password, email } = await request.json();

//   await dbConnect();

//   const user = await User.findOne({ email });

//   const hashedPassword = await bcrypt.hash(password, 5);
//   user.password = hashedPassword;

//   user.resetToken = undefined;
//   user.resetTokenExpiry = undefined;

//   try {
//     await user.save();
//     return new Response(
//       JSON.stringify({ message: "User's password is updated" }),
//       { status: 200 }
//     );
//   } catch (error) {
//     return new Response(JSON.stringify(error), { status: 500 });
//   }
// }

// export const POST = resetPassword;

import dbConnect from "@/app/lib/mongoose";
import User from "@/app/models/User";
import bcrypt from "bcryptjs/dist/bcrypt";

async function resetPassword(request) {
    const { password, email } = await request.json();

    await dbConnect();

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
        }

        const hashedPassword = await bcrypt.hash(password, 10); // Increased salt rounds for better security
        user.password = hashedPassword;

        // Clear reset token fields after password reset
        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;

        await user.save();
        return new Response(JSON.stringify({ message: "User's password is updated" }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: "Server error" }), { status: 500 });
    }
}

export const POST = resetPassword;
