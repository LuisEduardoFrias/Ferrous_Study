const configCookies = {
  httpOnly: false,
  secure: process.env.NODE_ENV === 'production',
  SameSite: 'None',
  //sameSite: 'none',
  maxAge: 1000 * 60 * 60,
  path: '/'
};

export default configCookies;