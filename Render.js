class Render {
    constructor(data) {
        this.data = data;

        this.renderElem = document.querySelector('.renderElem');
        this.showMoreDiv = document.querySelector('.showMore');
        this.addUserDiv = document.querySelector('.addUserDiv');

        this.spanId = document.querySelector('.spanId');
        this.spanName = document.querySelector('.spanName');
        this.spanUserName = document.querySelector('.spanUserName');
        this.spanEmail = document.querySelector('.spanEmail');
        this.spanCity = document.querySelector('.spanCity');
        this.spanPhone = document.querySelector('.spanPhone');
        this.spanWebSite = document.querySelector('.spanWebSite');
    }

    buildTable() {
        this.data.etalonUsersArr.forEach( (elem) => {
            let template = `<tr><td>${elem.id}</td><td>${elem.name}</td><td>${elem.username}</td><td>${elem.email}</td>
                            <td><button class="belize-hole-flat-button" value="deleteBtn">delete</button>
                            <button class="belize-hole-flat-button more" value="moreBtn">more</button></td></tr>`;

            this.renderElem.insertAdjacentHTML('beforeend', template);
        });
    }

    deleteRow(elem) {
        elem.remove();
    }

    showMore(row) {
        this.showMoreDiv.classList.toggle('showMoreAdd');

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
            }
        });
    }

    closeModalWindow() {
        this.showMoreDiv.classList.toggle('showMoreAdd');
    }

    showChange(newId, newName, newUserName, newEmail) {
        let userCollection = document.querySelectorAll('tbody tr');

       userCollection.forEach((elem) => {
          if (elem.children[0].textContent == this.data.idShowElem) {
              elem.children[0].textContent = newId;
              elem.children[1].textContent = newName;
              elem.children[2].textContent = newUserName;
              elem.children[3].textContent = newEmail;
          }
       });
    }

    errorId(elem) {
        elem.textContent = 'id not unique !'
    }

    errorMess(elem) {
        elem.textContent = 'field is required !'
    }

    showAddUserDiv() {
        this.addUserDiv.classList.toggle('newUser');
    }

    showNewUser(newIdAdd, newNameAdd, newUserNameAdd, newEmailAdd) {
        let template = `<tr><td>${newIdAdd}</td><td>${newNameAdd}</td><td>${newUserNameAdd}</td><td>${newEmailAdd}</td>
                            <td><button class="belize-hole-flat-button" value="deleteBtn">delete</button>
                            <button class="belize-hole-flat-button more" value="moreBtn">more</button></td></tr>`;

        this.renderElem.insertAdjacentHTML('beforeend', template);
    }

    cleanNewUserSpan(spanIdAdd, spanNameAdd, spanUserNameAdd, spanEmailAdd, spanCityAdd, spanPhoneAdd, spanWebSiteAdd) {
        spanIdAdd.textContent = '';
        spanNameAdd.textContent = '';
        spanUserNameAdd.textContent = '';
        spanEmailAdd.textContent = '';
        spanCityAdd.textContent = '';
        spanPhoneAdd.textContent = '';
        spanWebSiteAdd.textContent = '';
    }
}

export default Render;
