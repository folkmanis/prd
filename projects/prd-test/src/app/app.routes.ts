import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'input-test',
    loadComponent: () =>
      import('./input-test/input-test.component').then(
        (c) => c.InputTestComponent
      ),
  },
];
