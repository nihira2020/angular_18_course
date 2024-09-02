import { Component } from '@angular/core';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

@Component({
  selector: 'app-mask',
  standalone: true,
  imports: [NgxMaskPipe,NgxMaskDirective],
  templateUrl: './mask.component.html',
  styleUrl: './mask.component.css'
})
export class MaskComponent {

}
