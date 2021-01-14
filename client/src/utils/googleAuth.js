import axios from "axios";

const userAPIpath = "http://localhost:3001/api/authentication/google";

export const sendToken = async (code, email, variant) => {
  try {
    const response = await axios.post(userAPIpath, { code: code.code, email, variant }, { withCredentials: true });

    console.log(response);
  } catch (err) {
    console.log(err);
  }
};
