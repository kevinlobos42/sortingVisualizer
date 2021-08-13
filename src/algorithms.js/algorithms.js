export const mergeSortAnimations = (array)=>{
    const animations = [];
    if(array.length <= 1) return array;
    const helperArray = array.slice();
    mergeSort(array, 0, array.length-1, helperArray, animations);
    console.log(animations);
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
// const merge = (array, start, mid, end, helperArray, animations)=>{
//     let k = start;
//     let i = start;
//     let j = mid+1;
//     while(i<=mid && j<= end){
//         animations.push([i,j]);
//         animations.push([i,j]);
//         if(helperArray[i].height <= helperArray[j].height){
//             animations.push([k, helperArray[i].height]);
//             array[k++].height = helperArray[i++].height;
//         } else {
//             animations.push([k, helperArray[j].height]);
//             array[k++].height = helperArray[j++].height;
//         }
//     }
//     while (i <= mid) {
//         animations.push([i, i]);
//         animations.push([i, i]);
//         animations.push([k, helperArray[i].height]);
//         array[k++].height = helperArray[i++].height;
//       }
//       while (j <= end) {
//         animations.push([j, j]);
//         animations.push([j, j]);
//         animations.push([k, helperArray[j].height]);
//         array[k++].height = helperArray[j++].height;
//       }
// }