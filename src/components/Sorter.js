import { useState, useEffect } from 'react'
import {Select, FormControl, MenuItem, InputLabel, Button, Slider, Tooltip, Typography, withStyles} from '@material-ui/core'
import { mergeSortAnimations } from '../algorithms.js/algorithms'
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
                setTimeout(console.log(arr),500)
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
        let tempArr = arr
        for (let i=0; i< arr.length; i++){
            for(let j=0; j< arr.length-i-1; j++){
                if(tempArr[j].height> tempArr[j+1].height){
                    swap(tempArr,j+1,j)
                    setArr([])
                    setTimeout(setArr(tempArr),1)
                    await sleep()
                }
            }
            // tempArr[i].classes += "moving "
        }
        tempArr[0].classes += "moving "

    }

    const quickSort = async (arr, start, end) =>{
        if( start < end ){
            let piv = await quickSortPartition (arr, start, end ) ;
            // await animate();     
            quickSort (arr,start, piv -1);
            // await animate();                 
            quickSort (arr,piv +1, end) ;
            // await animate();     

        }
    }
    const quickSortPartition = (arr, start, end)=>{
        let i = start + 1 ;
        let piv = arr[start].height;
        for(let j=start+1; j<=end; j++){
            if(arr[j].height < piv){
                swap(arr,i,j)
                i+=1
            }
        }
        swap(arr,start,i-1)
        let pause=true
        let times =0
        while(pause){
            animate();
            pause = times > 1? true:false
            times++;
        }

        return i-1;
    }
    // const mergeSort = async (array, left, right)=>{
    //     if(left < right){
    //         let m = Math.floor((left+(right-1))/2)
    //         mergeSort(array,left,m)
    //         mergeSort(array,m+1,right)
    //         merge(array, left, m, right)
            
    //     }
    // }
    // const merge = (array, left, m, right)=>{
    //     let n1 = m-left + 1
    //     let n2 = right - m

    //     let L = []
    //     let R = []
    //     for(let i=0; i < n1; i++){
    //         L[i] = array[left + i].height
    //     }
    //     for(let j=0; j < n2; j++){
    //         R[j] = array[m + 1 + j].height
    //     }

    //     let i = 0
    //     let j = 0
    //     let k = left

    //     while(i < n1 && j < n2){
    //         if(L[i] <= R[j]){
    //             array[k].height = L[i]  
    //             i+=1
    //         }else{
    //             array[k].height = R[j]
    //             j+=1
    //         }
    //         k+=1
    //     }
    //     while(i<n1){
    //         array[k].height = L[i]
    //         i+=1
    //         k+=1
    //     }
    //     while(j < n2){
    //         array[k].height = R[j]
    //         j+=1;
    //         k+=1;
    //     }
        
    // }
    
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
    
    const sleep = ()=>{
        return new Promise(resolve => setTimeout(resolve, 1))
    }
    const swap = (arr, i, j) => {
        let temp = arr[i].height;
        arr[i].height = arr[j].height;
        arr[j].height = temp;
    }
    const animate = async()=>{
        const temp = arr
        setArr([])
        setTimeout(setArr(temp),1)
        await sleep();
    }
    useState(()=>{
        animate();
    }, [arr])
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
