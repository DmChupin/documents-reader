import { Component, DestroyRef, effect, inject, input, OnInit, output } from '@angular/core';
import { AnnotationInfo } from '../../models';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Drag } from '../../directives';
import { debounceTime, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { JsonPipe } from '@angular/common';

/** Компонент - аннотация */
@Component({
  selector: 'app-annotation',
  imports: [ReactiveFormsModule, Drag],
  templateUrl: './annotation.html',
  styleUrl: './annotation.less',
})
export class Annotation implements OnInit {
  private readonly _destroyRef = inject(DestroyRef);
  /** Анннотация */
  readonly annotation = input.required<AnnotationInfo>();

  /** Контрол с текстом в аннотации */
  annotationControl: FormControl<string | null>;

  /** Output-событие удаление аннотации */
  delete = output<string>();
  /** Обновить аннотацию */
  update = output<AnnotationInfo>();

  /** @inheritdoc */
  constructor() {
    effect(() => this.annotationControl.setValue(this.annotation().text));
  }

  /** @inheritdoc */
  ngOnInit(): void {
    this.annotationControl = new FormControl<string | null>(null);

    this.annotationControl.valueChanges
      .pipe(
        debounceTime(300),
        tap((controlValue) =>
          this.update.emit({
            ...this.annotation(),
            text: controlValue ?? '',
          }),
        ),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe();
  }

  /** Удаление аннотации */
  deleteAnnotation(): void {
    this.delete.emit(this.annotation().id);
  }

  /** Событие при окончании перетаскивания */
  handleDrag(coordinates: { x: number; y: number }): void {
    if (!coordinates) return;

    this.update.emit({
      ...this.annotation(),
      x: coordinates.x,
      y: coordinates.y,
    });
  }
}
