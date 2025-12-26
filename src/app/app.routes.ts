import { Routes } from '@angular/router';
import { Reader } from './pages';

export const routes: Routes = [
  {
    path: 'reader/:documentId/view',
    component: Reader,
  },
  /** @note В идеале надо редиректить на список документов, но на данном этапе такой компонент отсутствует */
  {
    path: '**',
    redirectTo: 'reader/1/view',
  },
];
