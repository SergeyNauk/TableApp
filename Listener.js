class Listener {
    constructor(data, render) {
        this.data = data;
        this.render = render;

        this.renderElem = document.querySelector('.renderElem');
        this.showMoreElem = document.querySelector('.showMore');
        this.addUser = document.querySelector('.addUser');

        this.backBtn = document.querySelector('.backBtn');
        this.saveBtn = document.querySelector('.saveBtn');
        this.noBtn = document.querySelector('.noBtn');
        this.yesBtn = document.querySelector('.yesBtn');

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

                    window.addEventListener('beforeunload', () => {
                        this.data.saveInfo();
                    });
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
                    this.noBtn.addEventListener('click', () => {
                        this.render.closeClarify();
                    });
                    this.yesBtn.addEventListener('click', () => {
                        this.data.modifyUsersArr(this.yesBtn);
                        this.render.deleteRow(this.yesBtn);
                    });
                })
                .catch(result => console.log('error'));
    }

    targetElemTable(e) {
        let targetRow = e.target.parentNode.parentNode;
        let idValue = targetRow.children[0].textContent;

        if (e.target.value == 'deleteBtn') {
            this.render.showClarify(idValue);
        } else if (e.target.value == 'moreBtn') {
            this.render.showMore(targetRow);
            this.data.setIdShowElem(idValue);
        } else if (e.target.value == 'user' || e.target.value == 'admin' || e.target.value == 'batman') {
            this.data.setSelectField(targetRow);
        }
    }

    validateId() {
          let whoIs = this.data.idShowElem == '' ? 'addUser' : 'showMore';
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
}

export default Listener;
