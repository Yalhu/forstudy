/* =========================================================== */
// # mianshiti-laoshi-201604
var arr=[2,4,1,5,3];
// ## insertSort:  
function insertSort(arr){
    for(var i=1;i<arr.length;i++){
        var p=i-1;
        var curr=arr[i];
        while(arr[p]>curr&&p>=0){
            arr[p+1]=arr[p];
            p--;
        }
        arr[p+1]=curr;
    }
    return arr;
}
console.dir(insertSort(arr));
// ## quickSort
function quickSort(arr){
    if(arr.length<=1){
        return arr
    }else{
        var p=parseInt(arr.length/2);
        var c=arr.splice(p,1);
        var left=[];
        var right=[];
        for(var i=0;i<arr.length;i++){
            (arr[i]>c?right:left).push(arr[i]);
        }
        return quickSort(left).concat(c,quickSort(right));
    }
}
console.dir(quickSort(arr));

/* =========================================================== */
// # [213 十大经典排序算法的 JS 版..]
var arr=[3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];
// ## 1.冒泡排序（Bubble Sort）
function bubbleSort(arr){
    varlen = arr.length;
    for(vari = 0;i < len;i++){
        for(varj = 0;j < len - 1 - i;j++){
            if(arr[j] > arr[j+1]){        //相邻元素两两对比
                vartemp = arr[j+1];        //元素交换
                arr[j+1] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
}

// 改进冒泡排序： 设置一标志性变量pos,用于记录每趟排序中最后一次进行交换的位置。
function bubbleSort2(arr){
    console.time('改进后冒泡排序耗时');
    var i = arr.length-1;  //初始时,最后位置保持不变
    while(i> 0){
        var pos= 0;//每趟开始时,无记录交换
        for(var j= 0;j< i;j++)
            if(arr[j]> arr[j+1]){
                pos= j;//记录交换的位置
                var tmp = arr[j];arr[j]=arr[j+1];arr[j+1]=tmp;
            }
        i= pos;//为下一趟排序作准备
     }
     console.timeEnd('改进后冒泡排序耗时');
     return arr;
}
// 在每趟排序中进行正向和反向两遍冒泡的方法一次可以得到两个最终值(最大者和最小者)
function bubbleSort3(arr){
    var low = 0;
    var high= arr.length-1;//设置变量的初始值
    var tmp,j;
    console.time('2.改进后冒泡排序耗时');
    while(low < high){
        for(j= low;j< high; ++j)//正向冒泡,找到最大者
            if(arr[j]> arr[j+1]){
                tmp = arr[j];arr[j]=arr[j+1];arr[j+1]=tmp;
            }
        --high;                 //修改high值, 前移一位
        for(j=high;j>low; --j)//反向冒泡,找到最小者
            if(arr[j]<arr[j-1]){
                tmp = arr[j];arr[j]=arr[j-1];arr[j-1]=tmp;
            }
        ++low;                  //修改low值,后移一位
    }
    console.timeEnd('2.改进后冒泡排序耗时');
    return arr;
}

// ## 2.选择排序（Selection Sort）
function selectionSort(arr){
    var len = arr.length;
    var minIndex,temp;
    console.time('选择排序耗时');
    for(var i = 0;i < len - 1;i++){
        minIndex = i;
        for(var j = i + 1;j < len;j++){
            if(arr[j] < arr[minIndex]){     //寻找最小的数
                minIndex = j;                 //将最小数的索引保存
            }
        }
        temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
    }
    console.timeEnd('选择排序耗时');
    return arr;
}

// ## 3.插入排序（Insertion Sort）
function insertionSort(array){
    if(Object.prototype.toString.call(array).slice(8, -1) === 'Array'){
        console.time('插入排序耗时：');
        for(var i = 1;i < array.length;i++){
            var key = array[i];
            var j = i - 1;
            while(j >= 0 && array[j] > key){
                array[j + 1] = array[j];
                j--;
            }
            array[j + 1] = key;
        }
        console.timeEnd('插入排序耗时：');
        return array;
    }else{
        return'array is not an Array!';
    }
}
// 改进插入排序： 查找插入位置时使用二分查找的方式
function binaryInsertionSort(array){
    if(Object.prototype.toString.call(array).slice(8, -1) === 'Array'){
        console.time('二分插入排序耗时：');
        for(var i = 1;i < array.length;i++){
            var key = array[i],left = 0,right = i - 1;
            while(left <= right){
                var middle = parseInt((left + right) / 2);
                if(key < array[middle]){
                    right = middle - 1;
                }else{
                    left = middle + 1;
                }
            }
            for(var j = i - 1;j >= left;j--){
                array[j + 1] = array[j];
            }
            array[left] = key;
        }
        console.timeEnd('二分插入排序耗时：');
        return array;
    }else{
        return'array is not an Array!';
    }
}

// ## 4.希尔排序（Shell Sort） 
function shellSort(arr){
    varlen = arr.length,
        temp,
        gap = 1;
    console.time('希尔排序耗时:');
    while(gap < len/5){          //动态定义间隔序列
        gap =gap*5+1;
    }
    for(gap;gap > 0;gap = Math.floor(gap/5)){
        for(var i = gap;i < len;i++){
            temp = arr[i];
            for(var j = i-gap;j >= 0 && arr[j] > temp;j-=gap){
                arr[j+gap] = arr[j];
            }
            arr[j+gap] = temp;
        }
    }
    console.timeEnd('希尔排序耗时:');
    return arr;
}

// ## 5.归并排序（Merge Sort）
function mergeSort(arr){  //采用自上而下的递归方法
    var len = arr.length;
    if(len < 2){
        returnarr;
    }
    var middle = Math.floor(len / 2),
        left = arr.slice(0,middle),
        right = arr.slice(middle);
    return merge(mergeSort(left),mergeSort(right));
}
function merge(left,right){
    var result = [];
    console.time('归并排序耗时');
    while(left.length && right.length){
        if(left[0] <= right[0]){
            result.push(left.shift());
        }else{
            result.push(right.shift());
        }
    }
    while(left.length)
        result.push(left.shift());
    while(right.length)
        result.push(right.shift());
    console.timeEnd('归并排序耗时');
    return result;
}

// ## 6.快速排序（Quick Sort）
function quickSort(array,left,right){
    console.time('快速排序耗时')
    if(Object.prototype.toString.call(array).slice(8,-1)=='Array'&&typeof left=='number'&&typeof right=='number'){
        if(left<right){
            var x=array[right],l=left-1,temp;
            for(var j=left;j<=right;j++){
                if(array[j]<=x){
                    l++;
                    temp=array[j]
                    array[j]=temp
                }
            }
            quickSort(array,left,i-1)
            quickSort(array,i+1,right)
        }
        console.timeEnd('快速排序耗时')
        return array;
    }else{
        return 'array is not an Array or left or rigth is not a number'
    }
}
function quickSort2(arr){
    if(arr.length<=1){return arr;}
    var pivotIndex=Math.floor(arr.length/2)
    var pivot=arr.splice(pivotIndex,1)[0]
    var left=[];
    var right=[];
    for(var i=0;i<arr.length;i++){
        if(arr[i]<privot){
            left.push(arr[i])
        }else{
            right.push(arr[i])
        }
    }
    return quickSort2(left).concat([pivot],quickSort2(right))
}

// ## 7.堆排序（Heap Sort）
// ## 8.计数排序（Counting Sort）
function countingSort(array){
    var len=array.length,B=[],C=[],min=max=array[0]
    console.time('计数排序耗时')
    for(var i=0;i<len;i++){
        min= min<=array[i]?min:array[i]
        C[array[i]]=C[array[i]]?C[array[i]]+1:1;
    }
    for(var j=min;j<max;j++){
        C[j+1]=(C[j+1]||0) + (C[j]||0)
    }
    for(var k=len-1;k>=0;k--){
        B[C[array[k]]-1] =array[k]
        C[array[k]]--;
        console.timeEnd('计数排序耗时')
    }
    return B;
}
// ## 9.桶排序（Bucket Sort）

// ## 10.基数排序（Radix Sort）


