import { Component, computed, effect, OnInit } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-counterdisplay',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './counterdisplay.component.html',
  styleUrl: './counterdisplay.component.css'
})
export class CounterdisplayComponent {

  displayvalue=0;
  totalplayers=computed(()=>this.service.players().length)
  _totalplayer$=toObservable(this.totalplayers);
  _signalcount=toSignal(this._totalplayer$);
  constructor(public service:MasterService){
    effect(()=>{
      this.displayvalue=this.service.countervalue();
    })
  }

  // ngOnInit(): void {
  //   this.displayvalue=this.service.countervalue();
  // }

}
