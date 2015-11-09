app.factory('ReviewFactory', function($http){
	var chachedReviews = []
	return {
		getReviews: function(id){
			return $http.get('/api/products/' + id + '/reviews')
			.then(function(reviews){
				angular.copy(reviews.data, chachedReviews)
				return chachedReviews
			})
		},
		postReview: function(id, review) {
			return $http.post('/api/products/' + id + '/reviews', review)
			.then(function(response) {
				chachedReviews.push(response.data)
				return chachedReviews
			})
		},
		removeReview: function(productId, reviewId) {
			return $http.delete('/api/products/' + productId + '/reviews/' + reviewId)
		}
	}
})