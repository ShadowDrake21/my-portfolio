import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.component').then((c) => c.HomeComponent),
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./pages/profile/profile.component').then(
        (c) => c.ProfileComponent
      ),
  },
  {
    path: 'projects',
    loadComponent: () =>
      import('./pages/projects/projects.component').then(
        (c) => c.ProjectsComponent
      ),
  },
  {
    path: 'contacts',
    loadComponent: () =>
      import('./pages/contact-me/contact-me.component').then(
        (c) => c.ContactMeComponent
      ),
  },
  {
    path: '**',
    redirectTo: '/home',
  },
];
