import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Messages = () => {
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [show, setShow] = useState(false);

  const origin = '/api/admin/messages'
  const token = localStorage.getItem('token');

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
        }
      } catch (error) {
        console.log(error);
        return error
      }
    }
    getdata();
  }, [refresh])

  const deleteMessage = async (id) => {
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
  // const markasread = async (id) => {
  //   try {
  //     const res = await axios.put(`${origin}?id=${id}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       }
  //     });
  //     if (res.status == 200) {
  //       setRefresh(1);
  //     }
  //   } catch (error) {
  //     return error
  //   }
  // }

  return (
    <>
      {!data && (
        <p className='text-center text-white font-xl py-5'>Loading Data...</p>
      )}
      {data && data.length == 0 && (
        <p className='text-center text-white font-xl py-5'>No Messages Found!</p>
      )}
      {data && data.length > 0 && (
        <div className="overflow-x-auto my-5 mx-2 md:mx-10 relative shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-400">
            <thead className="text-xs  uppercase bg-gray-700 text-gray-400">
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
                  Subject
                </th>
                {/* <th scope="col" className="px-6 py-3">
                  Status
                </th> */}
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => {
                return (

                  <tr key={index} className=" border-b bg-gray-800 border-gray-700  hover:bg-gray-600">
                    <td className="px-6 py-4">
                      {item.name}
                    </td>
                    <td className="px-6 py-4">
                      {item.email}
                    </td>
                    <td className="px-6 py-4">
                      {item.phone}
                    </td>
                    <td className="px-6 py-4">
                      {item.subject}
                    </td>
                    {/* <td className="px-6 py-4">
                      {item.status}
                    </td> */}
                    <td className="px-6 py-4">
                      <button className="font-bold text-blue-500 hover:underline mr-2" onClick={() => setShow(item)}>
                        View
                      </button>
                      <button className="font-bold text-red-500 hover:underline mr-2" onClick={() => deleteMessage(item._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>

                )
              })}
            </tbody>
          </table>
        </div>)}



      {show && (
        <>
          <div className="fixed z-10 inset-2 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 py-10 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true" onClick={() => setShow(false)}>
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
              <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                <div className="">
                  <div className="mt-3 text-center sm:mt-5">
                    <h3 className="text-2xl leading-6 font-medium text-gray-900" id="modal-headline">
                      Message Details:
                    </h3>
                    <div className="mt-2">
                      <ul className='list-none text-left'>
                        <li className='font-semibold'>Name: <span className='font-normal px-3'>{show.name}</span></li>
                        <li className='font-semibold'>Email: <span className='font-normal px-3'>{show.email}</span></li>
                        <li className='font-semibold'>Subject: <span className='font-normal px-3'>{show.subject}</span></li>
                        <li className='font-semibold'>Message <span className='font-normal block py-3'>{show.message}</span></li>
                        {/* <li className='font-semibold'>Status: <span className='font-normal px-3'>{show.status}</span></li> */}

                        <li className='font-semibold'><span className='font-normal bg-secondary-700 text-white rounded-md py-1 px-3'><a href={`mailto:${show.email}`} >Reply Now</a></span></li>
                        {/* <li className='font-semibold my-2'><span className='font-normal bg-primary-700 text-white cursor-pointer rounded-md py-1 px-3' onClick={() => markasread(show._id)}>Mark as read</span></li> */}
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

export default Messages
