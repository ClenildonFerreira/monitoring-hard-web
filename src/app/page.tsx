"use client";


import { useEffect, useState } from "react";
import { getDevices, getDeviceById } from "../services/devices";
import { Device, Event } from "../types/device";
import { DashboardDeviceCard } from "../components/dashboard-device-card";



export default function Home() {
  const [devices, setDevices] = useState<(Device & { recentEvents?: Event[] })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [initialLoad, setInitialLoad] = useState(true);

  const fetchDevicesWithEvents = async (showLoading = false) => {
    if (showLoading) setLoading(true);
    setError(null);
    try {
      const devicesList = await getDevices();
      const details = await Promise.all(
        devicesList.map(async (d) => {
          try {
            const detail = await getDeviceById(d.id);
            return { ...d, recentEvents: detail.recentEvents || [] };
          } catch {
            return d;
          }
        })
      );
      setDevices(details);
    } catch {
      setError("Não foi possível carregar os dispositivos e eventos.");
    } finally {
      setLoading(false);
      setInitialLoad(false);
    }
  };

  useEffect(() => {
    fetchDevicesWithEvents(true);
    const interval = setInterval(() => fetchDevicesWithEvents(false), 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="py-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-extrabold text-blue-900 mb-8 text-center flex items-center justify-center gap-2">
        <span className="text-2xl">📡</span> Dashboard de Eventos
      </h1>
      <div className="px-0 m-0">
        {error && (
          <div className="bg-red-100 text-red-700 rounded-lg px-4 py-2 mb-4 flex items-center gap-2">
            <span className="font-bold">❌</span>
            <span>{error}</span>
            <button onClick={() => fetchDevicesWithEvents(true)} className="ml-2 underline text-sm">Tentar novamente</button>
          </div>
        )}
        {loading && initialLoad ? (
          <div className="text-gray-500 text-center py-8">Carregando dispositivos...</div>
        ) : devices.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-6 text-center text-gray-500 flex flex-col items-center gap-2">
            <span className="text-3xl">📭</span>
            <span>Nenhum dispositivo encontrado.</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-screen-xl mx-auto items-start">
            {devices.filter(device => device.name || device.location).map((device) => {
              const lastEvent = device.recentEvents && device.recentEvents[0];
              return (
                <div key={device.id} className="h-full">
                  <DashboardDeviceCard device={device} lastEvent={lastEvent} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}