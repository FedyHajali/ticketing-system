import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const login = 'auth/login/';
    const registration = 'auth/registration/';
    const groups = 'auth/group-list/';
    if (
      req.url.search(login) === -1 &&
      req.url.search(registration) === -1 &&
      req.url.search(groups) === -1
    ) {
      req = req.clone({
        setHeaders: {
          'Content-Type': 'application/json; charset=utf-8',
          Accept: 'application/json',
          Authorization: 'Token ' + sessionStorage.getItem('token'),
        },
      });
    }

    return next.handle(req);
  }
}
