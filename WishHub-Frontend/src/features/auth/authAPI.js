export const createUser = (userData) => {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(
      "http://localhost:3000/api/v1/users/register",
      {
        method: "POST",
        body: JSON.stringify(userData),
        headers: { "content-type": "application/json" },
        credentials: "include",
      }
    );
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem("isLoggedIn", true);
      resolve({ data });
    } else {
      // console.log("Eroror is", error);
      reject({ message: data.error });
    }
  });
};

export const loginUser = (userData) => {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(`http://localhost:3000/api/v1/users/login`, {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "content-type": "application/json" },
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("isLoggedIn", true);
      resolve({ data });
    } else {
      reject({ message: "Auth failed" });
    }
  });
};
