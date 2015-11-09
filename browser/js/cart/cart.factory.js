app.factory("CartFactory",function($http){
	var cachedCart = [];
	return {
			getCachedCart: function(){
				return cachedCart;
			},
			getCurrentOrder:function(){
				// if(!currentUser) currentUser = "";
				return $http.get("/api/cart/")
				.then(function(response){
					if (response.data.storedItems) {
						angular.copy(response.data.storedItems, cachedCart);
					}
					else {
						angular.copy(response.data, cachedCart);
					}
					return cachedCart;
				})
			},
			add:function(itemId, quantity){
				return $http.put("/api/cart/" + itemId,{quantity:quantity})
				.then(function(response){
					cachedCart.push(response.data[response.data.length-1]);
					return cachedCart;
				})
			},
			removeItem:function(itemId){
				return $http.delete("/api/cart/" + itemId)
			},
			promoChecker: function(enteredPromoCode){
				console.log("promocheckerFACTORY")
				return $http.get("/api/promos/" + enteredPromoCode)
				.then(function(response){
					if (response.data !== false){
						console.log("response, it matches?", response)
						return response.data
					} else {
						console.log("NOT FOUND...")
						return false;
					}
				})
			},
			checkout: function(email, address){
				return $http.put('/api/cart/checkout/' + cachedCart._id, {email: email, address: address})
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
