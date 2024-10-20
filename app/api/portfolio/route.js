import authMiddleware from "@/app/lib/authMiddleware";
import dbConnect from "@/app/lib/mongoose";
import Portfolio from "@/app/models/Portfolio";


export async function GET(request) {
    await dbConnect();
    const findAll = await Portfolio.find({});
    return new Response(JSON.stringify(findAll), { status: 200 })
}

async function createPortfolio(request) {
    await dbConnect();
    const user = request.user;
    if (user.role !== 'admin' && user.role !== 'manager') return new Response(JSON.stringify({ message: "You are not admin" }), { status: 403 })

    const { title, image, short_description, category, url } = await request.json();
    if (!title, !image, !category) {
        return new Response(JSON.stringify({ message: "Please fill all details!" }))
    }
    const addPortfolio = new Portfolio({
        title, image, short_description, category, url
    });
    try {
        await addPortfolio.save();
        return new Response(JSON.stringify({ message: "Portfolio added" }, { status: 200 }))
    } catch (error) {
        return new Response(JSON.stringify({ message: "Please Try Again! Failed to create Portfolio!", error: error.message }, { status: 500 }));
    }
}

async function updatePortfolio(request){
    await dbConnect();
    const user = request.user;
    if (user.role !== 'admin' && user.role !== 'manager') return new Response(JSON.stringify({ message: "You are not admin" }), { status: 403 })

    const {id, title, image, short_description, category, url} = await request.json();
    const updateData = Portfolio.findByIdAndUpdate(id, {$set: {title, image, short_description, category, url}});
    try {
        await updateData;
        return new Response(JSON.stringify({message: "Portfolio Updated!"}, {status: 200}));
    } catch (error) {
        return new Response(JSON.stringify({message: "Failed to update portfolio", error: error.message}, ))
    }

}


async function deletePortfolio(request){
    await dbConnect();
    const user = request.user;
    if (user.role !== 'admin' && user.role !== 'manager') return new Response(JSON.stringify({ message: "You are not admin" }), { status: 403 })
    const {id} = await request.json();
    const remove = await Portfolio.findByIdAndDelete(id);
    try {
        await remove;
        return new Response(JSON.stringify({message: "Portfolio removed!"}), {status: 200});
    } catch (error) {
        return new Response(JSON.stringify({message: "Failed to delete portfolio", error: error.message}), {status: 500})
    }

}

export const POST = authMiddleware(createPortfolio);
export const PUT = authMiddleware(updatePortfolio);
export const DELETE = authMiddleware(deletePortfolio);