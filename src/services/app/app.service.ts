import { Injectable, Injector } from '@angular/core';
import { HttpsService } from '../https/https.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/index';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AppService extends HttpsService {
  
  constructor(public http: HttpClient) {
    super();
  }
  public getList(route_url: string, params: any): Observable<any> {
    return this.get(this.http, route_url, params);
  }
 
  public trackByFn(index:any, item:any) {
    return index;
  }

  clean(obj:any) {
    for (const propName in obj) {
      if (
        obj[propName] === 'null' ||
        obj[propName] == 'null' ||
        obj[propName] === null ||
        obj[propName] === undefined ||
        obj[propName] === []
      ) {
        delete obj[propName];
      }
      if (obj[propName] === 'false') {
        obj[propName] = false;
      }
    }
  }

  cleanFormData(formData: any) {
    for (let pair of formData.entries()) {
      // tslint:disable-next-line: triple-equals
      if (pair[1] == 'undefined' || pair[1] == undefined || pair[1] == null) {
        formData.delete(pair[0]);
      }
    }
    return formData;
  }

  /**
  * Global Get Method
  * @param params
  * @param route_url
  */
  public getItem(params: any = {}, route_url:any): Observable<any> {
    return this.get(this.http, `${route_url}/${params.id}`, null);
  }
}