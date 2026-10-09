import test from 'node:test';
import assert from 'node:assert/strict';
import {dayKey,overview} from '../lib/os-data.mjs';
test('overview separates completed fees, unpaid fees and cancelled walks',()=>{
 const now=new Date(2026,9,9,12), today=new Date(2026,9,9,10).toISOString(),old=new Date(2026,8,9,10).toISOString();
 const result=overview([{status:'new'},{status:'contacted'}],[{active:true},{active:false}],[{starts_at:today,status:'completed',fee:'25.50',paid:true},{starts_at:today,status:'completed',fee:'30',paid:false},{starts_at:today,status:'cancelled',fee:50,paid:false},{starts_at:old,status:'completed',fee:'15',paid:false}],now);
 assert.equal(result.earned,55.5);assert.equal(result.unpaid,45);assert.equal(result.today.length,2);assert.equal(result.completed,2);assert.equal(result.newEnquiries,1);assert.equal(result.activeClients,1);
});
test('date keys use local calendar dates',()=>assert.equal(dayKey(new Date(2026,0,2,1)),'2026-01-02'));
import {sameOrigin} from '../lib/request-origin.mjs';
test('origin checks use the browser-facing host and reject malformed or foreign origins',()=>{assert.equal(sameOrigin('http://127.0.0.1:3002','127.0.0.1:3002'),true);assert.equal(sameOrigin('https://goodboys.example','goodboys.example'),true);for(const o of [null,'bad','https://evil.example','https://goodboys.example.evil'])assert.equal(sameOrigin(o,'goodboys.example'),false);});
