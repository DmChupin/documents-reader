import { Component, inject, Signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  AnnotationsFeatureService,
  DocumentsFeatureService,
  ReaderFeatureService,
} from '../../services';
import { toSignal } from '@angular/core/rxjs-interop';
import { AnnotationInfo, Tool, UploadedDocument } from '../../models';
import { ActionButtons, Annotation } from '../../components';

/** Компонент - просмотр документа */
@Component({
  selector: 'app-reader',
  imports: [Annotation, ActionButtons],
  templateUrl: './reader.html',
  styleUrl: './reader.less',
})
export class Reader {
  private readonly _route = inject(ActivatedRoute);
  private readonly _documentsFeatureService = inject(DocumentsFeatureService);
  private readonly _annotationsFeatureService = inject(AnnotationsFeatureService);
  private readonly _readerFeatureService = inject(ReaderFeatureService);

  private readonly _documentId = this._route.snapshot.paramMap.get('documentId');
  private readonly _activeTool = this._readerFeatureService.activeTool;

  /** Документ */
  document: Signal<UploadedDocument | undefined>;
  /** Список аннотаций */
  annotations: Signal<AnnotationInfo[] | undefined>;

  /** @inheritdoc */
  constructor() {
    if (!this._documentId) {
      return;
    }

    this.document = toSignal(this._documentsFeatureService.getDocument(+this._documentId));
    this.annotations = toSignal(this._annotationsFeatureService.getAnnotations(+this._documentId));
  }

  /** Нажатие на страницу */
  pageClick(event: PointerEvent): void {
    if (!this._documentId) return;

    switch (this._activeTool()) {
      case Tool.Annotation:
        this._annotationsFeatureService.addAnnotation(
          +this._documentId,
          event.clientX,
          event.clientY,
        );

        this._readerFeatureService.selectTool(Tool.Pointer);

        break;
      case Tool.Pointer:
        break;
    }
  }

  /** Удаление аннотации */
  deleteAnnotation(annotationId: string): void {
    this._annotationsFeatureService.deleteAnnotation(annotationId);
  }

  /** Сохранить страницу с аннотациями */
  savePageWithAnnotations(): void {
    const pages = this.document()?.pages;
    const annotations = this.annotations();

    console.log('result: ', {
      pages,
      annotations,
    });
  }

  /** Обновить аннотацию */
  updateAnnotation(annotation: AnnotationInfo): void {
    this._annotationsFeatureService.updateAnnotation(annotation);
  }
}
