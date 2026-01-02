import { Directive, ElementRef, inject, input, output } from '@angular/core';
import { finalize, fromEvent, map, Observable, switchMap, takeUntil, tap } from 'rxjs';
import { ReaderFeatureService } from '../services';

/** Директива для перетаскивания */
@Directive({
  selector: '[appDrag]',
})
export class Drag {
  private readonly _readerFeatureService = inject(ReaderFeatureService);
  private readonly _elementRef = inject(ElementRef);
  private readonly _zoomLevel = this._readerFeatureService.zoomLevel;

  /** Координаты X,Y */
  private coordinates: { x: number; y: number };

  /** Событие при окончании перетаскивания */
  handleDrag = output<{ x: number; y: number }>();

  ngOnInit() {
    const element = this._elementRef.nativeElement;

    if (!element) return;

    this.handleMouse(element);
    this.handleTouch(element);
  }

  private handleMouse(element: HTMLDivElement): void {
    const mousedown$ = fromEvent<PointerEvent>(element, 'mousedown');
    const mousemove$ = fromEvent<PointerEvent>(document, 'mousemove');
    const mouseup$ = fromEvent<PointerEvent>(document, 'mouseup');

    const drag$ = mousedown$.pipe(
      switchMap((start) => {
        const { initialLeft, initialTop, startX, startY } = this.getCoordinates(element, start);

        return mousemove$.pipe(
          map((move) => ({
            x: initialLeft + (move.clientX - startX) / this._zoomLevel(),
            y: initialTop + (move.clientY - startY) / this._zoomLevel(),
          })),
          tap((move) => (this.coordinates = { x: move.x, y: move.y })),
          takeUntil(mouseup$),
          finalize(() => this.handleDrag.emit(this.coordinates)),
        );
      }),
    );

    this.subscribeDrag(drag$, element);
  }

  private handleTouch(element: HTMLDivElement): void {
    const touchstart$ = fromEvent<TouchEvent>(element, 'touchstart');
    const touchmove$ = fromEvent<TouchEvent>(document, 'touchmove');
    const touchend$ = fromEvent<TouchEvent>(document, 'touchend');

    const drag$ = touchstart$.pipe(
      switchMap((start) => {
        const { initialLeft, initialTop, startX, startY } = this.getCoordinates(element, start);

        return touchmove$.pipe(
          map((move) => ({
            x: initialLeft + (move.touches[0].clientX - startX) / this._zoomLevel(),
            y: initialTop + (move.touches[0].clientY - startY) / this._zoomLevel(),
          })),
          tap((move) => (this.coordinates = { x: move.x, y: move.y })),
          takeUntil(touchend$),
          finalize(() => this.handleDrag.emit(this.coordinates)),
        );
      }),
    );

    this.subscribeDrag(drag$, element);
  }

  /** Координаты элемента и pointer-а */
  private getCoordinates(
    element: HTMLDivElement,
    event: TouchEvent | PointerEvent,
  ): { initialLeft: number; initialTop: number; startX: number; startY: number } {
    const initialLeft = parseInt(element.style.left) || 0;
    const initialTop = parseInt(element.style.top) || 0;
    const startX = event instanceof TouchEvent ? event.touches[0].clientX : event.clientX;
    const startY = event instanceof TouchEvent ? event.touches[0].clientY : event.clientY;

    return {
      initialLeft,
      initialTop,
      startX,
      startY,
    };
  }

  private subscribeDrag(
    drag$: Observable<{ x: number; y: number }>,
    element: HTMLDivElement,
  ): void {
    drag$.subscribe((position) => {
      element.style.left = `${position.x}px`;
      element.style.top = `${position.y}px`;
    });
  }
}
