import React, { useEffect, useState } from "react";

import './Upload.css'


const Upload = props => {
    const [tagsDB, setTagsDB] = useState();
    const [images, setImages] = useState();
    const [previewImage, setPreviewImage] = useState([]);


    const imagesLoadHamdler = event => {
        let images = event.target.files
        setImages(images)

        let fileReader = new FileReader()


        fileReader.onload = () => {
            setPreviewImage([...previewImage, fileReader.result])
        }
        for (let i = 0; i < images.length; i++)
            fileReader.readAsDataURL(images[i]);


    }

    useEffect(() => {

        fetch('http://localhost:5000/tag/tags', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(data => setTagsDB(data.tags))
    }, [])
    return <div className="container-upload">
        <div className="upload">
            <h1>Upload Product</h1>
            <form>
                <label>Title</label>
                <input className="name" />

                <label>Tags</label>
                <select className="tags" multiple>
                    {tagsDB && tagsDB.map(tag => <option key={tag.id} value={tag.id}>{tag.tagName}</option>)}
                </select>


                <label>Description</label>
                <textarea className="description" />

                <label>Images</label>
                <div className="images">

                    {previewImage && previewImage.map(img => <img key={img} src={img} />)}
                </div>
                <div>
                    <input onChange={imagesLoadHamdler} className="image-input" name="images" type={'file'} multiple accept={'.jpg , .png , .jpeg'} />
                    {previewImage.length !== 0 &&<button type="button" onClick={() => setPreviewImage([])}>remove images</button>}

                </div>
                <label>File</label>
                <input className="file" name="file" type={'file'} accept=".rar , .zip , .tar" />

                <label>Price</label>
                <input className="price" type={'number'} min={1} max={10000} />

                <button type="submit" >upload</button>
            </form>
        </div>
    </div>
}


export default Upload