import React, { useContext, useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { AuthContext } from "../../shared/context/auth-context";
import LoadinSpinner from '../../shared/loadingSpinner/LoadingSpinner'
import './Update.css'


const Update = props => {
    const [tagsDB, setTagsDB] = useState();
    const [images, setImages] = useState([]);
    const [previewImage, setPreviewImage] = useState([]);

    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [price, setPrice] = useState(0)
    const [tags, setTags] = useState([])
    const [file, setFile] = useState()
    const [owner, setOwner] = useState()

    const [loading, setLoading] = useState(false)

    const imagesRef = useRef()

    const auth = useContext(AuthContext)

    const history = useHistory();

    const { pid } = useParams()

    const tagsSelectorHandler = event => {
        let options = event.currentTarget.selectedOptions
        let values = []
        for (let i = 0; i < options.length; i++)
            values.push(options[i].value)
        console.log(values)
        setTags(values)
    }
    const imagesLoadHandler = event => {
        let image = event.target.files[0]
        console.log(image)
        setImages([...images, image])

        let fileReader = new FileReader()


        fileReader.onload = () => {
            setPreviewImage([...previewImage, fileReader.result])
        }

        fileReader.readAsDataURL(image);



    }

    useEffect(() => {

        fetch('http://localhost:5000/tag/tags', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(data => setTagsDB(data.tags))
    }, [])


    const submitHandler = async event => {
        event.preventDefault()
        setLoading(true)
        try {
            let formData = new FormData()
            formData.append('productName', title);
            console.log(title)
            for (let i = 0; i < tags.length; i++)
                formData.append('tags', tags[i]);
            formData.append('description', description);
            formData.append('files', file)
            // for (let i = 0; i < images.length; i++)
            //     formData.append('files', images[i]);
            formData.append('price', price);


            const res = await fetch(`http://localhost:5000/product/update/${pid}`, {
                method: 'PATCH',
                headers: {

                    'Authorization': 'breaer ' + auth.token
                },

                body: formData
            })
            const data = await res.json()
            if (res.ok)
                history.push('/')
            console.log(data.message)
        } catch (err) {
            console.log(err)
        }
        setLoading(false)

    }
    useEffect(() => {
        fetch(`http://localhost:5000/product/${pid}`, {
            method: 'GET'
        }).then(res => res.json()).then(data => {
            setOwner(data.product.owner)
            setTitle(data.product.productName)
            setDescription(data.product.description)
            setTags(data.product.tags)
            setPrice(data.product.price)
            let ls = []
            for(let i=0; i<data.product.image.length; i++ ){
                ls.push(`http://localhost:5000/${data.product.image[i]}`)
               
            }
            setPreviewImage(ls)
        })


    }, [])

    if(owner){
        if(owner!==auth.userId){
            history.replace('/')
        }
    }

    document.title = "Update"
    return <div className="container-upload" style={{ backgroundImage: 'url(http://localhost:5000/static/images/image3.jpg)' }} >
        <LoadinSpinner isLoading={loading} />
        <div className="upload">
            <h1>Upload Product</h1>
            <form onSubmit={submitHandler}>
                <label>Title</label>
                <input className="name" value={title ? title: ""} onChange={event => setTitle(event.target.value)} />

                <label>Tags</label>
                <select className="tags"  multiple onChange={tagsSelectorHandler} value={tags} >
                    {tagsDB && tagsDB.map(tag => <option key={tag.id} value={tag.id}>{tag.tagName}</option>)}
                </select>

                <label>Description</label>
                <textarea className="description" value={description?description: "" } onChange={event => setDescription(event.target.value)} />

                <label>Images</label>
                <div className="images">

                    {previewImage && previewImage.map((img, index) => <div className="img-card" key={img} >
                        <img src={img} />
                        <button type="button" onClick={() => {
                            setImages(images.filter((item, i) => index != i))
                            setPreviewImage(previewImage.filter((item, i) => index != i))

                        }}>remove</button>
                    </div>)}

                    <div className="add-button"><button type="button" onClick={() => { imagesRef.current.click() }}>Add Image</button></div>
                </div>
                <div>
                    <input style={{ display: 'none' }} value={images} ref={imagesRef} onChange={imagesLoadHandler} className="image-input" name="images" type={'file'} accept={'.jpg , .png , .jpeg'} />
                </div>
                <label>File</label>
                <input className="file" name="file" type={'file'} onChange={event => setFile(event.target.files[0])} accept=".rar , .zip , .tar" />

                <label>Price</label>
                <input className="price" type={'number'} value={price} min={1} max={10000} onChange={event => setPrice(event.target.value)} />

                <button type="submit" >update</button>
            </form>
        </div>


    </div>
}


export default Update