import dbConnect from "@/app/lib/mongoose";
import authMiddleware from "@/app/lib/authMiddleware";
import Ourportfolio from "@/app/models/Ourportfolio";


export const GET = async (request) => {
    await dbConnect()
    const slug = await request.nextUrl.searchParams.get('slug');
    if(!slug) return new Response(JSON.stringify({message: "Invalid Slug"}), {status: 404})
    const findPortfolio = await Ourportfolio.findOne({slug})
    if(!findPortfolio) return new Response(JSON.stringify({message: "Not Found Portfolio"}), {status: 404})
    return new Response(JSON.stringify({portfolio: findPortfolio}), {status: 200})
}

const createPortfolio = async(request) => {
    await dbConnect()

    const user = request.user;
    if(user.role !== 'admin') return new Response(JSON.stringify({message: "Only admin can add portfolio"}), {status: 403})

    const {image, pdf, title, short_description, slug} = await request.json();
    if(!title, !short_description) return new Response(JSON.stringify({message: "All Fields are required!"}), {status: 401})
    let newslug;
    if(!slug) newslug = title.toLowerCase().replace(" ", "-"); else newslug = slug;

    const createportfolio = await new Ourportfolio({
        image, pdf, title, short_description, slug: newslug
    });
    try {
        await createportfolio.save(); // Add await to ensure the promise is resolved
        return new Response(JSON.stringify({ message: "Portfolio created Successfully!" }), { status: 200 });
      } catch (error) {
        return new Response(JSON.stringify({ message: "Failed to create Portfolio" }), { status: 403 });
      }
}

const updatePortfolio = async (request) => {
    await dbConnect()

    const user = request.user;
    if(user.role !== 'admin') return new Response(JSON.stringify({message: "Only admin can add portfolio"}), {status: 401})
    const {_id, image, pdf, title, short_description, slug } = await request.json();
    if(!_id, !title, !short_description, !slug) return new Response(JSON.stringify({message: "All Feilds are required"}), {status: 403})

    const updatePortfolio = await Ourportfolio.findByIdAndUpdate(_id, {$set:{image, title, short_description, slug}});
    if(!updatePortfolio) return new Response(JSON.stringify({message: "Failed to update Portfolio"}), {status: 403})

    return new Response(JSON.stringify({message: "Portfolio updated Successfully!"}), {status: 200})
}

const deletePortfolio = async (request) => {
    await dbConnect()

    const user = request.user;
    if(user.role !== 'admin') return new Response(JSON.stringify({message: "Only admin can add Portfolio"}), {status: 401})
    const id = await request.nextUrl.searchParams.get('id');

    const deletedata = await Ourportfolio.findByIdAndDelete(id);
    if(!deletedata) return new Response(JSON.stringify({message: "Failed to delete portfolio"}), {status: 403})

    return new Response(JSON.stringify({message: "Portfolio deleted Successfully!"}), {status: 200})
}

export const POST = authMiddleware(createPortfolio)
export const PUT = authMiddleware(updatePortfolio)
export const DELETE = authMiddleware(deletePortfolio)
