"use client";
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const ManagePortfolio = () => {
  const [portfolio, setPortfolio] = useState([]);
  const [refresh, setRefresh] = useState(0);
 
  const token = localStorage.getItem('token');

  useEffect(() => {
    const getdata = async () => {
      try {
        const res = await axios.get("/api/portfolio/all", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (res.status == 200) {
          setPortfolio(res.data.portfolio);
        }
      } catch (error) {
        setMessage(error.response.data.message)
        return error
      }
    }
    getdata();
  }, [refresh])

  const deletePortfolio = async (id) => {
    try {
      const res = await axios.delete(`${origin}?id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (res.status == 200) {
        setRefresh(1);
      }
    } catch (error) {
      return error;
    }
  }


  return (
    <>
      <div className="container mx-auto w-full p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl text-white font-bold">Portfolio</h1>
          <Link href={'/team/create-portfolio'} className="bg-secondary-600 hover:bg-secondary-900 text-white raleway py-2 px-4 rounded">
            Create New Portfolio
          </Link>
        </div>
        {!portfolio && (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white">Loading...</div>
          </div>
        )}
        {portfolio && portfolio.length == 0 && (
          <div className="flex justify-center items-center">
            <p className='text-center text-2xl text-gray-400 py-5'>No portfolio Found!</p>
          </div>
        )}

        {portfolio && portfolio.length > 0 && (<div className="overflow-x-auto relative shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-400">
            <thead className="text-xs uppercase bg-gray-700 text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Image
                </th>
                <th scope="col" className="px-6 py-3">
                  Title
                </th>
                <th scope="col" className="px-6 py-3">
                  Short Description
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {portfolio.map((item, index) => {
                return (
                  <tr key={index} className=" border-b border-gray-700 hover:bg-gray-600">
                    <td className="px-6 py-4">
                      {item.image}
                    </td>
                    <td className="px-6 py-4">
                      {item.title}
                    </td>
                    <td className="px-6 py-4">
                      {item.short_description}
                    </td>
                    <td className="px-6 py-4">
                      <Link href={`/portfolio/${item.slug}`} className="font-bold text-blue-500 hover:underline mr-2">
                        View
                      </Link>
                      <Link href={`/team/update-portfolio/${item.slug}`} className="font-bold text-blue-500 hover:underline mr-2">
                        Update
                      </Link>
                      <button className="font-bold text-red-500 hover:underline mr-2" onClick={() => deletePortfolio(item._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              })}

            </tbody>
          </table>
        </div>)}
      </div>

    </>
  )
}

export default ManagePortfolio
