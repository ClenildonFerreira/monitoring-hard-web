"use client";

import React, { useEffect, useState } from "react";
import { getDevices, createDevice } from "../../services/devices";
import { Device } from "../../types/device";

export default function DevicesPage() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [creating, setCreating] = useState(false);

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

  return (
    <main style={{ padding: 24 }}>
      <h1>Dispositivos</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: 24, display: 'flex', gap: 8, alignItems: 'flex-end' }}>
        <div>
          <label>Nome<br />
            <input value={name} onChange={e => setName(e.target.value)} required style={{ padding: 4 }} />
          </label>
        </div>
        <div>
          <label>Localização<br />
            <input value={location} onChange={e => setLocation(e.target.value)} required style={{ padding: 4 }} />
          </label>
        </div>
        <button type="submit" disabled={creating || !name.trim() || !location.trim()} style={{ padding: '6px 16px' }}>
          {creating ? "Adicionando..." : "Adicionar"}
        </button>
      </form>
      {error && <div style={{ color: 'red', marginBottom: 16 }}>{error}</div>}
      {loading ? (
        <div>Carregando dispositivos...</div>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: 8 }}>Nome</th>
              <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: 8 }}>Localização</th>
              <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: 8 }}>ID Integração</th>
            </tr>
          </thead>
          <tbody>
            {devices.length === 0 ? (
              <tr>
                <td colSpan={3} style={{ padding: 8, textAlign: 'center' }}>Nenhum dispositivo cadastrado.</td>
              </tr>
            ) : (
              devices.map((device) => (
                <tr key={device.id}>
                  <td style={{ padding: 8 }}>{device.name}</td>
                  <td style={{ padding: 8 }}>{device.location}</td>
                  <td style={{ padding: 8 }}>{device.integrationId || '-'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </main>
  );
}