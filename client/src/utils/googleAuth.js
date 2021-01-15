import Cookies from "universal-cookie";
import axios from "axios";

const userAPIpath = "http://localhost:3001/api/authentication/";

export const sendToken = async () => {
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
  const response = await fetch(userAPIpath+"google", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
      body: JSON.stringify({ code })
    });
    const content = await response.json();

    const cookies = new Cookies();

    //store google auth id_token in cookie
    

    cookies.set("app_auth_token", content, { path: "/"});

    
  
    window.close();
}
