import React, { useEffect, useRef, useState } from "react"
import { useParams } from 'react-router-dom'
import SimpleImageSlider from "react-simple-image-slider";
import './View.css'

const index = 0
const View = () => {
    const [images, setImages] = useState()
    const [product, setProduct] = useState()
    const [index, setIndex] = useState(0)
    const { pid } = useParams()
    useEffect(() => {
        const req = async () => {
            const res = await fetch(`http://localhost:5000/product/${pid}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            let data = await res.json()
            if (res.ok) {

                setImages(data.product.image)
                setProduct(data.product)
            }
            document.title =  `View Page - ${data.product.productName}` 
        }
        req()

    }, [])

  
    return <div className="view-container" >
        <div className="left">
            {images && <img src={`http://localhost:5000/${images[index]}`} alt="None" />}
            {images && <p className="ind">{index + 1} / {images.length}</p>}
            {images && <div className="list" >
                {images.map((item, ind) => <img alt="None" key={ind} style={{ opacity: ind === index ? 1 : 0.8 }} onClick={() => setIndex(ind)} src={`http://localhost:5000/${item}`} width={100} />)}
            </div>}
        </div>
        {product && <div className="right">
            <h1 className="title">{product.productName}</h1>
            <div className="price row">
                <img src="https://img.icons8.com/material-rounded/24/null/price-tag.png" />
                <p > $ {product.price} </p>

            </div>
            <div className="hearts row">
                <img src="https://img.icons8.com/material-rounded/24/null/loading-heart.png" />
                <p> {product.hearts}</p>
            </div>
            <div className="file-size row">
                <img src="https://img.icons8.com/material-rounded/24/null/archive.png" />
                <p >{product.fileSize > 1000000 ? Math.round(product.fileSize / (1024 * 1024)) + "MB" : Math.round(product.fileSize / 1024) + "KB"}</p>
            </div>
            <div className="date row">
                <img src="https://img.icons8.com/material-rounded/24/null/calendar--v1.png" />
                <p >{new Date(product.createdDate).toUTCString()}</p>
            </div>

            <button >Add To Cart</button>

        </div>
        }
    </div>
}


export default View