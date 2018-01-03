var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    md5 = require('md5'),
    passport = require('passport'),
    User = mongoose.model('User');

module.exports = function (app) {
    app.use('/admin/users', router);
};

module.exports.requireLogin = function (req, res, next) {
    if (req.user) {
        next();
    } else {
        req.flash('error', '只有登录用户才能访问');
        res.redirect('/admin/users/login');
    }
};


router.get('/login', function (req, res, next) {
    res.render('admin/user/login', {
    	pretty: true,
    });
});

router.post('/login', passport.authenticate('local', {
        failureRedirect: '/admin/users/login',
        failureFlash: '用户名或密码错误',
    }), 
    function (req, res, next) {
        console.log('user login success: ', req.body);
        res.redirect('/admin/posts');
    });

router.get('/register', function (req, res, next) {
    res.render('admin/user/register', {
    	pretty: true,
    });
});

router.post('/register', function (req, res, next) {
    req.checkBody('email', '邮箱不能为空').notEmpty().isEmail();
    req.checkBody('password', '密码不能为空').notEmpty();
    req.checkBody('confirmPassword', '两次密码不匹配').notEmpty().equals(req.body.password);

    var errors = req.validationErrors();
    if (errors) {
        console.log(errors);
        return res.render('admin/user/register', req.body);
    }

    var user = new User({
    	name: req.body.email.split('@').shift(),
    	email: req.body.email,
    	password: md5(req.body.password),
    	created: new Date(),
    });

    user.save(function (err, user) {
    	if (err) {
    		console.log('admin/user/register error:', err);
    		req.flash('error', '用户注册失败');
    		res.render('admin/user/register');
    	} else {
    		req.flash('info', '用户注册成功');
    		res.redirect('/admin/users/login');
    	}
    });
});

router.get('/password', function (req, res, next) {
	//console.log("\n\n\n\n\n**************************************************************************"+req.user.name)
    res.render('admin/user/password',{
    	user:req.user
    });
});

router.post('/password', function (req, res, next) {
	

	
	var cInfo={email:req.body.e_mail,password:md5(req.body.password)}
	var newPw=req.body.newPassword
	var cfmPw=req.body.confirmPassword
	
	var user = new User({
    	email: req.body.email,
    	password: md5(newPw)
   });
	
	if(newPw==cfmPw){
		User.update(cInfo,{password:md5(newPw)},function(err,doc){
			if(err){
				console.log("admin/user/password error:",err);
    			req.flash('error', '修改密码失败');
   				res.redirect('/admin/posts');
			}else{
				if(doc.n<=0){
					console.log("admin/user/password error:",'原密码错误');
	    			req.flash('error', '原密码密码不正确');
	   				res.redirect('/admin/posts');
				}else{
    				req.flash('info', "更新密码成功");
   					res.redirect('/admin/posts');
   				}
			}
		})
	}else{
    	req.flash('error', '2次密码不一样');
		res.redirect('/admin/posts');
	}
    //res.redirect('/admin/posts');
});


router.get('/logout', function (req, res, next) {
    req.logout();
    res.redirect('/');
});

