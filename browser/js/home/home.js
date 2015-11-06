// app.config(function ($stateProvider) {
//     $stateProvider.state('home', {
//         url: '/',
//         templateUrl: 'js/home/home.html',
//         controller: 'HomeCtrl',
//         resolve: {
//             products: function (ProductFactory) {
//                 return ProductFactory.getAllProducts();
//             },
//             categories: function (products) {
//                 var uniqeCategories = new Set();
//                 products.forEach(function(product) {
//                     product.category.split(', ').forEach(function(categoryArr) {
//                         categoryArr.forEach(function(eachCategory) {
//                             uniqeCategories.add(eachCategory);
//                         })
//                     })
//                 })

//                 var categoryList = Array.from(uniqeCategories);
//                 return categoryList;
//             }
//         }
//     });
// });


// OLD AND WORKING
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
                var uniqeCategories = new Set();
                products.forEach(function(product) {
                    product.category.forEach(function(eachCategory) {
                        uniqeCategories.add(eachCategory);
                    })
                })

                var categoryList = Array.from(uniqeCategories);
                return categoryList;
            }
        }
    });
});