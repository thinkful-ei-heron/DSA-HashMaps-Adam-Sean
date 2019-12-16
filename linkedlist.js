class LinkedList {
    constructor() {
        //initially setting head to null; empty list
        this.head = null
    }

    insertFirst(item) {
        //to insert an item into the beginning of a list, set this.head as a new node instance, passing in the item to store and the location
        this.head = new _Node(item, this.head)
        console.log(`${this.head.value} was added to the beginning of the list`)
    }

    insertLast(item) {
        // check for items already in the list; if none, insert the item at the start of the list
        if (this.head === null) {
            this.insertFirst(item)
        }
        else {
            // start at the beginning of the list
            let tempNode = this.head
            // loop through the list until you reach the last node, which will have a next pointer of null
            while (tempNode.next !== null) {
                tempNode = tempNode.next
            }
            // once tempNode is set to the last item of the list, set it's next pointer to the new node instance
            tempNode.next = new _Node(item, null)
            console.log(`${tempNode.next.value} was added to the end of the list`)
        }
    }

    insertLastWithCycle(item) {
        // check for items already in the list; if none, insert the item at the start of the list
        if (this.head === null) {
            this.insertFirst(item)
        }
        else {
            // start at the beginning of the list
            let tempNode = this.head
            // loop through the list until you reach the last node, which will have a next pointer of null
            while (tempNode.next !== null) {
                tempNode = tempNode.next
            }
            // once tempNode is set to the last item of the list, set it's next pointer to the new node instance
            tempNode.next = new _Node(item, this.head)
            console.log(`${tempNode.next.value} was added to the end of the list`)
        }
    }

    insertBefore(item, key) {
        // check for items already in the list; if none, insert the item at the start of the list
        if (this.head === null) {
            this.insertFirst(item)
        }
        else {
            // start at the beginning of the list
            let currNode = this.head
            // tracks previous node to use when we find place to store the new item
            let previousNode = this.head
            // loop through the list; if not the last node and not the node to insert the item before, set currNode to the next node and previousNode to current
            while ((currNode !== null) && (currNode.value !== key)) {
                previousNode = currNode
                currNode = currNode.next
            }
            // if you reach the end of the list and the key of the item to insert before is not found, print 'Cannot insert before nonexistent item'
            if (currNode === null) {
                console.log('Cannont insert before nonexistent item')
                return
            }
            // once found, insert the new item before the given key by setting the previous nodes next pointer to the new node instance, passing the new node a next pointer of the current node
            previousNode.next = new _Node(item, currNode)
            console.log(`${previousNode.next.value} was added before ${key}`)
        }
    }

    insertAfter(item, key) {
        // check for items already in the list; if none, insert the item at the start of the list
        if (this.head === null) {
            this.insertFirst(item)
        }
        else {
            // start at the beginning of the list
            let currNode = this.head
            // loop through the list; if not the last node and not the node to insert the item after, set currNode to the next node
            while ((currNode !== null) && (currNode.value !== key)) {
                currNode = currNode.next
            }
            // if you reach the end of the list and the key of the item to insert after is not found, print 'Cannot insert after nonexistent item'
            if (currNode === null) {
                console.log('Cannont insert after nonexistent item')
                return
            }
            // once found, insert the new item after the given key by setting the current node's next pointer to the new node instance, passing the new node a next pointer of the current node's old next pointer
            let nextNode = currNode.next
            currNode.next = new _Node(item, nextNode)
            console.log(`${currNode.next.value} was added after ${key}`)
        }
    }

    insertAt(item, index) {
        // check for items already in the list; if none, insert the item at the start of the list
        if (this.head === null) {
            this.insertFirst(item)
        }
        else {
            // start at the beginning of the list
            let currNode = this.head
            // tracks previous node to use when we find place to store the new item
            let previousNode = null
            // if given the index of 0, insert the item at the beginning of the list
            if (index === 0) {
                this.insertFirst(item)
            }
            // loop through index; for every i before 1 before index, set the current node to the next node
            for (let i = 0; i < index; i++) {
                // loop through index; for every i before 1 before index, set the current node to the next node
                if (i < (index - 1)) {
                    currNode = currNode.next
                }
                // when i gets to the index just before the given index, set the previous node to the current node and the current node to the next node
                if (i === (index - 1)) {
                    previousNode = currNode
                    currNode = currNode.next
                }
            }
            // set the next pointer of the previous node to the new node instance, passing the new instance the current node as the next pointer
            previousNode.next = new _Node(item, currNode)
            console.log(`${previousNode.next.value} was inserted at position ${index + 1}`)
        }
    }

    find(item) {
        // start at the beginning of the list
        let currNode = this.head
        // if list is empty, return null
        if (!this.head) {
            return null
        }
        // loop through the list, comparing each item to the item to find
        while (currNode.value !== item) {
            // if you reach the end of the list and the item was not found, return null
            if (currNode.next === null) {
                console.log(`${item} was NOT found`)
                return null
            }
            else {
                currNode = currNode.next
            }
        }
        // once found, return item
        console.log(`${item} was found in the list`)
        return currNode
    }

    remove(item) {
        // if the list is empty, return null
        if (!this.head) {
            return null
        }
        // if the item to remove is at the beginning of the list, set the head to the next item in the list
        if (this.head.value === item) {
            this.head = this.head.next
            return
        }
        // start at the beginning of the list
        let currNode = this.head
        // tracks previous node to use when we find the node to remove
        let previousNode = this.head
        // loop through the list; if not the last node and not the node to remove, set currNode to the next node and previousNode to the current 
        while ((currNode !== null) && (currNode.value !== item)) {
            previousNode = currNode
            currNode = currNode.next
        }
        // if you reach the end of the list and the item was not found, print 'Item not found'
        if (currNode === null) {
            console.log('Item not found')
            return
        }
        // once found, remove the node by skipping it; setting the previousNode's next pointer to currNode's next pointer
        previousNode.next = currNode.next
        console.log(`${item} was removed from the list`)
    }
}

module.exports = LinkedList