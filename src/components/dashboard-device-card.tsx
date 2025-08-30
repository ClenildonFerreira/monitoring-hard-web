import { WiThermometer, WiHumidity } from "react-icons/wi";
import { Power, MapPin, Info } from "lucide-react";
import { CheckCircleIcon, XCircleIcon, ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { Device, Event } from "../types/device";
import { Sparkline } from "./sparkline";
import React from "react";


interface DashboardDeviceCardProps {
    device: Device;
    lastEvent?: Event;
}

export function DashboardDeviceCard({ device, lastEvent }: DashboardDeviceCardProps) {
    const tempHistory = (device.recentEvents || []).slice(0, 12).reverse().map(e => ({ value: e.temperature }));
    const humHistory = (device.recentEvents || []).slice(0, 12).reverse().map(e => ({ value: e.humidity }));
    const isActive = !!device.integrationId;
    const isAlarm = lastEvent?.isAlarm;
    let statusColor = "";
    let statusLabel = "";
    let StatusIcon = CheckCircleIcon;

    if (isAlarm) {
        statusColor = "bg-yellow-100 text-yellow-700 border-yellow-300";
        statusLabel = "Alerta";
        StatusIcon = ExclamationTriangleIcon;
    } else if (isActive) {
        statusColor = "bg-green-100 text-green-700 border-green-300";
        statusLabel = "Ativo";
        StatusIcon = CheckCircleIcon;
    } else {
        statusColor = "bg-red-100 text-red-700 border-red-300";
        statusLabel = "Inativo";
        StatusIcon = XCircleIcon;
    }

    const tempColor = isAlarm ? "bg-yellow-100 text-yellow-700" : lastEvent && lastEvent.temperature > 35 ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-700";
    const humColor = isAlarm ? "bg-yellow-100 text-yellow-700" : lastEvent && lastEvent.humidity > 70 ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-700";

    return (
        <div className="bg-white rounded-2xl shadow p-4 flex flex-col min-h-[200px] border border-gray-100 relative h-full w-full">
            <span className={`absolute top-3 right-3 flex items-center gap-1 text-xs px-2 py-1 rounded-full font-bold border z-10 ${statusColor} shadow-sm`} style={{ right: '1rem', top: '1rem' }}>
                <StatusIcon className="w-4 h-4" />
                {statusLabel}
            </span>
            <div className="flex items-center gap-2 mb-1">
                <span className={`flex items-center justify-center w-7 h-7 rounded-full ${isActive ? "bg-green-100 text-green-600" : "bg-gray-200 text-gray-400"} shadow-sm`}>
                    <Power className="w-4 h-4" />
                </span>
                <h2 className="text-lg font-extrabold text-gray-900 truncate">{device.name}</h2>
            </div>
            <div className="flex items-center gap-2 mb-1 text-xs text-gray-400">
                <MapPin className="w-4 h-4" />
                <span className="truncate">{device.location}</span>
            </div>
            <div className="flex flex-row items-end justify-center gap-8 my-1">
                <div className="flex flex-col items-center">
                    <span className={`flex items-center justify-center w-9 h-9 rounded-full mb-1 ${tempColor}`}>
                        <WiThermometer className="text-2xl" />
                    </span>
                    <span className="text-2xl font-black text-gray-900 bg-white/80 px-2 rounded shadow-sm mt-1">{lastEvent ? lastEvent.temperature.toFixed(1) : "--"}°C</span>
                    <span className="text-xs text-gray-500 font-medium mt-1">Temperatura</span>
                    <div className="w-full flex justify-center"><Sparkline data={tempHistory} color={isAlarm ? "#eab308" : lastEvent && lastEvent.temperature > 35 ? "#ef4444" : "#2563eb"} /></div>
                </div>
                <div className="flex flex-col items-center">
                    <span className={`flex items-center justify-center w-9 h-9 rounded-full mb-1 ${humColor}`}>
                        <WiHumidity className="text-2xl" />
                    </span>
                    <span className="text-2xl font-black text-gray-900 bg-white/80 px-2 rounded shadow-sm mt-1">{lastEvent ? lastEvent.humidity.toFixed(1) : "--"}%</span>
                    <span className="text-xs text-gray-500 font-medium mt-1">Umidade</span>
                    <div className="w-full flex justify-center"><Sparkline data={humHistory} color={isAlarm ? "#eab308" : lastEvent && lastEvent.humidity > 70 ? "#ef4444" : "#2563eb"} /></div>
                </div>
            </div>
            <div className="flex flex-col gap-1 mt-2">
                <span className="text-xs text-gray-400 font-mono flex items-center gap-1">
                    <Info className="w-4 h-4" />
                    ID Integração: {device.integrationId || '-'}
                </span>
                <span className="text-xs text-gray-400">Última leitura: {lastEvent ? new Date(lastEvent.timestamp).toLocaleString() : "-"}</span>
            </div>
        </div>
    );
}