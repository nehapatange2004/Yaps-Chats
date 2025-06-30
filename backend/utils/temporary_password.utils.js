const pass = (email) => {
  if (email.length < 0) {
    console.log("error");
    return null;
  } else {
    const newPass = email.split("@")[0] + "123";
    console.log("pass done!", newPass);
    return newPass;
  }
};
export default pass;