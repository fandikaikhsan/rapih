"use client"
import { useState, useEffect } from "react"
import WaterConsumptionSummary from "@/components/air/SummaryCard"
import { WaterConsumptionUserData } from "@/types/users"
import { FaArrowLeft } from "react-icons/fa"
import WaterConsumptionModal from "@/components/air/WaterConsumptionModal"
import Link from "next/link"

export default function Home() {
  const [user, setUser] = useState<WaterConsumptionUserData>({
    name: "Fandika Ikhsan",
    monthlyConsumption: 250,
    totalConsumption: 5000,
    lastUpdated: "2025-04-01 10:00",
    estimatedCost: 15000,
    history: [
      { consumption: 200, date: "2025-03-01 10:00", status: false },
      { consumption: 180, date: "2025-02-15 09:00", status: false },
      { consumption: 210, date: "2025-01-20 14:00", status: true },
      { consumption: 190, date: "2024-12-25 13:30", status: true },
      { consumption: 210, date: "2024-11-20 12:00", status: true },
      { consumption: 220, date: "2024-10-15 08:30", status: true },
    ],
  })

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [consumptionInput, setConsumptionInput] = useState("")
  const [dateInput, setDateInput] = useState(
    new Date().toISOString().slice(0, 16)
  )

  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    // Ensuring useRouter is used after the component has mounted
    setIsClient(true)
  }, [])

  const handleUpdate = () => {
    setConsumptionInput("") // Reset consumption input
    setDateInput(new Date().toISOString().slice(0, 16)) // Set default current date
    setIsModalOpen(true) // Open modal
  }

  const handleSave = () => {
    const updatedUser = {
      ...user,
      history: [
        ...user.history,
        {
          consumption: parseFloat(consumptionInput),
          date: dateInput,
          status: true, // Set default status as "Sudah Dibayar"
        },
      ],
      monthlyConsumption: parseFloat(consumptionInput),
      lastUpdated: dateInput,
      totalConsumption: user.totalConsumption + parseFloat(consumptionInput),
    }
    setUser(updatedUser)
    setIsModalOpen(false) // Close modal after save
  }

  const handleCancel = () => {
    setIsModalOpen(false) // Close modal without saving
  }

  return (
    <div className="bg-black text-white min-h-screen p-5">
      {/* Back Arrow */}
      {isClient && (
        <div className="flex items-center mb-5">
          <Link href="/" className="text-white text-xl">
            <FaArrowLeft />
          </Link>
        </div>
      )}

      <WaterConsumptionSummary user={user} />
      <div className="mt-5 border border-gray-700 rounded-lg overflow-hidden">
        <div className="overflow-x-auto max-h-64 overflow-y-auto">
          <table className="w-full border-collapse text-xs">
            <thead className="sticky top-0 bg-black">
              <tr className="bg-gray-900 text-left">
                <th className="p-3">Waktu Diperbaharui</th>
                <th className="p-3">Konsumsi Air</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {user.history.slice(-5).map((entry, index) => (
                <tr key={index} className="border-t border-gray-800">
                  <td className="p-3 whitespace-nowrap">{entry.date}</td>
                  <td className="p-3 whitespace-nowrap">
                    {entry.consumption} L
                  </td>
                  <td className="p-3">
                    <div
                      className={`px-2 py-1 text-center text-xs rounded-full ${
                        entry.status
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {entry.status ? "Sudah Bayar" : "Belum Bayar"}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-5 flex justify-center space-x-4">
        <button
          onClick={handleUpdate}
          className="bg-blue-500 text-sm text-white px-4 py-2 rounded-md"
        >
          Perbaharui
        </button>
        <button
          onClick={() => {
            const message = `Hi, I would like to update my water consumption data: %0AName: ${user.name}%0AMonthly Consumption: ${user.monthlyConsumption} L%0ATotal Consumption: ${user.totalConsumption} L%0ALast Updated: ${user.lastUpdated}%0AEarly Estimated Cost: ${user.estimatedCost} IDR`
            const url = `https://wa.me/6282126666440?text=${message}`
            window.open(url, "_blank")
          }}
          className="bg-green-500 text-sm text-white px-4 py-2 rounded-md"
        >
          Pembayaran ke WhatsApp
        </button>
      </div>

      {/* Modal Component */}
      <WaterConsumptionModal
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        handleSave={handleSave}
        consumptionInput={consumptionInput}
        setConsumptionInput={setConsumptionInput}
        dateInput={dateInput}
        setDateInput={setDateInput}
      />
    </div>
  )
}
