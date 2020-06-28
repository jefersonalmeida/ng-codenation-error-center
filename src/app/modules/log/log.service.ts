import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Log } from './log.interface';
import { environment } from '../../../environments/environment';
import { Search } from '../../shared/interfaces/search.interface';
import { ResponseEntity, ResponsePageable } from '../../shared/interfaces/response.interface';

const RESOURCE_URL = `${environment.apiUrl}/events`;

@Injectable({
  providedIn: 'root',
})
export class LogService {
  public form: FormGroup;

  constructor(
    public http: HttpClient,
    private fb: FormBuilder,
    private notification: ToastrService,
  ) {
  }

  index(searchQuery: Search): Observable<ResponsePageable<Log>> {
    let params = new HttpParams();
    if (searchQuery.search) {
      params = params.append('search', searchQuery.search);
    }
    if (searchQuery.level) {
      params = params.append('level', searchQuery.level);
    }
    if (searchQuery.sort) {
      params = params.append('sort', searchQuery.sort);
    }
    if (searchQuery.order) {
      params = params.append('order', searchQuery.order);
    }
    if (searchQuery.number) {
      params = params.append('page', searchQuery.number.toString());
    }
    if (searchQuery.size) {
      params = params.append('size', searchQuery.size.toString());
    }

    return this.http.get<ResponsePageable<Log>>(`${RESOURCE_URL}`, { params });
  }

  find(key: number | string): Observable<ResponseEntity<Log>> {
    return this.http.get<ResponseEntity<Log>>(`${RESOURCE_URL}/${key}`);
  }

  store(model: Log): Observable<ResponseEntity<Log>> {
    return this.http.post<ResponseEntity<Log>>(`${RESOURCE_URL}`, model).pipe(
      tap(_ => this.notification.success(`${model.description} cadastrado com sucesso!`)),
    );
  }

  update(model: Log): Observable<ResponseEntity<Log>> {
    return this.http.put<ResponseEntity<Log>>(`${RESOURCE_URL}/${model.id}`, model).pipe(
      tap(_ => this.notification.success(`${model.description} atualizado com sucesso!`)),
    );
  }

  delete(model: Log): Observable<void> {
    return this.http.delete<void>(`${RESOURCE_URL}/${model.id}`).pipe(
      tap(_ => this.notification.success(`Permissão [${model.description}] deletado com sucesso!`)),
    );
  }
}
