app.controller('HomeCtrl', function ($scope, products,AuthService) {
	$scope.products = products;
	AuthService.getLoggedInUser()
	.then(function(user){
	console.log("hey",user);
				})
})