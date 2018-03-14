class Listener {
    constructor(data, render) {
        this.data = data;
        this.render = render;

        this.renderElem = document.querySelector('.renderElem');
        this.showMoreElem = document.querySelector('.showMore');
        this.addUser = document.querySelector('.addUser');

        this.backBtn = document.querySelector('.backBtn');
        this.saveBtn = document.querySelector('.saveBtn');

        this.spanId = document.querySelector('.spanId');
        this.spanName = document.querySelector('.spanName');
        this.spanUserName = document.querySelector('.spanUserName');
        this.spanEmail = document.querySelector('.spanEmail');
        this.spanCity = document.querySelector('.spanCity');
        this.spanPhone = document.querySelector('.spanPhone');
        this.spanWebSite = document.querySelector('.spanWebSite');
        this.showSelect = document.querySelector('.showSelect');
    }

    initApp() {
            fetch(this.data.url)
                .then(response => {
                    return response.json()
                })
                .then((result) => {
                    this.data.createUsersArr(result);
                    this.render.buildTable();

                    this.renderElem.addEventListener('click', (e) => {
                        this.targetElemTable(e);
                    });
                    this.addUser.addEventListener('click', (e) => {
                        this.render.showMore('addUser');
                    });
                    this.backBtn.addEventListener('click', () => {
                        this.render.closeModalWindow();
                        this.data.cleanUserId();
                    });
                    this.saveBtn.addEventListener('click', () => {
                        this.validateId();
                    });
                })
                .catch(result => console.log('error'));
    }

    targetElemTable(e) {
        let targetRow = e.target.parentNode.parentNode;
        let idValue = targetRow.children[0].textContent;

        if (e.target.value == 'deleteBtn') {
            this.data.modifyUsersArr(idValue);
            this.render.deleteRow(targetRow);
        } else if (e.target.value == 'moreBtn') {
            this.render.showMore(targetRow);
            this.data.setIdShowElem(idValue);
        } else if (e.target.value == 'user' || e.target.value == 'admin' || e.target.value == 'batman') {
            this.data.setSelectField(targetRow);
        }
    }

    targetElemModalWindow(e, whoIs) {
       if (e.target.value == 'backBtn') {
            this.render.closeModalWindow();
       } else if (e.target.value == 'saveBtn') {
           this.validateId(whoIs);
       }
    }

    validateId() {
          let whoIs = this.data.idShowElem == '' ? 'addUser' : 'showMore';

            console.log(whoIs, this.data.idShowElem ,'validate');

            let newId = this.spanId.textContent.trim();
            let considenceId = false;

            this.data.etalonUsersArr.forEach((elem) => {
                String(elem.id) == newId ? considenceId = true : elem.id;
            });

        if (whoIs == 'showMore') {
            considenceId == false || newId == this.data.idShowElem ? this.validateOtherDate(whoIs) : this.render.errorId(this.spanId);
        } else {
            considenceId == false ? this.validateOtherDate(whoIs) : this.render.errorId(this.spanId);
        }
    }

    validateOtherDate(whoIs) {
        let newId = this.spanId.textContent.trim();
        let newName = this.spanName.textContent.trim();
        let newUserName = this.spanUserName.textContent.trim();
        let newEmail = this.spanEmail.textContent.trim();
        let newCity = this.spanCity.textContent.trim();
        let newPhone = this.spanPhone.textContent.trim();
        let newWebSite = this.spanWebSite.textContent.trim();
        let newStatus = this.showSelect.value;

        let flag = false;

        if (newId == '' || newId == 'id not unique !' || newId == 'field is required !') {
            flag = true;
            this.render.errorMess(this.spanId);
        }

        if (newName == '' || newName == 'field is required !') {
            flag = true;
            this.render.errorMess(this.spanName);
        }

        if (newUserName == '' || newUserName == 'field is required !') {
            flag = true;
            this.render.errorMess(this.spanUserName);
        }

        if (newEmail == '' || newEmail == 'field is required !') {
            flag = true;
            this.render.errorMess(this.spanEmail);
        }

        if (newCity == '' || newCity == 'field is required !') {
            flag = true;
            this.render.errorMess(this.spanCity);
        }

        if (newPhone == '' || newPhone == 'field is required !') {
            flag = true;
            this.render.errorMess(this.spanPhone);
        }

        if (newWebSite == '' || newWebSite == 'field is required !') {
            flag = true;
            this.render.errorMess(this.spanWebSite);
        }

        if (whoIs == 'showMore') {
            if (flag == false) {
                console.log(whoIs, 'show');
                this.data.setChange(newId, newName, newUserName, newEmail, newCity, newPhone, newWebSite, newStatus);
                this.render.showChange(newId, newName, newUserName, newEmail, newStatus);
                this.data.cleanUserId();
                this.render.closeModalWindow();
            }
        } else {
            if (flag == false) {
                console.log(whoIs, 'add');
                this.data.pushUser(newId, newName, newUserName, newEmail, newCity, newPhone, newWebSite, newStatus);
                this.render.showNewUser(newId, newName, newUserName, newEmail, newStatus);
                this.render.cleanNewUserSpan(this.spanId, this.spanName, this.spanUserName, this.spanEmail,
                    this.spanCity, this.spanPhone, this.spanWebSite, this.showSelect);
                this.data.cleanUserId();
                this.render.closeModalWindow();
            }
        }
    }


    validateNewUserId() {
        let newIdAdd = this.spanIdAdd.textContent.trim();
        let considenceIdAdd = false;

        this.data.etalonUsersArr.forEach((elem) => {
            String(elem.id) == newIdAdd  ?  considenceIdAdd = true : elem.id;
        });

        considenceIdAdd == false ? this.validateNewUserData() : this.render.errorId(this.spanIdAdd);
    }

    validateNewUserData() {
        let newIdAdd = this.spanIdAdd.textContent.trim();
        let newNameAdd = this.spanNameAdd.textContent.trim();
        let newUserNameAdd = this.spanUserNameAdd.textContent.trim();
        let newEmailAdd = this.spanEmailAdd.textContent.trim();
        let newCityAdd = this.spanCityAdd.textContent.trim();
        let newPhoneAdd = this.spanPhoneAdd.textContent.trim();
        let newWebSiteAdd = this.spanWebSiteAdd.textContent.trim();
        let newStatusAdd = this.addSelect.value;

        let flag = false;

        if (newIdAdd == '' || newIdAdd == 'id not unique !' || newIdAdd == 'field is required !') {
            flag = true;
            this.render.errorMess(this.spanIdAdd);
        }

        if (newNameAdd == '' || newNameAdd == 'field is required !') {
            flag = true;
            this.render.errorMess(this.spanNameAdd);
        }

        if (newUserNameAdd == '' || newUserNameAdd == 'field is required !') {
            flag = true;
            this.render.errorMess(this.spanUserNameAdd);
        }

        if (newEmailAdd == '' || newEmailAdd == 'field is required !') {
            flag = true;
            this.render.errorMess(this.spanEmailAdd);
        }

        if (newCityAdd == '' || newCityAdd == 'field is required !') {
            flag = true;
            this.render.errorMess(this.spanCityAdd);
        }

        if (newPhoneAdd == '' || newPhoneAdd == 'field is required !') {
            flag = true;
            this.render.errorMess(this.spanPhoneAdd);
        }

        if (newWebSiteAdd == ''  || newWebSiteAdd == 'field is required !') {
            flag = true;
            this.render.errorMess(this.spanWebSiteAdd);
        }

        if (flag == false) {
            this.data.pushUser(newIdAdd, newNameAdd, newUserNameAdd, newEmailAdd, newCityAdd, newPhoneAdd, newWebSiteAdd, newStatusAdd);
            this.render.showNewUser(newIdAdd, newNameAdd, newUserNameAdd, newEmailAdd, newStatusAdd);
            this.render.cleanNewUserSpan(this.spanIdAdd, this.spanNameAdd, this.spanUserNameAdd, this.spanEmailAdd,
                this.spanCityAdd, this.spanPhoneAdd, this.spanWebSiteAdd, this.addSelect);
            this.render.showAddUserDiv();
        }
    }
}

export default Listener;
