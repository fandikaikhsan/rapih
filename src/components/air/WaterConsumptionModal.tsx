interface WaterConsumptionModalProps {
  isModalOpen: boolean
  handleCancel: () => void
  handleSave: () => void
  consumptionInput: string
  setConsumptionInput: (value: string) => void
  dateInput: string
  setDateInput: (value: string) => void
}

const WaterConsumptionModal: React.FC<WaterConsumptionModalProps> = ({
  isModalOpen,
  handleCancel,
  handleSave,
  consumptionInput,
  setConsumptionInput,
  dateInput,
  setDateInput,
}) => {
  if (!isModalOpen) return null

  return (
    <div
      onClick={handleCancel}
      className="fixed top-0 left-0 right-0 bottom-0 bg-opacity-100 backdrop-blur-sm flex justify-center items-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#151515] m-5 p-6 rounded-md w-96"
      >
        <h3 className="text-base mb-6 text-center text-white">
          Update Konsumsi Air
        </h3>
        <div className="mb-4">
          <label className="text-sm text-white block mb-2">
            Penggunaan Air
          </label>
          <input
            type="number"
            value={consumptionInput}
            onChange={(e) => setConsumptionInput(e.target.value)}
            placeholder="Liter"
            className="w-full p-2 bg-gray-700 text-white rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="text-sm text-white block mb-2">Tanggal</label>
          <input
            type="datetime-local"
            value={dateInput}
            onChange={(e) => setDateInput(e.target.value)}
            className="w-full p-2 bg-gray-700 text-white rounded-md"
          />
        </div>
        <div className="flex justify-between mt-6">
          <button
            onClick={handleSave}
            className="bg-green-500 text-sm text-white px-4 py-2 rounded-md"
          >
            Perbaharui
          </button>
          <button
            onClick={handleCancel}
            className="bg-red-500 text-sm text-white px-4 py-2 rounded-md"
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  )
}

export default WaterConsumptionModal
