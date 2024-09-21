import authMiddleware from "@/app/lib/authMiddleware";
import dbConnect from "@/app/lib/mongoose";
import Project from "@/app/models/Project";

const projectFetcher = async (request) =>{
    await dbConnect()
    const user = request.user;
    if(user.role !== 'admin' && user.role !== 'projectmanager') return new Response(JSON.stringify({message: "Only Admin Can access"}), {status: 403});

    const projects = await Project.find({});
    if(!projects) return new Response(JSON.stringify({message: "No Project Founds"}), {status: 404})

    return new Response(JSON.stringify({data: projects}), {status: 200})
}



async function create(request){
    await dbConnect();
    const user = request.user;
    if(user.role !== 'admin' && user.role !== 'projectmanager') return new Response(JSON.stringify({message: "Only Admin Can access"}), {status: 403})

    const {clientEmail, clientName, projectId, projectTitle, projectDescription, project_deadline, workerEmail } = await request.json();

    const newproject = new Project({
        clientEmail, clientName, projectId,
        projectTitle, projectDescription, project_deadline, workerEmail
    });
    await newproject.save();

    sendEmail(clientEmail, `New Project ${projectTitle} is initialized by Infotech!`, `Hi ${clientName}\n You new project ${projectTitle} is initialized by infotech. To View all details Prject Description / Deadline, Statuses  you can visit track project on our website and add your email and project id ${projectId} to view details. \n Thanks!`);

     return new Response(JSON.stringify({message: "Project Created"}), {status: 200});
}


//update a project
export async function update(request){
    await dbConnect();
    const user = request.user;
    if(user.role !== 'admin' && user.role !== 'projectmanager') return new Response(JSON.stringify({message: "Only Admin Can access"}), {status: 403})

    const {_id, clientEmail, clientName, projectId, projectTitle, projectDescription, project_deadline, workerEmail } = await request.json();

    const project = await Project.findByIdAndUpdate(_id, {
        $set: {
            clientEmail, clientName, projectId,
            projectTitle, projectDescription, project_deadline, workerEmail
        }
    });
    if(project){
        return new Response(JSON.stringify({message: "Project Updated"}), {status: 200});
    } else {
        return new Response(JSON.stringify({message: "Some error occured"}), {status: 500});
    }
}


//Delete a project
export async function remover(request){
    await dbConnect();
    const user = request.user;
    if(user.role !== 'admin' && user.role !== 'projectmanager') return new Response(JSON.stringify({message: "Only Admin Can access"}), {status: 403})

    const id = request.nextUrl.searchParams.get("id");
    const deletit = await Project.findByIdAndDelete(id);
    if(deletit){
        return new Response(JSON.stringify({message: "Project Deleted"}), {status: 200});
    } else {
        return new Response(JSON.stringify({message: "Some error occured"}), {status: 500});

    }
}


export const GET = authMiddleware(projectFetcher)
export const POST = authMiddleware(create)
export const PUT = authMiddleware(update)
export const DELETE = authMiddleware(remover)