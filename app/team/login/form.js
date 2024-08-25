"use client"
const { useState } = require("react")

export const [formdata, setFormdata] = useState({
    email: "",
    password: "",
})

export const [pending, setPending] = useState(false)
export const [message, setMessage] = useState("")

export const onChangeForm = (e) => {
        setFormdata({ ...formdata, [e.target.name]: e.target.value })
}

const handleSubmit = async (e) => {
    setPending(true);
    e.preventDefault();
    try {
        const response = await axios.post('/api/auth/login', formdata);
        if (response.status == 200) {
            localStorage.setItem('token', response.data.token);
            setPending(false);
            window.location.href = "/team/"
        }
    } catch (error) {
        setPending(false)
        setMessage(error.response.data.message);
    }
}

export default handleSubmit