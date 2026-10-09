export function validateEnquiry(data) {
 if (!data || typeof data !== "object" || Array.isArray(data)) return null;
 const limits={name:100,email:254,dog:100,postcode:20,notes:2000}; const result={};
 for(const [key,max] of Object.entries(limits)){ if(key==="notes" && data[key]===undefined){result[key]="";continue;} if(typeof data[key]!=="string"||data[key].length>max)return null;result[key]=data[key].trim(); }
 if(!result.name||!result.dog||!result.postcode||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(result.email)||!["group","visit"].includes(data.service)||data.consent!=="yes")return null;
 return {...result,service:data.service,consent:true};
}
