import dbConnect from "@/app/lib/mongoose";
import ourservices from "@/app/models/Ourservices";

export const GET = async (request) => {
    try {
        await dbConnect();
        const findServices = await ourservices.find();
        
        return new Response(JSON.stringify({services: findServices}), {status: 200});
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({error: error}), {status: 500})
    }
   
}
