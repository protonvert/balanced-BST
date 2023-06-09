import Tree from './Tree.js'
import Node from './Node.js'

// ## function declarations
const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return
  }

  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false)
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`)
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true)
  }
}

function generateRandomArray (nums) {
  const array = []

  if (nums >= 100) {
    console.log('array must be less than 100')
    return
  }

  for (let i = 0; i < nums; i++) {
    const num = Math.floor(Math.random() * 100)
    array.push(num)
  }
  return array
}

function createRandomBinaryTree (numOfElements) {
  const BST = new Tree(generateRandomArray(numOfElements))
  return BST
}

/*
/---------------------------------------------------------------------------------/
*/

// Create a binary search tree from an array of random numbers < 100
const BST = createRandomBinaryTree(14)
prettyPrint(BST.root)

// Confirm that the tree is balanced by calling isBalanced.
console.log(`Tree is balanced: ${BST.isBalanced()}`)

// Print out all elements in level, pre, post, and in order.

console.log(`\npreOrder: ${BST.preorder()}`)
console.log(`postOrder: ${BST.postorder()}`)
console.log(`inOrder: ${BST.inorder()}`)

// Unbalance the tree by adding several numbers > 100.
for (let i = 0; i < 15; i++) {
  const num = Math.floor((Math.random() * 100) + 100)
  BST.insert(new Node(num))
}

// Confirm that the tree is unbalanced by calling isBalanced.

console.log('\nnewly unbalanced tree:')
prettyPrint(BST.root)
console.log(`Tree is balanced: ${BST.isBalanced()}`)

// Balance the tree by calling rebalance.
console.log('rebalancing tree...')
BST.rebalance()

// Confirm that the tree is balanced by calling isBalanced.
prettyPrint(BST.root)
console.log(`Tree is balanced: ${BST.isBalanced()}`)

// Print out all elements in level, pre, post, and in order.
console.log(`\npreOrder: ${BST.preorder()}`)
console.log(`postOrder: ${BST.postorder()}`)
console.log(`inOrder: ${BST.inorder()}`)
