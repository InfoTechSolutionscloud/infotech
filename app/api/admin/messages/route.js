import dbConnect from "@/app/lib/mongoose";
import authMiddleware from "@/app/lib/authMiddleware";
import Contact from "@/app/models/Contact";

async function getdata(request){
    await dbConnect();
    const user = request.user;
    if(user.role !== 'admin') return new Response(JSON.stringify({message: "You are not admin"}), {status: 403});

    const data = await Contact.find();
    return new Response(JSON.stringify({data: data}))
}

async function deleteit(request) {
    await dbConnect();
    const user = request.user;
    if(user.role !== 'admin') return new Response(JSON.stringify({message: "You are not admin"}), {status: 403});
    const id = request.nextUrl.searchParams.get("id");
    const deletedata = await Contact.findByIdAndDelete(id)
    if(!deletedata) return new Response(JSON.stringify({message: "Deletion Failed"}), {status: 401})
    return new Response(JSON.stringify({message: "Deleted Successfully!"}))
}
// async function markread(request) {
//     await dbConnect();
//     const user = request.user;
//     if(user.role !== 'admin') return new Response(JSON.stringify({message: "You are not admin"}), {status: 403});
//     const id = request.nextUrl.searchParams.get("id");
//     const updatemessage = await Contact.findByIdAndUpdate(id, {$set: {
//         status: "read"
//     }})
//     if(!updatemessage) return new Response(JSON.stringify({message: "Updationf Failed"}), {status: 401})
//     return new Response(JSON.stringify({message: "Updated Successfully!"}), {status: 200})
// }

export const GET = authMiddleware(getdata)
export const DELETE = authMiddleware(deleteit)
// export const PUT = authMiddleware(markread)

