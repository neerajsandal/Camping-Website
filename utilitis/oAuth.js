const GoogleUser = require('../models/user');

exports.authUser = async (req, accessToken, refreshToken, profile, done) => {
  try {
    if (!req.user) {
      const googleUser = await GoogleUser.findOne({ googleId: profile.id });
      if (googleUser) {
        console.log(googleUser)
        return done(null, googleUser);
      }
      const newGoogleUser = new GoogleUser({
        googleId: profile.id,
        google_token: accessToken,
        email: profile.email,
        username: profile.email.split('@')[0],
        isVerified: true,
        expires: undefined
      });
      await newGoogleUser.save();
      return done(null, newGoogleUser);
    } else {
      return done(null, false, req.flash('error', 'You are already logged in'));
    }
  } catch (err) {
    req.flash('error', err.message);
    return done(err, null);
  }
}