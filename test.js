const   assert = require('assert');
const {add ,mul} = require('./math');
assert.equal(add(2,3),6);  

if(add(2,3)===5){
    console.log('add(2,3)===5');
}else{
    console.log('add(2,3)!==5');
}


