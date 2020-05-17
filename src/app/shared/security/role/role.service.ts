import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Search } from '../../interfaces/search.interface';
import { Permission } from '../permissions/permission.interface';
import { Role } from './role.interface';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  public form: FormGroup;

  constructor(
    public http: HttpClient,
    private fb: FormBuilder,
    private notification: ToastrService,
  ) {
  }

  index(searchQuery: Search): Observable<Role[] | any> {
    return this.http.get<Role[] | any>(`${API_URL}/roles`, {
      params: new HttpParams()
        .set('search', searchQuery.search)
        .set('sortedBy', searchQuery.sortedBy)
        .set('orderBy', searchQuery.orderBy)
        .set('page', searchQuery.current_page.toString())
        .set('limit', searchQuery.per_page.toString()),
    });
  }

  listRoles(): Observable<Role[] | any> {
    return this.http.get<Role[] | any>(`${API_URL}/list/roles`);
  }

  find(key: number | string): Observable<Role> {
    return this.http.get<Role>(`${API_URL}/roles/${key}`, {
      params: new HttpParams().set('include', 'permissions'),
    });
  }

  store(entity: Role): Observable<Role> {
    return this.http.post<Role>(`${API_URL}/roles`, entity).pipe(
      tap(_ => this.notification.success(`${entity.display_name} cadastrado com sucesso!`)),
    );
  }

  update(entity: Role): Observable<Role> {
    return this.http.put<Role>(`${API_URL}/roles/${entity.id}`, entity).pipe(
      tap(_ => this.notification.success(`${entity.display_name} atualizado com sucesso!`)),
    );
  }

  delete(entity: Role): Observable<void> {
    return this.http.delete<void>(`${API_URL}/roles/${entity.id}`).pipe(
      tap(_ => this.notification.success(`Grupo [${entity.display_name}] deletado com sucesso!`)),
    );
  }

  updatePermission(entity: Permission, id: number): Observable<Role> {
    return this.http.put<Role>(`${API_URL}/roles/${id}/permission`, entity).pipe(
      tap(_ => this.notification.success(`${entity.display_name} atualizada com sucesso!`)),
    );
  }
}
