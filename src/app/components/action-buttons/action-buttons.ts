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
  zoomIn = output<void>();
  /** Output-событие уменьшить документ */
  zoomOut = output<void>();
  /** Output-событие сохранить документ */
  save = output<void>();

  /** Увеличить размер страницы */
  zoomPageIn(): void {
    this.zoomIn.emit();
  }

  /** Уменьшить размер страницы */
  zoomPageOut(): void {
    this.zoomOut.emit();
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
