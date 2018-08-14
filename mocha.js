const {should,expect,assert} = require('chai');
const {add,nul} = require('./math');


describe('#math',()=>{
    describe('add',()=>{
        it.skip('should return 5 when 2 + 3',() =>{
            expect(add(2,3),5);
        });
        
        it('should return -1 when 2 + -3',() =>{
            expect(add(2,-3),-1);
        })   
     })

     describe('mul',()=>{
        it('should return 6 when 2 * 3',() =>{
            expect(add(2,3),6);
        });
    });
})