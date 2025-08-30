import React from "react";
import { DeviceEventsProps } from "../types/device-events-props";

const DeviceEvents: React.FC<DeviceEventsProps> = ({ events }) => {
    return (
        <div className="w-full max-w-2xl mx-auto">
            <h2 className="text-xl font-semibold mb-4">Eventos Recentes</h2>
            <ul className="space-y-2">
                {events.map((event) => (
                    <li
                        key={event.id}
                        className={`p-4 rounded border flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${event.isAlarm
                            ? "bg-red-100 border-red-400 text-red-800 animate-pulse"
                            : "bg-white border-gray-200"
                            }`}
                    >
                        <div>
                            <span className="font-medium">{new Date(event.timestamp).toLocaleString()}</span>
                            <span className="ml-2">Temperatura: {event.temperature.toFixed(1)}°C</span>
                            <span className="ml-2">Umidade: {event.humidity.toFixed(1)}%</span>
                        </div>
                        {event.isAlarm && (
                            <span className="font-bold uppercase text-xs tracking-wider">Alarme</span>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DeviceEvents;