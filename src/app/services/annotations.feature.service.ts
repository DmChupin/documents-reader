import { inject, Injectable } from '@angular/core';
import { MockService } from './mock.service';
import { EMPTY, Observable } from 'rxjs';
import { AnnotationInfo } from '../models';
import { ReaderFeatureService } from './reader.feature.service';

/** Ширина аннотации при добавлении по умолчанию в px */
const BASIC_NOTE_WIDTH = 250;
/** Высота аннотации при добавлении по умолчанию в px */
const BASIC_NOTE_HEIGHT = 220;

/** Feature-сервис для работы с аннотациями */
@Injectable({
  providedIn: 'root',
})
export class AnnotationsFeatureService {
  private readonly _readerFeatureService = inject(ReaderFeatureService);
  private readonly _mockService = inject(MockService);

  /** Получение документа по id */
  getAnnotations(documentId: number | null): Observable<AnnotationInfo[]> {
    if (!documentId) {
      return EMPTY;
    }

    return this._mockService.getAnnotations(documentId);
  }

  /** Добавление аннотации */
  addAnnotation(documentId: number, targetX: number, targetY: number): void {
    const height = this.calculateHeight();
    const width = this.calculateWidth();
    const currentDate = new Date();
    const newAnnotation: AnnotationInfo = {
      id: crypto.randomUUID().toString(),
      createdAt: `${currentDate.getHours()}:${currentDate.getMinutes()}`,
      text: '',
      height,
      width,
      x: (targetX + window.scrollX) / this._readerFeatureService.zoomLevel(),
      y: (targetY + window.scrollY) / this._readerFeatureService.zoomLevel(),
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

  /** Расчёт ширины аннотации */
  private calculateWidth(): number {
    const screenHalfWidth = window.innerWidth / 2;

    return Math.min(BASIC_NOTE_WIDTH, screenHalfWidth);
  }

  /**
   * Расчёт высоты аннотации
   * Минимальное из высоты по умолчанию, половины ширины экрана и половины высоты экрана */
  private calculateHeight(): number {
    const screenHalfHeight = window.innerHeight / 2;
    const screenHalfWidth = window.innerWidth / 2;

    return Math.min(BASIC_NOTE_HEIGHT, screenHalfHeight, screenHalfWidth);
  }
}
