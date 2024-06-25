export async function getUserName(email: string) {
  let userName = email.split("@");
  return userName[0];
}
