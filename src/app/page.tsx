"use client"

import { useEffect, useState } from "react"
import { Users } from "@/types/users"

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
    <div className="grid grid-rows-[20px_1fr_20px] mt-[50%] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      {users === "Loading..." ? (
        <div className=" text-gray-500">Loading...</div>
      ) : (
        <div className="text-white">Hello {users}!</div>
      )}
    </div>
  )
}
