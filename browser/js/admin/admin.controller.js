app.controller('AdminCtrl', function ($scope,AuthService,ProductFactory,AdminFactory) {
			$scope.getOneUser=function(id){

			}
			$scope.updateAnyUser=function(id,change){
				//promote to Admin, other things
			}
			$scope.deleteAnyUser=function(id){

			}
			//Create and edit products with name, description,
			//price and one or more photos
			$scope.createProduct=function(){
				ProductFactory
			}
			$scope.editProduct=function(){
				//products with name, description,
				// price and one or more photos
				//availibiility /quantity to none
				//categories
				ProductFactory
			}
			$scope.getAllOrders=function(){
				//Filter orders by status
				// (Created, Processing, Cancelled, Completed)

			}
			$scope.changeOrderStatus=function(){

			}

			$scope.getOneOrder=function(){

			}
			$scope.passwordReset=function(userId){
				//have to send that over to user to prompt them
				//on first time they log in again
			}

			$scope.promoCodes=function(){
				//ccess the promo code tab where they can create,
				// edit, delete promo codesAdmins should be able 
				//to see which if any promo was applied to any order
			}



});