import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable, of} from 'rxjs';
import { AppService } from 'src/services/app/app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit { 
  tracks?:any;
  innerWidth: any;
  pagination_data = {
    total: 0
  };
  size?: any;
  p: number = 1;
  products$?:Observable<any>; 
  constructor(private appService: AppService,
    private viewPortScroller: ViewportScroller){  }

  ngOnInit(): void{
    this.imageSize(window.innerWidth);
    this.appService.getList('?method=chart.gettoptracks',{page: 1, limit: 30}).subscribe(res => {
      this.pagination_data = res.tracks['@attr'];
      this.tracks = res.tracks.track;
      this.products$ = of(this.tracks);   
    });
  }
    onResize(event: any) {
      this.innerWidth = event.target.window.innerWidth; 
      this.imageSize(this.innerWidth);
    }
    imageSize(width: any) {
      if(width <= 567) {this.size = 'small'}
      else if(width > 567 && width <= 768) {this.size = 'medium'}  
      else if(width > 768 && width <= 1000) {this.size = 'large'}  
      else if(width > 1000 && width <= 1600) {this.size = 'extralarge'}   
      else if(width > 1600 ) {this.size = 'extralarge'}  
    }
    pageChanged(page: any) {
      this.p = page;
      this.appService.getList('?method=chart.gettoptracks', {page, limit: 30 }).subscribe(res => {
        this.pagination_data = res.tracks['@attr'];
        this.tracks = res.tracks.track;
        this.products$ = of(this.tracks);   
      });
    }
}
