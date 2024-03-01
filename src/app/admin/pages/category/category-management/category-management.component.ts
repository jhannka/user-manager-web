import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngxs/store";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SweetAlertHelper} from "../../../../utils/helpers/sweet-alert-helper.service";
import {MatDialogRef} from "@angular/material/dialog";
import {Subject, takeUntil} from "rxjs";
import {
  CategoryAddAction,
  CategoryUpdateAction,
  ResetCategoryStateAction
} from "../../../../redux/category/category.actions";
import {CategoryState} from "../../../../redux/category/category.state";

@Component({
  selector: 'app-category-management',
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.css']
})
export class CategoryManagementComponent implements OnInit, OnDestroy {
  private destroy: Subject<boolean> = new Subject<boolean>();

  formData!: FormGroup;

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private sweetAlertHelper: SweetAlertHelper,
    public dialogRef: MatDialogRef<CategoryManagementComponent>,
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.store.select(CategoryState.show)
      .pipe(takeUntil(this.destroy))
      .subscribe((res) => {
        if (res) {
          this.formData.patchValue(res);
        }
      });
  }

  createForm() {
    this.formData = this.fb.group({
      id: [null],
      name: [null, Validators.required],
    });
  }

  onSave() {
    const dataForm = this.formData.getRawValue();
    const action = dataForm.id ? new CategoryUpdateAction(dataForm) : new CategoryAddAction(dataForm);

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

  onCancel(saved: boolean) {
    this.dialogRef.close({saved});
  }

  get isFormValid() {
    return this.formData.valid;
  }

  get title() {
    return this.formData.get('id')?.value ? 'Editar' : 'Nueva';
  }

  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.unsubscribe();
    this.store.dispatch(ResetCategoryStateAction);
  }

}
