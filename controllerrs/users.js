const User = require('../models/user')

module.exports.getRegister = (req, res) => {
    //under the view directory
    res.render('users/register')
}
module.exports.postRegister = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registerUser = await User.register(user, password);
        req.login(registerUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome to CampSter!');
            res.redirect('/campgrounds');
        })
    }
    catch (e) {
        req.flash('error', e.message);
        res.redirect('/register')
    }
}

module.exports.getLogin = (req, res) => {
    res.render('users/login');
}

module.exports.postLogin = (req, res) => {
    req.flash('success', 'Welcome Back');
    const redirectedUrl = req.session.returnTo || '/campgrounds';
    // console.log(req.session.returnTo)
    delete req.session.returnTo;
    res.redirect(redirectedUrl)
}

module.exports.logout = (req, res) => {
    req.logout(req.user, err => {
        if (err) return next(err);
        req.flash('success', "Successfully Logged you Out!");
        res.redirect("/campgrounds");
    });
}