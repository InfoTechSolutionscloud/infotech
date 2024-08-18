import mongoose from "mongoose";
import dbConnect from "@/app/lib/mongoose";
import sendEmail from "@/app/lib/sendEmail";
import User from "@/app/models/User";
import Project from "@/app/models/Project";

export async function POST(request){
    await dbConnect();
    const {clientEmail, projectTitle, projectDescription, project_deadline, workerEmail } = await request.json();
    const client = await User.findOne({email: clientEmail});
    const worker = await User.findOne({email: workerEmail})
    if(!client || !worker){
        return new Response(JSON.stringify({message: "Invalid Emails"}), {status: 400});
    }
    const newproject = new Project({
        clientId: client._id,
        projectTitle, projectDescription, project_deadline, worker: worker._id
    });
    await newproject.save();

    sendEmail(clientEmail, `New Project ${projectTitle} is initialized by Infotech!`, `Hi ${client.name}\n You new project ${projectTitle} is initialized by infotech. To View all details Prject Description / Deadline, Statuses just login to your account now!`);

     return new Response(JSON.stringify({message: "Project Created"}), {status: 200});
}