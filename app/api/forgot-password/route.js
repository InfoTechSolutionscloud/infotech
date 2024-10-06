import dbConnect from "@/app/lib/mongoose";
import sendEmail from "@/app/lib/sendEmail";
import User from "@/app/models/User";
import crypto from 'crypto';

async function forgotPassword(request) {
    await dbConnect();

    const { email } = await request.json();

    if (!email) {
        return new Response(JSON.stringify({ message: "Email is required" }), { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
        return new Response(JSON.stringify({ message: "Email does not exist!" }), { status: 400 });
    }

    const resetToken = crypto.randomBytes(20).toString('hex');
    const passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    const resetPasswordExpires = Date.now() + 3600000; // 1 hour

    user.resetToken = passwordResetToken;
    user.resetTokenExpiry = resetPasswordExpires;
    const resetUrl = `${process.env.NEXT_PUBLIC_API_URL}/team/reset-password/${resetToken}`;

    const body = "Reset Password by Clicking on following link: " + resetUrl;

    const msg = {
        to: email,
        from: process.env.EMAIL,
        subject: "Reset Password | Infotech Solutions",
        text: body
    };

    try {
        console.time('sendEmail'); // Start timer
        const emailSent = await sendEmail(msg.to, msg.subject, msg.text); 
        const sendEmailTime = console.timeEnd('sendEmail'); // End timer and log time taken

        if (!emailSent) {
            throw new Error("Email sending failed");
        }
        
        user.emailSendTime = sendEmailTime;

        await user.save();
        return new Response(JSON.stringify({ message: "Password reset link sent to your email" }), { status: 200 });
    } catch (error) {
        // Clear reset token fields if email sending fails
        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;
        await user.save();
        console.log(error);
        return new Response(JSON.stringify({ message: "Failed sending email. Try Again!" }), { status: 400 });
    }
}

export const POST = forgotPassword;
