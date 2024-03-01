import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {GetContextMenuItemsParams, GridOptions, RowDoubleClickedEvent} from "ag-grid-community";
import {ICategory} from "../../../../core/interfaces/category.interfaces";
import {Store} from "@ngxs/store";
import {MatDialog} from "@angular/material/dialog";
import {SweetAlertHelper} from "../../../../utils/helpers/sweet-alert-helper.service";
import {CategoryDeleteAction, CategoryGetAction, CategoryShowAction} from "../../../../redux/category/category.actions";
import {CategoryManagementComponent} from "../category-management/category-management.component";
import {CategoryState} from "../../../../redux/category/category.state";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit, OnDestroy {
  private destroy: Subject<boolean> = new Subject<boolean>();

  gridOptions: GridOptions = {};
  rowData: ICategory[] = [];


  constructor(
    private store: Store,
    public dialogForm: MatDialog,
    private sweetAlertHelper: SweetAlertHelper,
  ) {
    this.store.dispatch(new CategoryGetAction);
    this.loadGrid();
  }

  ngOnInit(): void {
    this.store.select(CategoryState.get)
      .pipe(takeUntil(this.destroy))
      .subscribe((res) => {
        if (res) {
          this.rowData = res;
        }
      })
  }

  loadGrid() {
    this.gridOptions = <GridOptions>{
      sortingOrder: ['desc', 'asc', null],
      columnDefs: [
        {
          headerName: 'id',
          field: "id"
        },
        {
          headerName: 'Nombre',
          field: "name",
          width: 250,
        },
      ],
      onRowDoubleClicked: (event: RowDoubleClickedEvent) => {
        if (event && event.data && event.data.id) {
          this.store.dispatch(new CategoryShowAction(event.data.id));
          this.onNew();
        }
      },
      getContextMenuItems: (params: GetContextMenuItemsParams) => {
        const {node} = params;
        const category = node?.data.id;

        return [
          {
            name: 'Eliminar categoria',
            icon: '',
            action: () => {
              this.deleteCategory(category);
            },
          },
          'separator',
          'export',
        ];
      }
    };
    this.rowData = [];
  }

  onNew() {
    this.dialogForm.open(CategoryManagementComponent, {
      width: '800px',
      height: '260'
    }).afterClosed()
      .pipe(takeUntil(this.destroy))
      .subscribe(result => {
        if (result?.saved) {
          this.store.dispatch(new CategoryGetAction);
        }
      });
  }

  deleteCategory(category: number) {
    this.sweetAlertHelper.createCustomAlert({
      title: '¿Seguro que desea eliminar esta categoria?',
      text: 'Eliminar Categoria',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((res) => {
      if (res.value) {
        this.store.dispatch(new CategoryDeleteAction(category))
          .pipe(takeUntil(this.destroy))
          .subscribe((res) => {
            if (res) {
              this.store.dispatch(new CategoryGetAction);
            }
          })
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }
}
