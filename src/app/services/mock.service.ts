import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { AnnotationInfo, UploadedDocument } from '../models';

/** Моковые данные "Загруженные документы" */
const DOCUMENTS_MOCK_DATA: UploadedDocument[] = [
  {
    id: 1,
    name: 'test doc',
    pages: [
      {
        number: 1,
        imageUrl: 'pages/1.png',
      },
      {
        number: 2,
        imageUrl: 'pages/2.png',
      },
      {
        number: 3,
        imageUrl: 'pages/3.png',
      },
      {
        number: 4,
        imageUrl: 'pages/4.png',
      },
      {
        number: 5,
        imageUrl: 'pages/5.png',
      },
    ],
  },
  {
    id: 2,
    name: 'test doc',
    pages: [
      {
        number: 1,
        imageUrl: 'pages/1.png',
      },
      {
        number: 2,
        imageUrl: 'pages/2.png',
      },
      {
        number: 3,
        imageUrl: 'pages/3.png',
      },
      {
        number: 4,
        imageUrl: 'pages/4.png',
      },
      {
        number: 5,
        imageUrl: 'pages/5.png',
      },
    ],
  },
];

/** Моковые данные "Аннотации" */
const ANNOTATIONS_MOCK_DATA: AnnotationInfo[] = [
  {
    id: 'gee2-dedr-4441-dds1',
    documentId: 2,
    x: 150,
    y: 150,
    width: 300,
    height: 250,
    text: 'Анннотация',
    createdAt: '12:12',
  },
  {
    id: 'gee2-dedr-4441-dds3',
    documentId: 2,
    x: 550,
    y: 550,
    width: 160,
    height: 150,
    text: 'Тут текст аннотации',
    createdAt: '12:16',
  },
];

/** Mock-сервис документы */
@Injectable({
  providedIn: 'root',
})
export class MockService {
  private readonly _documents = new BehaviorSubject(DOCUMENTS_MOCK_DATA);
  private readonly _annotations = new BehaviorSubject(ANNOTATIONS_MOCK_DATA);

  /** Получение списка документов */
  getDocuments(documentId: number): Observable<UploadedDocument> {
    return this._documents.pipe(
      map((documents) => documents.filter((document) => document.id === documentId)[0]),
    );
  }

  /** Получение списка аннотаций */
  getAnnotations(documentId: number): Observable<AnnotationInfo[]> {
    return this._annotations.pipe(
      map((annotations) =>
        annotations.filter((annotation) => annotation.documentId === documentId),
      ),
    );
  }

  /** Добавление аннотации */
  addAnnotation(annotation: AnnotationInfo): void {
    ANNOTATIONS_MOCK_DATA.push(annotation);

    this._annotations.next(ANNOTATIONS_MOCK_DATA);
  }

  /** Удаление аннотации */
  deleteAnnotation(annotationId: string): void {
    ANNOTATIONS_MOCK_DATA.splice(
      ANNOTATIONS_MOCK_DATA.findIndex((annotation) => annotation.id === annotationId),
      1,
    );

    this._annotations.next(ANNOTATIONS_MOCK_DATA);
  }

  /** Обновить аннотацию */
  updateAnnotation(annotationId: string, newAnnotation: AnnotationInfo): void {
    ANNOTATIONS_MOCK_DATA.splice(
      ANNOTATIONS_MOCK_DATA.findIndex((annotation) => annotation.id === annotationId),
      1,
      newAnnotation,
    );

    this._annotations.next(ANNOTATIONS_MOCK_DATA);
  }
}
