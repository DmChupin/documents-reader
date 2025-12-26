import { Injectable, signal } from '@angular/core';
import { Tool } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ReaderFeatureService {
  activeTool = signal<Tool>(Tool.Pointer);

  selectTool(tool: Tool): void {
    this.activeTool.set(tool);
  }
}
