import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Movie } from 'src/app/models/movie.model';

import { MovieDetailsComponent } from '../movie-details/movie-details.component';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.scss']
})
export class MovieFormComponent implements OnInit {
  @Input() movie: Movie;
  @Input() title: string;
  @Output() submitEvent: EventEmitter<Movie> = new EventEmitter();
  @Output() cancelEvent: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
    if(!this.movie)
      this.movie = {};
  }

  onSubmit(movie: Movie) {
    this.submitEvent.emit(movie);
  }

  onCancel() {
    this.cancelEvent.emit();
  }

}
