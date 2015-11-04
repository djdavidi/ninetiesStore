app.factory("CartFactory",function($http){
	return {
			getCurrentOrder:function(currentUser){
				return $http.get("/api/cart/")
				.then(function(response){
					return response.data;
				})
			},
			addItem:function(itemId, currentUser){
				return $http.put("/api/cart/addItem/", {itemId: itemId})
				.then(function(response){
					return response.data;
				})
			},
			removeItem:function(itemId, currentUser){
				return $http.delete("/api/cart/", {itemId: itemId})
			},
			updateQuantity:function(itemId, quantity, currentUser){
				return $http.put("/api/cart/updateQuantity/", {itemId: itemId,quantity: quantity})
				.then(function(response){
					return response.data;
				})

			}
	}

})