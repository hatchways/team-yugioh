import axios from "axios";

const userAPIpath = "http://localhost:3001/api/authentication/";

export const sendToken = async closeCallback => {
  try {
    const response = await fetch(userAPIpath + "geturl", {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "same-origin"
    });
    const content = await response.json();

    const loginPopup = window.open(content.url);

    var popupTick = setInterval(async function() {
      if (loginPopup.closed) {
        clearInterval(popupTick);

        const authOutcome = await testAuth();

        closeCallback(authOutcome);
      }
    }, 500);
  } catch (err) {
    console.log(err);
  }
};

export const sendCode = async code => {
  await axios.post(userAPIpath + "google", { code }, { withCredentials: true });

  window.close();
};

//tests weather user is authenticated returns true for authenticated and false for not authenticated
export const testAuth = async () => {
  const response = await axios.get(userAPIpath + "test", {
    withCredentials: true
  });
  if (response.status === 200) return true;
  else return false;
};
