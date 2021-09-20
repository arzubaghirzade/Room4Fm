import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  api_key = '82833a061cb03268fc7702d40e8d5a9f';
  constructor() { }
  intercept(request: HttpRequest <any>, next: HttpHandler): Observable <HttpEvent <any>> {
     request = request.clone({url: request.url.replace(request.url, request.url + `&api_key=${this.api_key}&format=json`)});
    return next.handle(request);
}
}