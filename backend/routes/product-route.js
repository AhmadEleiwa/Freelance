const express = require('express')
const productController = require('../controller/product-controller')
const checkAuth = require('../middleware/check-auth')
const router = express.Router()


router.get('/products', productController.getProducts)
router.get('/most', productController.getMostPopular)
router.post('/search', productController.searchProduct)
router.get('/popular',productController.getMostPopularProducts)
router.get('/top-sales',productController.getTopSalesProducts)

router.get('/:pid',productController.getProduct)


router.use(checkAuth)


router.post('/upload', productController.createProduct)

router.delete('/delete/:pid', productController.deleteProduct)
router.patch('/update/:pid', productController.updateProduct)
module.exports = router