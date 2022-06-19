function authCheck (req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  console.log('authcheck failed')
  req.flash('warning_msg', 'Please login in.')
  res.redirect('/users/login')
}

export default authCheck
