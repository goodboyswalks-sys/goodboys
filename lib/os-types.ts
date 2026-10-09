export type Enquiry={id:string;created_at:string;name:string;email:string;dog:string;postcode:string;service:string;notes:string;status:"new"|"contacted"|"closed";follow_up_on:string|null;internal_notes:string;client_id:string|null};
export type Client={id:string;name:string;email:string;phone:string;dog:string;address:string;care_notes:string;active:boolean};
export type Walk={id:string;client_id:string;starts_at:string;duration:number;service:string;fee:number;status:"scheduled"|"completed"|"cancelled";paid:boolean;notes:string};
export type Reply={id:string;enquiry_id:string;body:string;created_at:string};
