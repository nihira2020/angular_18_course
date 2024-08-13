import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MasterService } from '../../service/master.service';

@Component({
  selector: 'app-counterbtn',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './counterbtn.component.html',
  styleUrl: './counterbtn.component.css'
})
export class CounterbtnComponent {

  constructor(private service:MasterService){

  }

  increment(){
    this.service.countervalue.update(previous=>previous+1);
  }
  decrement(){
    this.service.countervalue.update(previous=>previous-1);
  }
  reset(){
    this.service.countervalue.set(0);
  }

  addUser(name:string){
    let id=this.service.players().length+1;
    this.service.players.update(prev=>[...prev,{'id':id,'name':name}])
  }

}
