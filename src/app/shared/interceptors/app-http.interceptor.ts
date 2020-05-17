import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { isArray, isObject } from '../pipes/utils/utils';
import { AuthService } from '../security/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AppHttpInterceptor implements HttpInterceptor {

  private authService: AuthService;
  private notification: ToastrService;
  private DEFAULT_MESSAGE = 'Recebemos um erro ao tentar processar a sua requisição';

  constructor(private injector: Injector) {
    this.authService = this.injector.get(AuthService);
    this.notification = this.injector.get(ToastrService);
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = this.updateHeaders(request);
    return next.handle(request).pipe(
      catchError(error => this.handleErrorGlobal(error)),
    );
  }

  private updateHeaders(request: HttpRequest<any>) {
    if (this.authService.accessToken) {
      request = request.clone({
        headers: request.headers.append('Authorization', `Bearer ${this.authService.accessToken}`),
      });
    }
    if (!request.headers.has('Accept')) {
      request = request.clone({
        headers: request.headers.append('Accept', 'application/json'),
      });
    }
    return request;
  }

  private handleErrorGlobal(error): Observable<HttpEvent<any>> {
    if (!navigator.onLine) {
      this.showError('Desculpe, você está off-line');
    }
    if (error instanceof HttpErrorResponse) {
      console.log('handleErrorGlobal', error);
      if (error.status === 400 && error.error && isObject(error.error.message)) {
        const data = error.error.message;
        Object.keys(data).map(fieldName => {
          if (isArray(data[fieldName])) {
            Object.keys(data[fieldName]).map(i => {
              this.showError(data[fieldName][i]);
            });
          }
        });
      } else if (error.status === 401 && error.error && error.error.error === 'Unauthenticated.') {
        this.showError(this.DEFAULT_MESSAGE);
        this.authService.logout();
        this.authService.goToLogin();
      } else {
        this.showError(error.error.message || this.DEFAULT_MESSAGE);
      }
    }
    return throwError('');
  }

  private showError(message: string) {
    const notificationService = this.injector.get(ToastrService);
    notificationService.error(message ? message : this.DEFAULT_MESSAGE);
  }
}
