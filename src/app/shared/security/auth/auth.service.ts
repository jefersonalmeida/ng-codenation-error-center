import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { User } from '../../interfaces/user.interface';
import { AnalyticsService } from '../../services/analytics.service';
import { StorageService } from '../../services/storage.service';
import {
  ForgotPasswordEmailDTO,
  ForgotPasswordRecoverDTO,
  ForgotPasswordResetDTO,
  LoginDTO,
  RegisterDTO,
  TokenDTO,
} from './auth.interface';
import { ResponseEntity } from '../../interfaces/response.interface';

const API_URL = environment.apiUrl;
const SOCIAL_REDIRECT = environment.socialRedirect;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private notification: ToastrService,
  ) {
  }

  get accessToken(): string {
    return localStorage.getItem('access_token') ? localStorage.getItem('access_token') : null;
  }

  set accessToken(value: string) {
    localStorage.setItem('access_token', value);
  }

  get user(): User {
    return StorageService.getUser();
  }

  set user(data: User) {
    StorageService.setUser(data);
  }

  public logout(): void {
    StorageService.clear();
  }

  public destroyToken(): Observable<any> {
    this.notification.info(`Até mais ${this.user.name}! Esperamos que volte logo :)`);
    localStorage.clear();
    return of(true);
    /*return this.httpClient.get<any>(`${API_URL}/auth/logout`).pipe(
      map((result: any) => {
        this.notification.info(result.message);
        localStorage.clear();
        return result;
      }),
    );*/
  }

  public register(entity: RegisterDTO): Observable<ResponseEntity<User>> {
    AnalyticsService.eventEmitter('register', 'engagement', 'Registrar', 1);
    return this.httpClient
      .post<ResponseEntity<User>>(`${API_URL}/auth/register`, entity)
      .pipe(
        map((response: ResponseEntity<User>) => {
            this.notification.success(`Seja bem-vindo(a) ${response.data.name}!`);
            return response;
          },
        ),
      );
  }

  public activate(token: string): Observable<User> {
    AnalyticsService.eventEmitter('activate', 'engagement', 'Ativar Conta', 1);
    return this.httpClient
      .get<TokenDTO>(`${API_URL}/auth/activate/${token}`)
      .pipe(
        map((result: TokenDTO) => {
          this.accessToken = result.access_token;
          this.user = result.user;
          this.notification.success(`${this.user.name}, sua conta foi ativada com sucesso!`);
          return this.user;
        }),
      );
  }

  public login(credentials: LoginDTO): Observable<User> {
    AnalyticsService.eventEmitter('login', 'engagement', 'Login', 1);
    const body = {
      email: credentials.email,
      password: credentials.password,
    };
    return this.httpClient.post<ResponseEntity<TokenDTO>>(`${API_URL}/auth/login`, body).pipe(
      map((result: ResponseEntity<TokenDTO>) => {
        this.accessToken = result.data.token;
        this.user = result.data.user;
        return this.user;
      }),
    );
  }

  public whoami(): Observable<User> {
    if (this.accessToken) {
      return this.httpClient.get<ResponseEntity<User>>(`${API_URL}/auth/whoami`).pipe(
        map((response: ResponseEntity<User>) => {
          this.user = response.data;
          return response.data;
        }),
      );
    }
    return of(null);
  }

  public forgotReset(forgotPasswordResetDTO: ForgotPasswordResetDTO): Observable<any> {
    AnalyticsService.eventEmitter('forgotReset', 'engagement', 'Resetar Senha', 1);
    return this.httpClient
      .post<{ message: string }>(`${API_URL}/auth/reset`, forgotPasswordResetDTO)
      .pipe(tap(response => this.notification.success(response.message)));
  }

  public forgotEmail(forgotDTO: ForgotPasswordEmailDTO): Observable<any> {
    AnalyticsService.eventEmitter('forgotEmail', 'engagement', 'Esqueci Senha', 1);
    return this.httpClient
      .post<{ message: string }>(`${API_URL}/auth/email`, forgotDTO)
      .pipe(tap(response => this.notification.success(response.message)));
  }

  public forgotRecover(forgotDTO: ForgotPasswordRecoverDTO): Observable<any> {
    AnalyticsService.eventEmitter('forgotRecover', 'engagement', 'Esqueci Senha', 1);
    return this.httpClient
      .get<{ message: string }>(`${API_URL}/auth/recover/${forgotDTO.token}`)
      .pipe(tap(response => this.notification.success(response.message)));
  }

  public goToLogin(email = '') {
    this.router.navigate([`/auth/login/${email}`]);
  }

  public loginSocial(provider: string = 'google') {
    window.location.href = `${API_URL}/auth/login/${provider}?redirect=${btoa(SOCIAL_REDIRECT)}`;
  }

  public loginSocialToken(token: string) {
    return this.httpClient
      .get<TokenDTO>(`${API_URL}/auth/login/social/${token}`)
      .pipe(
        map((result: TokenDTO) => {
          this.accessToken = result.access_token;
          this.user = result.user;
          this.notification.success(`Olá ${this.user.name}`);
          return this.user;
        }),
      );
  }
}
