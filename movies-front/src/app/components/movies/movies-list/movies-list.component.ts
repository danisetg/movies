import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/api/movie.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit {
  movies: Movie[] = [];
  loading = false;
  allLoaded = false;
  options = {
    q: '',
    limit: 30,
    page: 0
  };
  constructor(private movieService: MovieService, public authService: AuthService) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies() {
    this.loading = true;
    this.movieService.list(this.options).subscribe(movies => {
      this.movies.push(...movies);
      this.allLoaded = movies.length < this.options.limit;
      this.loading = false;
      console.log(this.movies);
    });
  }

  loadMore() {
    this.options.page++;
    this.getMovies();
  }

  filter() {
    this.options.page = 0;
    this.movies = [];
    this.getMovies();
  }

}
