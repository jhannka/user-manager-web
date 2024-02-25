import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {Store} from "@ngxs/store";
import {UserGetAction} from "../../../../redux/user/user.actions";
import {IUser} from "../../../../core/interfaces/user.interfaces";
import {GridOptions, RowDoubleClickedEvent} from "ag-grid-community";
import {UserState} from "../../../../redux/user/user.state";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  private destroy: Subject<boolean> = new Subject<boolean>();

  gridOptions: GridOptions = {};
  rowData: IUser[] = [];

  constructor(
    private store: Store,
  ) {
    this.store.dispatch(new UserGetAction);
    this.loadGrid();
  }

  ngOnInit(): void {
    this.store.select(UserState.get)
      .pipe(takeUntil(this.destroy))
      .subscribe((res: IUser[]) => {
        if (res.length > 0) {
          this.rowData = res;
        }
      })
  }

  loadGrid() {
    this.gridOptions = <GridOptions>{
      sortingOrder: ['desc', 'asc', null],
      columnDefs: [
        {
          headerName: 'Cedula',
          field: "identification_card"
        },
        {
          headerName: 'Nombre',
          field: "name",
          width: 250,
        },
        {
          headerName: 'Correo',
          field: 'email',
          width: 250,
        },
        {
          headerName: 'Numero Telefono',
          field: "phone_number",
          width: 250,
        },
        {
          headerName: 'Ciudad',
          field: "city_code",
          width: 100,
        },
      ],
      onRowDoubleClicked: (event: RowDoubleClickedEvent) => {
        if (event && event.data && event.data.id) {

        }
      }
    };
    this.rowData = [];
  }

  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }

}
