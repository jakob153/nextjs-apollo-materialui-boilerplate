export interface AlertState {
  variant: 'info' | 'success' | 'error' | 'warning';
  messages: Array<string>;
  show: boolean;
}
