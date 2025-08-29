
import { Device } from "../types/device";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export async function getDevices(page: number = 1, pageSize: number = 100): Promise<Device[]> {
  const res = await fetch(`${API_BASE}/devices?Page=${page}&PageSize=${pageSize}`);
  if (!res.ok) throw new Error('Erro ao buscar dispositivos');
  const data = await res.json();

  if (data && Array.isArray(data.data)) {
    return data.data;
  }
  return [];
}

export async function getDeviceById(id: string): Promise<Device> {
  const res = await fetch(`${API_BASE}/devices/${id}`);
  if (!res.ok) throw new Error('Dispositivo não encontrado');
  return res.json();
}

export async function createDevice(device: Omit<Device, 'id' | 'integrationId'>): Promise<Device> {
  const res = await fetch(`${API_BASE}/devices`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(device),
  });
  if (!res.ok) throw new Error('Erro ao criar dispositivo');
  return res.json();
}

export async function updateDevice(id: string, device: Partial<Omit<Device, 'id' | 'integrationId'>>): Promise<Device> {
  const res = await fetch(`${API_BASE}/devices/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(device),
  });
  if (!res.ok) throw new Error('Erro ao atualizar dispositivo');
  return res.json();
}

export async function deleteDevice(id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/devices/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Erro ao deletar dispositivo');
}