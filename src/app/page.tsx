"use client"

import { useEffect, useState } from "react"
import { Users } from "@/types/users"
import { FiDroplet } from "react-icons/fi"

export default function Home() {
  const [users, setUsers] = useState<string>("Loading...")

  useEffect(() => {
    async function fetchUsers() {
      const res = await fetch("/api/users")
      const data: Users[] = await res.json()
      if (data.length > 0) {
        setUsers(data[0].first_name)
      }
    }
    fetchUsers()
  }, [])

  return (
    <div className="h-screen">
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20">
        {users === "Loading..." ? (
          <div className=" text-gray-500">Loading...</div>
        ) : (
          <div className="text-white">Hello {users}!</div>
        )}
      </div>
      <div className="grid grid-cols-3 grid-rows-3 gap-2 w-full aspect-[1/1.2] p-5">
        <button
          onClick={() => (window.location.href = "/feature/air")}
          className="flex flex-col items-center justify-around rounded-xl w-full h-full bg-cyan-600 hover:bg-cyan-800 shadow-lg shadow-gray-800 text-white text-xs text-center p-4 mx-auto"
        >
          <div>
            <FiDroplet className="text-white text-2xl" />
          </div>
          <div>Status Air Bersih</div>
        </button>
        <button className="rounded-xl disable bg-gray-400"></button>
        <button className="rounded-xl disable bg-gray-400"></button>
        <button className="rounded-xl disable bg-gray-400"></button>
        <button className="rounded-xl disable bg-gray-400"></button>
        <button className="rounded-xl disable bg-gray-400"></button>
        <button className="rounded-xl disable bg-gray-400"></button>
      </div>
    </div>
  )
}
