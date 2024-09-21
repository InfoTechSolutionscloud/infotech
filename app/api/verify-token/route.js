// import dbConnect from "@/app/lib/mongoose";
// import User from "@/app/models/User";
// import crypto from 'crypto';

// async function verifyToken(request) {
//     const { token } = await request.json();

//     await dbConnect();
//     const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

//     const user = await User.findOne({ 
//         resetToken: hashedToken,
//         resetTokenExpiry: { $gt: Date.now()}
//      });

//     if(!user) {
//         return new Response(JSON.stringify({ message: "Invalid Token or has expired" }), { status: 400 });
//     }

//     return new Response(JSON.stringify(user), { status: 200 });
// }

// export const POST = verifyToken;

import dbConnect from "@/app/lib/mongoose";
import User from "@/app/models/User";
import crypto from 'crypto';

async function verifyToken(request) {
    const { token } = await request.json();

    await dbConnect();
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    try {
        const user = await User.findOne({ 
            resetToken: hashedToken,
            resetTokenExpiry: { $gt: Date.now() }
        });

        if (!user) {
            return new Response(JSON.stringify({ message: "Invalid or expired token" }), { status: 400 });
        }

        return new Response(JSON.stringify(user), { status: 200 });
    } catch (error) {
        // Handle unexpected errors
        return new Response(JSON.stringify({ message: "Server error" }), { status: 500 });
    }
}

export const POST = verifyToken;
