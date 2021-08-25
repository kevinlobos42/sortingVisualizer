import { Typography } from '@material-ui/core'
import {useEffect,useState} from 'react'

function Node({node}) {
    const [click, setClick] = useState(false)
    const [height, setHeight] =useState(node*3)
    useEffect(()=>{
        setHeight(node*3)
    })
    function handleClick(){
        console.log('click')
    }
    return (
        <div onClick={()=>handleClick()} className="node" style={{height:`${height}px`}}>
            {click && <Typography variant="h5">Node Height : {height}</Typography>}
        </div>
    )
}

export default Node
