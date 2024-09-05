"use client";
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Users = () => {
  const [users, setUsers] = useState([]);
  const [update, setUpdate] = useState(false);
  const [create, setCreate] = useState(false);
  const [message, setMessage] = useState();
  const [refresh, setRefresh] = useState(0);
  const [userdata, setUserdata] = useState({
    name: "", email: "", role: "", password: ""
  })
  useEffect(() => {
    const getdata = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('/api/auth/users', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (res.status == 200) {
          setUsers(res.data);
        }
      } catch (error) {
        console.log(error);
        return error
      }
    }
    getdata();
  }, [refresh])

  const createUser = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const res = await axios.post('/api/auth/signup', userdata, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (res.status == 201) {
        setRefresh(refresh + 1);
        setCreate(false)
      }
    } catch (error) {
      setMessage(error.response.data.message)
    }
  }
  const updateUser = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const res = await axios.put('/api/auth/update', update, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(res);
      if (res.status == 200) {
        setRefresh(refresh + 1);
        setUpdate(false)
      }
    } catch (error) {
      return error
    }
  }

  const handleChange = (e) => {
    setUpdate({ ...update, [e.target.name]: e.target.value });
  }
  const handlenewChange = (e) => {
    setUserdata({ ...userdata, [e.target.name]: e.target.value });
  }

  const deleteUser = async (id) => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.delete(`/api/auth/remove?id=${id}`, {
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
      <div className='flex w-full md:w-3/4 mx-auto justify-between p-3'>
        <h3 className='text-white font-semibold text-3xl'>Users</h3>
        <button className='bg-primary-500 text-white px-3 rounded-md' onClick={() => setCreate(true)}>Create</button>
      </div>
      <div className="overflow-x-auto m-0 md:m-5 mb-5 mx-2 md:mx-10 shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-400">
          <thead className="text-xs uppercase bg-gray-700 text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Role
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users && users.map((item, index) => {
              return (
                <tr key={index} className=" border-b bg-gray-900 border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium text-white">
                    {item.name}
                  </th>
                  <td className="px-6 py-4">
                    {item.email}
                  </td>
                  <td className="px-6 py-4">
                    {item.role}
                  </td>
                  <td className="px-6 py-4">
                    {item.email === "infotechcompany85@gmail.com" ? (
                      <p className='text-gray-400'>Protected</p>
                    ) : (
                      <>
                        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => setUpdate(item)}>
                          Edit
                        </button>
                        <button type="button" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" onClick={() => deleteUser(item._id)}>
                          Delete
                        </button>
                      </>
                    )}

                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {update && (
        <>
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 py-10 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true" onClick={() => setUpdate(false)}>
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
              <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full w-full  sm:p-6" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                <div className="">
                  <div className="mt-3 text-center sm:mt-5">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                      Update User
                    </h3>
                    <div className="mt-2">
                      <form onSubmit={(e) => updateUser(e)}>
                        <div className="space-y-6">
                          <div className="sm:col-span-6">
                            <label htmlFor="name" className="block text-sm font-medium text-left pl-2 text-gray-700">
                              Name
                            </label>
                            <div className="mt-1">
                              <input type="text" name="name" id="name" className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500" onChange={handleChange} defaultValue={update.name} />
                            </div>
                          </div>
                          <div className="sm:col-span-6">
                            <label htmlFor="email" className="block text-sm font-medium text-left pl-2 text-gray-700">
                              Email
                            </label>
                            <div className="mt-1">
                              <input type="email" name="email" id="email" className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500" onChange={handleChange} defaultValue={update.email} />
                            </div>
                          </div>
                          <div className="sm:col-span-6">
                            <label htmlFor="role" className="block text-sm font-medium text-left pl-2 text-gray-700">
                              Role
                            </label>
                            <div className="mt-1">
                              <select name="role" id="role" className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500" onChange={handleChange} defaultValue={update.role}>
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                                <option value="blogger">Blogger</option>
                                <option value="projectmanager">Project Manager</option>
                              </select>
                            </div>
                          </div>
                          <div className="sm:col-span-6">
                            <label htmlFor="password" className="block text-sm font-medium text-left pl-2 text-gray-700">
                              Password
                            </label>
                            <div className="mt-1">
                              <input type="password" name="password" id="password" className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500" onChange={handleChange} />
                            </div>
                          </div>
                        </div>
                        <div className="mt-5 sm:mt-6">
                          <span className="flex w-full rounded-md shadow-sm">
                            <button type="submit" className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm">
                              Update
                            </button>
                          </span>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {create && (
        <>
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 py-10 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true" onClick={() => setCreate(false)}>
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
              <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full w-full sm:p-6" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                <div className="">
                  <div className="mt-3 text-center sm:mt-5">
                    <h3 className="text-2xl leading-6 font-medium text-gray-900" id="modal-headline">
                      Create User
                    </h3>
                    <div className="mt-2">
                      <form onSubmit={(e) => createUser(e)}>
                        <div className="space-y-6">
                          <div className="sm:col-span-6">
                            <label htmlFor="name" className="block text-sm font-medium text-left pl-2 text-gray-700">
                              Name
                            </label>
                            <div className="mt-1">
                              <input type="text" name="name" id="name" className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500" onChange={handlenewChange} defaultValue={userdata.name} />
                            </div>
                          </div>
                          <div className="sm:col-span-6">
                            <label htmlFor="email" className="block text-sm font-medium text-left pl-2 text-gray-700">
                              Email
                            </label>
                            <div className="mt-1">
                              <input type="email" name="email" id="email" className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500" onChange={handlenewChange} defaultValue={userdata.email} />
                            </div>
                          </div>
                          <div className="sm:col-span-6">
                            <label htmlFor="role" className="block text-sm font-medium text-left pl-2 text-gray-700">
                              Role
                            </label>
                            <div className="mt-1">
                              <select name="role" id="role" className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500" onChange={handlenewChange} defaultValue={userdata.role}>
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                                <option value="blogger">Blogger</option>
                                <option value="projectmanager">Project Manager</option>
                              </select>
                            </div>
                          </div>
                          <div className="sm:col-span-6">
                            <label htmlFor="password" className="block text-sm font-medium text-left pl-2 text-gray-700">
                              Password
                            </label>
                            <div className="mt-1">
                              <input type="password" name="password" id="password" className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500" onChange={handlenewChange} value={userdata.password} />
                            </div>
                          </div>
                        </div>
                        {message && <p className='text-center text-white'>{message}</p>}
                        <div className="mt-5 sm:mt-6">
                          <span className="flex w-full rounded-md shadow-sm">
                            <button type="submit" className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm">
                              Create User
                            </button>
                          </span>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Users
