import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {LayoutModule} from "./layout/layout.module";
import {NgxsModule} from "@ngxs/store";
import {UserState} from "../redux/user/user.state";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgxsModule.forFeature([
      UserState
    ]),
    LayoutModule
  ]
})
export class AdminModule {
}
