import React, { useState, useEffect } from 'react'
import DataWrapper from './DataWrapper'
import axios from 'axios';

export default function Inventory() {
  const [dataset, setDataset] = useState([]);
  const seeds = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/user/seeds', {
        email: 'niladri@gmail.com'
      })
      const data = response.data
      setDataset(data)
      console.log(data)
    }
    catch (err) {
      console.error('Error fetching seeds:', err.message);
    }
  }

  const tools = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/user/tools', {
        email: 'niladri@gmail.com'
      })
      const data = response.data
      // setDataset(data)
      console.log(data)
    }
    catch (err) {
      console.error('Error fetching seeds:', err.message);
    }
  }

  useEffect(() => {
    seeds();
    tools();
  }, [])
  
  return (
    <div className="w-svw py-6">
      <h1 className="md:text-5xl p-8 font-semibold text-left whitespace-nowrap dark:text-white">Inventory Items</h1>

      <div className="p-0.5 w-1/3 mr-auto ml-8 mb-8 relative bg-gradient-to-br from-green-400 to-blue-600 rounded-3xl">
        <div className="absolute inset-y-0 left-2.5 flex items-center ps-3 pointer-events-none">
          <svg className="size-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
          </svg>
          <span className="sr-only">Search icon</span>
        </div>
        <input
          type="text" id="search-navbar"
          className="block w-full p-2 ps-12 text-m outline-none text-gray-900 group-hover:bg-opacity-0 border border-gray-300 rounded-3xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500"
          placeholder="Search anything... (Enter to search)"
        />
      </div>

      <table cellSpacing={3} className='w-full border-collapse text-center dark:text-white'>
        <thead>
          <tr className="mb-5 text-lg font-bold">
            <th className="px-5 py-3">Seed No.</th>
            <th className="px-5 py-3">Name</th>
            <th className="px-5 py-3">Quantity</th>
            <th className="px-5 py-3">Price</th>

            {/* <th className="px-5 py-3">S. No.</th>
            <th className="px-5 py-3">Image</th>
            <th className="px-5 py-3">Name</th>
            <th className="px-5 py-3">Category</th>
            <th className="px-5 py-3">Available</th>
            <th className="px-5 py-3">Max. Capacity</th>
            <th className="px-5 py-3">Price</th> */}
            
          </tr>
        </thead>
        <tbody>
          {dataset.map(value => {
            return <DataWrapper record={value} />
          })}
        </tbody>
      </table>

    </div>
  )
}
