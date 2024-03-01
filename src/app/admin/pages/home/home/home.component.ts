import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngxs/store";
import {AuthState} from "../../../../redux/auth/auth.state";
import {Subject, takeUntil} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {InfoUser} from "../../../../redux/auth/auth.actions";
import {ChangePasswordComponent} from "../../user/change-password/change-password.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private destroy: Subject<boolean> = new Subject<boolean>();

  constructor(
    private store: Store,
    public dialogForm: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.store.select(AuthState.getInfoUser)
      .pipe(takeUntil(this.destroy))
      .subscribe(res => {
        if (res?.must_change_password) {
          this.onChangePassword();
        }
      })

  }

  onChangePassword() {
    this.dialogForm.open(ChangePasswordComponent, {
      width: '800px',
      height: '260'
    }).afterClosed()
      .pipe(takeUntil(this.destroy))
      .subscribe(result => {
        if (result?.saved) {
          this.store.dispatch(new InfoUser());
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }
}
