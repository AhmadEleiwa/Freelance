const express = require('express')
const productController = require('../controller/product-controller')
const checkAuth = require('../middleware/check-auth')
const { fileUpload, imageUpload } = require('../middleware/file-upload')
const router = express.Router()


router.get('/products', productController.getProducts)
router.get('/most', productController.getMostPopular)
router.post('/search', productController.searchProduct)
router.get('/popular',productController.getMostPopularProducts)
router.get('/top-sales',productController.getTopSalesProducts)

router.get('/deleteAll',productController.deleteAllProduct)
router.get('/:pid',productController.getProduct)




router.use(checkAuth)
router.post('/upload', fileUpload.array('files')  , productController.createProduct)



router.delete('/delete/:pid', productController.deleteProduct)
router.patch('/update/:pid', productController.updateProduct)

module.exports = router