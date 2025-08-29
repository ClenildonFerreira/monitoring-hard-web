import { Device } from "./device";

export interface DeviceTableProps {
  devices: Device[];
  editingId: string | null;
  editName: string;
  editLocation: string;
  deletingId: string | null;
  updating: boolean;
  onEdit: (device: Device) => void;
  onEditName: (value: string) => void;
  onEditLocation: (value: string) => void;
  onCancelEdit: () => void;
  onUpdate: (e: React.FormEvent) => void;
  onDelete: (id: string) => void;
}
