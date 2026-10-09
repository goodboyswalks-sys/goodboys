import test from 'node:test';
import assert from 'node:assert/strict';
import { validateEnquiry } from '../lib/validation.mjs';
const good={name:'Jo',email:'jo@example.com',dog:'Ted',postcode:'90210',service:'solo',notes:'',consent:'yes'};
test('valid enquiry is normalized',()=>assert.equal(validateEnquiry({...good,email:' jo@example.com '}).email,'jo@example.com'));
test('rejects missing consent, invalid service, oversized fields and malformed bodies',()=>{for(const data of [null,[],{...good,consent:'no'},{...good,service:'x'},{...good,name:'x'.repeat(101)},{...good,email:'bad'},{...good,dog:7}])assert.equal(validateEnquiry(data),null);});
