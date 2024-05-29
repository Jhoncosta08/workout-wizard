import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'admin',
    children: [
      {
        path: 'create-workout',
        loadChildren: () => import('./pages/admin/create-workout/create-workout.module').then( m => m.CreateWorkoutPageModule)
      },
      {
        path: 'create-exercise/:id',
        loadChildren: () => import('./pages/admin/create-exercise/create-exercise.module').then( m => m.CreateExercisePageModule)
      },
    ],
    canActivate: [AuthGuard]
  },
  {
    path: 'welcome',
    loadChildren: () => import('./pages/auth/welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'create-account',
    loadChildren: () => import('./pages/auth/create-account/create-account.module').then( m => m.CreateAccountPageModule),
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'user-add-workout',
    loadChildren: () => import('./pages/user/user-add-workout/user-add-workout.module').then( m => m.UserAddWorkoutPageModule)
  },
  {
    path: 'exercise',
    children: [
      {
        path: ':id',
        loadChildren: () => import('./pages/exercise/exercises/exercises.module').then( m => m.ExercisesPageModule)
      },
      {
        path: 'detail/:name',
        loadChildren: () => import('./pages/exercise/exercise-detail/exercise-detail.module').then( m => m.ExerciseDetailPageModule)
      },
    ],
  },
  {
    path: '**',
    loadChildren: () => import('./pages/not-found/not-found.module').then( m => m.NotFoundPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
