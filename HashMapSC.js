class _Node {
    constructor(value, next){
        this.value = value;
        this.next = next
    }
}
class LinkedList {
    constructor() {
      this.head = null;
    }
  
    insertFirst(item) {
      this.head = new _Node(item, this.head);
    }
  
    insertLast(item) {
      if (this.head === null) {
        this.insertFirst(item);
      }
      else {
        let tempNode = this.head;
        while (tempNode.next !== null) {
            tempNode = tempNode.next;
        }
        tempNode.next = new _Node(item, null);
      }
    }
  
    insertBefore(item, key) {
      let currNode = this.head;
      let prevNode = this.head;
  
      if (this.head.value === key) {
        this.insertFirst(item);
      } else {
        while((currNode !== null) && (currNode.value !== key)) {
          prevNode = currNode
          currNode = currNode.next
        }
      }
      prevNode.next = new _Node(item, currNode);
    }
  
    insertAfter(item, key) {
      let currNode = this.head;
      let prevNode = this.head;
  
      if (this.head.value === key) {
        this.insertFirst(item);
      } else {
        while((currNode !== null) && (currNode.value !== key)) {
          prevNode = currNode
          currNode = currNode.next
        }
      }
      currNode.next = new _Node(item, prevNode.next.next);
    }
  
    insertAt(item, position){
      
      let currNode = this.head
      let prevNode = this.head
      let counter = 0
  
      while((currNode !== null)&&(counter !== (position))) {
          prevNode = currNode
          currNode = currNode.next
          counter++
      }
      prevNode.next = new _Node(item, currNode.next)
      return currNode
    }
  
    find(item) { 
      // Start at the head
      let currNode = this.head;
      // If the list is empty
      if (!this.head) {
        return null;
      }
      // Check for the item 
      while (currNode.value !== item) {
          /* Return null if it's the end of the list 
          and the item is not on the list */
          if (currNode.next === null) {
            return null;
          }
          else {
            // Otherwise, keep looking 
            currNode = currNode.next;
          }
      }
      // Found it
      return currNode;
    }
  
    remove(item){ 
      // If the list is empty
      if (!this.head) {
        return null;
      }
      // If the node to be removed is head, make the next node head
      if (this.head.value === item) {
        this.head = this.head.next;
        return;
      }
      // Start at the head
      let currNode = this.head;
      // Keep track of previous
      let previousNode = this.head;
  
      while ((currNode !== null) && (currNode.value !== item)) {
        // Save the previous node 
        previousNode = currNode;
        currNode = currNode.next;
      }
      if (currNode === null) {
        //console.log('Item not found');
        return;
      }
      previousNode.next = currNode.next;
    }
  }


class HashMapSC {
    constructor(initialCapacity=8) {
        this.length = 0;
        this._hashTable = [];
        this._capacity = initialCapacity;
        this._deleted = 0;
        this.MAX_LOAD_RATIO = 1;
        this.SIZE_RATIO = 3;
    }
    
    get(key) {
        const index = this._findSlot(key);
        if (this._hashTable[index] === undefined) {
            throw new Error('Key error');
        }
        return this._hashTable[index];
    }


    async set(key, value){
        //let temp
        const loadRatio = (this.length + this._deleted + 1) / this._capacity;
        if(key !== undefined){
        if (loadRatio >this.MAX_LOAD_RATIO) {
            this._resize(this._capacity * this.SIZE_RATIO);
        }
        //Find the slot where this key should be in
        let index = this._findSlot(key);

        if(this._hashTable[index] === undefined){
          this._hashTable[index] = new LinkedList();
          this.length++
          await this._hashTable[index].insertFirst({
            key,
            value,
            DELETED: false
          })
        } 
        else if(this._hashTable[index] !== undefined){
          //this.length++
          await this._hashTable[index].insertLast({
            key,
            value,
            DELETED: false
          })
          
        }   
      }      
    }

    delete(key) {
        const index = this._findSlot(key);
        const slot = this._hashTable[index];
        if (slot === undefined) {
            throw new Error('Key error');
        }
        slot.DELETED = true;
        this.length--;
        this._deleted++;
    }

    _findSlot(key) {
      let index
      //console.log(key)
      if(key !== undefined){
      const hash = HashMapSC._hashString(key);
      //console.log(hash + ' key: ' + key)
      //console.log(this._capacity)
      index = hash % this._capacity;
      //return index
      // const slot = this._hashTable[index];
      // if ((slot === undefined )  || ( slot.key === key )){//&& !slot.DELETED)){
      //   return index;
      // }
      // for (let i=start; i< (start + this._capacity); i++) {
      //     const index = i % this._capacity;
      //     const slot = this._hashTable[index];
          // if ((slot === undefined )  || ( slot.key === key && !slot.DELETED)){
          //     return index;
          // }
      // }
    }
    return index
    }

    _display(){
      let newString = ''
      let counter = 0
      let temp = this._hashTable
      for(let k=0; k < temp.length; k++){
        if(!temp[k]){
          temp.splice(k,1)
        }
      }
      for(let i=0; i< this._hashTable.length; i++){
        for(let j=0; j< this._hashTable.length; j++){
          if((temp[j] !== undefined && temp[j+1] !== undefined) && (temp[j].value>temp[j+1].value)){
            let temp2 = temp[j]
            temp[j] = temp[j+1]
            temp[j+1] = temp2
          }
          
        }
        if(temp[i]){
          newString += temp[i].key
        }
        // if(this._hashTable[i]!==undefined){ 
        //   newString = newString + this._hashTable[i].key
        // }
      }
      return newString
    }

    _resize(size) {
        const oldSlots = this._hashTable;
        this._capacity = size;
        // Reset the length - it will get rebuilt as you add the items back
        this.length = 0;
        this._deleted = 0;
        this._hashTable = [];

        for (const slot of oldSlots) {
            if (slot !== undefined && !slot.DELETED) {
                this.set(slot.key, slot.value);
            }
        }
    }

    static _hashString(string) {
        let hash = 5381;
        for (let i = 0; i < string.length; i++) {
            //Bitwise left shift with 5 0s - this would be similar to
            //hash*31, 31 being the decent prime number
            //but bit shifting is a faster way to do this
            //tradeoff is understandability
            hash = (hash << 5) + hash + string.charCodeAt(i);
            //converting hash to a 32 bit integer
            hash = hash & hash;
        }
        //making sure hash is unsigned - meaning non-negtive number. 
        return hash >>> 0;
    }
}

module.exports = { HashMapSC }
