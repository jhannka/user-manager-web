import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CONSTANT} from "../../app.constants";
import {IResponse} from "../../core/interfaces/response.interface";
import {Observable} from "rxjs";
import {ICategory} from "../../core/interfaces/category.interfaces";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private url = CONSTANT.CATEGORY.URL.BASE;

  constructor(private http: HttpClient) {
  }

  get(): Observable<IResponse<ICategory[]>> {
    return this.http.get<IResponse<ICategory[]>>(this.url);
  }

  show(id: number): Observable<IResponse<ICategory>> {
    const url = `${this.url}/${id}`;
    return this.http.get<IResponse<ICategory>>(url);
  }

  create(caregory: ICategory): Observable<IResponse<ICategory>> {
    const {id, ...dataWitouhId} = caregory;
    return this.http.post<IResponse<ICategory>>(this.url, dataWitouhId);
  }

  update(caregory: ICategory): Observable<IResponse<ICategory>> {
    const {id, ...dataWitouhId} = caregory;
    const url = `${this.url}/${id}`;
    return this.http.put<IResponse<ICategory>>(url, dataWitouhId);
  }

  destroy(id: number) {
    const url = `${this.url}/${id}`;
    return this.http.delete(url);
  }

}
