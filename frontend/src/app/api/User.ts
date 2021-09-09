export class User {
  id: number;
  username: string;
  email: string;
  firstname: string;
  lastname: string;

  constructor(
    id: number,
    username: string,
    email: string,
    firstname: string,
    lastname: string
  ) {
    (this.id = id),
      (this.username = username),
      (this.email = email),
      (this.firstname = firstname),
      (this.lastname = lastname);
  }
}
