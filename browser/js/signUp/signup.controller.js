app.controller("SignUpCtrl",function($scope,SignUpFactory){

	$scope.save = function(userObj){
		SignUpFactory.submitUser(userObj);

	}

})