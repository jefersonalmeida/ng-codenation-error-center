import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'fa fa-dashboard',
  },
  {
    name: 'Segurança',
    url: '/security',
    icon: 'fa fa-lock',
    children: [
      {
        name: 'Grupos',
        url: '/security/roles',
        icon: 'fa fa-users',
      },
      {
        name: 'Usuários',
        url: '/security/users',
        icon: 'fa fa-users',
      },
      {
        name: 'Permissões',
        url: '/security/permissions',
        icon: 'fa fa-shield',
      },
    ],
  },
  {
    divider: true,
  },
  {
    title: true,
    name: 'Extras',
  },
  {
    name: 'Módulo X',
    url: '/dashboard',
    icon: 'icon-ban',
    badge: {
      variant: 'secondary',
      text: 'NOVO',
    },
    attributes: {disabled: true},
  },
  {
    name: '+55-65-99969-5873',
    url: 'https://wa.me/5565999695873',
    icon: 'fa fa-whatsapp',
    class: 'mt-auto',
    variant: 'success',
    attributes: {target: '_blank', rel: 'noopener'},
  },
];
