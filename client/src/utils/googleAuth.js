import axios from "axios";

const userAPIpath = "http://localhost:3001/api/authentication";

export const sendToken = async token => {

    console.log(token.tokenObj.id_token);
    try{
  await axios.post(
    userAPIpath,
    {tokenId:token.tokenObj.id_token}
  )
}
catch(err){
    console.log(err);
}

};
