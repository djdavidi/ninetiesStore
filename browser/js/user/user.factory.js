app.factory('UserFactory', function ($http) {
	function transform (response) {
		return response.data;
	}

	var UserFactory = {
		getUsers: function () {
			return $http.get('/api/users')
			.then(transform);
		},
		getOneUser: function (id) {
			return $http.get('/api/users/' + id)
			.then(transform);
		},
		createUser: function (userData) {
			return $http.post('/api/users', userData)
			.then(transform);
		},
		updateUser: function (id, userData) {
			return $http.put('/api/users/' + id, userData)
			.then(transform);
		},
		deleteUser: function (id) {
			return $http.delete('/api/users/' + id);
		},
		getUserReviews: function (id) {
			return $http.get('/api/users/' + id + '/reviews')
			.then(transform);
		}
	}
	return UserFactory;
})

// OLD CODE BELOW, WAS ALREADY COMMENTED OUT BEFORE ADDING ABOVE CODE

// app.factory('User', function($http, CartFactory) {
// 	return {
		// function User(props) {
		// 	angular.extend(this, props)
		// }

		// User.url = '/api/users/'

	// 	User.prototype.getUrl = function() {
	// 		return User.url + this._id
	// 	}


	// 	User.prototype.fetch = function(id) {
	// 		return $http.get(this.getUrl())
	// 		.then(function(res) {
	// 			var user = new User(res.data)
				
	// 		})
	// 	}
	// 	User.prototype.cart = function(id) {
	// 		return CartFactory.getCurrentOrder(id)
	// 	}
// 	 }
// })
