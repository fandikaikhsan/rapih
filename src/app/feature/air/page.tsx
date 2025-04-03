"use client"
import { useState } from "react"

type UserData = {
  name: string
  monthlyConsumption: number
  totalConsumption: number
  lastUpdated: string
  estimatedCost: number
}

export default function Home() {
  // Sample user data (you can later fetch this from an API)
  const [data, setData] = useState<UserData[]>([
    {
      name: "John Doe",
      monthlyConsumption: 250,
      totalConsumption: 5000,
      lastUpdated: "2025-04-01 10:00",
      estimatedCost: 15,
    },
    {
      name: "Jane Smith",
      monthlyConsumption: 180,
      totalConsumption: 3600,
      lastUpdated: "2025-04-01 09:30",
      estimatedCost: 12,
    },
  ])

  // Modal visibility and form states
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null)
  const [consumptionInput, setConsumptionInput] = useState("")
  const [dateInput, setDateInput] = useState(
    new Date().toISOString().slice(0, 16)
  )

  // Handle update button click
  const handleUpdate = (user: UserData) => {
    setSelectedUser(user)
    setConsumptionInput("")
    setDateInput(new Date().toISOString().slice(0, 16)) // default current date and time
    setIsModalOpen(true)
  }

  // Handle save data from modal
  const handleSave = () => {
    if (selectedUser) {
      const updatedData = data.map((user) =>
        user.name === selectedUser.name
          ? {
              ...user,
              monthlyConsumption: parseFloat(consumptionInput),
              lastUpdated: dateInput,
            }
          : user
      )
      setData(updatedData)
    }
    setIsModalOpen(false)
  }

  // WhatsApp link for sending data
  const handleSendWhatsApp = (user: UserData) => {
    const message = `Hi, I would like to update my water consumption data: %0AName: ${user.name}%0AMonthly Consumption: ${user.monthlyConsumption} L%0ATotal Consumption: ${user.totalConsumption} L%0ALast Updated: ${user.lastUpdated}%0AEarly Estimated Cost: ${user.estimatedCost} IDR`
    const url = `https://wa.me/1234567890?text=${message}` // Replace with the actual WhatsApp number
    window.open(url, "_blank")
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
      <h1>Water Consumption Tracker</h1>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ padding: "10px", borderBottom: "1px solid #444" }}>
              Nama Warga
            </th>
            <th style={{ padding: "10px", borderBottom: "1px solid #444" }}>
              Konsumsi Air Bulan Ini (L)
            </th>
            <th style={{ padding: "10px", borderBottom: "1px solid #444" }}>
              Konsumsi Air Total (L)
            </th>
            <th style={{ padding: "10px", borderBottom: "1px solid #444" }}>
              Terakhir Diperbaharui
            </th>
            <th style={{ padding: "10px", borderBottom: "1px solid #444" }}>
              Estimasi Biaya Bulan Ini (IDR)
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((user, index) => (
            <tr key={index}>
              <td style={{ padding: "10px" }}>{user.name}</td>
              <td style={{ padding: "10px" }}>{user.monthlyConsumption}</td>
              <td style={{ padding: "10px" }}>{user.totalConsumption}</td>
              <td style={{ padding: "10px" }}>{user.lastUpdated}</td>
              <td style={{ padding: "10px" }}>{user.estimatedCost}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Action Buttons - These buttons are always displayed at the bottom */}
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <div style={{ marginBottom: "10px", width: "100%", maxWidth: "200px" }}>
          <button
            onClick={() => handleUpdate(data[0])} // Use the first user for simplicity or add a selection mechanism
            style={{
              padding: "10px 20px",
              backgroundColor: "#007BFF",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              width: "100%",
              marginBottom: "10px",
            }}
          >
            Perbaharui
          </button>
          <button
            onClick={() => handleSendWhatsApp(data[0])} // Use the first user for simplicity
            style={{
              padding: "10px 20px",
              backgroundColor: "#25D366",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              width: "100%",
            }}
          >
            Kirim ke WhatsApp
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
                  marginTop: "10px",
                }}
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
