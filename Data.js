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
            website: '',
            status: ''
        }
    }

    createUsersArr(arr) {
        this.etalonUsersArr = [...arr];

        this.setDefaultSelect();
    }

    setDefaultSelect() {
        this.etalonUsersArr.forEach((elem) => {
            elem.status = 'user';
        });
    }

    modifyUsersArr(idValue) {
        this.etalonUsersArr.forEach((elem, index) => {
            elem.id == idValue ? this.etalonUsersArr.splice(index, 1) : idValue;
        });
    }

    setIdShowElem(id) {
        this.idShowElem = id;
    }

    setChange(newId, newName, newUserName, newEmail, newCity, newPhone, newWebSite, newStatus) {
            this.etalonUsersArr.forEach((elem) => {
                if (elem.id == this.idShowElem) {
                    elem.id = newId;
                    elem.name = newName;
                    elem.username = newUserName;
                    elem.email = newEmail;
                    elem.address.city = newCity;
                    elem.phone = newPhone;
                    elem.website = newWebSite;
                    elem.status = newStatus;
                }
            });
    }

    pushUser(newIdAdd, newNameAdd, newUserNameAdd, newEmailAdd, newCityAdd, newPhoneAdd, newWebSiteAdd, newStatusAdd) {
        this.newUser.id = newIdAdd;
        this.newUser.name = newNameAdd;
        this.newUser.username = newUserNameAdd;
        this.newUser.email = newEmailAdd;
        this.newUser.address.city = newCityAdd;
        this.newUser.phone = newPhoneAdd;
        this.newUser.website = newWebSiteAdd;
        this.newUser.status = newStatusAdd;

        this.etalonUsersArr.push(this.newUser);
    }

    setSelectField(eventRow) {
        let idElem = eventRow.children[0].textContent;
        let selectValue =eventRow.children[4].children[0].value;

        this.etalonUsersArr.forEach((elem)=> {
            elem.id == idElem ? elem.status = selectValue : elem.id;
        });
    }
}

export default Data;
