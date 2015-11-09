app.config(function ($stateProvider) {
	$stateProvider.state('admin', {
		abstract:true,
		url: '/admin',
		templateUrl: 'js/admin/admin.html',
		controller: 'AdminCtrl'
	})
})
.config(function ($stateProvider) {
	$stateProvider.state('admin.user', {
		url: '/user',
		templateUrl: 'js/admin/admin.user.html',
		controller: 'AdminCtrl'
	})
})
app.config(function ($stateProvider) {
	$stateProvider.state('admin.promo', {
		url: '/promo',
		templateUrl: 'js/admin/admin.promo.html',
		controller: 'AdminCtrl'
	})
})
.config(function ($stateProvider) {
	$stateProvider.state('admin.product', {
		url: '/product',
		templateUrl: 'js/admin/admin.product.html',
		controller: 'AdminCtrl'
	})
})