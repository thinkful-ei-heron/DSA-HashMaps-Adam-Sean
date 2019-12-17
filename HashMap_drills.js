const HashMapOpen = require('./HashMapOpen')

//--------------------------------------------------
// 1. Create a HashMap class
function main() {
    const lotr = new HashMapOpen
    lotr.set('Hobbit', 'Bilbo')
    lotr.set('Hobbit', 'Frodo')
    lotr.set('Wizard', 'Gandolf')
    lotr.set('Human', 'Aragon')
    lotr.set('Elf', 'Legolas')
    lotr.set('Maiar', 'The Necromancer')
    lotr.set('Maiar', 'Sauron')
    lotr.set('RingBearer', 'Gollum')
    lotr.set('LadyOfLight', 'Galadriel')
    lotr.set('HalfElven', 'Arwen')
    lotr.set('Ent', 'Treebeard')
    console.log(lotr)
    for (let i = 0; i < lotr._capacity; i++) {
        console.log(lotr._hashTable[i])
    }
    // console.log(lotr.get('Maiar'))
    // console.log(lotr.get('Hobbit'))
}

// Retrieving the values of Maiar and Hobbit return the values, 'Frodo' and 'Sauron. This is because the keys of Maiar and Hobbit were duplicated and the value was overwritten for each.
// The capacity of the table is 24. This is because once the loadRatio exceeds the MAX_RATIO, which in this case is when we set the 5th item, the resize function takes the capacity(8) times the SIZE_RATIO(3).

// main()


//--------------------------------------------------
// 2. WhatDoesThisDo

const WhatDoesThisDo = function () {
    let str1 = 'Hello World.';
    let str2 = 'Hello World.';
    let map1 = new HashMapOpen();
    map1.set(str1, 10); // sets the key 'Hello World' in map1 to value 10
    map1.set(str2, 20); // sets the key 'Hello World' in map1 to value 20
    let map2 = new HashMapOpen();
    let str3 = str1;
    let str4 = str2;
    map2.set(str3, 20); // sets the key 'Hello World' in map2 to value 20
    map2.set(str4, 10); // sets the key 'Hello World' in map2 to value 10

    console.log(map1.get(str1)); // prints the value of the key of str1. Because str1 and str2 are the same key, when str2 is set, it replaces the value of str1. Calling str1 or str2 will retrieve the second value set of 20.
    console.log(map2.get(str3)); // prints the value of the key of str1. Because str3 and str4 are the same key, when str4 is set, it replaces the value of str3. Calling str3 or str4 will retrieve the second value set of 10.
}

// WhatDoesThisDo()


//--------------------------------------------------
// 3. Demonstrate understanding of Hash maps

// 1. [10, 22, 31, 4, 15, 28, 17, 88, 59]

// 2. [null, 28 (19, 10), 20, 12, null, 5, 15 (33), null, 17]


//--------------------------------------------------
// 4. Remove duplicates

function deleteDuplicates(str) {
    let hashMap = new HashMapOpen
    let newStr = ''
    for (let i = 0; i < str.length; i++) {
        let checkOpenIndex = hashMap.get(str[i])
        if (checkOpenIndex === undefined) {
            hashMap.set(str[i], null)
            newStr = newStr + str[i]
        }
    }
}

deleteDuplicates('google')
0



//--------------------------------------------------
// 5. Any permutation a palindrome

function anyPermutation(str) {
    let hashMap = new HashMapOpen
    let count = 0
    for (let i = 0; i < str.length; i++) {
        if (hashMap.get(str[i]) === undefined) {
            count++
        }
        count--
        hashMap.set(str[i], null)
    }
    if (count > 1) {
        return console.log(false)
    }
    return console.log(true)
}

anyPermutation('aceecarre')

//--------------------------------------------------
// 6. Anagram grouping

function groupAnagrams(arr) {
    let hashMap = new HashMapOpen
    anagrams = []

    for (let i = 0; i < arr.length; i++) {
        let sorted = arr[i].split('').sort().join('')
        if (hashMap.get(sorted) === undefined) {
            hashMap.set(sorted, [arr[i]])
        }
        else {
            hashMap.get(sorted).push(arr[i])
        }
    }
    hashMap._hashTable.forEach(obj => anagrams.push(obj.value))
    console.log(anagrams)
}

groupAnagrams(['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race'])

//--------------------------------------------------
// 7. Separate Chaining
