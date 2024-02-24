import {Injectable} from '@angular/core';
import {IInfoUser, ILoginData, IToken, IUser} from "../../core/interfaces/auth.interfaces";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {CONSTANT} from "../../app.constants";
import {IResponse} from "../../core/interfaces/response.interface";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {
  }

  login(data: ILoginData): Observable<IToken> {

    const user: IUser = {
      email: data.email,
      password: data.password,
      client_id: environment.client_id,
      client_secret: environment.client_secret,
    };

    const body = JSON.stringify(user);
    const url = CONSTANT.AUTH.URL.LOGIN;

    return this.http.post<IToken>(url, body);
  }

  getInfouser(id: number): Observable<IResponse<IInfoUser>> {
    const url = `${CONSTANT.AUTH.URL.INFOUSER}/${id}`;
    return this.http.get<IResponse<IInfoUser>>(url);
  }
}
