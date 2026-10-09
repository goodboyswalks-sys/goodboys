export function sameOrigin(origin,host){try{const url=new URL(origin);return !!host&&['http:','https:'].includes(url.protocol)&&url.host===host;}catch{return false;}}
