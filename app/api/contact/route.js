import dbConnect from "@/app/lib/mongoose";
import Contact from "@/app/models/Contact";
import sendEmail from "@/app/lib/sendEmail";

export async function POST(request) {
    try {
        await dbConnect();
        const {name, email, phone, subject, message } = await request.json();
        const newcontact = new Contact({
            name, email, phone, subject, message
        })
        await newcontact.save();
        sendEmail(email, 'Message Recieved!', `Hi ${name}, \nThanks for connecting us! Your message has been recieved. We will reply ASAP.`);
        return new Response(JSON.stringify({message: "Message Sent!"}), {status: 200})
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({message: "Message Failed to sent!"}), {status: 500})
    }
}

export async function GET(request) {
    dbConnect();
    const messages = await Contact.find({});
    return new Response(JSON.stringify({data: messages}));
}

export async function PUT(request){
    const id = request.nextUrl.searchParams.get('id');
    dbConnect();
    await Contact.findByIdAndUpdate(id, {$set:{
        status: 'read'
    }})
    return new Response(JSON.stringify({message: "Message Marked As Read!"}), {status: 200});
}

export async function DELETE(request){
    const id = request.nextUrl.searchParams.get('id');
    dbConnect();
    await Contact.findByIdAndDelete(id);
    return new Response(JSON.stringify({message: "Message Deleted!"}), {status: 200})
}

