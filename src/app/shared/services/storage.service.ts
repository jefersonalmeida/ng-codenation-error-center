import { User } from '../interfaces/user.interface';

export class StorageService {
  static clear() {
    localStorage.clear();
  }

  static setUser(data) {
    localStorage.setItem('user', JSON.stringify(data));
  }

  static getUser(): User | null {
    return localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
      : null;
  }

  static setCompanyDefault(data) {
    localStorage.setItem('company_default', JSON.stringify(data));
  }

  static getCompanyDefault(): any | null {
    return localStorage.getItem('company_default')
      ? JSON.parse(localStorage.getItem('company_default'))
      : null;
  }

  static setEmitterNFeData(uuid, data) {
    StorageService.set(`emitter_nfe_data_${uuid}`, data);
  }

  static getEmitterNFeData(uuid): any | null {
    return StorageService.get(`emitter_nfe_data_${uuid}`);
  }

  static clearEmitterNFeData(uuid): any | null {
    return StorageService.del(`emitter_nfe_data_${uuid}`);
  }

  static setConfigDataDefault(data) {
    StorageService.set('config_data_default', data);
  }

  static getConfigDataDefault(): any | null {
    return StorageService.get('config_data_default');
  }

  static setConfigFormSearch(data) {
    StorageService.set('config_form_search', data);
  }

  static getConfigFormSearch(): any | null {
    return StorageService.get('config_form_search');
  }

  private static get(name: string): any {
    return localStorage.getItem(name) ? JSON.parse(localStorage.getItem(name)) : null;
  }

  private static set(name: string, data: any): void {
    localStorage.setItem(name, JSON.stringify(data));
  }

  private static del(name: string): void {
    localStorage.removeItem(name);
  }
}
