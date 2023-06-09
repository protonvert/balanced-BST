import Node from './Node.js'

export default function Tree (input) {
  const createUniqueSortedArray = (input) => {
    const uniqueArray = [...new Set(input)]
    const array = uniqueArray.sort((a, b) => {
      return a - b
    })
    return array
  }

  const array = createUniqueSortedArray(input)

  this.inOrderTraversed = []
  this.preOrderTraversed = []
  this.postOrderTraversed = []

  this.buildTree = (array, start = null, end = null) => {
    if (start > end) return null

    const mid = Math.floor(array.length / 2)
    const left = array.slice(0, mid)
    const right = array.slice(mid + 1)

    return new Node(array[mid], this.buildTree(left, 0, left.length - 1), this.buildTree(right, 0, right.length - 1))
  }

  this.insert = (insertNode, searchNode = this.root) => {
    // is this node === insertNode, its already in the BST
    if (insertNode.data === searchNode.data) return

    // is it less than this node? go left
    if (insertNode.data < searchNode.data) {
      /* if next value is null, place node into next value */
      if (searchNode.left === null) {
        searchNode.left = insertNode
      } else {
        this.insert(insertNode, searchNode.left)
      }
    }

    // is it greater than this node? go right
    if (insertNode.data > searchNode.data) {
    /* if next value is null, place node into next value */
      if (searchNode.right === null) {
        searchNode.right = insertNode
      } else {
        this.insert(insertNode, searchNode.right)
      }
    }
  }

  this.delete = (val, root = this.root) => {
    // function will navigate through the whole tree

    // if root is null, just return null (or root which is null)
    if (root === null) return root

    // if the value being searched is less than current node , set the left node to the result of this function recursively
    // called on that left element
    if (val < root.data) {
      root.left = this.delete(val, root.left)
    }
    // same thing but for right side
    else if (val > root.data) {
      root.right = this.delete(val, root.right)
    }
    // else if the value === current node data, do the following
    else if (val === root.data) {
      // if has one child, put it in place of one being removed
      if (root.left == null) return root.right
      if (root.right == null) return root.left

      // if node has two children, do the following

      // set root.data === to result of minValue of root.right, place lowest value form
      root.data = minValue(root.right)
      root.right = this.delete(root.data, root.right)
    }

    return root
  }

  function minValue (root) {
    let minv = root.data
    while (root.left != null) {
      minv = root.left.data
      root = root.left
    }
    return minv
  }

  this.find = (val, root = this.root) => {
    if (root == null) return null

    // if val < root, go left
    if (val < root.data) {
      return this.find(val, root.left)
    }

    // if val > root, go right
    else if (val > root.data) {
      return this.find(val, root.right)
    } else if (root.data === val) {
      return root
    }
  }

  this.toArray = (array, val) => {
    array.push(val)
  }

  this.levelOrder = (func = this.toArray, root = this.root) => {
    this.levelOrderTraversed = []
    if (root === null) return
    const queue = [this.root]
    while (queue.length > 0) {
      const node = queue[0]
      // execute callbackFn on node
      func(this.levelOrderTraversed, node.data)

      // if node has a left child, add it to queue
      if (node.left !== null) queue.push(node.left)

      // if node has a right child, add it to queue
      if (node.right !== null) queue.push(node.right)

      queue.shift()
    }

    return this.levelOrderTraversed
  }

  this.inorder = (func = this.toArray, root = this.root) => {
    // base case
    if (root === null) return

    // go left
    this.inorder(func, root.left)

    // run funtion on root data
    func(this.inOrderTraversed, root.data)

    // go right
    this.inorder(func, root.right)

    return this.inOrderTraversed
  }

  this.preorder = (func = this.toArray, root = this.root) => {
    if (root === null) return

    // run funtion on root data
    func(this.preOrderTraversed, root.data)

    // go left
    this.preorder(func, root.left)

    // go right
    this.preorder(func, root.right)

    return this.preOrderTraversed
  }

  this.postorder = (func = this.toArray, root = this.root) => {
    if (root === null) return

    // go right
    this.postorder(func, root.right)
    // run funtion on root data
    func(this.postOrderTraversed, root.data)
    // go left
    this.postorder(func, root.left)

    return this.postOrderTraversed
  }

  this.height = (root = this.root) => {
    // base case
    if (root === null) return -1

    const leftHeight = this.height(root.left)
    const rightHeight = this.height(root.right)

    return Math.max(leftHeight, rightHeight) + 1
  }

  this.depth = (val, root = this.root, edges = 0) => {
    if (root === null) return

    if (root.data === val) return edges

    if (root.data < val) {
      return this.depth(val, root.right, edges + 1)
    } else {
      return this.depth(val, root.left, edges + 1)
    }
  }

  this.isBalanced = (root = this.root) => {
    // get depth of each side
    const leftHeight = this.height(root.left)
    const rightHeight = this.height(root.right)

    // compare each sides depth
    const heightDifference = leftHeight - rightHeight

    // if there is a variation greater than 1, return false
    if (heightDifference <= 1 && heightDifference >= -1) return true

    return false
  }

  this.rebalance = () => {
    // sort the array, make sure there are no duplicates
    const array = createUniqueSortedArray(this.inorder())

    // build new tree
    this.root = this.buildTree(array)
  }

  this.root = this.buildTree(array)
}
