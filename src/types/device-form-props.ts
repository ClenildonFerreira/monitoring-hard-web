export interface DeviceFormProps {
  name: string;
  location: string;
  creating: boolean;
  onNameChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}