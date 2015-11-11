app.controller('AdminCtrl', function ($scope,AuthService,ProductFactory,AdminFactory,allUsers,allProducts,allOrders,allPromos) {
			$scope.test=5;
			$scope.allUsers=allUsers
			$scope.allProducts=allProducts
			$scope.allOrders=allOrders
			$scope.allPromos=allPromos
			console.log(allOrders)
			console.log("promo",allPromos)
			$scope.getOneUser=function(id){
				return AdminFactory.getOneUser();
			}
			$scope.updateAnyUser=function(id,change){
				return AdminFactory.updateAnyUser(id,change);
			}
			$scope.deleteAnyUser=function(id){
				AdminFactory.deleteAnyUser(id);
			}
			//Create and edit products with name, description,
			//price and one or more photos
			$scope.createProduct=function(newProduct){
				return ProductFactory.addProduct(newProduct);
			}
			$scope.editProduct=function(id,product){
				//products with name, description,
				// price and one or more photos
				//availibiility /quantity to none
				//categories
				return ProductFactory.updateProduct(id,product)
			}
			$scope.editOrder=function(id,change){
				console.log("id is:", id)
				console.log("change is:", change)
				return AdminFactory.editOrder(id,change);
			}

			$scope.getOneOrder=function(){

			}
			$scope.passwordReset=function(userId){
				//have to send that over to user to prompt them
				//on first time they log in again
			}

			$scope.editPromo=function(id,body){
				return AdminFactory.editAnyPromo(id,body);
			}
			$scope.createPromo=function(body){
				return AdminFactory.createPromo(body);
			}



});