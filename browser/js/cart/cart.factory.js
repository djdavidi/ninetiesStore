app.factory("CartFactory",function($http){
	return {
			getCurrentOrder:function(currentUser){
				return $http.get("/api/orders/" + currentUser)
				.then(function(response){
					return response.data;
				})
			},
			addItem:function(itemId, currentUser){
				return $http.put("/api/orders/addItem/" + itemId + '/' currentUser)
				.then(function(response){
					return response.data;
				})
			},
			removeItem:function(itemId){
				return $http.delete("/api/orders/"+itemId + '/' + currentUser)
			},
			updateQuantity:function(itemId,quantity, currentUser){
				return $http.put("/api/orders/updateQuantity/" + itemId + '/' + currentUser, {quantity:quantity})
				.then(function(response){
					return response.data;
				})

			}
	}

})