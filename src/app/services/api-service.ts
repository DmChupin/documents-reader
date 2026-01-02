import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { UploadedDocument, AnnotationInfo } from '../models';

/** API-сервис */
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  getDocuments(documentId: number): Observable<UploadedDocument> {
    return EMPTY;
  }

  getAnnotations(documentId: number): Observable<AnnotationInfo[]> {
    return EMPTY;
  }

  addAnnotation(annotation: AnnotationInfo): void {}

  deleteAnnotation(annotationId: string): void {}

  updateAnnotation(annotationId: string, newAnnotation: AnnotationInfo): void {}
}
