import { EMPTY, filter, Observable } from 'rxjs';
import { UploadedDocument } from '../models';
import { inject, Injectable } from '@angular/core';
import { MockService } from './mock.service';

/** Feature-сервис для работы с документами */
@Injectable({
  providedIn: 'root',
})
export class DocumentsFeatureService {
  private readonly _mockService = inject(MockService);

  /** Получение документа по id */
  getDocument(documentId: number | null): Observable<UploadedDocument> {
    if (!documentId) {
      return EMPTY;
    }

    return this._mockService.getDocuments(documentId);
  }
}
