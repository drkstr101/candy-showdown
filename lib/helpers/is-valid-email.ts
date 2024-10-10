export default function isValidEmail(email: string) {
  const regex = /^[a-zA-Z0-9._-]+(\+[a-zA-Z0-9._-]+)?@aps\.org$/;
  return regex.test(email);
}
