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
        this.inputArray = [..._removeDuplicates(_mergeSort(inputArray))];
        this.root = this.buildTree(this.inputArray);
        this.preOrderData = [];
        this.postOrderData = [];
        this.inOrderData = [];
        // prettyPrint(this.root)
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

    insert(value, root = this.root) {
        //Base case: If the tree is empty then create a new node with the value
        if (root === null) {
            return (root = new Node(value))
        }
         // otherwise recursively go down the tree
        if (root.targetValue < value) {
            root.right = this.insert(value, root.right)
        }else{
            root.left = this.insert(value, root.left)
        }
        prettyPrint(this.root)
        return root;
    }

    delete(value, root = this.root) {
        //Base case: If the tree is empty then return the root
        if (root == null ) {
            return root;
        }
        // otherwise find the node recursively down
        if (root.targetValue > value) {
            root.left = this.delete(value, root.left)
        }else if (root.targetValue < value) {
            root.right = this.delete(value, root.right);
        }

        // If the value is the same as the root's value then this is node that should be deleted
        else{
            // node with only one child or no child
            if (root.left == null){
                return root.right
            }
            else if (root.right == null) {
                return root.left;
            }

            // node with two children: Get the inorder
            // successor( smallest in the right subtree)
            root.targetValue = minValue(root);

            // Delete the inorder successor
            root.right = this.delete(root.targetValue, root.right)
        }
        prettyPrint(this.root)
        return root
    }

    find(value, root = this.root) {
        // Base case: if tree is empty, return root
        if (root == null) return null;

        // if the root value is the same as  given value, then return the root
        if (root.targetValue == value) return root;

        //Otherwise, recursively find the node with the value down.
        if (root.targetValue > value ){
            return this.find(value, root.left);
        }else if (root.targetValue < value) {
            return this.find(value, root.right)
        }
        prettyPrint(this.root)
        return root;
    }
    levelOrder(root = this.root) {
        if (root == null) {
            return [];
        }
        const queue = [];
        const result = [];
        queue.push(root)

        while (queue.length > 0) {
            let currentNode = queue.shift(root) // Remove the first element from the queue
            result.push(currentNode.targetValue);

            // check if the current node has any child elements and add to the queue
            if (currentNode.left !== null){
                queue.push(currentNode.left)
            }
            if (currentNode.right !== null) {
                queue.push(currentNode.right)
            }
        }
        // prettyPrint(root)
        // console.log(result)
        return result

    }
    inOrder(root = this.root) {
        if (root == null) return [];
        
        if (root.left !== null){
            this.inOrder(root.left)
        }
        if (root.targetValue !== undefined){
            this.inOrderData.push(root.targetValue)
        }

        if (root.right !== null){
            this.inOrder(root.right)
        }

        console.log(`Lets print the tree inOrder... ${this.inOrderData}`)
    }

    preOrder(root = this.root) {
        if (root == null) return [];

          if (root.targetValue !== undefined){
                this.preOrderData.push(root.targetValue)
            }
            this.preOrder(root.left)
            this.preOrder(root.right)
      

        console.log(`Lets print the tree preOrder... ${this.preOrderData}`)
    }

    postOrder(root = this.root) {
        if (root == null)return [];
        
        if (root.left !== null){
            this.postOrder(root.left)
        }

        if (root.right !== null){
            this.postOrder(root.right)
        }

        if (root.targetValue !== undefined){
            this.postOrderData.push(root.targetValue)
        }

        console.log(`Lets print the tree postOrder... ${this.postOrderData}`)
    }

    heigth(root = this.root) {
        if (root === null)return -1;

        let left = this.heigth(root.left);
        let right = this.heigth(root.right);

        return Math.max(left, right) + 1;
    }

    depth(currentValue, root = this.root, edgeCount = 0) {
        if (root === null) return;
        if (root.targetValue === currentValue) return edgeCount;

        if (root.targetValue < currentValue) {
            return this.depth(currentValue, root.right, (edgeCount +1))
        } else {
            return this.depth(currentValue, root.left, (edgeCount +1))
        }
    }

    isBalanced(root = this.root) {
        if (root == null) return false;

        let leftArr = root.left;
        let rightArr = root.right

        if (Math.abs(this.heigth(leftArr) - this.heigth(rightArr)) > 1){
            return false;
        }else return true
    }

    rebalance() {
        if (this.isBalanced(this.root)) return this.root

        let rebalanceTreeArray = [];

        rebalanceTreeArray = this.traverse()
    }

    traverse(root, array) {
        if (array !== undefined) array.push(root.targetValue);
        if (root.left !== null) {
            this.traverse(root.left, array);
        }

        if (root.right !== null) {
            this.traverse(root.right, array)
        }
        return array;
    }
};






function minValue(root){
    let min = root.targetValue;
    while (root != null) {
        min = root.targetValue;
        root = root.left;
    }
    return min
}

function _mergeSort(arr) {
    if (arr.length < 2) {
        return arr
    }
    const mid = Math.floor(arr.length / 2)
    const leftArr = arr.slice(0, mid)
    const rightArr = arr.slice(mid)
    return _merge(_mergeSort(leftArr), _mergeSort(rightArr))
}

// Merging the sorted arrays
function _merge(leftArr, rightArr) {
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
function _removeDuplicates(arr) {
    return [... new Set(arr)]
};




let testInputArr = [7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];


const balancedBST = new Tree(testInputArr)
// balancedBST.insert(9)
// balancedBST.delete(7)
// console.log(balancedBST.find(324))
// balancedBST.levelOrder();
// balancedBST.inOrder()
// balancedBST.postOrder()
// balancedBST.postOrder()
// console.log(balancedBST.heigth())
// console.log(balancedBST.depth(324))
// console.log(balancedBST.isBalanced())
// console.log(balancedBST.rebalance())

