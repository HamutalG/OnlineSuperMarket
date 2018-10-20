export class Account {
    public ID: string;
    public username: string;
    public password: string;
    public city: string;
    public street: string;
    public firstName: string;
    public lastName: string;
    public role: string;

    constructor(ID, username, password, city, street, firstName, lastName) {
        this.ID = ID;
        this.username = username;
        this.password = password;
        this.city = city;
        this.street = street;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}