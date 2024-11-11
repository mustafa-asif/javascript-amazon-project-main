 import { FormatCurrrency } from '../scripts/util/money.js';

 // 20.004 == 20.00
 if (FormatCurrrency(2000.4) === '20.00'){
  console.log("passed");
 }else{
  console.log("failed");
 }
 

 console.log(FormatCurrrency(1.5));