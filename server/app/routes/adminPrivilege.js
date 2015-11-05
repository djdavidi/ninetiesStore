module.exports={
	adminCheck:function(req,res,next){
		if(req.user.isAdmin) next();
		next(err);
	}

}