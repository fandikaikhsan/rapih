import { FiUser, FiDroplet, FiDollarSign } from "react-icons/fi"
import { WaterConsumptionUserData } from "@/types/users"

export default function WaterConsumptionSummary({
  user,
}: {
  user: WaterConsumptionUserData
}) {
  return (
    <div className="p-4 border border-gray-500 rounded-xl text-white">
      {/* Summary Section */}
      <div className="mb-2">
        <h3 className="text-base text-gray-30 mx-auto">
          Ringkasan Konsumsi Air
        </h3>

        <div className="mt-4 space-y-1">
          <div className="flex items-center space-x-2">
            <FiUser className="text-blue-400 text-lg" />
            <span className="text-sm font-semibold">{user.name}</span>
          </div>

          <div className="flex items-center space-x-2">
            <FiDroplet className="text-blue-400 text-lg" />
            <span className="text-sm text-gray-400">Penggunaan Bulan Ini:</span>
            <span className="text-sm font-medium">
              {user.monthlyConsumption} L
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <FiDollarSign className="text-green-400 text-lg" />
            <span className="text-sm text-gray-400">Estimasi Biaya:</span>
            <span className="text-sm font-medium">
              Rp {user.estimatedCost.toLocaleString("id-ID")}
            </span>
          </div>
        </div>
      </div>

      {/* (History Table Below, not modified in this update) */}
    </div>
  )
}
