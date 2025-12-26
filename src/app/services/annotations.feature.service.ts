import { inject, Injectable } from '@angular/core';
import { MockService } from './mock.service';
import { EMPTY, Observable } from 'rxjs';
import { AnnotationInfo } from '../models';

/** Ширина аннотации при добавлении по умолчанию */
const BASIC_NOTE_WIDTH = 250;
/** Высота аннотации при добавлении по умолчанию */
const BASIC_NOTE_HEIGHT = 220;

/** Feature-сервис для работы с аннотациями */
@Injectable({
  providedIn: 'root',
})
export class AnnotationsFeatureService {
  private readonly _mockService = inject(MockService);

  /** Получение документа по id */
  getAnnotations(documentId: number | null): Observable<AnnotationInfo[]> {
    if (!documentId) {
      return EMPTY;
    }

    return this._mockService.getAnnotations(documentId);
  }

  /** Добавление аннотации */
  addAnnotation(documentId: number, x: number, y: number): void {
    const currentDate = new Date();
    const newAnnotation: AnnotationInfo = {
      id: crypto.randomUUID().toString(),
      createdAt: `${currentDate.getHours()}:${currentDate.getMinutes()}`,
      text: '',
      height: BASIC_NOTE_HEIGHT,
      width: BASIC_NOTE_WIDTH,
      x: x + window.scrollX,
      y: y + window.scrollY,
      documentId,
    };

    this._mockService.addAnnotation(newAnnotation);
  }

  /** Удаление аннотации */
  deleteAnnotation(annotationId: string): void {
    this._mockService.deleteAnnotation(annotationId);
  }

  /** Обновить аннотацию */
  updateAnnotation(annotation: AnnotationInfo): void {
    const annotationId = annotation.id;

    this._mockService.updateAnnotation(annotationId, annotation);
  }
}
