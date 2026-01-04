import { inject, Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { UploadedDocument, AnnotationInfo } from '../models';
import { HttpClient } from '@angular/common/http';

/** API-сервис */
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly _httpClient = inject(HttpClient);

  getDocuments(documentId: number): Observable<UploadedDocument> {
    const url = `documents/${documentId}`;

    return this._httpClient.get<UploadedDocument>(url);
  }

  getAnnotations(documentId: number): Observable<AnnotationInfo[]> {
    const url = `annotations`;

    return this._httpClient.get<AnnotationInfo[]>(url, { params: { documentId } });
  }

  addAnnotation(annotation: AnnotationInfo): Observable<void> {
    const url = `annotations`;

    return this._httpClient.post<void>(url, { annotation });
  }

  deleteAnnotation(annotationId: string): Observable<void> {
    const url = `annotations`;

    return this._httpClient.delete<void>(url, { params: { annotationId } });
  }

  updateAnnotation(annotationId: string, newAnnotation: AnnotationInfo): Observable<void> {
    const url = `annotations`;

    return this._httpClient.put<void>(url, newAnnotation, { params: { annotationId } });
  }
}
