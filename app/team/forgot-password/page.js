// "use client";
// import axios from "axios";
// import Link from "next/link";
// import React, { useState } from "react";
// import { useRouter } from "next/navigation";

// const Page = () => {
//   const router = useRouter();

//   const [formdata, setFormdata] = useState({
//     email: "",
//   });

//   const [pending, setPending] = useState(false);
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   const isValidEmail = (email) => {
//     //   const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
//     const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

//     return emailRegex.test(email);
//   };

//   const onChangeForm = (e) => {
//     setFormdata({ ...formdata, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setPending(true);

//     setError(null);

//     const email = formdata.email;

//     if (!isValidEmail(email)) {
//       setError("Invalid email address!");
//       setPending(false);
//       return;
//     }

// //     try {
// //       const res = await fetch("/api/forgot-password", {
// //         method: "POST",
// //         headers: {
// //             "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify({
// //             email
// //         }),
// //     });
// //         if(res.status === 400) {
// //             setError("User with this email is not registered!");
// //         }
// //         if(res.status === 200) {
// //             setError("");
// //             setMessage("Password reset link sent to your email"); 
// //             router.push("/team/login")
// //         }
      
// //     } catch (error) {
// //       setError("Error, try again");
// //       console.log(error);
// //     } finally {
// //     setPending(false); // Ensure pending state is reset
// //   }

// try {
//     await sendEmail(msg); // Use await here
//     await user.save();
//     return new Response(JSON.stringify({ message: "Password reset link sent to your email" }), { status: 200 });
//   } catch (error) {
//     user.resetToken = undefined;
//     user.resetTokenExpiry = undefined;
//     await user.save();
//     return new Response(JSON.stringify({ message: "Failed sending email. Try Again!" }), { status: 400 });
//   }

//   };

//   return (
//     <div className="bg-gray-900 flex justify-center items-center w-full h-screen">
//       <div className="md:w-1/4 mx-3 bg-gray-800 border-2 border-secondary-500 rounded-md">
//         <h3 className="text-2xl text-center text-white font-semibold merriweather py-10">
//           Forgot Password
//         </h3>
//         <form onSubmit={handleSubmit} className="p-3">
//           <input
//             type="email"
//             name="email"
//             id="email"
//             placeholder="Enter Email"
//             className="p-2 rounded-md bg-transparent outline-none border border-gray-400 text-white raleway focus:border-secondary-500 w-full mb-2 transition-colors duration-200"
//             value={formdata.email}
//             onChange={onChangeForm}
//           />
//           <button
//             type="submit"
//             className="bg-secondary-600 text-white rounded-md w-full px-3 py-2 hover:bg-secondary-800 transition-colors duration-200 disabled:bg-gray-600"
//             disabled={pending}
//           >
//             {pending ? "Sending..." : "Send Reset Link"}
//           </button>
//           {message && (
//             <p className="text-white text-sm text-center">{message}</p>
//           )}
//           {error && (
//             <p className="text-red-500 text-sm text-center">{error}</p> // Added error message display
//           )}
//         </form>
//         <p className="text-center text-gray-300 text-sm py-3">
//           Remembered your password?{" "}
//           <Link
//             href="/team/login"
//             className="text-secondary-500 hover:underline"
//           >
//             Login here
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Page;
"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const ForgotPassword = () => {
    const router = useRouter();

    const [formdata, setFormdata] = useState({
        email: "",
    });

    const [pending, setPending] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const isValidEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    const onChangeForm = (e) => {
        setFormdata({ ...formdata, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setPending(true);
        setError(null);

        const email = formdata.email;

        if (!isValidEmail(email)) {
            setError("Invalid email address!");
            setPending(false);
            return;
        }

        try {
            const res = await fetch("/api/forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            if (res.status === 400) {
                setError("User with this email is not registered!");
            } else if (res.status === 200) {
                setError("");
                setMessage("Password reset link sent to your email");
                // Uncomment the line below if you want to redirect the user after successful submission
                // router.push("/team/login");
            }
        } catch (error) {
            setError("Error, try again");
            console.log(error);
        } finally {
            setPending(false);
        }
    };

    return (
        <div className="bg-gray-900 flex justify-center items-center w-full h-screen">
            <div className="md:w-1/4 mx-3 bg-gray-800 border-2 border-secondary-500 rounded-md">
                <h3 className="text-2xl text-center text-white font-semibold merriweather py-10">
                    Forgot Password
                </h3>
                <form onSubmit={handleSubmit} className="p-3">
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter Email"
                        className="p-2 rounded-md bg-transparent outline-none border border-gray-400 text-white raleway focus:border-secondary-500 w-full mb-2 transition-colors duration-200"
                        value={formdata.email}
                        onChange={onChangeForm}
                    />
                    <button
                        type="submit"
                        className="bg-secondary-600 text-white rounded-md w-full px-3 py-2 hover:bg-secondary-800 transition-colors duration-200 disabled:bg-gray-600"
                        disabled={pending}
                    >
                        {pending ? "Sending..." : "Send Reset Link"}
                    </button>
                    {message && (
                        <p className="text-secondary-500 text-sm text-center py-4">{message}</p>
                    )}
                    {error && (
                        <p className="text-red-500 text-sm text-center">{error}</p>
                    )}
                </form>
                <p className="text-center text-gray-300 text-sm py-3">
                    Remembered your password?{" "}
                    <Link
                        href="/team/login"
                        className="text-secondary-500 hover:underline"
                    >
                        Login here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default ForgotPassword;
