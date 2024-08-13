import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AppmenuComponent } from './common/appmenu/appmenu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,AppmenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
}
