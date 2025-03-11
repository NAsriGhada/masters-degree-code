var numbers = [12, 11, 13, 5, 6];

function insertionSort(arr) {
  
  for (let i = 1; i < arr.length; i++) {
    var key = arr[i]; 
    var j = i - 1;

    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j = j - 1;
    }

    arr[j + 1] = key; 
  }
}

insertionSort(numbers);
console.log("Sorted array:", numbers);
