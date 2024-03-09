import {create} from 'zustand';
import secure from './secure';

import api from './api';

const useGlobal = create(set => ({
  // -------------------
  // Initiliazation
  // -------------------
  initialized: false,

  init: async () => {
    const credentials = await secure.get('credentials');

    if (credentials) {
      try {
        const response = await api({
          url: '/auth/signin/',
          method: 'POST',
          data: {
            username: credentials.username,
            password: credentials.password,
          },
        });

        if (response.status !== 200) {
          throw 'Authentication error';
        }

        const user = response.data.user;
        set(state => ({initialized: true, authenticated: true, user: user}));

        return;
      } catch (error) {
        console.log('Error', error);
      }
    }
    set(state => ({initialized: true}));
  },

  // -------------------
  // Authentication
  // -------------------

  authenticated: false,
  user: {},

  login: (credentials, user) => {
    secure.set('credentials', credentials);
    set(state => ({authenticated: true, user: user}));
  },

  logout: () => {
    secure.wipe();
    set(state => ({
      authenticated: false,
      user: {},
    }));
  },
}));

export default useGlobal;
