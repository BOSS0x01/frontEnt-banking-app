// floating-alert.component.ts
import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import {NgIf, NgSwitch, NgSwitchCase} from '@angular/common';
import {NgControl} from '@angular/forms';

export interface AlertMessage {
  id?: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number; // Auto-dismiss time in milliseconds (0 = no auto-dismiss)
  dismissible?: boolean;
}

@Component({
  selector: 'app-floating-alert',
  standalone: true,
  imports: [
    NgIf, NgSwitch, NgSwitchCase
  ],
  template: `
    <div
      *ngIf="visible"
      class="fixed top-4 right-4 z-[60] w-96 max-w-sm animate-in slide-in-from-right-full duration-300 ease-out"
      [class]="alertClasses">

      <!-- Alert Container -->
      <div class="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg border-l-4 overflow-hidden"
           [class]="borderColorClass">

        <!-- Content -->
        <div class="p-4">
          <!-- Header with Icon and Title -->
          <div class="flex items-start">
            <!-- Icon -->
            <div class="flex-shrink-0">
              <ng-container [ngSwitch]="alert.type">
                <!-- Success Icon -->
                <svg *ngSwitchCase="'success'" class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"/>
                </svg>

                <!-- Error Icon -->
                <svg *ngSwitchCase="'error'" class="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clip-rule="evenodd"/>
                </svg>

                <!-- Warning Icon -->
                <svg *ngSwitchCase="'warning'" class="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clip-rule="evenodd"/>
                </svg>

                <!-- Info Icon -->
                <svg *ngSwitchCase="'info'" class="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clip-rule="evenodd"/>
                </svg>
              </ng-container>
            </div>

            <!-- Title and Message -->
            <div class="ml-3 flex-1">
              <h3 class="text-sm font-semibold text-gray-900 dark:text-white">
                {{ alert.title }}
              </h3>
              <div class="mt-1 text-sm text-gray-600 dark:text-gray-300">
                {{ alert.message }}
              </div>
            </div>

            <!-- Close Button -->
            <div class="ml-4 flex-shrink-0" *ngIf="alert.dismissible !== false">
              <button
                (click)="dismiss()"
                class="inline-flex text-gray-400 hover:text-gray-600 dark:hover:text-gray-200
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white
                       focus:ring-gray-500 rounded-md p-1 transition-colors duration-200">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Progress Bar for Auto-dismiss -->
        <div *ngIf="showProgressBar"
             class="h-1 bg-gray-200 dark:bg-gray-700">
          <div
            class="h-full transition-all ease-linear"
            [class]="progressBarColorClass"
            [style.width.%]="progressPercentage">
          </div>
        </div>
      </div>
    </div>
  `
})
export class AlertComponent implements OnInit, OnDestroy {
  @Input() alert!: AlertMessage;
  @Output() dismissed = new EventEmitter<string>();

  visible = false;
  progressPercentage = 100;
  private dismissTimer?: any;
  private progressTimer?: any;

  ngOnInit() {
    // Show alert with animation
    setTimeout(() => {
      this.visible = true;
    }, 10);

    // Set up auto-dismiss if duration is specified
    if (this.alert.duration && this.alert.duration > 0) {
      this.startAutoDismiss();
    }
  }

  ngOnDestroy() {
    this.clearTimers();
  }

  dismiss() {
    this.visible = false;
    // Wait for animation to complete before emitting
    setTimeout(() => {
      this.dismissed.emit(this.alert.id);
    }, 300);
  }

  private startAutoDismiss() {
    const duration = this.alert.duration!;
    const interval = 50; // Update progress every 50ms
    const steps = duration / interval;
    let currentStep = 0;

    this.progressTimer = setInterval(() => {
      currentStep++;
      this.progressPercentage = 100 - (currentStep / steps * 100);

      if (currentStep >= steps) {
        clearInterval(this.progressTimer);
      }
    }, interval);

    this.dismissTimer = setTimeout(() => {
      this.dismiss();
    }, duration);
  }

  private clearTimers() {
    if (this.dismissTimer) {
      clearTimeout(this.dismissTimer);
    }
    if (this.progressTimer) {
      clearInterval(this.progressTimer);
    }
  }

  get showProgressBar(): boolean {
    return !!(this.alert.duration && this.alert.duration > 0);
  }

  get alertClasses(): string {
    return this.visible ? 'animate-in slide-in-from-right-full duration-300 ease-out' :
      'animate-out slide-out-to-right-full duration-200 ease-in';
  }

  get borderColorClass(): string {
    const colors = {
      success: 'border-l-green-500',
      error: 'border-l-red-500',
      warning: 'border-l-yellow-500',
      info: 'border-l-blue-500'
    };
    return colors[this.alert.type];
  }

  get progressBarColorClass(): string {
    const colors = {
      success: 'bg-green-500',
      error: 'bg-red-500',
      warning: 'bg-yellow-500',
      info: 'bg-blue-500'
    };
    return colors[this.alert.type];
  }
}
