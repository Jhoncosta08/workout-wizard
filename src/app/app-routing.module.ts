import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from './guards/auth.guard';


const routes: Routes = [
  //DEFAULT REDIRECT ROUTE
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  //-----


  //ADMIN ROUTES
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
  //-----


  //AUTH ROUTES
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
  //-----


  //EXERCISES ROUTES
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
    canActivate: [AuthGuard]
  },
  //-----


  //WORKOUTS ROUTES
  {
    path: 'user-add-workout',
    loadChildren: () => import('./pages/user/user-add-workout/user-add-workout.module').then( m => m.UserAddWorkoutPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'user-workout',
    children: [
      {
        path: ':id',
        loadChildren: () => import('./pages/user/user-workout/user-workout.module').then( m => m.UserWorkoutPageModule)
      }
    ],
    canActivate: [AuthGuard]
  },
  //-----


  //PROFILE ROUTES
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-profile',
    loadChildren: () => import('./pages/profile/edit-profile/edit-profile.module').then( m => m.EditProfilePageModule),
  },
  //-----


  //OTHER ROUTES
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  //-----


  //404 ROUTE
  {
    path: '**',
    loadChildren: () => import('./pages/not-found/not-found.module').then( m => m.NotFoundPageModule)
  }
  //-----
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})


export class AppRoutingModule { }
