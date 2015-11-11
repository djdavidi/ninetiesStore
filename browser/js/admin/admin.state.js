app.config(function ($stateProvider) {
	$stateProvider.state('admin', {
		url: '/admin',
		templateUrl: 'js/admin/admin.html',
		controller: 'AdminCtrl',
		resolve:{
			allUsers:function(AdminFactory){
				return AdminFactory.getAllUser()
			},
			allProducts: function (ProductFactory) {                
                return ProductFactory.getAllProducts();
            },
            allOrders:function(AdminFactory){
            	return AdminFactory.getAllOrders();
            },
            allPromos:function(AdminFactory){
            	return AdminFactory.getAllPromos();
            }
		}
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