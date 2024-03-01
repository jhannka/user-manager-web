import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CategoryComponent} from "./category/category.component";
import {SelectedCategoryComponent} from "./selected-category/selected-category.component";

const routes: Routes = [
  {
    path: '',
    component: CategoryComponent,
    data: {
      title: 'Category',
    },
  },
  {
    path: 'category',
    component: SelectedCategoryComponent,
    data: {
      title: 'Category',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule {
}
