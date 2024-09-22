
// "use client";
// import axios from "axios";
// import Link from "next/link";
// import React, { useEffect, useState } from "react";

// const ResetPassword = ({params}) => {
//   console.log(params.token);

//   const [formdata, setFormdata] = useState({
//     email: "",
//   });

//   const [pending, setPending] = useState(false);
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   const [verified, setVerified] = useState("");
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const verifyToken = async() => {
      
//       try {
//       const res = await fetch("/api/verify-token", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           token: params.token,
//         }),
//       });

//       if (res.status === 400) {
//         setError("Invalid token or has expired");
//         setVerified(true);
//       } else if (res.status === 200) {
//         setError("");
//         setMessage("Password changed succesfully!");
//         setVerified(true);

//         const userData = await res.json();
//         setUser(userData)
//       }
//     } catch (error) {
//       setError("Error, try again");
//       console.log(error);
//     } finally {
//       setPending(false);
//     }
//     }
//     verifyToken();
//   }, [params.token]);


//   const onChangeForm = (e) => {
//     setFormdata({ ...formdata, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setPending(true);
//     setError(null);

//     const password = e.target.value;

//     try {
//       const res = await fetch('/api/reset-password', {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           password,
//           email: user?.email
//         }),
//       });
//       if(res.status === 400) {
//         setError("Something went wrong, Try again!");
//       }
//       if(res.status === 200) {
//         setError("");
//       }
//     } catch(error) {
//      setError("Error, Try Again");
//      console.log(error);
//     }

//   };

//   return (
//     <div className="bg-gray-900 flex justify-center items-center w-full h-screen">
//       <div className="md:w-1/4 mx-3 bg-gray-800 border-2 border-secondary-500 rounded-md">
//         <h3 className="text-2xl text-center text-white font-semibold merriweather py-10">
//           Reset Password
//         </h3>
//         <form onSubmit={handleSubmit} className="p-3">
//           <input
//             type="password"
//             name="password"
//             id="password"
//             placeholder="Enter New Password"
//             className="p-2 rounded-md bg-transparent outline-none border border-gray-400 text-white raleway focus:border-secondary-500 w-full mb-2 transition-colors duration-200"
//             value={formdata.password}
//             onChange={onChangeForm}
//           />
//           <button
//             type="submit"
//             className="bg-secondary-600 text-white rounded-md w-full px-3 py-2 hover:bg-secondary-800 transition-colors duration-200 disabled:bg-gray-600"
//             disabled={pending}
//           >
//             {pending ? "Resetting Password..." : "Reset Password"}
//           </button>
//           {message && (
//             <p className="text-secondary-500 text-sm text-center py-4">{message}</p>
//           )}
//           {error && (
//             <p className="text-red-500 text-sm text-center">{error}</p>
//           )}
//         </form>
//         {/* <p className="text-red-500 text-[16px] mb-4">{error && error}</p> */}
//       </div>
//     </div>
//   );
// };

// export default ResetPassword;

"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const ResetPassword = ({ params }) => {
    console.log(params.token);

    const [formdata, setFormdata] = useState({
        password: "",
    });

    const [pending, setPending] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const [verified, setVerified] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const verifyToken = async () => {
            setPending(true); // Set pending to true at the start

            try {
                const res = await fetch("/api/verify-token", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        token: params.token,
                    }),
                });

                if (res.status === 400) {
                    setError("Invalid token or has expired");
                    setVerified(false);
                } else if (res.status === 200) {
                    setError("");
                    setMessage("Token verified successfully!");
                    setVerified(true);

                    const userData = await res.json();
                    setUser(userData);
                }
            } catch (error) {
                setError("Error, try again");
                console.log(error);
            } finally {
                setPending(false); // Set pending to false at the end
            }
        };
        verifyToken();
    }, [params.token]);

    const onChangeForm = (e) => {
        setFormdata({ ...formdata, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setPending(true);
        setError(null);

        try {
            const res = await fetch('/api/reset-password', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    password: formdata.password, // Use formdata.password
                    email: user?.email
                }),
            });
            if (res.status === 400) {
                setError("Something went wrong, Try again!");
            }
            if (res.status === 200) {
                setError("");
                setMessage("Password reset successfully!");
            }
        } catch (error) {
            setError("Error, Try Again");
            console.log(error);
        } finally {
            setPending(false);
        }
    };

    return (
        <div className="bg-gray-900 flex justify-center items-center w-full h-screen">
            <div className="md:w-1/4 mx-3 bg-gray-800 border-2 border-secondary-500 rounded-md">
                <h3 className="text-2xl text-center text-white font-semibold merriweather py-10">
                    Reset Password
                </h3>
                <form onSubmit={handleSubmit} className="p-3">
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter New Password"
                        className="p-2 rounded-md bg-transparent outline-none border border-gray-400 text-white raleway focus:border-secondary-500 w-full mb-2 transition-colors duration-200"
                        value={formdata.password}
                        onChange={onChangeForm}
                    />
                    <button
                        type="submit"
                        className="bg-secondary-600 text-white rounded-md w-full px-3 py-2 hover:bg-secondary-800 transition-colors duration-200 disabled:bg-gray-600"
                        disabled={pending}
                    >
                        {pending ? "Please Wait..." : "Reset Password"}
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

export default ResetPassword;
