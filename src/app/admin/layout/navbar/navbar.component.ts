import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {Router} from "@angular/router";
import {SweetAlertHelper} from "../../../utils/helpers/sweet-alert-helper.service";
import {Store} from "@ngxs/store";
import {Logout} from "../../../redux/auth/auth.actions";
import * as moment from "moment";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  private destroy: Subject<boolean> = new Subject<boolean>();

  viewSidebar: boolean | undefined;

  username = '';
  date = '';
  hour = '';

  constructor(
    private store: Store,
    private sweetAlertHelper: SweetAlertHelper,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.getHours();
  }

  logout() {
    this.sweetAlertHelper.createCustomAlert({
      title: '¿Seguro que desea cerrar sesión?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((res) => {
      if (res.value) {
        this.store.dispatch(new Logout);
        this.router.navigate(['/auth']);
      }
    });
  }

  sidebarView() {
    //this.store.dispatch( new SidebarView( !this.viewSidebar ) );
  }

  getHours() {
    setInterval(() => {
      const fecha = new Date();
      this.date = moment(fecha).format('dddd, DD MMMM YYYY');
      this.hour = moment(fecha).format('hh:mm:ss A');
    }, 1000);
  }

  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }

}
