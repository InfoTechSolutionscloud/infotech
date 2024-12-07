import dbConnect from "@/app/lib/mongoose";
import ourportfolio from "@/app/models/Ourportfolio";

export const GET = async (request) => {
    try {
        await dbConnect();
        const findSPortfolio = await ourportfolio.find({});
        
        return new Response(JSON.stringify({portfolio: findPortfolio}), {status: 200});
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({error: error}), {status: 500})
    }
}
