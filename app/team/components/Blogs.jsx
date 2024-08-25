import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const Blogs = () => {
    const [data, setData] = useState([]);
    const [refresh, setRefresh] = useState(0);

    const origin = '/api/blogs'
    const token = localStorage.getItem('token');

    useEffect(() => {
        const getdata = async () => {
            try {
                const res = await axios.get(origin);
                if (res.status == 200) {
                    setData(res.data);
                }
            } catch (error) {
                console.log(error);
                return error
            }
        }
        getdata();
    }, [refresh])

    const deleteBlog = async (id) => {
        try {
            const res = await axios.delete(`${origin}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (res.status == 200) {
                setRefresh(1);
            }
        } catch (error) {
            return error
        }
    }

    return (
        <>
            <div className='flex justify-between p-3'>
                <h3 className='text-white font-semibold text-3xl'>Blogs</h3>
                <Link href="/team/blogs/create" className='bg-primary-500 text-white px-3 rounded-md'>Create</Link>
            </div>
            {!data && (
                <p className='text-center text-white font-xl py-5'>Loading Data...</p>
            )}
            {data && data.length == 0 && (
                <p className='text-center text-white font-xl py-5'>No Blogs Found!</p>
            )}
            {data && data.length > 0 && (
                <div className="overflow-x-auto my-5 mx-2 md:mx-10 relative shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3 hidden md:block">
                                    Image
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Title
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Description
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Visits
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Created At
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => {
                                return (

                                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="px-6 py-4 hidden md:block">
                                            <Image src={item.blogImage} width={50} height={50} />
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.blogTitle}
                                        </td>
                                        <td className="px-6 py-4 truncate">
                                            {item.blog_description}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            {item.views}
                                        </td>
                                        <td className="px-6 py-4">
                                            {new Date(item.createdAt).toDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <Link href={`/team/blogs/update/${item.blog_slug}`} className="font-bold text-blue-500 hover:underline mr-2">
                                                Update
                                            </Link>
                                            <button className="font-bold text-red-500 hover:underline mr-2" onClick={() => deleteBlog(item._id)}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>

                                )
                            })}
                        </tbody>
                    </table>
                </div>)}

        </>
    )
}

export default Blogs
