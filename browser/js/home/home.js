app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: 'HomeCtrl',
        resolve: {
            products: function (ProductFactory) {                
                return ProductFactory.getAllProducts();
            },
            categories: function (products) {
                var uniqueCategories = [];
                products.forEach(function(product) {
                    product.category.split(', ').forEach(function(categoryElem) {
                        if(uniqueCategories.indexOf(categoryElem) == -1) {
                            uniqueCategories.push(categoryElem);
                        }
                    })
                })
                console.log("uniqueCategories", uniqueCategories)
                return uniqueCategories;
            }
            // needReset:function(AuthService){
            //     return AuthService.getLoggedInUser()
            //     .then(function(response){
            //         console.log("respon",response.data)
            //         return response.data;
            //     })
            // }
        }
    });
});


// app.controller('HomeCtrl', function ($scope, products, categories) {
//     $scope.products = products;
//     $scope.categories = categories;
// })

// Allows you to ngRepeat over a dataset from a specified index
app.filter('startFrom', function() {
    return function(input, start) {
        if(input) {
            start = +start; //parse to int
            var appended = input.slice(0,start);
            var initialArray = input.slice(start);
            var finalArray= initialArray.concat(appended);
            return finalArray;
        }
        return [];
    }
});