"use client"

import { useEffect, useState } from "react"
import { Users } from "@/types/users"
import { FiDroplet, FiMapPin } from "react-icons/fi"
import { FaWhatsapp } from "react-icons/fa"
import Link from "next/link"
import Image from "next/image"

export default function Home() {
  const [users, setUsers] = useState<string>("Loading...")
  const [currentBanner, setCurrentBanner] = useState<number>(0)

  // List of banner images and links using picsum.photos
  const banners = [
    {
      src: "https://picsum.photos/1200/675?random=1",
      link: "https://www.example1.com",
    },
    {
      src: "https://picsum.photos/1200/675?random=2",
      link: "https://www.example2.com",
    },
    {
      src: "https://picsum.photos/1200/675?random=3",
      link: "https://www.example3.com",
    },
  ]

  useEffect(() => {
    async function fetchUsers() {
      const res = await fetch("/api/users")
      const data: Users[] = await res.json()
      if (data.length > 0) {
        setUsers(data[0].first_name)
      }
    }
    fetchUsers()

    // Auto change the banner every 5 seconds
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="h-screen">
      <header className="flex items-center justify-between gap-4 p-4 bg-[#151515] text-white h-18">
        <Image src="/rapih-icon.png" alt="Logo" width={60} height={60} />
        <div className="flex flex-col gap-2">
          <div>
            {users === "Loading..." ? (
              <div className=" text-gray-500 text-xs">Loading...</div>
            ) : (
              <div className="text-white text-xs">Hello {users}!</div>
            )}
          </div>
          <div className="flex gap-2 items-center justify-center">
            <FiMapPin className="text-white text-sm" />

            <div className="text-xs font-extrabold text-gray-400 mr-2">
              Cipagalo, RW 12, RT 03
            </div>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <div className="relative aspect-[16/9] rounded-lg overflow-hidden m-5">
        <Link href={banners[currentBanner].link} passHref>
          <Image
            src={banners[currentBanner].src}
            alt={`Banner ${currentBanner + 1}`}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </Link>
      </div>

      <div className="relative bg-gradient-to-bl from-[#FFC914] to-yellow-600 py-3 px-4 rounded-lg shadow-lg mx-5">
        <div className="flex gap-2">
          <h1 className="w-fit bg-[#E4572E] rounded-lg py-1 px-2 text-left text-xs mb-2 text-white backdrop-blur-md">
            Apa kata Pak RT?
          </h1>
          <h1 className="w-fit bg-[#2e83e4] rounded-lg py-1 px-2 text-left text-xs mb-2 text-white backdrop-blur-md">
            10 Apr 2025 17.00
          </h1>
        </div>
        <p className="text-left text-xs text-black ">
          Acara halal bihalal akan dilaksanakan pada hari Minggu, 10 September
          2023.
        </p>
      </div>
      <div className="mx-7 mt-6 text-xl">Mau Ngapain Hari Ini?</div>
      <div className="grid grid-cols-3 grid-rows-3 gap-2 w-full aspect-[1/1.2] px-5 py-3">
        <button
          onClick={() => (window.location.href = "/feature/air")}
          className="flex flex-col items-center justify-around rounded-xl w-full h-full bg-cyan-600 hover:bg-cyan-800 shadow-lg shadow-gray-800 text-white text-xs text-center p-4 mx-auto"
        >
          <div>
            <FiDroplet className="text-white text-2xl" />
          </div>
          <div>Status Air Bersih</div>
        </button>
        <Link href="/" className="text-white text-xl">
          <button className="flex flex-col items-center justify-around rounded-xl w-full h-full bg-green-500 hover:bg-cyan-800 shadow-lg shadow-gray-800 text-white text-xs text-center p-4 mx-auto">
            <div>
              <FaWhatsapp className="text-white text-2xl" />
            </div>
            <div>Gabung Grup Warga</div>
          </button>
        </Link>
        <button className="rounded-xl disable bg-gray-400"></button>
        <button className="rounded-xl disable bg-gray-400"></button>
        <button className="rounded-xl disable bg-gray-400"></button>
        <button className="rounded-xl disable bg-gray-400"></button>
        <button className="rounded-xl disable bg-gray-400"></button>
      </div>
    </div>
  )
}
