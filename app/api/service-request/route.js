import dbConnect from "@/app/lib/mongoose";
import sendEmail from "@/app/lib/sendEmail";
import Service from "@/app/models/Service";


export async function POST(request) {
    await dbConnect();
    const { clientName, clientEmail, clientPhone, service, details, budget } = await request.json();
    const createService = new Service({
        clientName, clientEmail, clientPhone, service, details, budget
    });

    await createService.save();
    sendEmail(clientEmail, 'Service Request Recieved!', `Hi ${clientName}, \nThanks for connecting us! Your service request has been recieved. Our Team will soon contact you about project details and pricing.\n Thanks For Connecting with Infotech`);
    return new Response(JSON.stringify({ message: "Data Saved" }), { status: 200 });
}