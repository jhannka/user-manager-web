import {ICategory} from "../../core/interfaces/category.interfaces";

export class CategoryGetAction {
  static readonly type = '[Category] Get item';

  constructor() {
  }
}

export class CategoryShowAction {
  static readonly type = '[Category] Show item';

  constructor(public id: number) {
  }
}

export class CategoryAddAction {
  static readonly type = '[Category] Add item';

  constructor(public data: ICategory) {
  }
}

export class CategoryUpdateAction {
  static readonly type = '[Category] Update item';

  constructor(public data: ICategory) {
  }
}

export class CategoryDeleteAction {
  static readonly type = '[Category] Delete item';

  constructor(public id: number) {
  }
}

export class ResetCategoryStateAction {
  static readonly type = '[Category] reset items';

  constructor() {
  }
}


