import { useState, useEffect } from 'react'
import {Select, FormControl, MenuItem, InputLabel, Button, Slider, Tooltip, Typography, withStyles} from '@material-ui/core'
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
    const [size, setSize]=useState(150)
    const [arr, setArr] = useState([])
    const [alg, setAlg] = useState('Bubble-sort')
    const changeAlg = (e)=>{
        setAlg(e.target.value)
    }
    const sort = async ()=>{
        switch(alg){
            case 'Bubble-sort':
                bubbleSort()
                console.log(arr);
                break
            case 'Merge-sort':
                mergeSort(arr, 0, arr.length-1)
                break;
            case 'Quick-sort':
                quickSort(arr, 0, arr.length-1)
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
                         width: size > 100 ? 8 : size > 50? 15 : size > 25 ? 25 : 50
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
                    <div key={nodeIdx} className={"node"} style={{height:`${node.height*3}px`, width: `${node.width}px`}}>

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
