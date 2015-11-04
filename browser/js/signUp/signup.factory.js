app.factory("SignUpFactory",function($http){
	//bad name for the factory, change it later
	return {
		submitUser: function(userObj){
			return $http.post("/api/users/",userObj)
			.then(function(response){
				return response.data;
			})
		}
	}
})
