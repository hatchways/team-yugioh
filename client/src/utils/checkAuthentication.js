import axios from "axios";

const checkAuthentication = () => {
  return axios
    .get("/api/authentication/test", { withCredentials: true })
    .then((res) => {
      if (res.status === 200) {
        return true;
      } else {
        throw new Error("User is not authenticated");
      }
    });
};

export default checkAuthentication;
