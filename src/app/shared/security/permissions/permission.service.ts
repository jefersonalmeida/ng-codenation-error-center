import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Search } from '../../interfaces/search.interface';
import { Permission } from './permission.interface';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  public form: FormGroup;

  constructor(
    public http: HttpClient,
    private fb: FormBuilder,
    private notification: ToastrService,
  ) {
  }

  index(searchQuery: Search): Observable<Permission[] | any> {
    return this.http.get<Permission[] | any>(`${API_URL}/permissions`, {
      params: new HttpParams()
        .set('search', searchQuery.search)
        .set('sortedBy', searchQuery.sort)
        .set('orderBy', searchQuery.order)
        .set('page', searchQuery.number.toString())
        .set('limit', searchQuery.size.toString()),
    });
  }

  find(key: number | string): Observable<Permission> {
    return this.http.get<Permission>(`${API_URL}/permissions/${key}`);
  }

  store(model: Permission): Observable<Permission> {
    return this.http.post<Permission>(`${API_URL}/permissions`, model).pipe(
      tap(_ => this.notification.success(`${model.display_name} cadastrado com sucesso!`)),
    );
  }

  update(model: Permission): Observable<Permission> {
    return this.http.put<Permission>(`${API_URL}/permissions/${model.id}`, model).pipe(
      tap(_ => this.notification.success(`${model.display_name} atualizado com sucesso!`)),
    );
  }

  delete(model: Permission): Observable<void> {
    return this.http.delete<void>(`${API_URL}/permissions/${model.id}`).pipe(
      tap(_ => this.notification.success(`Permissão [${model.display_name}] deletado com sucesso!`)),
    );
  }
}
