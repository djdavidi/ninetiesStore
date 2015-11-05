app.config(function ($stateProvider) {
	$stateProvider.state('admin', {
		url: '/admin',
		templateUrl: 'js/admin/admin.html',
		controller: 'AdminCtrl'
	})
})