import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, filter, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { AppService } from 'src/services/app/app.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  search_word = new FormControl();
  search_value?: string;
  results$?: Observable<any>;
  total = 0;
  pagination_data = {
    'opensearch:totalResults': 0
  };
  p: number = 1;
  constructor(private appService: AppService) {}
  ngOnInit() {
    this.search_word.valueChanges.pipe(
      map((value: string) => value.trim()),
      tap((value: string) => this.search_value = value),
      filter((value: string) => value.length > 1),
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(value => this.appService.getList('?method=track.search', {track: value}))
    ).subscribe(res => {
      this.results$ = of(res.results.trackmatches.track) ;
      this.pagination_data = res.results;
    },
    err => {
      console.error(err.error);
    });
  }
  pageChanged(page: any) {
    this.p = page;
    this.appService.getList('?method=track.search', { track: this.search_word, page, limit: 30 }).subscribe(res => {
     this.pagination_data = res.results;
      this.results$ = of(res.results.trackmatches.track) ;
    });
  }  
}
