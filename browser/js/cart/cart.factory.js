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
			return $http.get("/api/promos/" + enteredPromoCode)
			.then(function(responsePromo){
				if (responsePromo.data){
					console.log("responsePromo.data is:", responsePromo.data)
					console.log("cachedCar._id is:", cachedCart)
					$http.put("/api/cart/withPromo/" + cachedCart._id, {promo: responsePromo.data})
					return responsePromo.data
				}
				console.log("promo not found in db")
					return false;
			})
		},
		checkout: function(email, address, currentCost){
			cachedCart = []
			return $http.post('/api/cart/checkout', {email: email, address: address, currentCost: currentCost})
			.then(function(response) {
				return response.data
			})
		},
		updateQuantity: function(itemId, quantity) {
			return $http.put("/api/cart/updateQuantity/", {itemId: itemId, quantity: quantity})
			.then(function(response){
				return response.data;
			})
		}	
	}

})
