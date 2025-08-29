import React from "react";
import { DeviceTableProps } from "../types/device-table-props";

export function DeviceTable({
  devices,
  editingId,
  editName,
  editLocation,
  deletingId,
  updating,
  onEdit,
  onEditName,
  onEditLocation,
  onCancelEdit,
  onUpdate,
  onDelete,
}: DeviceTableProps) {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: 8 }}>Nome</th>
          <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: 8 }}>Localização</th>
          <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: 8 }}>ID Integração</th>
          <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: 8 }}></th>
        </tr>
      </thead>
      <tbody>
        {devices.length === 0 ? (
          <tr>
            <td colSpan={4} style={{ padding: 8, textAlign: 'center' }}>Nenhum dispositivo cadastrado.</td>
          </tr>
        ) : (
          devices.map((device) => (
            <tr key={device.id}>
              {editingId === device.id ? (
                <>
                  <td style={{ padding: 8 }}>
                    <input value={editName} onChange={e => onEditName(e.target.value)} style={{ padding: 4 }} />
                  </td>
                  <td style={{ padding: 8 }}>
                    <input value={editLocation} onChange={e => onEditLocation(e.target.value)} style={{ padding: 4 }} />
                  </td>
                  <td style={{ padding: 8 }}>{device.integrationId || '-'}</td>
                  <td style={{ padding: 8 }}>
                    <form onSubmit={onUpdate} style={{ display: 'inline' }}>
                      <button type="submit" disabled={updating || !editName.trim() || !editLocation.trim()} style={{ marginRight: 8 }}>
                        {updating ? 'Salvando...' : 'Salvar'}
                      </button>
                      <button type="button" onClick={onCancelEdit} disabled={updating}>
                        Cancelar
                      </button>
                    </form>
                  </td>
                </>
              ) : (
                <>
                  <td style={{ padding: 8 }}>{device.name}</td>
                  <td style={{ padding: 8 }}>{device.location}</td>
                  <td style={{ padding: 8 }}>{device.integrationId || '-'}</td>
                  <td style={{ padding: 8 }}>
                    <button
                      onClick={() => onEdit(device)}
                      style={{ color: 'white', background: '#1976d2', border: 'none', padding: '4px 12px', borderRadius: 4, cursor: 'pointer', marginRight: 8 }}
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => onDelete(device.id)}
                      disabled={deletingId === device.id}
                      style={{ color: 'white', background: '#d32f2f', border: 'none', padding: '4px 12px', borderRadius: 4, cursor: 'pointer' }}
                    >
                      {deletingId === device.id ? 'Removendo...' : 'Remover'}
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}