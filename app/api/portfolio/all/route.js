import dbConnect from "@/app/lib/mongoose";
import portfolio from "@/app/models/portfolio";

export const GET = async (request) => {
    try {
        await dbConnect();
        const findPortfolio = await portfolio.find({});
        
        return new Response(JSON.stringify({portfolio: findPortfolio}), {status: 200});
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({error: error}), {status: 500})
    }
}
