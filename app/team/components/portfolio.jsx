"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Services = () => {
  const origin = '/api/admin/service-requests'
  const token = localStorage.getItem('token');
  const [data, setData] = useState([])
  const [show, setShow] = useState(false);
  const [refresh, setRefresh] = useState(0)

  useEffect(() => {
    const getdata = async () => {
      try {
        const res = await axios.get(origin, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (res.status == 200) {
          setData(res.data.data);
          console.log(res.data.data);
        }
      } catch (error) {
        console.log(error);
        return error
      }
    }
    getdata();
  }, [refresh])

  const deleteService = async (id) => {
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
      return error
    }
  }

  return (
    <>
    {!data && (
      <p className='text-center text-white font-xl py-5'>Loading Data...</p>
    )}
    {data && data.length == 0 && (
      <p className='text-center text-white font-xl py-5'>No Service Requests!</p>
    )}
      {data && data.length > 0 && <div className="overflow-x-auto relative my-5 mx-2 md:mx-10 shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-lefttext-gray-400">
          <thead className="text-xs uppercase bg-gray-700 text-gray-200">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Phone
              </th>
              <th scope="col" className="px-6 py-3">
                Service
              </th>
              <th scope="col" className="px-6 py-3">
                Budget
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              return (
              <tr key={index} className=" border-b bg-gray-800 border-gray-700 hover:bg-gray-600 text-white">
                <td className="px-6 py-4">
                  {item.clientName}
                </td>
                <td className="px-6 py-4">
                  {item.clientEmail}
                </td>
                <td className="px-6 py-4">
                  {item.phone}
                </td>
                <td className="px-6 py-4">
                  {item.service}
                </td>
                <td className="px-6 py-4">
                  {item.budget}
                </td>
                <td className="px-6 py-4">
                  <button className="font-bold text-blue-500 hover:underline mr-2" onClick={() => setShow(item)}>
                    View
                  </button>
                  <button className="font-bold text-red-500 hover:underline" onClick={() => deleteService(item._id)}>
                    Delete
                  </button>
                </td>
              </tr>
              )
            })}

          </tbody>
        </table>
      </div>}

      {show && (
        <>
          <div className="fixed z-10 inset-0 md:inset-2 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 py-10 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true" onClick={() => setShow(false)}>
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
              <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                <div className="">
                  <div className="mt-3 text-center sm:mt-5">
                    <h3 className="text-2xl leading-6 font-medium text-gray-900" id="modal-headline">
                      Service Details:
                    </h3>
                    <div className="mt-2">
                      <ul className='list-none text-left'>
                        <li className='font-semibold'>Client Name: <span className='font-normal px-3'>{show.clientName}</span></li>
                        <li className='font-semibold'>Client Email: <span className='font-normal px-3'>{show.clientEmail}</span></li>
                        <li className='font-semibold'>Service: <span className='font-normal px-3'>{show.service}</span></li>
                        <li className='font-semibold'>Service Detils: <span className='font-normal block py-3'>{show.details}</span></li>
                        <li className='font-semibold'>Budget: <span className='font-normal px-3'>{show.budget}</span></li>
                        <li className='font-semibold'><span className='font-normal bg-secondary-700 text-white rounded-md py-1 px-3'><a href={`mailto:${show.clientEmail}`} >Reply Now</a></span></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )
      }

    </>

  )
}
export default Services
