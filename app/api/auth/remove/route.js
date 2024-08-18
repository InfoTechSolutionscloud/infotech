import dbConnect from "@/app/lib/mongoose";
import User from "@/app/models/User";

export async function DELETE(request){
    await dbConnect();
    
    const id = request.nextUrl.searchParams.get('id');
    const isExist = await User.findById(id);
    if(!isExist){
        return new Response(JSON.stringify({message: "Invalid ID"}), {status: 400});
    }
    const deleteit = await User.findByIdAndDelete(id);
    if(deleteit){
        return new Response(JSON.stringify({message: "User Deleted!"}), {status: 200});
    } else {
        return new Response(JSON.stringify({message: "Unable to delete!", error:error}), {status: 500});
    }
}

