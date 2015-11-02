app.factory("CartFactory",function($http){
	return {
			getCurrentOrder:function(){
				return $http.get("/api/orders")
				.then(function(response){
					return response.data;
				})
			},
			addItem:function(itemId,quantity){
				return $http.put("/api/orders/addItem",{itemId:itemId,quantity:quantity})
				.then(function(response){
					return response.data;
				})
			},
			removeItem:function(itemId){
				return $http.delete("/api/orders/"+itemId)
			},
			updateQuantity:function(itemId,quantity){
				return $http.put("/api/orders/updateQuantity",{itemId:itemId,quantity:quantity})
				.then(function(response){
					return response.data;
				})

			}
	}

})