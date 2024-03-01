import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category/category.component';
import { CategoryManagementComponent } from './category-management/category-management.component';
import {AgGridAngular} from "ag-grid-angular";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import { SelectedCategoryComponent } from './selected-category/selected-category.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatLegacyChipsModule} from "@angular/material/legacy-chips";
import {MatCheckboxModule} from "@angular/material/checkbox";


@NgModule({
  declarations: [
    CategoryComponent,
    CategoryManagementComponent,
    SelectedCategoryComponent
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    AgGridAngular,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatLegacyChipsModule,
    MatCheckboxModule
  ]
})
export class CategoryModule { }
