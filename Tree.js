import Node from './Node.js'

export default function Tree (array) {
  this.buildTree = (array, start = null, end = null) => {
    if (start > end) return null

    const mid = Math.floor(array.length / 2)
    const left = array.slice(0, mid)
    const right = array.slice(mid + 1)

    return new Node(array[mid], this.buildTree(left, 0, left.length - 1), this.buildTree(right, 0, right.length - 1))
  }

  this.root = this.buildTree(array)
}
