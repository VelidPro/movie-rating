import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TvMovie } from './models/tv-movie';
import { TvShow } from './models/tv-show';
import { TvMovieApiService } from './services/api/tv-movie.service';
import { TvShowApiService } from './services/api/tv-show.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  tvMovies: TvMovie[];
  tvShows: TvShow[];
  isTvShows: boolean = false;
  searchActive: boolean = false;
  formGroup: FormGroup;

  constructor(
    private tvMovieService: TvMovieApiService,
    private tvShowService: TvShowApiService
  ) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      search: new FormControl(''),
      toggle: new FormControl(false),
    });

    this.tvMovieService
      .getTvMovie()
      .pipe()
      .subscribe((data) => {
        this.tvMovies = data;
      });

    this.formGroup.controls.search.valueChanges.subscribe((term) => {
      if (term.length >= 2) {
        this.searchActive = true;
        if (!this.formGroup.controls.toggle.value)
          this.tvMovieService.search(term).subscribe((data) => {
            this.tvMovies = data;
            for (let item of data) {
              item.calculatedRating = Math.round(
                (item.rating + item.yourRate) / 2
              );
            }
            this.tvMovies.sort(this.compare);
          });
        else {
          this.tvShowService.search(term).subscribe((data) => {
            this.tvShows = data;
            this.tvShows.sort(this.compare);
          });
        }
      } else {
        this.searchActive = false;
      }
    });
  }
  compare(a:any, b:any) {
    if (a.calculatedRating > b.calculatedRating) return -1;
    if (b.calculatedRating > a.calculatedRating) return 1;
  
    return 0;
  }
}
