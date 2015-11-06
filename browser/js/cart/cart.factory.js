app.factory("CartFactory",function($http){
	return {
			getCurrentOrder:function(){
				// if(!currentUser) currentUser = "";
				return $http.get("/api/cart")
				.then(function(response){
					console.log("RESPONSE APICART",response.data);
					return response.data;
				})
			},
			add:function(itemId, quantity){
				return $http.put("/api/cart/" + itemId,{quantity:quantity})
				.then(function(response){
					console.log("response is:", response)
					return response.data;
				})
			},
			removeItem:function(itemId){
				return $http.delete("/api/cart/:itemId")
			}
			// need some way of updating change and when the change is to the 
			// cart itself making it a past order we need to change cart and create a new order..
			// maybe not, i think something else takes care of taht but still needs to be a put on the order to change it



			// ,
			// updateQuantity:function(itemId, quantity, currentUser){
			// 	return $http.put("/api/cart/updateQuantity/", {itemId: itemId,quantity: quantity})
			// 	.then(function(response){
			// 		return response.data;
			// 	})

			// }
	}

})