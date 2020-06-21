export const environment = {
  production: false,
  socialRedirect: 'http://localhost:4200/auth/social',
  apiUrl: 'http://localhost:8080',
  levels: [
    { id: '', name: 'Todos', icon: 'fa fa-globe' },
    { id: 'ERROR', name: 'Erro', icon: 'fa fa-exclamation-circle text-danger' },
    { id: 'WARNING', name: 'Alerta', icon: 'fa fa-exclamation-triangle text-warning' },
    { id: 'INFO', name: 'Info', icon: 'fa fa-info-circle text-info' },
  ],
  services: {
    google: {
      analytics: { enabled: false, key: 'UA-122656524-6' },
    },
  },
};
