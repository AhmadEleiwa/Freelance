import React, { useContext, useEffect, useRef, useState } from "react"
import { useParams } from 'react-router-dom'
import SimpleImageSlider from "react-simple-image-slider";
import { AuthContext } from "../../shared/context/auth-context";
import './View.css'


const View = () => {
    const [images, setImages] = useState()
    const [product, setProduct] = useState()
    const [index, setIndex] = useState(0)
    const [heartColor, setHeartColor] = useState('ffffff')
    const [owner, setOwner] = useState()
    const { pid } = useParams()
    const auth = useContext(AuthContext)
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
                getOwner(data.product.owner)
                if (data.product.heartsUsers.includes(auth.userId)) {
                    setHeartColor('e32636')
                }
            }
            document.title = `View Page - ${data.product.productName}`
        }
        req()


    }, [])
    const getOwner = async (ownerId) => {
        const res = await fetch(`http://localhost:5000/user/${ownerId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        let data = await res.json()
        if (res.ok) {
            setOwner(data.user)
        }
    }
    const heartHandler = async (event) => {
        let newColor = heartColor == 'ffffff' ? 'e32636' : 'ffffff'
        setHeartColor(newColor)
        const res = await fetch(`http://localhost:5000/product/heart/${pid}`, {
            method: 'POST',
            headers: {
                Authorization: 'breaer ' + auth.token
            },
            body: JSON.stringify({
                'userId': auth.userId
            }),
            headers: {
                'Content-Type': 'application/json'
            }

        })
        if (!res.ok) {
            console.log(await res.data.message)
        }

    }


    return <div className="view-container" >
        <div className="left">
            {images && <div className="img">
                <img className="heart-btn" onClick={heartHandler} src={`https://img.icons8.com/material-rounded/34/${heartColor}/loading-heart.png`} />

                <img className="image" src={`http://localhost:5000/${images[index]}`} alt="None" />
            </div>}
            {images && <p className="ind">{index + 1} / {images.length}</p>}
            {images && <div className="list" >
                {images.map((item, ind) => <img alt="None" key={ind} style={{ opacity: ind === index ? 1 : 0.8 }} onClick={() => setIndex(ind)} src={`http://localhost:5000/${item}`} width={100} />)}
            </div>}


        </div>
        {product && owner && <div className="right">
            <h1 className="title">{product.productName}</h1>
            <div className="row">
                <img src="https://img.icons8.com/material-rounded/24/null/guest-male.png" />
                <p >{owner.name}</p>
            </div>
            <div className="price row">
                <img src="https://img.icons8.com/material-rounded/24/null/price-tag.png" />
                <p > $ {product.price} </p>

            </div>
            <div className="hearts row">
                <img src="https://img.icons8.com/material-rounded/24/null/loading-heart.png" />
                <p> {product.hearts}</p>
            </div>
            <div className="file-size row">
                <img src="https://img.icons8.com/material-rounded/24/000000/archive.png" />
                <p >{product.fileSize > 1000000 ? Math.round(product.fileSize / (1024 * 1024)) + "MB" : Math.round(product.fileSize / 1024) + "KB"}</p>
            </div>
            <div className="date row">
                <img src="https://img.icons8.com/material-rounded/24/null/calendar--v1.png" />
                <p >{new Date(product.createdDate).toUTCString()}</p>
            </div>

            <div className="row">
                <img src="https://img.icons8.com/material-rounded/24/null/download--v1.png" />
                <p >{product.downloads}</p>
            </div>

            <button >Add To Cart</button>

            <div className="decription">
                <h2>Description</h2>
                <p >{product.description}</p>
            </div>
        </div>

        }


    </div>
}


export default View