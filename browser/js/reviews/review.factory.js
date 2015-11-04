app.factory('ReviewFactory', function($http){
	return {
		getReviews: function(id){
			return $http.get('/api/products/' + id + '/reviews')
			.then(function(reviews){
				return reviews.data
			})
		}
	}
})