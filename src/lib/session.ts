const SESSION_KEY = 'session_id';
import { validate } from 'uuid';

export const getSession = () => {
  const session = localStorage.getItem(SESSION_KEY);
  if (validate(session)) return session;
  return '';
};

export const setSession = (session) => {
  if (!validate(session)) {
    throw new Error('Session invalid UUID');
  }
  localStorage.setItem(SESSION_KEY, session);
};
