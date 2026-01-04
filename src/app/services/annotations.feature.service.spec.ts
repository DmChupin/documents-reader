import { TestBed } from '@angular/core/testing';
import { AnnotationsFeatureService } from './annotations.feature.service';
import { ReaderFeatureService } from './reader.feature.service';
import { API_SERVICE } from '../app.config';
import { MockService } from './mock.service';
import { ApiService } from './api-service';
import { switchMap } from 'rxjs';

describe('AnnotationsFeatureService', () => {
  let annotationsFeatureService: AnnotationsFeatureService;
  let readerFeatureService: ReaderFeatureService;
  let apiService: ApiService | MockService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AnnotationsFeatureService,
        ReaderFeatureService,
        ApiService,
        MockService,
        {
          provide: API_SERVICE,
          useClass: MockService,
        },
      ],
    });

    annotationsFeatureService = TestBed.inject(AnnotationsFeatureService);
    readerFeatureService = TestBed.inject(ReaderFeatureService);
    apiService = TestBed.inject(API_SERVICE);
  });

  it('should create an instance ', () => {
    expect(annotationsFeatureService).toBeTruthy();
  });

  it('should create new annotation', () => {
    annotationsFeatureService
      .addAnnotation(1, 1, 1)
      .pipe(switchMap(() => annotationsFeatureService.getAnnotations(1)))
      .subscribe((data) => {
        expect(data[data.length - 1].x).toBe(1);
        expect(data[data.length - 1].y).toBe(1);
      });
  });
});
