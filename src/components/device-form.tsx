import React from "react";
import { DeviceFormProps } from "../types/device-form-props";

export function DeviceForm({
  name,
  location,
  creating,
  onNameChange,
  onLocationChange,
  onSubmit,
}: DeviceFormProps) {
  return (
    <form onSubmit={onSubmit} style={{ marginBottom: 24, display: 'flex', gap: 8, alignItems: 'flex-end' }}>
      <div>
        <label>Nome<br />
          <input value={name} onChange={e => onNameChange(e.target.value)} required style={{ padding: 4 }} />
        </label>
      </div>
      <div>
        <label>Localização<br />
          <input value={location} onChange={e => onLocationChange(e.target.value)} required style={{ padding: 4 }} />
        </label>
      </div>
      <button type="submit" disabled={creating || !name.trim() || !location.trim()} style={{ padding: '6px 16px' }}>
        {creating ? "Adicionando..." : "Adicionar"}
      </button>
    </form>
  );
}