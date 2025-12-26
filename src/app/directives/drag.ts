import { Directive, ElementRef, inject, input, output } from '@angular/core';
import { finalize, fromEvent, map, Subscription, switchMap, takeUntil, tap } from 'rxjs';

/** Директива для перетаскивания */
@Directive({
  selector: '[appDrag]',
})
export class Drag {
  private readonly _elementRef = inject(ElementRef);

  /** Подписка для каждой аннотации */
  private subscriptions = new Subscription();
  /** Координаты X,Y */
  private coordinates: { x: number; y: number };

  /** Событие при окончании перетаскивания */
  handleDrag = output<{ x: number; y: number }>();

  /** @inheritdoc */
  ngOnInit() {
    const element = this._elementRef.nativeElement;

    if (!element) return;

    const mousedown$ = fromEvent<PointerEvent>(element, 'mousedown');
    const mousemove$ = fromEvent<PointerEvent>(document, 'mousemove');
    const mouseup$ = fromEvent<PointerEvent>(document, 'mouseup');

    const drag$ = mousedown$.pipe(
      switchMap((start) => {
        const startX = start.clientX;
        const startY = start.clientY;
        const initialLeft = parseInt(element.style.left) || 0;
        const initialTop = parseInt(element.style.top) || 0;

        return mousemove$.pipe(
          map((move) => ({
            x: initialLeft + (move.clientX - startX),
            y: initialTop + (move.clientY - startY),
          })),
          tap((move) => (this.coordinates = { x: move.x, y: move.y })),
          takeUntil(mouseup$),
          finalize(() => this.handleDrag.emit(this.coordinates)),
        );
      }),
    );

    this.subscriptions.add(
      drag$.subscribe((pos) => {
        element.style.left = `${pos.x}px`;
        element.style.top = `${pos.y}px`;
      }),
    );
  }
}
