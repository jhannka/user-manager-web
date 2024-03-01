import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ICity, IDepartament} from "../../core/interfaces/api-colombia.interfaces";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiColombiaService {

  url_api = 'https://api-colombia.com/api/v1/';

  constructor(
    private http: HttpClient
  ) {
  }

  getDepartament(): Observable<IDepartament[]> {
    return this.http.get<IDepartament[]>(`${this.url_api}/Department`);
  }

  getCitys(): Observable<ICity[]> {
    return this.http.get<ICity[]>(`${this.url_api}/city`);
  }
}
