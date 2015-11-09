app.factory("AdminFactory",function($http){
	var resp=function(response){
		return response.data;
	}
	return {
			getAllUser:function(name){
				return $http.get("/api/user/")
				.then(resp);
			},
			getOneUser:function(){
				return $http.get("/api/user/"+id)
				.then(resp);
			},
			updateAnyUser:function(id,change){
				return $http.put("/api/user/"+id,change)
				 .then(resp);
			},
			deleteAnyUser:function(id){
				return $http.delete("/api/user/"+id)
				.then(resp);
			},
			getAllOrders:function(){
				return $http.get("/api/order")
				.then(resp);
			},
			changeOrderStatus:function(id,change){
				return $http.put("api/order/"+id,change)
				.then(resp);
			},
			getOneOrder:function(){
				return $http.get("/api/order/"+id)
				.then(resp);
			},











	}
})