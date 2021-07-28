import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { MovieCreateComponent } from './components/movies/movie-create/movie-create.component';
import { MovieDetailsComponent } from './components/movies/movie-details/movie-details.component';
import { MovieUpdateComponent } from './components/movies/movie-update/movie-update.component';
import { MoviesListComponent } from './components/movies/movies-list/movies-list.component';
import { GuardService } from './services/auth/guard.service';

const routes: Routes = [
  {
    path: '', redirectTo: 'movies', pathMatch: 'full',
  },
  {path: "login", component: LoginComponent},
  {path: "logout", component: LogoutComponent},
  {
    path: 'movies', component: MoviesListComponent
  },
  {
    path: 'movies/create', component: MovieCreateComponent, canActivate: [GuardService]
  },
  {
    path: 'movies/:id', component: MovieDetailsComponent
  },
  {
    path: 'movies/:id/update', component: MovieUpdateComponent, canActivate: [GuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
