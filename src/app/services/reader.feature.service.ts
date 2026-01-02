import { Injectable, signal } from '@angular/core';
import { Tool } from '../models';

/** Уровень изменения зума */
const ZOOM_CHANGE_LEVEL = 0.1;
/** Минимальный уровень зума */
const ZOOM_MIN_LEVEL = 0.5;
/** Максимальный уровень зума */
const ZOOM_MAX_LEVEL = 2;
/** Уровень зума по умолчанию */
const BASE_ZOOM_LEVEL = 1;

/** Feature-сервис для работы с просмотром документа */
@Injectable({
  providedIn: 'root',
})
export class ReaderFeatureService {
  readonly activeTool = signal<Tool>(Tool.Pointer);
  readonly zoomLevel = signal<number>(BASE_ZOOM_LEVEL);

  selectTool(tool: Tool): void {
    this.activeTool.set(tool);
  }

  zoomOut(): void {
    this.zoomLevel.set(Math.max(this.zoomLevel() - ZOOM_CHANGE_LEVEL, ZOOM_MIN_LEVEL));
  }

  zoomIn(): void {
    this.zoomLevel.set(Math.min(this.zoomLevel() + ZOOM_CHANGE_LEVEL, ZOOM_MAX_LEVEL));
  }
}
