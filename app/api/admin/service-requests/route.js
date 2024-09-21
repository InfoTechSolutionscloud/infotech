import authMiddleware from "@/app/lib/authMiddleware";
import dbConnect from "@/app/lib/mongoose";
import Service from "@/app/models/Service";


async function getit(request) {
    await dbConnect();
    const user = request.user;
    if(user.role !== 'admin') return new Response(JSON.stringify({message: "You are not admin"}), {status: 403});
    const data = await Service.find()
    if(!data) return new Response(JSON.stringify({message: "No Data Found"}), {status: 404})
    return new Response(JSON.stringify({data: data}), {status: 200})
}

async function deleteit(request){
    await dbConnect();

    const user = request.user;
    if(user.role !== 'admin') return new Response(JSON.stringify({message: "You are not admin"}), {status: 403});
    const id = request.nextUrl.searchParams.get("id");
    const deletedata = await Service.findByIdAndDelete(id)
    if(!deletedata) return new Response(JSON.stringify({message: "Failed to Delete"}),{status: 500})
    return new Response(JSON.stringify({message: "Deleted Successfully!"}), {status: 200})
}

export const GET = authMiddleware(getit)
export const DELETE = authMiddleware(deleteit)