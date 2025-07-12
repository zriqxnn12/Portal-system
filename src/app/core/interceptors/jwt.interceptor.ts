import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/features/auth/services/auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class JWTInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const currentUserTokens = this.authService.getCurrentUserTokens;
    const user: any = this.authService.getCurrentUserData;
    let headers;
    if (currentUserTokens && currentUserTokens) {
      headers = req.headers.set('Authorization', `Bearer ${currentUserTokens}`);
    }

    const authReq = req.clone({ headers });
    return next.handle(authReq);
  }
}
