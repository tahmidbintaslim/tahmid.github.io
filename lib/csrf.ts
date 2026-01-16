import { csrf } from 'tiny-csrf';
import { NextApiResponse, NextApiRequest } from 'next';
import cookie from 'cookie';

export const csrfProtection = (req: NextApiRequest, res: NextApiResponse) => {
  const cookies = cookie.parse(req.headers.cookie || '');
  const secret = process.env.CSRF_SECRET || 'a-very-secret-string-that-is-at-least-32-characters-long';
  return csrf({
    secret,
    cookie: {
      name: '_csrf',
      ...cookies,
    },
  })(req, res);
};
