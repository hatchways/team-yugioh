import Cookies from "universal-cookie";

const userAPIpath = "http://localhost:3001/api/authentication/google";

export const sendToken = async (code, email, variant) => {
  try {
    //const response = await axios.post(userAPIpath, { code: code.code, email, variant }, { withCredentials: true });

    const response = await fetch(userAPIpath, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        cookie: "accessToken=undefied; other=one"
      },
      credentials: "same-origin",
      body: JSON.stringify({ code: code.code, email, variant })
    });
    const content = await response.json();

    const cookies = new Cookies();

    //store google auth id_token in cookie
    cookies.set("id_token", content.id_token, { path: "/" });

    //store google auth access_token in cookie
    cookies.set("access_token", content.access_token, { path: "/" });

    console.log(content);
  } catch (err) {
    console.log(err);
  }
};
