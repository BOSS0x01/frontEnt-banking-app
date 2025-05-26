import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavBarComponent} from './layout/nav-bar/nav-bar.component';
import {GlobalContainerComponent} from './shared/components/global-container/global-container.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBarComponent,GlobalContainerComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontEnd-banking-app';
}
