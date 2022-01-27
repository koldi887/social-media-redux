import React from 'react';
import { ROUTE } from '../../../../routes/routing';

export const dropdownElements = [
  {
    name: 'Profile',
    path: ROUTE.PROFILE,
    logo: <i className="fas fa-user-alt" />,
  },
  {
    name: 'Settings',
    path: ROUTE.SETTINGS,
    logo: <i className="fas fa-cog" />,
  },
  {
    name: 'Dialogs',
    path: ROUTE.DIALOGS,
    logo: <i className="fas fa-cog" />,
  },
  {
    name: 'Help',
    path: ROUTE.HELP,
    logo: <i className="far fa-question-circle" />,
  },
];
