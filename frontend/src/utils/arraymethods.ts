export const formatedTime = (time?: string) => {
  if (!time || !time.includes("T")) return "";
  try {
    const result = time.split("T")[1].split("").splice(0, 5).join("");
    // console.log("original: ", time);
    // console.log("original: ", time);

    return result;
  } catch (err) {
    return "";
  }
};
