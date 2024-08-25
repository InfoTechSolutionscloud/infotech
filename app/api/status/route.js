import authMiddleware from "@/app/lib/authMiddleware";
import dbConnect from "@/app/lib/mongoose";
import Project from "@/app/models/Project";
import Status from "@/app/models/Status";

//All routes for status

//Create Status and Update Project with status id
async function createStatus(request) {
    await dbConnect();
    const { projectId, status, title, description, completion_date } = await request.json();
    console.log(projectId, status, title, description, completion_date)
    const project = await Project.findById(projectId)

    if (!project) {
        return new Response(JSON.stringify({ message: "Invalid Project Id" }), { status: 400 });
    }
    const newstatus = new Status({
        projectId, status, title, description, completion_date
    });

    await newstatus.save();
    await Project.findByIdAndUpdate(projectId, {$set: {statusId: newstatus._id }});
    console.log(newstatus._id);
    return new Response(JSON.stringify({ message: "Project Status Posted" }), { status: 200 });
}


//Get Status by fetching id from project on frontend
export async function GET(request) {
    await dbConnect();
    const id = request.nextUrl.searchParams.get("id");
    const statusinfo = await Status.findById(id);
    if (!statusinfo) {
        return new Response(JSON.stringify({ message: "No Status Found!" }), { status: 400 });
    }
    return new Response(JSON.stringify({ status: statusinfo }), { status: 200 });
}


//Update a specific status
async function updatestatus(request) {
    try {
        await dbConnect();
    const id = request.nextUrl.searchParams.get("id");
    console.log(id)
    const { projectId, status, title, description, completion_date } = await request.json();

    const project = await Project.findById(projectId);

    if (!project) {
        return new Response(JSON.stringify({ message: "Invalid Project Id" }), { status: 400 });
    }
    const updatedStatus = await Status.findByIdAndUpdate(id, {
        $set: {
            status, title, description, completion_date
        }
    });
    if (updatedStatus) {
        return new Response(JSON.stringify({ message: "Status Updated" }), { status: 200 });
    }
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ message: "Some error occured" }), { status: 500 });
    }
    
}


//Delete a specific status
export async function DELETE(request) {
    await dbConnect();
    const id = request.nextUrl.searchParams.get("id");
    const deletit = await Status.findByIdAndDelete(id);
    if (deletit) {
        return new Response(JSON.stringify({ message: "Status Deleted" }), { status: 200 });
    } else {
        return new Response(JSON.stringify({ message: "Some error occured" }), { status: 500 });

    }
}

export const POST = authMiddleware(createStatus)
export const PUT = authMiddleware(updatestatus)