import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavBarComponent} from './layout/nav-bar/nav-bar.component';
import {GlobalContainerComponent} from './shared/components/global-container/global-container.component';
import {AlertContainerComponent} from './shared/components/alert/alert-container/alert-container.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBarComponent, GlobalContainerComponent, AlertContainerComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontEnd-banking-app';
}
