exports.setAuthTokenCookie = function (res, jwt) {
  res.cookie(
    'token',
    jwt,
    { maxAge: 900000, httpOnly: true, sameSite: 'strict' }
  );
};
