export const createUser = (userData) => {
  return new Promise(async (resolve, reject) => {
    const response = await fetch("http://localhost:8000/users", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "content-type": "application/json" },
    });
    const data = response.json();
    resolve({ data });
  });
};

export const loginUser = (userData) => {

  return new Promise(async (resolve, reject) => {
    const response = await fetch(
      `http://localhost:8000/users?email=${userData.email}`
    );

    const data = await response.json();
    if (data.length > 0) {
      if (data[0].password === userData.password) {
        resolve({ data: data[0] });
      } else {
        reject({ message: "Auth failed" });
      }
    } else {
      reject({ message: "User Not Found" });
    }
  });
};
