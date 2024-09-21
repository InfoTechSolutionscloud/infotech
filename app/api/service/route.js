import dbConnect from "@/app/lib/mongoose";
import authMiddleware from "@/app/lib/authMiddleware";
import Ourservices from "@/app/models/Ourservices";


export const GET = async (request) => {
    await dbConnect()
    const slug = await request.nextUrl.searchParams.get('slug');
    if(!slug) return new Response(JSON.stringify({message: "Invalid Slug"}), {status: 404})
    const findService = await Ourservices.findOne({slug})
    if(!findService) return new Response(JSON.stringify({message: "Not Found Service"}), {status: 404})
    return new Response(JSON.stringify({service: findService}), {status: 200})
}

const createService = async(request) => {
    await dbConnect()

    const user = request.user;
    if(user.role !== 'admin') return new Response(JSON.stringify({message: "Only admin can add services"}), {status: 403})

    const {image, title, short_description, description, slug} = await request.json();
    if(!title, !short_description, !description) return new Response(JSON.stringify({message: "All Fields are required!"}), {status: 401})
    let newslug;
    if(!slug) newslug = title.toLowerCase().replace(" ", "-"); else newslug = slug;

    const createservice = await new Ourservices({
        image, title, short_description, description, slug: newslug
    });
    try {
        await createservice.save(); // Add await to ensure the promise is resolved
        return new Response(JSON.stringify({ message: "Service created Successfully!" }), { status: 200 });
      } catch (error) {
        return new Response(JSON.stringify({ message: "Failed to create service" }), { status: 403 });
      }
}

const updateService = async (request) => {
    await dbConnect()

    const user = request.user;
    if(user.role !== 'admin') return new Response(JSON.stringify({message: "Only admin can add services"}), {status: 401})
    const {_id, image, title, short_description, description, slug } = await request.json();
    if(!_id, !title, !short_description, !description, !slug) return new Response(JSON.stringify({message: "All Feilds are required"}), {status: 403})

    const updateService = await Ourservices.findByIdAndUpdate(_id, {$set:{image, title, short_description, description, slug}});
    if(!updateService) return new Response(JSON.stringify({message: "Failed to update service"}), {status: 403})

    return new Response(JSON.stringify({message: "Service updated Successfully!"}), {status: 200})
}

const deleteService = async (request) => {
    await dbConnect()

    const user = request.user;
    if(user.role !== 'admin') return new Response(JSON.stringify({message: "Only admin can add services"}), {status: 401})
    const id = await request.nextUrl.searchParams.get('id');

    const deletedata = await Ourservices.findByIdAndDelete(id);
    if(!deletedata) return new Response(JSON.stringify({message: "Failed to delete service"}), {status: 403})

    return new Response(JSON.stringify({message: "Service deleted Successfully!"}), {status: 200})
}

export const POST = authMiddleware(createService)
export const PUT = authMiddleware(updateService)
export const DELETE = authMiddleware(deleteService)