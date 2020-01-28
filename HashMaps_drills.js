const HashMap = require ('./HashMap.js');
const { HashMapSC }  = require ('./HashMapSC.js')

function main(){
    //console.log(removeDuplicates('Hello there my name is freddy, how are you today?'))

    //console.log(permutationsInPalindrome('hoddoh'))

    console.log(anagramGrouping(['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race']))
//    let lotr = new HashMap(); 

//    lotr.set('Hobbit','Bilbo')
//    lotr.set('Hobbit' ,"Frodo")
//    lotr.set('Wizard' , "Gandolf")
//    lotr.set('Human' , "Aragon")
//    lotr.set('Elf' , "Legolas")
//    lotr.set('Maiar' , "The Necromancer")
//    lotr.set('Maiar' , "Sauron")
//    lotr.set('RingBearer' , "Gollum")
//    lotr.set('LadyOfLight' , "Galadriel")
//    lotr.set('HalfElven' , "Arwen")
//    lotr.set('Ent' , "Treebeard")

//    console.log(lotr.MAX_LOAD_RATIO)
//    console.log(lotr.get('Maiar'))
//    console.log(lotr.get('Hobbit'))
//    console.log(lotr)
//    return lotr
}


/*
Following function removes all duplicated items in a string
*/
function removeDuplicates(newString){

    let newArray = newString.split('')
    let newWords = ''
    let remover = new HashMapSC();

    for(let i=0; i< newArray.length; i++){
        remover.set(newArray[i], i)
        newWords = remover._display()
    }

    return newWords
}

function permutationsInPalindrome(string){
    let newArray = string.split('')
    let permutations = new HashMapSC();
    let counter = 0;
    for(let i=0; i< newArray.length; i++){
        permutations.set(newArray[i], i)
        //console.log(permutations.get(newArray[i]))
    }
    for(let i=j=0; j< permutations.length; j++){
        let temp = permutations.get(newArray[j], j)
        let curr  = temp.head
        while(curr){
            if(curr.next){
                counter++
            }
            curr = curr.next
        }
        console.log(temp)
        console.log(counter + " :the counter")
    }

    if((counter === permutations.length )|| counter === (permutations.length - 1 )){
        return true
    } else 
        return false

}

function anagramGrouping(list){

    let newArray=[]
    let tempArray = []
    let tempArray2 = []
    let newString = ''
    let anagramHash = new HashMapSC();

    for(let i=0; i < list.length; i++){
        newArray[i]=list[i].split('')
    }

    for(let j=0;j< newArray.length; j++){
        for(let k=0; k< newArray[j].length; k++){
            //console.log(newArray[j][k])
            anagramHash.set(newArray[j][k], k)
            newString += anagramHash.get(newArray[j][k]).head.value.value
        }
        tempArray.push(newString)
        newString = ''
    }

    for(let l= 0; l < tempArray.length; l++){
        let temp = tempArray[l].split('').sort(function(a,b){return a-b})
        let temp2 = temp.join('')
        tempArray2.push(temp2)
    }

    let anArray=[]
    for(let m=0; m< tempArray2.length; m++){
        let temp = {
            key:'',
            hash:''
        }
        temp.key = newArray[m].join('')
        temp.hash = tempArray2[m]
        anArray.push(temp)
    }

    let result = anArray.reduce(function (r, a) {
        r[a.hash] = r[a.hash] || []
        r[a.hash].push(a)
        return r;
    }, Object.create(null))

    return result
    
}


main()
//removeDuplicates('google')
//anagramGrouping(['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race'])

/*
Sauron
Frodo
HashMap {
  length: 9,
  _hashTable: [
    <2 empty items>,
    { key: 'HalfElven', value: 'Arwen', DELETED: false },
    <1 empty item>,
    { key: 'LadyOfLight', value: 'Galadriel', DELETED: false },
    <1 empty item>,
    { key: 'Wizard', value: 'Gandolf', DELETED: false },
    { key: 'RingBearer', value: 'Gollum', DELETED: false },
    <4 empty items>,
    { key: 'Elf', value: 'Legolas', DELETED: false },
    { key: 'Hobbit', value: 'Frodo', DELETED: false },
    <6 empty items>,
    { key: 'Ent', value: 'Treebeard', DELETED: false },
    <1 empty item>,
    { key: 'Human', value: 'Aragon', DELETED: false },
    { key: 'Maiar', value: 'Sauron', DELETED: false }
  ],
  _capacity: 24,
  _deleted: 0,
  MAX_LOAD_RATIO: 0.5,
  SIZE_RATIO: 3
}
*/

/*
    Capacity is triple the initial size. Initial Size was 8 items, once the load limit of 0.5 was reached (4 items)
    inital capacity was tripled according to the size ratio
*/

/*
2

    Reverse of first hash map is created, duplicate key values are overwritten by latest value

*/

/*
3

    Open Addressing
        Inital Length = 11

        Hash function = k mod m.... k is key, m is length

        22|88|59| Empty |4|15|28|17|31|10| Empty

    Seperate Chaining

        Inital Length = 9
        
        Hash function = k mod m

              10
              19   12         33
            | 28 | 20 | | 5 | 15 | | | 17

*/
