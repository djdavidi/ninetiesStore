app.factory("AdminFactory",function($http){
	var resp=function(response){
		return response.data;
	}
	return {
			getAllUser:function(){
				return $http.get("/api/users/")
				.then(resp);
			},
			getOneUser:function(){
				return $http.get("/api/users/"+id)
				.then(resp);
			},
			updateAnyUser:function(id,change){
				return $http.put("/api/users/"+id,change)
				 .then(resp);
			},
			deleteAnyUser:function(id){
				return $http.delete("/api/users/"+id)
				.then(resp);
			},
			getAllOrders:function(){
				return $http.get("/api/orders/")
				.then(resp);
			},
			editOrder:function(id,change){
				return $http.put("api/cart/edit/"+id,{status:change})
				.then(function(resp){
					console.log("order edited:", resp)
				});
			},
			getOneOrder:function(){
				return $http.get("/api/cart/"+id)
				.then(resp);
			},
			getAllPromos:function(){
				return $http.get("/api/promos/")
				.then(resp);
			},
			editAnyPromo:function(id,body){
				return $http.put("/api/promos/"+id,body)
				.then(resp);
			},
			createPromo:function(body){
				return $http.post("/api/promos/",body)
				.then(resp)
			}











	}
})