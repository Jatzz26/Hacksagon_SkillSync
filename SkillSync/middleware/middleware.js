module.exports.setAuthFlag = (req, res, next) => {
  res.locals.isAuthenticated = !!req.session.user;
  res.locals.currentUser = req.session.user || null;
  next();
};