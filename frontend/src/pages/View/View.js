import React, { useEffect, useState } from "react"
import SimpleImageSlider from "react-simple-image-slider";
import './View.css'


const View = () => {
    const [images, setImages] = useState()

    useEffect(() => {
        const req = async () => {
            const res = await fetch("http://localhost:5000/product/635edc9316c5af6bd5304ebe", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            let data = await res.json()
            if (res.ok) {

                setImages(data.product.image)
            }
        }
        req()
    }, [])

    return <div className="view-container" >

        {images && <SimpleImageSlider autoPlay s images={images.map(item => `http://localhost:5000/${item}`)} showBullets={true}
            showNavs={true} width={896}
            height={504} />}
    </div>
}


export default View