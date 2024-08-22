import dbConnect from "@/app/lib/mongoose";
import sendEmail from "@/app/lib/sendEmail";
import User from "@/app/models/User";
import Project from "@/app/models/Project";

//All routes for project


export async function POST(request){
    await dbConnect();
    const {clientEmail, clientName, projectId, projectTitle, projectDescription, project_deadline, workerEmail } = await request.json();

    const worker = await User.findOne({email: workerEmail});

    if(!worker){
        return new Response(JSON.stringify({message: "Invalid Emails"}), {status: 400});
    }

    const newproject = new Project({
        clientEmail, clientName, projectId,
        projectTitle, projectDescription, project_deadline, worker: worker._id
    });
    await newproject.save();

    sendEmail(clientEmail, `New Project ${projectTitle} is initialized by Infotech!`, `Hi ${clientName}\n You new project ${projectTitle} is initialized by infotech. To View all details Prject Description / Deadline, Statuses  you can visit track project on our website and add your email and project id ${projectId} to view details. \n Thanks!`);

     return new Response(JSON.stringify({message: "Project Created"}), {status: 200});
}


//update a project
export async function PUT(request){
    await dbConnect();
    const id = request.nextUrl.searchParams.get("id");
    const {clientEmail, clientName, projectId, projectTitle, projectDescription, project_deadline, workerEmail } = await request.json();
    

    if(!worker){
        return new Response(JSON.stringify({message: "Invalid Emails"}), {status: 400});
    }
    const project = await Project.findByIdAndUpdate(id, {
        $set: {
            clientEmail, clientName,
            projectTitle, projectDescription, project_deadline, worker: worker._id
        }
    });
    if(project){
        return new Response(JSON.stringify({message: "Project Updated"}), {status: 200});
    } else {
        return new Response(JSON.stringify({message: "Some error occured"}), {status: 500});
    }
}


//Delete a project
export async function DELETE(request){
    await dbConnect();
    const id = request.nextUrl.searchParams.get("id");
    const deletit = await Project.findByIdAndDelete(id);
    if(deletit){
        return new Response(JSON.stringify({message: "Project Deleted"}), {status: 200});
    } else {
        return new Response(JSON.stringify({message: "Some error occured"}), {status: 500});

    }
}