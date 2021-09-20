import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../search.component';
import { SearchRoutingModule } from './search-routing.module';
import { SharedModule } from 'src/shared/modules/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemoNgZorroAntdModule } from 'src/app/ng-zorro-antd.module';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [
    SearchComponent,
  ],
  imports: [
    CommonModule,
    SearchRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgxPaginationModule,
    DemoNgZorroAntdModule
  ]
})
export class SearchModule { }
