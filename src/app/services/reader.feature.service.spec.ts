import { TestBed } from '@angular/core/testing';
import { ReaderFeatureService } from './reader.feature.service';

describe('ReaderFeatureService', () => {
  let service: ReaderFeatureService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReaderFeatureService],
    });

    service = TestBed.inject(ReaderFeatureService);
  });

  it('should create an instance ', () => {
    expect(service).toBeTruthy();
  });

  it('should increase zoom level by 0.1', () => {
    service.zoomLevel.set(1);
    service.zoomIn();
    expect(service.zoomLevel()).toBe(1.1);
  });

  it('should decrease zoom level by 0.1', () => {
    service.zoomLevel.set(1);
    service.zoomOut();
    expect(service.zoomLevel()).toBe(0.9);
  });

  it('should reach max zoom level', () => {
    service.zoomLevel.set(1.95);
    service.zoomIn();
    expect(service.zoomLevel()).toBe(2);
  });

  it('should reach min zoom level', () => {
    service.zoomLevel.set(0.55);
    service.zoomOut();
    expect(service.zoomLevel()).toBe(0.5);
  });
});
