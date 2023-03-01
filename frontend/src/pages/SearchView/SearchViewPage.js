import { useEffect, useState } from 'react'
import React from 'react-dom'
import { useParams } from 'react-router-dom'

import List from './List'

const SearchViewPage = props =>{
    const [data, setData] = useState()
    const {name} = useParams()
    useEffect(()=>{
        if(props.search)
        fetch('http://localhost:5000/product/search', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ productName: name })
        }).then((res) => res.json()).then(data => setData(data.products))
        else
        fetch('http://localhost:5000/product/products', {
            method: 'get',
            mode: 'cors',
 
        }).then((res) => res.json()).then(data => setData(data.products))
    },[name])
        return <div>
            {data && <List title={props.search ? name: "all"} items={data}/>}
        </div>
}

export default SearchViewPage