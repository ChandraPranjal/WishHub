export const getContacts = (userId) => {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(
      `http://localhost:3000/api/v1/users/contacts/${userId}`
    );
    const data = response.json();
    resolve({ data });
  });
};

export const createContact = (ContactInfo) => {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(
      `http://localhost:3000/api/v1/users/contacts/${ContactInfo.userId}`,
      {
        method: "POST",
        body: JSON.stringify(ContactInfo),
        headers: { "content-type": "application/json" },
      }
    );
    const data = response.json();
    resolve({ data });
  });
};
