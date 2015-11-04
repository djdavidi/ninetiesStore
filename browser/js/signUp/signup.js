app.config(function ($stateProvider) {
    $stateProvider.state('signup', {
        url: '/signup',
        templateUrl: 'js/signUp/signup.html',
        controller:"SignUpCtrl",

    });
});