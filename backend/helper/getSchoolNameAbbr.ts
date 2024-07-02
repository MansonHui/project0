export async function getSchoolAbbr(email: string) {
  let emailSliptoArray = email.split(".");
  for (let i = 0; i <= emailSliptoArray.length; i++) {
    if (emailSliptoArray[i] === "edu" && emailSliptoArray[i - 1]) {
      let schoolAbbr = emailSliptoArray[i - 1].split("@");
      return schoolAbbr[schoolAbbr.length - 1];
    }
  }
  return;
}

export async function isEduExistInMail(email: string) {
  let emailSliptoArray = email.split(".");
  for (let i = 0; i <= emailSliptoArray.length; i++) {
    if (emailSliptoArray[i] === "edu") {
      return true;
    }
  }
  return false;
}
