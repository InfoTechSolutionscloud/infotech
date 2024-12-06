import dbConnect from "@/app/lib/mongoose";
import sendEmail from "@/app/lib/sendEmail";
import portfolio from "@/app/models/portfolio";


export async function POST(request) {
    await dbConnect();
    const { clientName, clientEmail, clientPhone, service, details, budget } = await request.json();
    const createPortfolio = new portfolio({
        clientName, clientEmail, clientPhone, service, details, budget
    });

    await createPortfolio.save();
    sendEmail(clientEmail, 'Portfolio Request Recieved!', `Hi ${clientName}, \nThanks for connecting us! Your portfolio request has been recieved. Our Team will soon contact you about project details and pricing.\n Thanks For Connecting with Infotech`);
    return new Response(JSON.stringify({ message: "Data Saved" }), { status: 200 });
}
