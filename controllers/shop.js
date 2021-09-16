const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
	Product.fetchAll()
		.then(([rows]) => {
			res.render('shop/product-list', {
				prods: rows,
				pageTitle: 'All Products',
				path: '/products',
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getProduct = (req, res, next) => {
	const prodId = req.params.productId;
	Product.findById(prodId)
		.then(([product]) => {
			res.render('shop/product-detail', {
				product: product[0],
				pageTitle: product.title,
				path: '/products',
			});
		})
		.catch((err) => console.error(err));
};

exports.getIndex = (req, res, next) => {
	Product.fetchAll()
		.then(([rows, filedData]) => {
			res.render('shop/index', {
				prods: rows,
				pageTitle: 'Shop',
				path: '/',
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getCart = (req, res, next) => {
	Cart.getCart((cart) => {
		Product.fetchAll((product) => {
			const cartProducts = [];
			for (product of product) {
				const cartProductData = cart.products.find(
					(prod) => prod.id === product.id
				);
				if (cart.products.find((prod) => prod.id === product.id)) {
					cartProducts.push({
						productData: product,
						qty: cartProductData.qty,
					});
				}
			}
			res.render('shop/cart', {
				path: '/cart',
				pageTitle: 'Your Cart',
				products: cartProducts,
			});
		});
	});
};

exports.postCart = (req, res, next) => {
	const prodId = req.body.productId;
	Product.findById(prodId, (product) => {
		Cart.AddProduct(prodId, product.price);
	});
	res.redirect('/cart');
};

exports.postCartDeleteProduct = (req, res, next) => {
	const prodId = req.body.productId;
	Product.findById(prodId, (product) => {
		Cart.deleteProduct(prodId, product.price);
		res.redirect('/cart');
	});
};

exports.getGetOrders = (req, res, next) => {
	res.render('shop/orders', {
		path: '/orders',
		pageTitle: 'Your Orders',
	});
};

exports.getCheckout = (req, res, next) => {
	res.render('shop/checkout', {
		path: '/checkout',
		pageTitle: 'Checkout',
	});
};
