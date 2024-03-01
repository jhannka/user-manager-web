import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Store} from "@ngxs/store";
import {CategoryGetAction} from "../../../../redux/category/category.actions";
import {map, Observable, startWith, Subject, takeUntil} from "rxjs";
import {FormControl} from "@angular/forms";
import {CategoryState} from "../../../../redux/category/category.state";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatAutocomplete, MatAutocompleteSelectedEvent, MatAutocompleteTrigger} from "@angular/material/autocomplete";
import {MatLegacyChipInputEvent} from "@angular/material/legacy-chips";

@Component({
  selector: 'app-selected-category',
  templateUrl: './selected-category.component.html',
  styleUrls: ['./selected-category.component.css']
})
export class SelectedCategoryComponent implements OnInit, OnDestroy {
  @ViewChild('CategoryInput') categoryInput!: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete | undefined;
  @ViewChild('autocompleteTrigger') matACTrigger!: MatAutocompleteTrigger;
  private destroy: Subject<boolean> = new Subject<boolean>();


  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  categoryCtrl = new FormControl();
  filteredCategory: Observable<string[]> = new Observable<string[]>();
  allCategories: string[] = [];
  Categories: string[] = ['Salsa'];

  constructor(
    private store: Store
  ) {
    this.store.dispatch(new CategoryGetAction());

    this.filteredCategory = this.categoryCtrl.valueChanges.pipe(
      startWith(''),
      map(category => category ? this._filter(category) : this.allCategories.slice())
    );
  }



  ngOnInit(): void {
    this.store.select(CategoryState.get).pipe(
      takeUntil(this.destroy))
      .subscribe(res => {
        if (res) {
          this.allCategories = res.map(c => c.name);
          this.Categories = res.map(c => c.name);
        }
      })

  }

  add(event: MatLegacyChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.Categories.push(value.trim());
    }

    if (input) {
      input.value = '';
    }

    this.categoryCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.Categories.indexOf(fruit);

    if (index >= 0) {
      this.Categories.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const newValue = event.option.viewValue;
    if (this.Categories.includes(newValue)) {
      this.Categories = [...this.Categories.filter(fruit => fruit !== newValue)];
    } else {
      this.Categories.push(event.option.viewValue);
    }

    this.categoryInput.nativeElement.value = '';
    this.categoryCtrl.setValue(null);

    requestAnimationFrame(() => {
      this.openAuto(this.matACTrigger);
    })

  }


  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allCategories.filter(category => category.toLowerCase().includes(filterValue));
  }

  openAuto(trigger: MatAutocompleteTrigger) {
    trigger.openPanel();
    this.categoryInput.nativeElement.focus();
  }


  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }
}
