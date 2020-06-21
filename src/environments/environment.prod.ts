export const environment = {
  production: true,
  socialRedirect: 'https://codenation-java.jeferson.net.br/auth/social',
  apiUrl: 'https://codenation-error-center.herokuapp.com',
  levels: [
    { id: '', name: 'Todos', icon: 'fa fa-globe' },
    { id: 'ERROR', name: 'Erro', icon: 'fa fa-exclamation-circle text-danger' },
    { id: 'WARNING', name: 'Alerta', icon: 'fa fa-exclamation-triangle text-warning' },
    { id: 'INFO', name: 'Info', icon: 'fa fa-info-circle text-info' },
  ],
  services: {
    google: {
      analytics: { enabled: true, key: 'UA-122656524-5' },
    },
  },
};
