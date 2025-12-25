/** Модель аннотации */
export interface AnnotationInfo {
  /** Идентификатор */
  id: string;
  /** Идентификатор документа */
  documentId: number;
  /** Позиция по оси X */
  x: number;
  /** Позиция по оси Y */
  y: number;
  /** Ширина */
  width: number;
  /** Высота */
  height: number;
  /** Содержимое */
  text: string;
  /** Время создания */
  createdAt: string;
}
