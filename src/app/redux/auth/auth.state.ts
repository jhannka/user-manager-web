import { Injectable } from '@angular/core';
import { Action, createSelector, Selector, State, StateContext, Store } from '@ngxs/store';
import { InfoUser, Login, Logout } from './auth.actions';
import { AuthService } from "../../services/auth/auth.service";
import { tap } from "rxjs";
import { IInfoUser } from "../../core/interfaces/auth.interfaces";

interface AuthStateModel {
  token: string | null;
  user: IInfoUser | null;
}

@State<AuthStateModel>( {
  name: 'auth',
  defaults: {
    token: null,
    user: null
  }
} )
@Injectable()
export class AuthState {

  @Selector()
  static token( state: AuthStateModel ): string | null {
    return state.token;
  }


  @Selector()
  static isAuthenticated( state: AuthStateModel ): boolean {
    return !!state.token;
  }

  @Selector()
  static getPermissions( state: AuthStateModel ) {
    return state.user;
  }
  static filterPermissions(module: string, permission: string) {
    return createSelector(
      [AuthState],
      (state: AuthStateModel) => {
        const user = state.user;
        const modulePermissions = user?.permissions.find(r => r.name === module);
        return modulePermissions?.actions.find( r => r.name === permission )?.state;
      }
    );
  }


  constructor(
    private authService: AuthService,
    private store: Store
  ) {
  }

  @Action( Login )
  login( ctx: StateContext<AuthStateModel>, action: Login ) {
    return this.authService.login( action.payload ).pipe(
      tap( {
        next: ( result: { token: string, userId: number } ) => {
          this.handleLoginSuccess( ctx, result );
        },
        error: ( error: any ) => {
          this.handleLoginError( ctx );
        },
      } )
    );
  }

  private handleLoginSuccess( ctx: StateContext<AuthStateModel>, result: { token: string, userId: number } ) {
    ctx.patchState( {
      token: result.token,
    } );
    this.store.dispatch( new InfoUser( result.userId ) );
  }

  private handleLoginError( ctx: StateContext<AuthStateModel> ) {
    ctx.patchState( {
      token: null,
    } );
  }

  @Action( Logout )
  logout( ctx: StateContext<AuthStateModel> ) {
    ctx.patchState( {
      token: null,
      user: null
    } );
  }

  @Action( InfoUser )
  getInfoUser( ctx: StateContext<AuthStateModel>, { id }: InfoUser ) {
    return this.authService.getInfouser( id ).pipe(
      tap( res => {
        ctx.patchState( {
          user: res.data
        } )
      } )
    );
  }

}
