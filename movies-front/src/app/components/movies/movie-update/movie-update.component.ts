import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/api/movie.service';

@Component({
  selector: 'app-movie-update',
  templateUrl: './movie-update.component.html',
  styleUrls: ['./movie-update.component.scss']
})
export class MovieUpdateComponent implements OnInit {
  movie: Movie;
  constructor(private movieService: MovieService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.getMovie(params['id']);
    });
  }

  getMovie(id: string) {
    this.movieService.getById(id).subscribe(movie => {
      this.movie = movie;
    });
  }

  updateMovie(movie: Movie) {
    movie._id = this.movie._id;
    this.movieService.update(movie).subscribe(res => {
      this.router.navigate([`/movies/${this.movie._id}`]);
    });
  }

  onCancel() {
    this.router.navigate([`/movies/${this.movie._id}`]);
  }
}
