import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Products } from '../model/Productmodel';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseurl = environment.APIUrl;

  Apptitle=signal<string>(environment.displayname);

  constructor(private http: HttpClient) { }
  GetAll() {
    return this.http.get<Products[]>(this.baseurl);
  }

  GetproductbyId(id: number) {
    return this.http.get<Products>(this.baseurl + '/' + id);
  }

  Createproduct(_data: Products) {
    return this.http.post(this.baseurl, _data);
  }

  Updateproduct(_data: Products) {
    return this.http.put(this.baseurl + '/' + _data.id, _data);
  }

  Removeproduct(id: number) {
    return this.http.delete(this.baseurl + '/' + id);
  }
}
