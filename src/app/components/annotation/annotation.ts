import { Component, input, OnInit, output } from '@angular/core';
import { AnnotationInfo } from '../../models';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Drag } from '../../directives';

/** Компонент - аннотация */
@Component({
  selector: 'app-annotation',
  imports: [ReactiveFormsModule, Drag],
  templateUrl: './annotation.html',
  styleUrl: './annotation.less',
})
export class Annotation implements OnInit {
  readonly annotation = input.required<AnnotationInfo>();

  /** Контрол с текстом в аннотации */
  annotationControl: FormControl<string | null>;

  /** Output-событие удаление аннотации */
  delete = output<string>();
  /** Output-событие сворачивание аннотации */
  collapse = output<string>();

  /** @inheritdoc */
  ngOnInit(): void {
    this.annotationControl = new FormControl<string>(this.annotation().text);
  }

  /** Удаление аннотации */
  deleteAnnotation(): void {
    this.delete.emit(this.annotation().id);
  }

  /** Сворачивание аннотации */
  collapseAnnotation(): void {
    this.collapse.emit(this.annotation().id);
  }
}
