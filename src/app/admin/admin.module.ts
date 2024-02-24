import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {LayoutModule} from "./layout/layout.module";
import {NgxsModule} from "@ngxs/store";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgxsModule.forFeature([]),
    LayoutModule
  ]
})
export class AdminModule {
}
