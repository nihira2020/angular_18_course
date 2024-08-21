import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [RouterOutlet,MatButtonModule,RouterLink,FormsModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent {
  userinput='';
  isloading=false;
  count=1;

  load(){
    this.isloading=true;
    this.count++;
  }

  cannavigate(){
    console.log(this.userinput)
    if(this.userinput!==''){
      if(confirm('If you navigating you data going to lost. do you want continue?')){
        return true;
      }else{
        return false
      }
    }else{
      return true;
    }
  }

}
