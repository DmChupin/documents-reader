import { TestBed } from '@angular/core/testing';
import { ApiService } from './api-service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), ApiService],
    });

    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should create an instance ', () => {
    expect(service).toBeTruthy();
  });

  it('getDocuments() should create  HTTP-query to backend', () => {
    const httpResponse = {
      id: '11-332-332',
      name: 'test',
      pages: [],
    };

    service.getDocuments(1).subscribe((res) => expect(res).equal(httpResponse));

    const req = httpMock.expectOne('documents/1');

    expect(req.request.method).toBe('GET');
    req.flush(httpResponse);
  });

  it('getAnnotations() should create  HTTP-query to backend', () => {
    const httpResponse = [
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
    ];

    service.getAnnotations(1).subscribe((res) => expect(res).equal(httpResponse));

    const req = httpMock.expectOne('annotations?documentId=1');

    expect(req.request.method).toBe('GET');
    req.flush(httpResponse);
  });
});
