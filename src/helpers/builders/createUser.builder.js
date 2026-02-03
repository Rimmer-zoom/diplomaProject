import { faker } from '@faker-js/faker';
export class UserBuilder {
    constructor() {
        this.email = null;
        this.name = null;
        this.password = null;
    }
    withEmail(email) {
        this.email = email ?? faker.internet.email()
        return this;
    }

    withName (name) {
        this.name = name ?? faker.person.firstName()
        return this;
    }

    withPassword (password){
        this.password = password ?? faker.internet.password()
        return this;
    }
    build(){
        
        return{
            email: this.email,
            name: this.name,
            password: this.password,
        };
    }

}