import { Observable } from 'rxjs';
import { UploadedDocument } from '../models';
import { inject, Injectable } from '@angular/core';
import { MockService } from './mock.service';
import { ApiService } from './api-service';
import { API_SERVICE } from '../app.config';

/** Feature-сервис для работы с документами */
@Injectable({
  providedIn: 'root',
})
export class DocumentsFeatureService {
  private readonly _apiService = inject<ApiService | MockService>(API_SERVICE);

  getDocument(documentId: number): Observable<UploadedDocument> {
    return this._apiService.getDocuments(documentId);
  }
}
