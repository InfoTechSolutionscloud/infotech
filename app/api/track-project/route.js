import dbConnect from "@/app/lib/mongoose";
import Project from "@/app/models/Project";
import Status from "@/app/models/Status";


export async function POST(request){
    await dbConnect();
    const {clientEmail, projectId} = await request.json();
    const findProject = await Project.findOne({clientEmail: clientEmail, projectId: projectId});
    if(!findProject){
        return new Response(JSON.stringify({message: "No Project Found"}), {status: 400});
    }
    const findStatus = await Status.findById(findProject.statusId);
    return new Response(JSON.stringify({project: findProject, status: findStatus}), {status: 200});
}