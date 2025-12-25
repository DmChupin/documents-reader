import { Page } from './page.interface';

/** Документ для просмотра */
export interface UploadedDocument {
  /** Идентификатор */
  id: number;
  /** Наименование документа */
  name: string;
  /** Список страниц */
  pages: Page[];
}
