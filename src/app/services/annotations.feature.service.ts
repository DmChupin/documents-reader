import { inject, Injectable } from '@angular/core';
import { MockService } from './mock.service';
import { EMPTY, Observable } from 'rxjs';
import { AnnotationInfo } from '../models';
import { ReaderFeatureService } from './reader.feature.service';
import { v4 as uuidv4 } from 'uuid';
import { API_SERVICE } from '../app.config';
import { ApiService } from './api-service';

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
  private readonly _apiService = inject(API_SERVICE);

  getAnnotations(documentId: number): Observable<AnnotationInfo[]> {
    return this._apiService.getAnnotations(documentId);
  }

  addAnnotation(documentId: number, targetX: number, targetY: number): Observable<void> {
    const height = this.calculateHeight();
    const width = this.calculateWidth();
    const currentDate = new Date();
    const newAnnotation: AnnotationInfo = {
      id: uuidv4(),
      createdAt: `${currentDate.getHours()}:${currentDate.getMinutes()}`,
      text: '',
      height,
      width,
      x: (targetX + window.scrollX) / this._readerFeatureService.zoomLevel(),
      y: (targetY + window.scrollY) / this._readerFeatureService.zoomLevel(),
      documentId,
    };

    return this._apiService.addAnnotation(newAnnotation);
  }

  deleteAnnotation(annotationId: string): Observable<void> {
    return this._apiService.deleteAnnotation(annotationId);
  }

  updateAnnotation(annotation: AnnotationInfo): Observable<void> {
    const annotationId = annotation.id;

    return this._apiService.updateAnnotation(annotationId, annotation);
  }

  /** Расчёт ширины аннотации */
  private calculateWidth(): number {
    const screenHalfWidth = window.innerWidth / 2;

    return Math.min(BASIC_NOTE_WIDTH, screenHalfWidth);
  }

  /**
   * Расчёт высоты аннотации
   * Минимальное из высоты по умолчанию, половины ширины экрана и половины высоты экрана
   */
  private calculateHeight(): number {
    const screenHalfHeight = window.innerHeight / 2;
    const screenHalfWidth = window.innerWidth / 2;

    return Math.min(BASIC_NOTE_HEIGHT, screenHalfHeight, screenHalfWidth);
  }
}
