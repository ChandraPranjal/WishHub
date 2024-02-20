export const getContacts = (userId) => {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(
      `http://localhost:3000/api/v1/users/contacts`,{
        credentials:'include'
      }
    );
    const data = response.json();
    resolve({ data });
  });
};

export const createContact = (ContactInfo) => {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(
      `http://localhost:3000/api/v1/users/contacts`,
      {
        method: "POST",
        body: JSON.stringify(ContactInfo),
        headers: { "content-type": "application/json" },
        credentials:'include'
      }
    );
    const data = response.json();
    resolve({ data });
  });
};
