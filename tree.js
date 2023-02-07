import Node from "./node.js";

// Function to print out the balanced BST on terminal
const prettyPrint = (Node, prefix = '', isLeft = true) => {
    if (Node.right !== null) {
      prettyPrint(Node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${Node.targetValue}`);
    if (Node.left !== null) {
      prettyPrint(Node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }


// Build a Tree class which accept an array when initialised
//The Tree class should have a root attribute which uses the return value of the function buildtree
class Tree {
    constructor(inputArray){
        this.inputArray = [...removeDuplicates(mergeSort(inputArray))];
        this.root = this.buildTree(this.inputArray);
        console.log(this.inputArray)
        prettyPrint(this.root)
    }

    buildTree(inputArray) {
        if (inputArray.length === 0) return null;

        let mid = Math.floor(inputArray.length / 2);
        let root = new Node(inputArray[mid])

        let left = inputArray.slice(0, mid)
        let right = inputArray.slice(mid + 1)

        root.left = this.buildTree(left)
        root.right = this.buildTree(right)

        return root
    }
};



function mergeSort(arr) {
    if (arr.length < 2) {
        return arr
    }
    const mid = Math.floor(arr.length / 2)
    const leftArr = arr.slice(0, mid)
    const rightArr = arr.slice(mid)
    return merge(mergeSort(leftArr), mergeSort(rightArr))
}

// Merging the sorted arrays
function merge(leftArr, rightArr) {
    const sortedArr = []
    while(leftArr.length && rightArr.length) {
        if (leftArr[0] <= rightArr[0]) {
            sortedArr.push(leftArr.shift())
        }else{
            sortedArr.push(rightArr.shift())
        }
    }
   return [...sortedArr, ...leftArr, ...rightArr]
}

// Remove duplicates from the array
function removeDuplicates(arr) {
    return [... new Set(arr)]
};


let testInputArr = [7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const balancedBST = new Tree(testInputArr)
