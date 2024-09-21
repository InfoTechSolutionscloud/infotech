"use client";
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [update, setUpdate] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [create, setCreate] = useState(false);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState()
  const [newstatus, setNewstatus] = useState(false)
  const [updatestatus, setUpdatestatus] = useState(false)
  const [newproject, setNewproject] = useState({
    clientEmail: "", clientName: "", projectId: "", projectTitle: "", projectDescription: "", project_deadline: "", workerEmail: ""
  })
  const [status, setStatus] = useState({
    _id: "", projectId: "", status: "", title: "", description: "", completion_date: ""
  })
  const origin = '/api/admin/projects'
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
          setProjects(res.data.data);
        }
      } catch (error) {
        console.log(error);
        return error
      }
    }
    getdata();
  }, [refresh])

  const updateProject = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(origin, update, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (res.status == 200) {
        setRefresh(refresh + 1);

        setUpdate(false)
      }
    } catch (error) {
      setMessage(error.response.data.message)
    }
  }
  const createProject = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(origin, newproject, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (res.status == 200) {
        setRefresh(refresh + 1);
        setCreate(false)
      }
    } catch (error) {
      setMessage(error.response.data.message)
    }
  }

  const handleChange = (e) => {
    setUpdate({ ...update, [e.target.name]: e.target.value });
  }
  const handlenewChange = (e) => {
    setNewproject({ ...newproject, [e.target.name]: e.target.value });
  }

  const deleteProject = async (id) => {
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


  const fetchStatus = async (id) => {
    const res = await axios.get('/api/status?id=' +id);
    if(res.status == 200){
      setStatus(res.data.status)
    }
  }
  const managestatus = (status, item) => {
    if (!status) {
      setNewstatus(true);
      setStatus({...status, projectId: item._id})
    } else {
      fetchStatus(status);
      setStatus({...status, projectId: item._id})
      setUpdatestatus(true);
    }
  }

  const createStatus = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/status', status, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (res.status == 200) {
        setNewstatus(false)
        setRefresh(refresh + 1)
      }  
    } catch (error) {
      setMessage(error.response.data.message);
    }
  }
  const updateStatus = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`/api/status?id=${status._id}`, status, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (res.status == 200) {
        setUpdatestatus(false)
        setRefresh(refresh + 1)

      }  
    } catch (error) {
      setMessage(error.response.data.message);
    }
  }



  return (
    <>
      <div className="container mx-auto w-full p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl text-white font-bold">Projects</h1>
          <button onClick={() => setCreate(true)} className="bg-secondary-600 hover:bg-secondary-900 text-white raleway py-2 px-4 rounded">
            Create New Project
          </button>
        </div>
        {!projects && (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white">Loading...</div>
          </div>
        )}
        {projects && projects.length <= 0 && (
          <div className="flex justify-center items-center">
            <p className='text-center text-2xl text-gray-400 py-5'>No Projects Found!</p>
          </div>
        )}

        {projects && (<div className="overflow-x-auto relative shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-400">
            <thead className="text-xs uppercase bg-gray-700 text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Client Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Client Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Project ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Project Title
                </th>
                <th scope="col" className="px-6 py-3">
                  Project Deadline
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {projects.map((item, index) => {
                return (
                  <tr key={index} className=" border-b border-gray-700 hover:bg-gray-600">
                    <td className="px-6 py-4">
                      {item.clientName}
                    </td>
                    <td className="px-6 py-4">
                      {item.clientEmail}
                    </td>
                    <td className="px-6 py-4">
                      {item.projectId}
                    </td>
                    <td className="px-6 py-4">
                      {item.projectTitle}
                    </td>
                    <td className="px-6 py-4">
                      {new Date(item.project_deadline).toDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <button className="font-bold text-blue-500 hover:underline mr-2" onClick={() => setShow(item)}>
                        View
                      </button>
                      <button className="font-bold text-blue-500 hover:underline mr-2" onClick={() => managestatus(item.statusId, item)}>
                        Status
                      </button>
                      <button className="font-bold text-blue-500 hover:underline mr-2" onClick={() => setUpdate(item)}>
                        Update
                      </button>
                      <button className="font-bold text-red-500 hover:underline mr-2" onClick={() => deleteProject(item._id)}>
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

      {update && (
        <>
          <div className="fixed z-10 inset-2 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 py-10 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true" onClick={() => setUpdate(false)}>
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
              <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full w-full sm:p-6" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                <div className="">
                  <div className="mt-3 text-center sm:mt-5">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                      Update Project
                    </h3>
                    <div className="mt-2">
                      <form onSubmit={(e) => updateProject(e)}>
                        <div className="space-y-2">
                          <div className='flex gap-2'>
                            <div className="sm:col-span-6 w-1/2">
                              <label htmlFor="name" className="block text-left text-sm font-medium text-gray-700">
                                Client Name
                              </label>
                              <div className="mt-1">
                                <input type="text" name="clientName" id="clientName" className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500" onChange={handleChange} defaultValue={update.clientName} />
                              </div>
                            </div>
                            <div className="sm:col-span-6 w-1/2">
                              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Client Email
                              </label>
                              <div className="mt-1">
                                <input type="email" name="clientEmail" id="clientEmail" className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500" onChange={handleChange} defaultValue={update.clientEmail} />
                              </div>
                            </div>
                          </div>
                          <div className='flex gap-2'>
                            <div className="sm:col-span-6 w-1/2">
                              <label htmlFor="projectID" className="block text-left text-sm font-medium text-gray-700">
                                Project ID
                              </label>
                              <div className="mt-1">
                                <input type="text" name="projectId" id="projectId" className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500" onChange={handleChange} defaultValue={update.projectId} />
                              </div>
                            </div>
                            <div className="sm:col-span-6 w-1/2">
                              <label htmlFor="projectTitle" className="block text-left text-sm font-medium text-gray-700">
                                Project Title
                              </label>
                              <div className="mt-1">
                                <input type="text" name="projectTitle" id="projectTitle" className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500" onChange={handleChange} defaultValue={update.projectTitle} />
                              </div>
                            </div>
                          </div>
                          <div className="sm:col-span-6">
                            <label htmlFor="projectTitle" className="block text-left text-sm font-medium text-gray-700">
                              Project Description
                            </label>
                            <div className="mt-1">
                              <textarea name="projectDescription" id="projectDescription" className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500" onChange={handleChange} defaultValue={update.projectDescription}></textarea>
                            </div>
                          </div>
                          <div className='flex gap-2'>
                            <div className="sm:col-span-6 w-1/2">
                              <label htmlFor="project_deadline" className="block text-left text-sm font-medium text-gray-700">
                                Project Deadline
                              </label>
                              <div className="mt-1">
                                <input type="text" name="project_deadline" id="project_deadline" className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500" onChange={handleChange} defaultValue={update.project_deadline} />
                              </div>
                            </div>
                            <div className="sm:col-span-6 w-1/2">
                              <label htmlFor="workerEmail" className="block text-left text-sm font-medium text-gray-700">
                                Worker Email
                              </label>
                              <div className="mt-1">
                                <input type="email" name="workerEmail" id="workerEmail" className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500" onChange={handleChange} defaultValue={update.workerEmail} />
                              </div>
                            </div>
                          </div>
                        </div>
                        {message && (
                          <p className='text-black py-2'>{message}</p>
                        )}
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
          <div className="fixed z-10 inset-2 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 py-10 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true" onClick={() => setCreate(false)}>
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
              <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full w-full sm:p-6" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                <div className="">
                  <div className="mt-3 text-center sm:mt-5">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                      Create Project
                    </h3>
                    <div className="mt-2">
                      <form onSubmit={(e) => createProject(e)}>
                        <div className="space-y-2">
                          <div className='flex gap-2'>
                            <div className="sm:col-span-6 w-1/2">
                              <label htmlFor="name" className="block text-left text-sm font-medium text-gray-700">
                                Client Name
                              </label>
                              <div className="mt-1">
                                <input type="text" name="clientName" id="clientName" className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500" onChange={handlenewChange} defaultValue={newproject.clientName} />
                              </div>
                            </div>
                            <div className="sm:col-span-6 w-1/2">
                              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Client Email
                              </label>
                              <div className="mt-1">
                                <input type="email" name="clientEmail" id="clientEmail" className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500" onChange={handlenewChange} defaultValue={newproject.clientEmail} />
                              </div>
                            </div>
                          </div>
                          <div className='flex gap-2'>
                            <div className="sm:col-span-6 w-1/2">
                              <label htmlFor="projectID" className="block text-left text-sm font-medium text-gray-700">
                                Project ID
                              </label>
                              <div className="mt-1">
                                <input type="text" name="projectId" id="projectId" className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500" onChange={handlenewChange} defaultValue={newproject.projectId} />
                              </div>
                            </div>
                            <div className="sm:col-span-6 w-1/2">
                              <label htmlFor="projectTitle" className="block text-left text-sm font-medium text-gray-700">
                                Project Title
                              </label>
                              <div className="mt-1">
                                <input type="text" name="projectTitle" id="projectTitle" className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500" onChange={handlenewChange} defaultValue={newproject.projectTitle} />
                              </div>
                            </div>
                          </div>
                          <div className="sm:col-span-6">
                            <label htmlFor="projectTitle" className="block text-left text-sm font-medium text-gray-700">
                              Project Description
                            </label>
                            <div className="mt-1">
                              <textarea name="projectDescription" id="projectDescription" className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500" onChange={handlenewChange} defaultValue={newproject.projectDescription}></textarea>
                            </div>
                          </div>
                          <div className='flex gap-2'>
                            <div className="sm:col-span-6 w-1/2">
                              <label htmlFor="project_deadline" className="block text-left text-sm font-medium text-gray-700">
                                Project Deadline
                              </label>
                              <div className="mt-1">
                                <input type="text" name="project_deadline" id="project_deadline" className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500" onChange={handlenewChange} defaultValue={newproject.project_deadline} />
                              </div>
                            </div>
                            <div className="sm:col-span-6 w-1/2">
                              <label htmlFor="workerEmail" className="block text-left text-sm font-medium text-gray-700">
                                Worker Email
                              </label>
                              <div className="mt-1">
                                <input type="email" name="workerEmail" id="workerEmail" className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500" onChange={handlenewChange} defaultValue={newproject.workerEmail} />
                              </div>
                            </div>
                          </div>
                        </div>
                        {message && (
                          <p className='text-black py-2'>{message}</p>
                        )}
                        <div className="mt-5 sm:mt-6">
                          <span className="flex w-full rounded-md shadow-sm">
                            <button type="submit" className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm">
                              Create New Project
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
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                      Project Details:
                    </h3>
                    <div className="mt-2">
                      <ul className='list-none text-left'>
                        <li className='font-semibold'>Client Name: <span className='font-normal px-3'>{show.clientName}</span></li>
                        <li className='font-semibold'>Client Email: <span className='font-normal px-3'>{show.clientEmail}</span></li>
                        <li className='font-semibold'>Project Id: <span className='font-normal px-3'>{show.projectId}</span></li>
                        <li className='font-semibold'>Project Title: <span className='font-normal px-3'>{show.projectTitle}</span></li>
                        <li className='font-semibold'>Project Description: <span className='font-normal block py-3'>{show.projectDescription}</span></li>
                        <li className='font-semibold'>Project Deadline: <span className='font-normal px-3'>{new Date(show.project_deadline).toDateString()}</span></li>
                        <li className='font-semibold'>Worker Email: <span className='font-normal px-3'>{show.workerEmail}</span></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {newstatus && (
        <>
          <div className="fixed z-10 inset-2 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 py-10 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true" onClick={() => setNewstatus(false)}>
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
              <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full w-full sm:p-6" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                <div className="">
                  <div className="mt-3 text-center sm:mt-5">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                      Create Status
                    </h3>
                    <div className="mt-2">
                      <form onSubmit={(e) => createStatus(e)}>
                        <div className="space-y-2">
                          <div className='flex gap-2'>
                            <div className="sm:col-span-6 w-1/2">
                              <label htmlFor="name" className="block text-left text-sm font-medium text-gray-700">
                                Status
                              </label>
                              <div className="mt-1">
                                <input type="text" name="status" id="status" className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500" onChange={(e) => { setStatus({ ...status, status: e.target.value }) }} value={status.status} />
                              </div>
                            </div>
                            <div className="sm:col-span-6 w-1/2">
                              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                Title
                              </label>
                              <div className="mt-1">
                                <input type="title" name="title" id="title" className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500" onChange={(e) => {setStatus({ ...status, title: e.target.value })}} value={status.title} />
                              </div>
                            </div>
                          </div>

                          <div className="sm:col-span-6">
                            <label htmlFor="statusdescription" className="block text-left text-sm font-medium text-gray-700">
                              Status Description
                            </label>
                            <div className="mt-1">
                              <textarea name="description" id="description" className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500" onChange={(e) => {setStatus({ ...status, description: e.target.value })}} value={status.description}></textarea>
                            </div>
                          </div>
                          <div className='flex gap-2'>
                            <div className="sm:col-span-6 w-1/2">
                              <label htmlFor="deadline" className="block text-left text-sm font-medium text-gray-700">
                                Status Deadline
                              </label>
                              <div className="mt-1">
                                <input type="text" name="deadline" id="deadline" className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500" onChange={(e) => {setStatus({ ...status, completion_date: e.target.value })}} value={status.completion_date} />
                              </div>
                            </div>
                          </div>
                        </div>
                        {message && (
                          <p className='text-black py-2'>{message}</p>
                        )}
                        <div className="mt-5 sm:mt-6">
                          <span className="flex w-full rounded-md shadow-sm">
                            <button type="submit" className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm">
                              Create New Status
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

      {updatestatus && (
        <>
          <div className="fixed z-10 inset-2 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 py-10 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true" onClick={() => setUpdatestatus(false)}>
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
              <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full w-full sm:p-6" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                <div className="">
                  <div className="mt-3 text-center sm:mt-5">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                      Update Status
                    </h3>
                    <div className="mt-2">
                      <form onSubmit={(e) => updateStatus(e)}>
                        <div className="space-y-2">
                          <div className='flex gap-2'>
                            <div className="sm:col-span-6 w-1/2">
                              <label htmlFor="name" className="block text-left text-sm font-medium text-gray-700">
                                Status
                              </label>
                              <div className="mt-1">
                                <input type="text" name="status" id="status" className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500" onChange={(e) => { setStatus({ ...status, status: e.target.value }) }} value={status.status} />
                              </div>
                            </div>
                            <div className="sm:col-span-6 w-1/2">
                              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                Title
                              </label>
                              <div className="mt-1">
                                <input type="title" name="title" id="title" className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500" onChange={(e) => {setStatus({ ...status, title: e.target.value })}} value={status.title} />
                              </div>
                            </div>
                          </div>

                          <div className="sm:col-span-6">
                            <label htmlFor="statusdescription" className="block text-left text-sm font-medium text-gray-700">
                              Status Description
                            </label>
                            <div className="mt-1">
                              <textarea name="description" id="description" className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500" onChange={(e) => {setStatus({ ...status, description: e.target.value })}} value={status.description}></textarea>
                            </div>
                          </div>
                          <div className='flex gap-2'>
                            <div className="sm:col-span-6 w-1/2">
                              <label htmlFor="deadline" className="block text-left text-sm font-medium text-gray-700">
                                Status Deadline
                              </label>
                              <div className="mt-1">
                                <input type="text" name="deadline" id="deadline" className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500" onChange={(e) => {setStatus({ ...status, completion_date: e.target.value })}} value={status.completion_date} />
                              </div>
                            </div>
                          </div>
                        </div>
                        {message && (
                          <p className='text-black py-2'>{message}</p>
                        )}
                        <div className="mt-5 sm:mt-6">
                          <span className="flex w-full rounded-md shadow-sm">
                            <button type="submit" className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm">
                              Update Status
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

export default Projects
