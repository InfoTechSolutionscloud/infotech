import axios from 'axios'
const sendEmail = async (to, subject, text) => {
    try {
        const data = {
            to: to,
            subject: subject,
            text: text
        }
        const response = await axios.post(process.env.EMAIL_SERVER, data);
        if (response.status == 200) {
            return true;
        }
    } catch (error) {
        return false;   
    }
}
module.exports = sendEmail;