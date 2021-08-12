import {useEffect,useState} from 'react'

function Node({node}) {
    const [height, setHeight] =useState(node*3)
    useEffect(()=>{
        setHeight(node*3)
    })
    return (
        <div className="node" style={{height:`${height}px`}}>
            
        </div>
    )
}

export default Node
