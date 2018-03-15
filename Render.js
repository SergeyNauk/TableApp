class Render {
    constructor(data) {
        this.data = data;

        this.renderElem = document.querySelector('.renderElem');
        this.showMoreDiv = document.querySelector('.showMore');
        this.addUserDiv = document.querySelector('.addUserDiv');
        this.modal = document.querySelector('.modal');
        this.clarify = document.querySelector('.clarify');
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

    buildTable() {
        this.data.etalonUsersArr.forEach( (elem) => {
            let template = `<tr>
                                <td>${elem.id}</td>
                                <td>${elem.name}</td>
                                <td>${elem.username}</td>
                                <td>${elem.email}</td>
                                <td>
                                    <select>
                                        <option value="user">user</option>
                                        <option value="admin">admin</option>
                                        <option value="batman">batman</option>
                                    </select>
                                </td>
                                <td>
                                    <button class="belize-hole-flat-button" value="deleteBtn">delete</button>
                                    <button class="belize-hole-flat-button more" value="moreBtn">more</button>
                                </td>
                                </tr>`;

            this.renderElem.insertAdjacentHTML('beforeend', template);
        });

        this.renderStatus();
    }

    renderStatus() {
        let rowCollection = document.querySelectorAll('tbody tr');

        this.data.etalonUsersArr.forEach((elem) => {
            rowCollection.forEach((row) => {
                elem.id == row.children[0].textContent ? row.children[4].children[0].value = elem.status : elem.status;
            })
        });
    }

    deleteRow(button) {
        let idElem = button.getAttribute('data-row');
        let userCollection = document.querySelectorAll('tbody tr');

        userCollection.forEach((elem) => {
            elem.children[0].textContent == idElem ? elem.remove() : idElem;
        });

        this.modal.classList.toggle('modalAdd');
        this.clarify.classList.toggle('clarifyAdd');
    }

    showMore(row) {
        this.showMoreDiv.classList.toggle('showMoreAdd');
        this.modal.classList.toggle('modalAdd');

        if (row != 'addUser') {
            let idValue = row.children[0].textContent;

            this.data.etalonUsersArr.forEach((elem) => {
                if (elem.id == idValue) {
                    this.spanId.textContent = elem.id;
                    this.spanName.textContent = elem.name;
                    this.spanUserName.textContent = elem.username;
                    this.spanEmail.textContent = elem.email;
                    this.spanCity.textContent = elem.address.city;
                    this.spanPhone.textContent = elem.phone;
                    this.spanWebSite.textContent = elem.website;
                    this.showSelect.value = elem.status;
                }
            });
        } else {
            this.spanId.textContent = '';
            this.spanName.textContent = '';
            this.spanUserName.textContent = '';
            this.spanEmail.textContent = '';
            this.spanCity.textContent = '';
            this.spanPhone.textContent = '';
            this.spanWebSite.textContent = '';
            this.showSelect.value = 'user';
        }
    }

    closeModalWindow() {
        this.showMoreDiv.classList.toggle('showMoreAdd');
        this.modal.classList.toggle('modalAdd');
    }

    showChange(newId, newName, newUserName, newEmail, newStatus) {
        let userCollection = document.querySelectorAll('tbody tr');

       userCollection.forEach((elem) => {
          if (elem.children[0].textContent == this.data.idShowElem) {
              elem.children[0].textContent = newId;
              elem.children[1].textContent = newName;
              elem.children[2].textContent = newUserName;
              elem.children[3].textContent = newEmail;
              elem.children[4].children[0].value = newStatus;
          }
       });
    }

    errorId(elem) {
        elem.textContent = 'id not unique !'
    }

    errorMess(elem) {
        elem.textContent = 'field is required !'
    }

    showNewUser(newIdAdd, newNameAdd, newUserNameAdd, newEmailAdd, newStatusAdd) {
        let templateSelect;

        switch (newStatusAdd) {
            case 'user':
                templateSelect = `<option value="user" selected>user</option>
                                    <option value="admin">admin</option>
                                    <option value="batman">batman</option>`;
                break;
            case 'admin':
                templateSelect = `<option value="user">user</option>
                                    <option value="admin" selected>admin</option>
                                    <option value="batman">batman</option>`;
                break;
            case 'batman':
                templateSelect = `<option value="user">user</option>
                                    <option value="admin">admin</option>
                                    <option value="batman" selected>batman</option>`;
        }
        let template = `<tr>
                            <td>${newIdAdd}</td>
                            <td>${newNameAdd}</td>
                            <td>${newUserNameAdd}</td>
                            <td>${newEmailAdd}</td>
                            <td> 
                                <select>
                                   ${templateSelect} 
                                </select>
                            </td>
                            <td>
                                <button class="belize-hole-flat-button" value="deleteBtn">delete</button>
                                <button class="belize-hole-flat-button more" value="moreBtn">more</button>
                            </td>
                         </tr>`;

        this.renderElem.insertAdjacentHTML('beforeend', template);
    }

    cleanNewUserSpan(spanIdAdd, spanNameAdd, spanUserNameAdd, spanEmailAdd, spanCityAdd, spanPhoneAdd, spanWebSiteAdd, addSelect) {
        spanIdAdd.textContent = '';
        spanNameAdd.textContent = '';
        spanUserNameAdd.textContent = '';
        spanEmailAdd.textContent = '';
        spanCityAdd.textContent = '';
        spanPhoneAdd.textContent = '';
        spanWebSiteAdd.textContent = '';
        addSelect.value = 'user';
    }

    showClarify(idValue) {
        this.modal.classList.toggle('modalAdd');
        this.clarify.classList.toggle('clarifyAdd');

        this.yesBtn.setAttribute('data-row',`${idValue}`);
    }

    closeClarify() {
        this.modal.classList.toggle('modalAdd');
        this.clarify.classList.toggle('clarifyAdd');
    }
}

export default Render;
