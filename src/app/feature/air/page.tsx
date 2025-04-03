"use client"
import { useState } from "react"
import WaterConsumptionSummary from "@/components/air/SummaryCard"
import { WaterConsumptionUserData } from "@/types/users"

export default function Home() {
  // Sample user data for a single user
  const [user, setUser] = useState<WaterConsumptionUserData>({
    name: "Fandika Ikhsan",
    monthlyConsumption: 250,
    totalConsumption: 5000,
    lastUpdated: "2025-04-01 10:00",
    estimatedCost: 15000,
    history: [
      {
        consumption: 200,
        date: "2025-03-01 10:00",
      },
      {
        consumption: 180,
        date: "2025-02-15 09:00",
      },
      {
        consumption: 210,
        date: "2025-01-20 14:00",
      },
      {
        consumption: 190,
        date: "2024-12-25 13:30",
      },
      {
        consumption: 210,
        date: "2024-11-20 12:00",
      },
      {
        consumption: 220,
        date: "2024-10-15 08:30",
      },
    ],
  })

  // Modal visibility and form states
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [consumptionInput, setConsumptionInput] = useState("")
  const [dateInput, setDateInput] = useState(
    new Date().toISOString().slice(0, 16)
  )

  // Handle update button click
  const handleUpdate = () => {
    setConsumptionInput("")
    setDateInput(new Date().toISOString().slice(0, 16)) // default current date and time
    setIsModalOpen(true)
  }

  // Handle save data from modal
  const handleSave = () => {
    const updatedUser = {
      ...user,
      history: [
        ...user.history,
        {
          consumption: parseFloat(consumptionInput),
          date: dateInput,
        },
      ],
      monthlyConsumption: parseFloat(consumptionInput),
      lastUpdated: dateInput,
      totalConsumption: user.totalConsumption + parseFloat(consumptionInput),
    }
    setUser(updatedUser)
    setIsModalOpen(false)
  }

  // WhatsApp link for sending data
  const handleSendWhatsApp = () => {
    const message = `Hi, I would like to update my water consumption data: %0AName: ${user.name}%0AMonthly Consumption: ${user.monthlyConsumption} L%0ATotal Consumption: ${user.totalConsumption} L%0ALast Updated: ${user.lastUpdated}%0AEarly Estimated Cost: ${user.estimatedCost} IDR`
    const url = `https://wa.me/6282126666440?text=${message}` // Replace with the actual WhatsApp number
    window.open(url, "_blank")
  }

  // Function to convert date to month in Indonesian
  const getMonthInIndonesian = (date: string) => {
    const monthsInIndonesian = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ]
    const monthIndex = new Date(date).getMonth()
    return monthsInIndonesian[monthIndex]
  }

  return (
    <div
      style={{
        backgroundColor: "#121212",
        color: "#fff",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      {/* Summary Card */}
      <WaterConsumptionSummary user={user} />

      {/* History Table with Scroll */}
      <div
        style={{
          maxHeight: "400px", // Adjust max height for the scrollable area
          overflowY: "auto",
          marginTop: "10px",
          border: "1px solid #444",
          borderRadius: "8px",
          display: "block",
          fontSize: "14px",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ padding: "10px", borderBottom: "1px solid #444" }}>
                Waktu Diperbaharui
              </th>
              <th style={{ padding: "10px", borderBottom: "1px solid #444" }}>
                Konsumsi Air
              </th>
              <th style={{ padding: "10px", borderBottom: "1px solid #444" }}>
                Bulan
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Display only the last 4 history entries */}
            {user.history.slice(-4).map((entry, index) => (
              <tr key={index}>
                <td style={{ padding: "10px" }}>{entry.date}</td>
                <td style={{ padding: "10px" }}>{entry.consumption} L</td>
                <td style={{ padding: "10px" }}>
                  {getMonthInIndonesian(entry.date)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Action Buttons - These buttons are always displayed at the bottom */}
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            marginBottom: "10px",
            width: "100%",
            maxWidth: "200px",
            position: "absolute",
            bottom: "20px",
          }}
        >
          <button
            onClick={handleUpdate}
            style={{
              padding: "10px 20px",
              backgroundColor: "#007BFF",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              width: "100%",
              marginBottom: "10px",
              fontSize: "12px",
            }}
          >
            Perbaharui
          </button>
          <button
            onClick={handleSendWhatsApp}
            style={{
              padding: "10px 20px",
              backgroundColor: "#25D366",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              width: "100%",
              fontSize: "12px",
            }}
          >
            Pembayaran ke WhatsApp
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          onClick={() => setIsModalOpen(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "#333",
              padding: "20px",
              borderRadius: "8px",
              width: "300px",
              color: "white",
            }}
          >
            <h3>Update Konsumsi Air</h3>
            <label>Konsumsi (liter)</label>
            <input
              type="number"
              value={consumptionInput}
              onChange={(e) => setConsumptionInput(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                margin: "10px 0",
                borderRadius: "5px",
                border: "1px solid #555",
              }}
            />
            <label>Tanggal</label>
            <input
              type="datetime-local"
              value={dateInput}
              onChange={(e) => setDateInput(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                margin: "10px 0",
                borderRadius: "5px",
                border: "1px solid #555",
              }}
            />
            <div
              style={{
                display: "flex",
                flexFlow: "column",
                gap: "10px",
                justifyContent: "space-between",
                marginTop: "10px",
              }}
            >
              <button
                onClick={handleSave}
                style={{
                  backgroundColor: "#28a745",
                  color: "white",
                  padding: "5px 10px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  width: "100%",
                  fontSize: "14px",
                }}
              >
                Simpan
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{
                  backgroundColor: "#dc3545",
                  color: "white",
                  padding: "5px 10px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  width: "100%",
                  fontSize: "14px",
                }}
              >
                Batalkan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
