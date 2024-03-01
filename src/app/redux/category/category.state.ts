import {Injectable} from '@angular/core';
import {State, Action, StateContext, Selector} from '@ngxs/store';
import {ICategory} from "../../core/interfaces/category.interfaces";
import {CategoryService} from "../../services/category/category.service";
import {tap} from "rxjs";
import {
  CategoryAddAction,
  CategoryDeleteAction,
  CategoryGetAction,
  CategoryShowAction,
  CategoryUpdateAction, ResetCategoryStateAction
} from "./category.actions";

interface CategoryStateModel {
  items: ICategory[];
  item: ICategory | null;
}

const defaults = {
  items: [],
  item: null
};

@State<CategoryStateModel>({
  name: 'category',
  defaults
})
@Injectable()
export class CategoryState {

  @Selector()
  static get(state: CategoryStateModel) {
    return state.items;
  }

  @Selector()
  static show(state: CategoryStateModel) {
    return state.item;
  }

  constructor(
    private categoryService: CategoryService
  ) {
  }

  @Action(CategoryGetAction)
  get(ctx: StateContext<CategoryStateModel>) {
    return this.categoryService.get().pipe(
      tap(res => {
        ctx.patchState({
          items: res.data
        })
      })
    );
  }

  @Action(CategoryShowAction)
  show(ctx: StateContext<CategoryStateModel>, {id}: CategoryShowAction) {
    return this.categoryService.show(id).pipe(
      tap(res => {
        ctx.patchState({
          item: res.data
        })
      })
    );
  }

  @Action(CategoryAddAction)
  create(ctx: StateContext<CategoryStateModel>, {data}: CategoryAddAction) {
    return this.categoryService.create(data).pipe(
      tap(res => {
        ctx.patchState({})
      })
    );
  }

  @Action(CategoryUpdateAction)
  update(ctx: StateContext<CategoryStateModel>, {data}: CategoryUpdateAction) {
    return this.categoryService.update(data).pipe(
      tap(res => {
        ctx.patchState({})
      })
    );
  }

  @Action(CategoryDeleteAction)
  delete(ctx: StateContext<CategoryStateModel>, {id}: CategoryDeleteAction) {
    return this.categoryService.destroy(id).pipe(
      tap(res => {
        ctx.patchState({})
      })
    );
  }

  @Action(ResetCategoryStateAction)
  resetState(ctx: StateContext<CategoryStateModel>) {
    const currentState = ctx.getState();
    ctx.setState({
      ...currentState,
      item: null
    });

  }
}
