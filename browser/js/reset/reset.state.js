app.config(function ($stateProvider) {
	$stateProvider.state('reset',{
		url: '/reset',
		templateUrl: 'js/reset/reset.html',
		controller: "ResetCtrl"
	})
})