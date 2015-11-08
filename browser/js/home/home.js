app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: 'HomeCtrl',
        resolve: {
            products: function (ProductFactory) {                
                return ProductFactory.getAllProducts();
            },
            // categories: function (ProductFactory) {
            //     ProductFactory.getAllProducts()
            //     .then(function (products) {
            //         var uniqueCategories = new Set();
            //         // console.log("productsss", products)
            //         products.forEach(function(product) {
            //             // console.log("SPLIT", product.category.split(', '))
            //             product.category.split(', ').forEach(function(categoryElem) {
            //                 uniqueCategories.add(categoryElem);
            //             })
            //         })

            //         var categoryList = Array.from(uniqueCategories);
            //         console.log("categoryList", categoryList)
            //         return categoryList;
            //     })
            // }
            // categories: function (ProductFactory) {
            //     ProductFactory.getAllProducts()
            //     .then(function (products) {
            //         var uniqueCategories = [];
            //         products.forEach(function(product) {
            //             product.category.split(', ').forEach(function(categoryElem) {
            //                 if(uniqueCategories.indexOf(categoryElem) == -1) {
            //                     uniqueCategories.push(categoryElem);
            //                 }
            //             })
            //         })
            //         console.log("uniqueCategories", uniqueCategories)
            //         return uniqueCategories;
            //     })
            // }
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
        }
    });
});

app.controller('HomeCtrl', function ($scope, products, categories) {
    $scope.products = products;
    $scope.categories = categories;
})