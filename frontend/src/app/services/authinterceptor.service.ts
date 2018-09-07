import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthinterceptorService implements HttpInterceptor {
  constructor(private injector: Injector) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // const token = localStorage.getItem('token');а можно через inject

    const token = this.injector.get(AuthService);

    const tokenReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token.getToken()}`
      }
    });
    return next.handle(tokenReq);
  }
}
