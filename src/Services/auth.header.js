export default function authHeader() {

    const token = localStorage.getItem("token");
    //  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMzE1MWRmYjVmZWZiMjA5MjBkOGZlYSIsImlhdCI6MTY2NTEyNjM1MiwiZXhwIjoxNjY3NzE4MzUyfQ.LJiJwstB2GZQOTl8Zpv9gXw90jrK5Qg2FBMx-dVa7LQ"
    if (token) {
      // for Node.js Express back-end
      return { Authorization: token };
    } else {
      return {};
    }
  }
  