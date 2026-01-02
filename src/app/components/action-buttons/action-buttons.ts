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

  zoomIn = output<void>();
  zoomOut = output<void>();
  save = output<void>();

  zoomPageIn(): void {
    this.zoomIn.emit();
  }

  zoomPageOut(): void {
    this.zoomOut.emit();
  }

  savePageWithAnnotations(): void {
    this.save.emit();
  }

  selectToolAnnotation(): void {
    this._readerFeatureService.selectTool(Tool.Annotation);
  }
}
