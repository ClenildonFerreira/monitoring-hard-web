"use client";


import React, { useEffect, useState } from "react";
import { getDevices, createDevice, deleteDevice, updateDevice } from "../../services/devices";
import { Device } from "../../types/device";
import { DeviceCard } from "../../components/device-card";
import { Plus, Search, Trash2 } from "lucide-react";


export default function DevicesPage() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [creating, setCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const fetchDevices = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getDevices();
      setDevices(data);
    } catch {
      setError("Não foi possível carregar os dispositivos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    setError(null);
    try {
      await deleteDevice(id);
      fetchDevices();
    } catch {
      setError("Erro ao deletar dispositivo");
    } finally {
      setDeletingId(null);
      setConfirmDeleteId(null);
    }
  };

  const openCreateModal = () => {
    setEditingId(null);
    setName("");
    setLocation("");
    setShowForm(true);
  };

  const openEditModal = (device: Device) => {
    setEditingId(device.id);
    setName(device.name);
    setLocation(device.location);
    setShowForm(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !location.trim()) return;
    setCreating(true);
    setError(null);
    try {
      if (editingId) {
        await updateDevice(editingId, { name, location });
      } else {
        await createDevice({ name, location });
      }
      setName("");
      setLocation("");
      setShowForm(false);
      setEditingId(null);
      fetchDevices();
    } catch {
      setError(editingId ? "Erro ao editar dispositivo" : "Erro ao criar dispositivo");
    } finally {
      setCreating(false);
    }
  };

  const filteredDevices = devices.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.location.toLowerCase().includes(search.toLowerCase()) ||
    (d.integrationId || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="py-8 bg-gray-50">
      <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Dispositivos</h1>
      <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
        <div className="flex items-center w-full sm:w-auto bg-white rounded-xl shadow px-4 py-2 gap-2 flex-1 border border-gray-200 focus-within:ring-2 focus-within:ring-blue-200 transition">
          <Search className="text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar dispositivo por nome, local ou ID"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="outline-none bg-transparent flex-1 text-gray-700 text-sm border-none focus:ring-0"
          />
        </div>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold px-4 py-2 rounded-lg shadow transition-colors cursor-pointer"
        >
          <Plus className="w-5 h-5" />
          Novo Dispositivo
        </button>
      </div>
      {showForm && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          aria-modal="true"
          onClick={() => { setShowForm(false); setEditingId(null); }}
        >
          <div
            className="bg-gray-50 w-full max-w-md p-8 rounded-2xl shadow-2xl border border-blue-100 flex flex-col gap-4 animate-fadeIn"
            onClick={e => e.stopPropagation()}
          >
            <h2 className="text-2xl font-extrabold text-center text-gray-900 mb-2 tracking-wide">
              {editingId ? "Editar Dispositivo" : "Novo Dispositivo"}
            </h2>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Nome"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 font-semibold placeholder:text-gray-400 transition-all bg-white"
                required
              />
              <input
                type="text"
                placeholder="Localização"
                value={location}
                onChange={e => setLocation(e.target.value)}
                className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 font-semibold placeholder:text-gray-400 transition-all bg-white"
                required
              />
              <div className="flex justify-center gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => { setShowForm(false); setEditingId(null); }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-red-500 hover:text-blue-900 transition-all shadow font-semibold focus:z-10 focus:ring-2 focus:ring-red-400 cursor-pointer"
                  style={{ boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)' }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={creating}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-700 text-white hover:bg-blue-800 transition-all shadow font-semibold disabled:opacity-60 focus:z-10 focus:ring-2 focus:ring-blue-200 border-2 border-transparent hover:border-blue-950 cursor-pointer"
                  style={{ boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)' }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                  {creating ? "Salvando..." : "Salvar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {confirmDeleteId && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          aria-modal="true"
          onClick={() => setConfirmDeleteId(null)}
        >
          <div
            className="bg-gray-50 w-full max-w-md p-8 rounded-2xl shadow-2xl border border-blue-100 flex flex-col gap-4 animate-fadeIn"
            onClick={e => e.stopPropagation()}
          >
            <h2 className="text-2xl font-extrabold text-center text-gray-900 mb-2 tracking-wide">
              Confirmar Exclusão
            </h2>
            <p className="text-center text-gray-600 mb-6">Tem certeza que deseja deletar este dispositivo?</p>
            <div className="flex justify-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => setConfirmDeleteId(null)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-red-500 hover:text-blue-900 transition-all shadow font-semibold focus:z-10 focus:ring-2 focus:ring-red-400 cursor-pointer"
                style={{ boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)' }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => handleDelete(confirmDeleteId)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-400 text-white border-2 border-transparent transition-all shadow font-semibold focus:z-10 focus:ring-2 focus:ring-red-400 hover:bg-red-700 hover:text-black active:bg-red-800 cursor-pointer"
                style={{ boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)' }}
                disabled={deletingId === confirmDeleteId}
              >
                <Trash2 className="w-4 h-4" />
                {deletingId === confirmDeleteId ? "Removendo..." : "Excluir"}
              </button>
            </div>
          </div>
        </div>
      )}
      {error && (
        <div className="bg-red-100 text-red-700 rounded-lg px-4 py-2 mb-4 flex items-center gap-2">
          <span className="font-bold">❌</span>
          <span>{error}</span>
          <button onClick={fetchDevices} className="ml-2 underline text-sm">Tentar novamente</button>
        </div>
      )}
      {loading ? (
        <div className="text-gray-500 text-center py-8">Carregando dispositivos...</div>
      ) : filteredDevices.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-6 text-center text-gray-500 flex flex-col items-center gap-2">
          <span className="text-3xl">📭</span>
          <span>Nenhum dispositivo encontrado.</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredDevices.map(device => (
            <DeviceCard
              key={device.id}
              device={device}
              onEdit={openEditModal}
              onDelete={(id) => setConfirmDeleteId(id)}
              deleting={deletingId === device.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}