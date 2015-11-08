app.factory('ReviewFactory', function($http){
	return {
		getReviews: function(id){
			return $http.get('/api/products/' + id + '/reviews')
			.then(function(reviews){
				return reviews.data
			})
		},
		postReview: function(id, review) {
			return $http.post('/api/products/' + id + '/reviews', review)
			.then(function(response) {
				return response.data
			})
		}
	}
})