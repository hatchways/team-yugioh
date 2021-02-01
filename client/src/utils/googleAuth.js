import axios from "axios";

const userAPIpath = "http://localhost:3001/api/authentication/";

export const sendToken = async (callback) => {
  try {
    const response = await fetch(userAPIpath + "geturl", {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
    });
    const content = await response.json();

    const loginPopup = window.open(content.url);

    var popupTick = setInterval(async function () {
      if (loginPopup.closed) {
        clearInterval(popupTick);
        testAuth()
          .then((resp) => callback(resp))
          .catch((err) => console.log(err));
      }
    }, 500);
  } catch (err) {
    console.log(err);
  }
};

export const sendCode = async (code) => {
  axios
    .post(userAPIpath + "google", { code }, { withCredentials: true })
    .then(() => window.close())
    .catch((err) => {
      console.log(err);
      window.close();
    });
};

//tests weather user is authenticated returns true for authenticated and false for not authenticated
export const testAuth = async () => {
  const response = await axios.get(userAPIpath + "test", {
    withCredentials: true,
  });
  if (response.status === 200) {
    document.cookie = "calendapp=true";
    return true;
  } else return false;
};

export const googleLogout = async () => {
  const response = await axios.get(userAPIpath + "logout", {
    withCredentials: true,
  });
  if (response.status === 200) {
    //document.cookie = "cookiename= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
    console.log(response.data);
    return true;
  } else return false;
};
