import Cookies from "universal-cookie";

const userAPIpath = "http://localhost:3001/api/authentication/";

export const sendToken = async (code, email, variant) => {
  try {
    //const response = await axios.post(userAPIpath, { code: code.code, email, variant }, { withCredentials: true });

    const response = await fetch(userAPIpath+"geturl", {
      method: "get",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      credentials: "same-origin"
    });
    const content = await response.json();

    window.open(content.url)

    
  } catch (err) {
    console.log(err);
  }
};

export const sendCode=async(code)=>{
  const email="kozaktaras15@gmail.com"
  const variant="login"
  const response = await fetch(userAPIpath+"google", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
      body: JSON.stringify({ code, email, variant })
    });
    const content = await response.json();

    const cookies = new Cookies();

    //store google auth id_token in cookie
    cookies.set("id_token", content.id_token, { path: "/" });

    //store google auth access_token in cookie
    cookies.set("access_token", content.access_token, { path: "/" });
    
    console.log(content.id_token);
    window.close();
}
