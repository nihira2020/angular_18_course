import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './child.component.html',
  styleUrl: './child.component.css'
})
export class ChildComponent {

  @Input() firstName:any;
  @Input() lastName:any;

  @Input() nameObj:any;
  @Output() dataupdater=new EventEmitter<string>();

  fruits=['Apple','Orange'];

  Updatefruits(fruitname:string){
    this.fruits.push(fruitname);
    return 'data added';

  }

}
