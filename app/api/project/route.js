import dbConnect from "@/app/lib/mongoose";
import sendEmail from "@/app/lib/sendEmail";
import User from "@/app/models/User";
import Project from "@/app/models/Project";

//All routes for project


export async function POST(request){
    await dbConnect();
    const {clientEmail, projectTitle, projectDescription, project_deadline, workerEmail } = await request.json();

    //Verifying email and getting id
    const client = await User.findOne({email: clientEmail});
    const worker = await User.findOne({email: workerEmail});

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


//Get All projects of a user
export async function GET(request){
    await dbConnect();
    const id = request.nextUrl.searchParams.get("id");
    const projects = await Project.find({clientId: id});
    if(!projects || projects.length == 0){
        return new Response(JSON.stringify({message: "No Projects Found!"}), {status: 400});
    }
    return new Response(JSON.stringify({data: projects}), {status: 200});
}


//update a project
export async function PUT(request){
    await dbConnect();
    const id = request.nextUrl.searchParams.get("id");
    const {clientEmail, projectTitle, projectDescription, project_deadline, workerEmail } = await request.json();
    
    const client = await User.findOne({email: clientEmail});
    const worker = await User.findOne({email: workerEmail});

    if(!client || !worker){
        return new Response(JSON.stringify({message: "Invalid Emails"}), {status: 400});
    }
    const project = await Project.findByIdAndUpdate(id, {
        $set: {
            clientId: client._id,
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