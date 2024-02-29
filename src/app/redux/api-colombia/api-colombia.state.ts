import {Injectable} from '@angular/core';
import {State, Action, StateContext, Selector} from '@ngxs/store';
import {GetCitysAction, GetDepartamentAction} from './api-colombia.actions';
import {ICity, IDepartament} from "../../core/interfaces/api-colombia.interfaces";
import {ApiColombiaService} from "../../services/api-colombia/api-colombia.service";
import {tap} from "rxjs";

interface ApiColombiaStateModel {
  items: IDepartament[];
  citys: ICity[];
}

const defaults = {
  items: [],
  citys: []
};

@State<ApiColombiaStateModel>({
  name: 'apiColombia',
  defaults
})
@Injectable()
export class ApiColombiaState {

  @Selector()
  static getDepartament(state: ApiColombiaStateModel) {
    return state.items;
  }

  @Selector()
  static getCitys(state: ApiColombiaStateModel) {
    return state.citys;
  }

  constructor(
    private apiColombiaService: ApiColombiaService
  ) {
  }

  @Action(GetDepartamentAction)
  getDepartament(ctx: StateContext<ApiColombiaStateModel>) {
    return this.apiColombiaService.getDepartament().pipe(
      tap(res => {
        ctx.patchState({
          items: res
        })
      })
    );

  }

  @Action(GetCitysAction)
  getCitys(ctx: StateContext<ApiColombiaStateModel>) {
    return this.apiColombiaService.getCitys().pipe(
      tap(res => {
        ctx.patchState({
          citys: res
        })
      })
    );

  }

}
