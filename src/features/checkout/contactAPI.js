export const getContacts = (userId)=>{
    return new Promise (async (resolve,reject)=>{
        const response = await fetch(`http://localhost:8000/contacts?userId=${userId}`);
        const data  = response.json();
        resolve({data});
    })
}


export const createContact = (ContactInfo)=>{
    return new Promise(async (resolve,reject)=>{
        const response = await  fetch('http://localhost:8000/contacts',{
            method:"POST",
            body: JSON.stringify(ContactInfo),
            headers:{'content-type':'application/json'}
        })
        const data = response.json();
        resolve({data});
    })
}