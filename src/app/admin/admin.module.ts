import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {LayoutModule} from "./layout/layout.module";
import {NgxsModule} from "@ngxs/store";
import {UserState} from "../redux/user/user.state";
import {ApiColombiaState} from "../redux/api-colombia/api-colombia.state";
import {CategoryState} from "../redux/category/category.state";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgxsModule.forFeature([
      UserState,
      ApiColombiaState,
      CategoryState
    ]),
    LayoutModule
  ]
})
export class AdminModule {
}
