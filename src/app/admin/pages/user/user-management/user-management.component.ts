import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {SweetAlertHelper} from "../../../../utils/helpers/sweet-alert-helper.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngxs/store";
import {Subject, takeUntil} from "rxjs";
import {UserState} from "../../../../redux/user/user.state";
import {ResetUserStateAction, UserAddAction, UserUpdateAction} from "../../../../redux/user/user.actions";
import {GetCitysAction, GetDepartamentAction} from "../../../../redux/api-colombia/api-colombia.actions";
import {ApiColombiaState} from "../../../../redux/api-colombia/api-colombia.state";
import {ICity, IDepartament} from "../../../../core/interfaces/api-colombia.interfaces";

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit, OnDestroy {
  private destroy: Subject<boolean> = new Subject<boolean>();

  formData!: FormGroup;
  departament: IDepartament[] = [];
  citys: ICity[] = [];

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private sweetAlertHelper: SweetAlertHelper,
    public dialogRef: MatDialogRef<UserManagementComponent>,
  ) {
    this.createForm();
    this.store.dispatch(new GetDepartamentAction);
    this.onSlectedDepartament();
  }

  ngOnInit(): void {
    this.store.select(UserState.show)
      .pipe(takeUntil(this.destroy))
      .subscribe((res) => {
        if (res) {
          const {departament, city_code, ...data} = res;
          this.formData.patchValue({
            departament: String(departament),
            city_code: String(city_code),
            ...data
          });
        }
      });
    this.store.select(ApiColombiaState.getDepartament)
      .pipe(takeUntil(this.destroy))
      .subscribe((res) => {
        if (res) {
          this.departament = res;
        }
      });

  }

  createForm() {
    this.formData = this.fb.group({
      id: [null],
      name: [null, Validators.required],
      email: [null, Validators.required],
      phone_number: [null, Validators.required],
      identification_card: [null, Validators.required],
      birth_date: [null, Validators.required],
      departament: [null, Validators.required],
      city_code: [{value: null, disabled: true}, Validators.required],
      password: [null, Validators.required],
    });
  }

  onCancel(saved: boolean) {
    this.dialogRef.close({saved});
  }

  onSlectedDepartament() {
    this.formData.get('departament')?.valueChanges
      .pipe(
        takeUntil(this.destroy)
      )
      .subscribe((selectedDepartamentId) => {
        if (selectedDepartamentId) {
          this.store.dispatch(new GetCitysAction());
          this.formData.get('city_code')?.enable();
          this.filterCityByDepartament(Number(selectedDepartamentId));
        }
      });
  }

  private filterCityByDepartament(selectedDepartamentId: number): void {
    this.store.select(ApiColombiaState.getCitys)
      .pipe(takeUntil(this.destroy))
      .subscribe((res) => {
        if (res) {
          this.citys = res.filter(city => city.departmentId === selectedDepartamentId);
        }
      });
  }

  onSave() {
    const dataForm = this.formData.getRawValue();
    const action = dataForm.id ? new UserUpdateAction(dataForm) : new UserAddAction(dataForm);

    this.store.dispatch(action)
      .pipe(takeUntil(this.destroy))
      .subscribe({
        next: () => {
          const successMessage = dataForm.id ? 'Registro actualizado correctamente' : 'Registro creado correctamente';
          this.sweetAlertHelper.createCustomAlert({
            text: successMessage,
            icon: 'success'
          });
          this.onCancel(true);
        }
      });
  }

  get isFormValid() {
    return this.formData.valid;
  }

  get title() {
    return this.formData.get('id')?.value ? 'Editar' : 'Nuevo';
  }

  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.unsubscribe();
    this.store.dispatch(ResetUserStateAction);
  }

}
