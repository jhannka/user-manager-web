import {Injectable} from '@angular/core';
import {State, Action, StateContext, Selector} from '@ngxs/store';
import {IUser} from "../../core/interfaces/user.interfaces";
import {UserService} from "../../services/user/user.service";
import {UserAddAction, UserDeleteAction, UserGetAction, UserShowAction, UserUpdateAction} from "./user.actions";
import {tap} from "rxjs";

interface UserStateModel {
  users: IUser[];
  user: IUser | null
}

const defaults = {
  users: [],
  user: null
};

@State<UserStateModel>({
  name: 'user',
  defaults
})
@Injectable()
export class UserState {


  @Selector()
  static get(state: UserStateModel) {
    return state.users;
  }

  @Selector()
  static show(state: UserStateModel) {
    return state.user;
  }

  constructor(
    private userService: UserService
  ) {
  }

  @Action(UserGetAction)
  get(ctx: StateContext<UserStateModel>) {
    return this.userService.get().pipe(
      tap(res => {
        ctx.patchState({
          users: res.data
        })
      })
    );
  }

  @Action(UserShowAction)
  show(ctx: StateContext<UserStateModel>, {id}: UserShowAction) {
    return this.userService.show(id).pipe(
      tap(res => {
        ctx.patchState({
          user: res.data
        })
      })
    );
  }

  @Action(UserAddAction)
  create(ctx: StateContext<UserStateModel>, {data}: UserAddAction) {
    return this.userService.create(data).pipe(
      tap(res => {
        ctx.patchState({})
      })
    );
  }

  @Action(UserUpdateAction)
  update(ctx: StateContext<UserStateModel>, {data}: UserUpdateAction) {
    return this.userService.update(data).pipe(
      tap(res => {
        ctx.patchState({})
      })
    );
  }

  @Action(UserDeleteAction)
  delete(ctx: StateContext<UserStateModel>, {id}: UserDeleteAction) {
    return this.userService.destroy(id).pipe(
      tap(res => {
        ctx.patchState({})
      })
    );
  }

}
