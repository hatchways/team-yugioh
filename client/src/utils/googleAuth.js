import axios from "axios";

const userAPIpath = "http://localhost:3001/api/authentication/";

export const sendToken = async () => {
  try {

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
 
  await axios.post(userAPIpath+"google",{code},{withCredentials: true})

    window.close();
}
