import { useState, useEffect } from 'react'
import {Select, FormControl, MenuItem, InputLabel, Button, Slider, Typography, withStyles} from '@material-ui/core'
import { mergeSortAnimations, quickSortAnimations, bubbleSortAnimations } from '../algorithms.js/algorithms'
import '../css/Sorter.css'

const CustomSlider = withStyles({
    root: {
        color: '#61FBFB',
        height: 8,
      },
      thumb: {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        marginTop: -8,
        marginLeft: -12,
        '&:focus, &:hover, &$active': {
          boxShadow: 'inherit',
        },
      },
      active: {},
      valueLabel: {
        color:'#000',
        left: 'calc(-50% + 4px)',
      },
      track: {
        height: 8,
        borderRadius: 4,
      },
      rail: {
        height: 8,
        borderRadius: 4,
      },
})(Slider) 

function Sorter() {
    const [click,setClick] = useState(false)
    const [size, setSize]=useState(150)
    const [arr, setArr] = useState([])
    const [alg, setAlg] = useState('Bubble-sort')
    const changeAlg = (e)=>{
        setAlg(e.target.value)
    }
    const handleClick = (node)=>{
        for(let n of arr){
            n.showSize = false
        }
        node.showSize = !node.showSize
        setClick(!click)
    }
    const sort = async ()=>{
        switch(alg){
            case 'Bubble-sort':
                bubbleSort()
                break
            case 'Merge-sort':
                mergeSort(arr, 0, arr.length-1)
                break;
            case 'Quick-sort':
                quickSort(arr, 0, arr.length-1)
                break;
            default:
                break;
        }
    }

    const changeSlider = (event, newValue)=>{
        setSize(newValue)
    }
    useEffect(()=>{
        let numArr = []
        for(let i=0; i<size; i++){
            const num = Math.floor(Math.random()*300+8)
            numArr.push({height:num,
                         classes:'',
                         width: size > 120 ? 10:size >100 ? 12 :size > 75 ? 18: size > 50? 25 : size > 25 ? 40 : size > 15 ?75 : size > 8 ? 100 :size > 6? 200 : 300,
                         showSize: false
                        })
        }
        setArr(numArr)
    },[size])
    // Bubble sort
    const bubbleSort = async () =>{
        const animations = bubbleSortAnimations(arr);
        for(let i=0; i<animations.length; i++){
            const nodes = document.getElementsByClassName('node');
            setTimeout(()=>{
                const [node1Idx, newHeight] = animations[i];
                const node1Style = nodes[node1Idx].style;
                node1Style.height = `${newHeight*3}px`
            }, i*10)
        }
    }
    const quickSort = ()=>{
        const temp = arr.slice()
        const animations = quickSortAnimations(temp)
        for(let i=0; i<animations.length; i++){
            const nodes = document.getElementsByClassName('node');
            setTimeout(()=>{
                const [node1Idx, newHeight] = animations[i];
                const node1Style = nodes[node1Idx].style;
                node1Style.height = `${newHeight*3}px`
            }, i*10)
        }
    }
    
    const mergeSort = ()=>{
        const temp = arr.slice();
        const animations = mergeSortAnimations(temp);
        for(let i=0; i<animations.length; i++){
            const nodes = document.getElementsByClassName('node');
            setTimeout(()=>{
                const [node1Idx, newHeight] = animations[i];
                const node1Style = nodes[node1Idx].style;
                node1Style.height = `${newHeight*3}px`
            }, i*10)
        }
    }

    return (
        <>
            <div className="sorting-section">
                {arr.map((node,nodeIdx) => (
                    <div key={nodeIdx} onClick={()=>handleClick(node)} className={"node"} style={{height:`${node.height*3}px`, width: `${node.width}px`}}>
                        {node.showSize && <Typography variant="h5">Node Height : {node.height}</Typography>}
                    </div>
                ))}
            </div>
            <div className="menu">
                <div className="menu-container">
                    <FormControl>
                        <InputLabel id="select-label">Sorting Algorithm</InputLabel>
                        <Select
                        labelId="select-label"
                        id="select"
                        value={alg}
                        onChange={changeAlg}
                        >
                            <MenuItem value={'Bubble-sort'}>Bubble Sort</MenuItem>
                            <MenuItem value={'Quick-sort'}>Quick Sort</MenuItem>
                            <MenuItem value={'Merge-sort'}>Merge Sort</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className="menu-container">
                    <Button variant="contained" size = "large" color="primary" onClick={()=>sort()}>Sort</Button>
                </div>
                <div className="slider-container menu-container">
                    <Typography variant="subtitle1">Node Count</Typography>
                    <CustomSlider key={'slider-1'}valueLabelDisplay="auto" aria-label="pretto slider" min={5} max={150} value={size} onChange={changeSlider} />
                </div>       
            </div>
        </>
    )
}

export default Sorter