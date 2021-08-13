export const mergeSortAnimations = (array)=>{
    const animations = [];
    if(array.length <= 1) return array;
    const helperArray = array.slice();
    mergeSort(array, 0, array.length-1, helperArray, animations);
    return animations;
}

const mergeSort = (array, start, end, helperArray, animations)=>{
    if(start === end) return;
    const mid = Math.floor((start + end-1)/2);
    mergeSort(helperArray, start, mid, array, animations);
    mergeSort(helperArray, mid+1, end, array, animations);
    merge(array, start, mid, end, animations);
}

const merge = (array, left, m, right, animations)=>{
    let n1 = m-left + 1
    let n2 = right - m

    let L = []
    let R = []
    for(let i=0; i < n1; i++){
        L[i] = array[left + i].height
    }
    for(let j=0; j < n2; j++){
        R[j] = array[m + 1 + j].height
    }

    let i = 0
    let j = 0
    let k = left

    while(i < n1 && j < n2){
        if(L[i] <= R[j]){
            animations.push([k,L[i]])
            array[k].height = L[i]  
            i+=1
        }else{
            animations.push([k,R[j]])
            array[k].height = R[j]
            j+=1
        }
        k+=1
    }
    while(i<n1){
        animations.push([k,L[i]])
        array[k].height = L[i]
        i+=1
        k+=1
    }
    while(j < n2){
        
        animations.push([k,R[j]])
        array[k].height = R[j]
        j+=1;
        k+=1;
    }    
}

export const quickSortAnimations = (array)=>{
    const animations = [];
    if(array.length<=1)return array;
    const helperArray = array.slice();
    quickSort(array, 0, array.length-1, helperArray, animations);
    return animations;
}
const quickSort = (array,start,end,helperArray, animations)=>{
    if( start < end ){
        let piv = quickSortPartition (array, start, end, animations ) ;
        quickSort (helperArray,start, piv -1, array, animations);
        quickSort (helperArray,piv +1, end, array, animations) ;
    }
}
const quickSortPartition = (arr, start, end, animations)=>{
    let i = start + 1 ;
    let piv = arr[start].height;
    for(let j=start+1; j<=end; j++){
        if(arr[j].height < piv){
            animations.push([i,arr[j].height])
            animations.push([j,arr[i].height])
            swap(arr,i,j)
            i+=1
        }
    }
    animations.push([start, arr[i-1].height])
    animations.push([i-1, arr[start].height])
    swap(arr,start,i-1)

    return i-1;
}
const swap = (arr, i, j) => {
    let temp = arr[i].height;
    arr[i].height = arr[j].height;
    arr[j].height = temp;
}

export const bubbleSortAnimations = (array) =>{
    const animations=[];
    for (let i=0; i< array.length; i++){
        for(let j=0; j< array.length-i-1; j++){
            if(array[j].height> array[j+1].height){
                animations.push([j+1,array[j].height])
                animations.push([j,array[j+1].height])
                swap(array,j+1,j)
            }
        }
    }
    return animations;
}