import axios from "axios";

export async function loginUser(formData) {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/login`,
      formData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getUser(token) {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/user`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function createUser(userData) {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/v1/user`,
      userData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // console.log("user created\n", res.data);
  } catch (error) {
    console.log(error);
  }
}

export async function updateUserData(userData, token){
  try {
    const res = await axios.patch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/v1/user`,
      userData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
}
