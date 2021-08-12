import Node from './Node'
import { useState, useEffect } from 'react'
import {Select, FormControl, MenuItem, InputLabel, Button, Slider, Tooltip, Typography, withStyles} from '@material-ui/core'
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
        let tempArr = arr
        for (let i=0; i< arr.length; i++){
            let swapped = false
            for(let j=0; j< arr.length; j++){
                if(tempArr[j]> tempArr[i]){
                    swap(tempArr,j,i)
                    const el = document.getElementById(`node${i}`)
                    if(el){
                        el.style.backgroundColor="red !important"
                    }
                    console.log(document.getElementById('node'+i));
                    swapped = true
                    setArr([])
                    setTimeout(setArr(tempArr),1)
                    await sleep()
                }
            }
            if(!swapped) break;
        }
    }
    const sleep = ()=>{
        return new Promise(resolve => setTimeout(resolve, 1))
    }
    const swap = (arr, i, j) => {
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    const changeSlider = (event, newValue)=>{
        setSize(newValue)
    }
    useEffect(()=>{
        let numArr = []
        for(let i=0; i<size; i++){
            const num = Math.floor(Math.random()*300+1)
            numArr.push(num)
        }
        setArr(numArr)
    },[size])
    return (
        <>
            <div className="sorting-section">
                {arr.map(node => (
                    <div className="node" id={'node'+arr.indexOf(node)} style={{height:`${node*2.2}px`}}>

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
