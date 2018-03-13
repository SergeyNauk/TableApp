class Data {
    constructor() {
        this.url = 'https://jsonplaceholder.typicode.com/users';

        this.etalonUsersArr = [];
        this.idShowElem = '';
        this.newUser = {
            id: '',
            name: '',
            username: '',
            email: '',
            address: {
                city: ''
            },
            phone: '',
            website: ''
        }
    }

    createUsersArr(arr) {
        this.etalonUsersArr = [...arr];
    }

    modifyUsersArr(idValue) {
        this.etalonUsersArr.forEach((elem, index) => {
            elem.id == idValue ? this.etalonUsersArr.splice(index, 1) : idValue;
        });
    }

    setIdShowElem(id) {
        this.idShowElem = id;
    }

    setChange(newId, newName, newUserName, newEmail, newCity, newPhone, newWebSite) {
            this.etalonUsersArr.forEach((elem) => {
                if (elem.id == this.idShowElem) {
                    elem.id = newId;
                    elem.name = newName;
                    elem.username = newUserName;
                    elem.email = newEmail;
                    elem.address.city = newCity;
                    elem.phone = newPhone;
                    elem.website = newWebSite;
                }
            });
    }

    pushUser(newIdAdd, newNameAdd, newUserNameAdd, newEmailAdd, newCityAdd, newPhoneAdd, newWebSiteAdd) {
        this.newUser.id = newIdAdd;
        this.newUser.name = newNameAdd;
        this.newUser.username = newUserNameAdd;
        this.newUser.email = newEmailAdd;
        this.newUser.address.city = newCityAdd;
        this.newUser.phone = newPhoneAdd;
        this.newUser.website = newWebSiteAdd;

        this.etalonUsersArr.push(this.newUser);
        console.log(this.etalonUsersArr);
    }
}

export default Data;
