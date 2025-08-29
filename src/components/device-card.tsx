import { Power, MapPin, Info, Edit, Trash2 } from "lucide-react";
import React from "react";
import { Device } from "../types/device";

interface DeviceCardProps {
    device: Device;
    onEdit: (device: Device) => void;
    onDelete: (id: string) => void;
    deleting: boolean;
}

export function DeviceCard({ device, onEdit, onDelete, deleting }: DeviceCardProps) {
    const status = device.integrationId ? "ativo" : "inativo";
    const statusColor = status === "ativo" ? "bg-green-100 text-green-600" : "bg-gray-200 text-gray-400";

    return (
        <div className="bg-white border border-gray-200 shadow rounded-lg p-5 flex flex-col gap-3 min-w-[260px] hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-2 mb-1">
                <span className={`flex items-center justify-center w-8 h-8 rounded-full ${statusColor} shadow-sm`}>
                    <Power className="w-5 h-5" />
                </span>
                <span className="font-semibold text-lg text-gray-800">{device.name}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
                <MapPin className="w-4 h-4" />
                {device.location}
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400">
                <Info className="w-4 h-4" />
                ID Integração: <span className="text-gray-600">{device.integrationId || '-'}</span>
            </div>
            <div className="flex gap-2 mt-2">
                <button
                    onClick={() => onEdit(device)}
                    className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold px-4 py-2 rounded-md shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                    <Edit className="w-4 h-4" /> Editar
                </button>
                <button
                    onClick={() => onDelete(device.id)}
                    disabled={deleting}
                    className="flex items-center gap-2 bg-red-400 hover:bg-red-700 text-white text-xs font-semibold px-4 py-2 rounded-md shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-60 cursor-pointer"
                >
                    <Trash2 className="w-4 h-4" /> {deleting ? "Removendo..." : "Excluir"}
                </button>
            </div>
        </div>
    );
}