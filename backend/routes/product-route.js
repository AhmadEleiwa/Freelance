const express = require('express')
const productController = require('../controller/product-controller')
const checkAuth = require('../middleware/check-auth')
const router = express.Router()


router.get('/products', productController.getProducts)

router.get('/search', productController.searchProduct)
router.get('/:pid',productController.getProduct)

router.use(checkAuth)


router.post('/upload', productController.createProduct)

router.delete('/delete/:pid', productController.deleteProduct)
router.patch('/update/:pid', productController.updateProduct)
module.exports = router