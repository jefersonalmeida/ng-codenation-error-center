export class Util {
  static searchInObject(objects: object[], search: string | any, fields: any[], compare: string) {
    const res = [];
    objects.map(p => {

      let keys = [];
      if (fields.length > 0) {
        keys = fields;
      } else {
        keys = Object.keys(p);
      }
      keys.map(o => {
        if (p[o]
          && p[o].toString().toLowerCase().indexOf(search.toString().toLowerCase()) !== -1
          && !res.find(f => f[compare] === p[compare])) {
          res.push(p);
        }
      });
    });
    return res;
  }

  static stringRand(length = 10): string {
    let result = '';
    const char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charLength = char.length;
    for (let i = 0; i < length; i++) {
      result += char.charAt(Math.floor(Math.random() * charLength));
    }
    return result;
  }

  static date2Timestamp(value: string) {
    return value && Math.round(new Date(value).getTime() / 1000) || '';
  }

  static renderStyleNFeRow(status: number) {
    switch (status) {
      case 8:
        return 'bg-primary nfe-status-badge'; // autorizado
      case 9:
        return 'bg-warn nfe-status-badge'; // cancelado
      case 4:
        return 'bg-accent nfe-status-badge'; // error
    }
  }

  static validateUUID(value: any) {
    const uuid: RegExp = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuid.test(value);
  }
}
