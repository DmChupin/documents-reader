import { Routes } from '@angular/router';
import { Reader } from './pages';

export const routes: Routes = [
  {
    path: 'reader/:documentId/view',
    component: Reader,
  },
];
