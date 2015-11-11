app.controller('UserCtrl', function($scope, user, reviews, orders) {
	$scope.user = user;
	$scope.reviews = reviews
	$scope.orders = orders
})