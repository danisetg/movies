import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Comment } from 'src/app/models/comment.model';
import { Movie } from 'src/app/models/movie.model';
import { CommentService } from 'src/app/services/api/comment.service';
import { MovieService } from 'src/app/services/api/movie.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  movie: Movie;
  comments: Comment[];
  constructor(private movieService: MovieService, private route: ActivatedRoute,
              public authService: AuthService,
              private commentService: CommentService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.getMovie(params['id']);
      this.getComments(params['id']);
    });
  }

  getMovie(id: string) {
    this.movieService.getById(id).subscribe(movie => {
      this.movie = movie;
    });
  }

  getComments(movie_id: string) {
    this.commentService.list({movie_id: movie_id}).subscribe(comments => {
        this.comments = comments;
        console.log(this.comments);
    });
  }

  postComment(comment: Comment) {
    comment.movie_id = this.movie._id;
    this.commentService.create(comment).subscribe(res => {
      this.comments.push(comment);
    });
  }

  deleteMovie() {
    if(this.movie._id)
      this.movieService.delete(this.movie._id).subscribe(res => {
        this.router.navigate(['/movies']);
      });
  }

}
