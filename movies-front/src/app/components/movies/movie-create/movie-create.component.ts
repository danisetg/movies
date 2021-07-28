import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/api/movie.service';

@Component({
  selector: 'app-movie-create',
  templateUrl: './movie-create.component.html',
  styleUrls: ['./movie-create.component.scss']
})
export class MovieCreateComponent implements OnInit {

  constructor(private movieService: MovieService,
              private router: Router) { }

  ngOnInit(): void {
  }

  createMovie(movie: Movie) {
    this.movieService.create(movie).subscribe(res => {
      this.router.navigate(['/movies']);
    });
  }

  onCancel() {
    this.router.navigate(['/movies']);
  }
}
