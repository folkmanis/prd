import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'input-test',
    loadComponent: () =>
      import('./input-test/input-test.component').then(
        (c) => c.InputTestComponent
      ),
  },
  {
    path: 'plus-sign-pipe',
    loadComponent: () =>
      import('./plus-sign-pipe/plus-sign-pipe.component').then(
        (c) => c.PlusSignPipeComponent
      ),
  },
];
