// alert.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface AlertMessage {
  id?: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number; // Auto-dismiss time in milliseconds (0 = no auto-dismiss)
  dismissible?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alertsSubject = new BehaviorSubject<AlertMessage[]>([]);
  public alerts$: Observable<AlertMessage[]> = this.alertsSubject.asObservable();

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  private addAlert(alert: AlertMessage): void {
    alert.id = alert.id || this.generateId();
    alert.dismissible = alert.dismissible !== false; // Default to true

    const currentAlerts = this.alertsSubject.value;
    this.alertsSubject.next([...currentAlerts, alert]);
  }

  // Public methods for different alert types
  success(title: string, message: string, duration: number = 5000): void {
    this.addAlert({
      type: 'success',
      title,
      message,
      duration
    });
  }

  error(title: string, message: string, duration: number = 0): void {
    this.addAlert({
      type: 'error',
      title,
      message,
      duration // Errors don't auto-dismiss by default
    });
  }

  warning(title: string, message: string, duration: number = 7000): void {
    this.addAlert({
      type: 'warning',
      title,
      message,
      duration
    });
  }

  info(title: string, message: string, duration: number = 5000): void {
    this.addAlert({
      type: 'info',
      title,
      message,
      duration
    });
  }

  // Custom alert with full control
  show(alert: AlertMessage): void {
    this.addAlert(alert);
  }

  // Remove specific alert
  dismiss(alertId: string): void {
    const currentAlerts = this.alertsSubject.value;
    const filteredAlerts = currentAlerts.filter(alert => alert.id !== alertId);
    this.alertsSubject.next(filteredAlerts);
  }

  // Clear all alerts
  clear(): void {
    this.alertsSubject.next([]);
  }

  // Get current alerts
  getAlerts(): AlertMessage[] {
    return this.alertsSubject.value;
  }
}
