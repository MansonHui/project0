export async function checkSchoolEmail(email: string) {
  let emailSliptoArray = email.split(".");
  for (let i = 0; i <= emailSliptoArray.length; i++) {
    if (emailSliptoArray[i] === "edu") {
      let schoolAbbr = emailSliptoArray[i - 1].split("@");
      return schoolAbbr[schoolAbbr.length - 1];
    }
  }
  return;
}
