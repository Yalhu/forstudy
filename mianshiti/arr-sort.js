// # mianshiti-laoshi-201604
var arr=[2,4,1,5,3];
  /*insertSort:  
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
  */
  /*quickSort*/
    function quickSort(arr){
      if(arr.length<=1){return arr}
      else{
        var p=parseInt(arr.length/2);
        var c=arr.splice(p,1);
        var left=[];
        var right=[];
        for(var i=0;i<arr.length;i++){
          (arr[i]>c?right:left)
            .push(arr[i]);
        }
        return quickSort(left)
                .concat(c,quickSort(right));
      }
    }
    console.dir(quickSort(arr));

