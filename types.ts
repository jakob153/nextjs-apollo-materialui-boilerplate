export interface AlertState {
  severity: 'info' | 'success' | 'error' | 'warning';
  message: string;
  show: boolean;
}
