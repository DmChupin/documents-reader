import { Component, computed, inject, output } from '@angular/core';
import { ReaderFeatureService } from '../../services';
import { Tool } from '../../models';

/** Кнопки для работы с документом */
@Component({
  selector: 'app-action-buttons',
  imports: [],
  templateUrl: './action-buttons.html',
  styleUrl: './action-buttons.less',
})
export class ActionButtons {
  private readonly _readerFeatureService = inject(ReaderFeatureService);

  readonly isAnnotationActive = computed(
    () => this._readerFeatureService.activeTool() === Tool.Annotation,
  );

  /** Output-событие увеличить документ */
  increase = output<void>();
  /** Output-событие уменьшить документ */
  decrease = output<void>();
  /** Output-событие сохранить документ */
  save = output<void>();

  /** Увеличить размер страницы */
  increasePageSize(): void {
    this.increase.emit();
  }

  /** Уменьшить размер страницы */
  decreasePageSize(): void {
    this.increase.emit();
  }

  /** Сохранить страницу */
  savePageWithAnnotations(): void {
    this.save.emit();
  }

  /** Выбор инструмента */
  selectToolAnnotation(): void {
    this._readerFeatureService.selectTool(Tool.Annotation);
  }
}
