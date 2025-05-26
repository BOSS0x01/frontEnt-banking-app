// alert-container.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import {AlertComponent} from '../alert.component';
import {AlertMessage, AlertService} from '../alert.service';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-alert-container',
  standalone: true,
  imports: [
    AlertComponent,
    NgForOf
  ],
  template: `
    <!-- Alert Container - Fixed position in top-right -->
    <div class="fixed top-4 right-4 z-[60] space-y-3 pointer-events-none">
      <div
        *ngFor="let alert of alerts; trackBy: trackByAlertId"
        class="pointer-events-auto">
        <app-floating-alert
          [alert]="alert"
          (dismissed)="onAlertDismissed($event)">
        </app-floating-alert>
      </div>
    </div>
  `
})
export class AlertContainerComponent implements OnInit, OnDestroy {
  alerts: AlertMessage[] = [];
  private subscription?: Subscription;

  constructor(private alertService: AlertService) {}

  ngOnInit() {
    this.subscription = this.alertService.alerts$.subscribe(
      alerts => this.alerts = alerts
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onAlertDismissed(alertId: string) {
    this.alertService.dismiss(alertId);
  }

  trackByAlertId(index: number, alert: AlertMessage): string {
    return alert.id || index.toString();
  }
}
