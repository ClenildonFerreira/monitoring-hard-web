"use client";

import React, { useEffect, useState } from "react";
import { DeviceTable } from "../../components/device-table";
import { DeviceForm } from "../../components/device-form";
import { getDevices, createDevice, deleteDevice, updateDevice } from "../../services/devices";
import { Device } from "../../types/device";

export default function DevicesPage() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [creating, setCreating] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editLocation, setEditLocation] = useState("");
  const [updating, setUpdating] = useState(false);

  const fetchDevices = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getDevices();
      setDevices(data);
    } catch (e) {
      if (e instanceof Error) setError(e.message);
      else setError("Erro ao buscar dispositivos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !location.trim()) return;
    setCreating(true);
    setError(null);
    try {
      await createDevice({ name, location });
      setName("");
      setLocation("");
      fetchDevices();
    } catch (e) {
      if (e instanceof Error) setError(e.message);
      else setError("Erro ao criar dispositivo");
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Tem certeza que deseja deletar este dispositivo?")) return;
    setDeletingId(id);
    setError(null);
    try {
      await deleteDevice(id);
      fetchDevices();
    } catch (e) {
      if (e instanceof Error) setError(e.message);
      else setError("Erro ao deletar dispositivo");
    } finally {
      setDeletingId(null);
    }
  };

  const startEdit = (device: Device) => {
    setEditingId(device.id);
    setEditName(device.name);
    setEditLocation(device.location);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName("");
    setEditLocation("");
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId || !editName.trim() || !editLocation.trim()) return;
    setUpdating(true);
    setError(null);
    try {
      await updateDevice(editingId, { name: editName, location: editLocation });
      cancelEdit();
      fetchDevices();
    } catch (e) {
      if (e instanceof Error) setError(e.message);
      else setError("Erro ao atualizar dispositivo");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <main style={{ padding: 24 }}>
      <h1>Dispositivos</h1>
      <DeviceForm
        name={name}
        location={location}
        creating={creating}
        onNameChange={setName}
        onLocationChange={setLocation}
        onSubmit={handleSubmit}
      />
      {error && <div style={{ color: 'red', marginBottom: 16 }}>{error}</div>}
      {loading ? (
        <div>Carregando dispositivos...</div>
      ) : (
        <DeviceTable
          devices={devices}
          editingId={editingId}
          editName={editName}
          editLocation={editLocation}
          deletingId={deletingId}
          updating={updating}
          onEdit={startEdit}
          onEditName={setEditName}
          onEditLocation={setEditLocation}
          onCancelEdit={cancelEdit}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      )}
    </main>
  );
}