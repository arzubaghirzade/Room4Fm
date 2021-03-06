import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/index';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class HttpsService {
  headers = new HttpHeaders().set('Content-type', 'text/plain');
  post_headers = new HttpHeaders().set('Content-type', 'text/plain');
  constructor() {}

  private rootUrl: string = environment.host;

  get(
    http: HttpClient,
    resourceUrl: string,
    params: any = {},
    headers: any = {}
  ): Observable<any> {
    return http.get<Response>(this.rootUrl + '/' + resourceUrl, {
      params,
      headers
    });
  }

  getExcel(
    http: HttpClient,
    resourceUrl: string,
    params: any = {},
    headers: any = {}
  ): Observable<any> {
    return http.get<Response>(this.rootUrl + '/' + resourceUrl, {
      params: params,
      headers: headers,
      // responseType: 'blob',
    });
  }
  postExcel(
    http: HttpClient,
    resourceUrl: string,
    params: any
  ): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'blob'
    });

    return http.post<Response>(this.rootUrl + '/' + resourceUrl, {
      // params: params,
      // headers: headers,
      headers: { 'Content-Type': 'blob' },

    });
  }

  post(
    http: HttpClient,
    resourceUrl: string,
    item: any,
    params: any = {}
  ): Observable<any> {
    return http.post<Response>(this.rootUrl + '/' + resourceUrl, item, {
      params: params,
    });
  }

  put(
    http: HttpClient,
    resourceUrl: string,
    item: any,
    params: any = {}
  ): Observable<any> {
    return http.put<Response>(this.rootUrl + '/' + resourceUrl, item, {
      params: params,
    });
  }

  delete(
    http: HttpClient,
    resourceUrl: string,
    params: any = {}
  ): Observable<any> {
    return http.delete<Response>(this.rootUrl + '/' + resourceUrl, {
      params: params,
    });
  }
}
