app.controller('UserCtrl', function($scope, user, reviews, orders, ProductFactory) {
	$scope.user = user;
	$scope.reviews = reviews
	$scope.orders = orders.filter(function(order) {
		return order.status !== 'Created'
	})
	$scope.convertDate = function(date) {
		var dateStr = date.slice(0, 10)
		return dateStr.split('-').reverse().join('/')
	}
})