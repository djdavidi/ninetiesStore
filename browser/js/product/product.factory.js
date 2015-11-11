app.factory("ProductFactory",function($http) {
	return {
		getAllProducts: function () {
			return $http.get('/api/products')
			.then(function (products) {
				return products.data;
			})
		},

		getAllProductsByCategory: function (category) {
			var spacelessCategory = category.replace(/ /g,"");
			return $http.get('/api/products')
			.then(function (products) {
				console.log("getAllProducts products.data", products.data)
				products.data.filter(function(product) {
					return product.category === spacelessCategory;
				})
			})
		},

		getOneProduct: function (id) {
			return $http.get('/api/products/' + id)
			.then(function (product) {
				return product.data;
			})
		},

		addProduct: function (newProduct) {
			return $http.post('/api/products', newProduct)
			.then(function (product) {
				return product.data;
			})
		},

		updateProduct: function (id,body) {
			return $http.put('/api/products/' + id,body)
			.then(function (product) {
				return product.data;
			})
		},

		deleteProduct: function (id) {
			return $http.delete('/api/products/' + id)
		}
	}
})