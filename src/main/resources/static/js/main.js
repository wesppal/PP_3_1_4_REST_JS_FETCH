const url = 'http://localhost:8080/api/admin'
const urlRoles = 'http://localhost:8080/api/admin/roles'
const urlCurrentUser = 'http://localhost:8080/api/user'

const usersTabRows = document.getElementById('usersTabRow')
const currentUserRow = document.getElementById('currentUserRow')

const createNewUserForm = document.getElementById('defaultAddForm')
const editUserForm = document.getElementById('modalEditForm')
const modalDeleteForm = document.getElementById('modalDeleteForm')


const addNewUserFirstNameValue = document.getElementById('addNewUserFirstName')
const addNewUserLastNameValue = document.getElementById('addNewUserLastName')
const addNewUserAgeValue = document.getElementById('addNewUserAge')
const addNewUserEmailValue = document.getElementById('addNewUserEmail')
const addNewUserPasswordValue = document.getElementById('addNewUserPassword')
const addNewUserRoleValue = document.getElementById('addNewUserRoles')

const modalEditIdValue = document.getElementById('modalEditId')
const modalEditFirstNameValue = document.getElementById('modalEditFirstName')
const modalEditLastNameValue = document.getElementById('modalEditLastName')
const modalEditAgeValue = document.getElementById('modalEditAge')
const modalEditEmailValue = document.getElementById('modalEditUsername')
const modalEditPasswordValue = document.getElementById('modalEditPassword')
const modalEditRolesValue = document.getElementById('modalEditRoles')

const modalDeleteIdValue = document.getElementById('modalDeleteId')
const modalDeleteFirstNameValue = document.getElementById('modalDeleteFirstName')
const modalDeleteLastNameValue = document.getElementById('modalDeleteLastName')
const modalDeleteAgeValue = document.getElementById('modalDeleteAge')
const modalDeleteEmailValue = document.getElementById('modalDeleteUsername')
const modalDeletePasswordValue = document.getElementById('modalDeletePassword')
const modalDeleteRolesValue = document.getElementById('modalDeleteRoles')

const modalDeleteRoleValue = document.getElementById('modalDeleteRoles')

// Заполнение таблицы всеми юзерами из запроса
// Method: get
loadUsers()
loadCurrentUser()

// Заполнение лист значений ролей в options select-ов из запроса к бд
fetch(urlRoles)
    .then(res => res.json())
    .then(data => renderRolesList(data))

// Добавление нового пользователя
// Method: POST
// События отправки формы создания нового юзера
createNewUserForm.addEventListener('submit', (e) => {
    e.preventDefault()

    let selectedRoles = []
    const values = $('#addNewUserRoles').val()
    const text = $('#addNewUserRoles option:selected').toArray().map(item => item.text)

    for (let i = 0; i < values.length; i++) {
        selectedRoles.push({
            id: values[i],
            role: text[i]
        })
    }

    const newUser = {
        firstName: addNewUserFirstNameValue.value,
        lastName: addNewUserLastNameValue.value,
        age: addNewUserAgeValue.value,
        username: addNewUserEmailValue.value,
        password: addNewUserPasswordValue.value,
        roles: selectedRoles
    }


    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    })
        .then(() => {
            document.getElementById("userTableSwitch").click()
            usersTabRows.innerHTML = ""
            loadUsers()
            clearForm()
        })
})

// Редактирование пользователя
// Method: PATCH
// События отправки формы редактирования юзера
editUserForm.addEventListener('submit', (e) => {
    e.preventDefault()

    let selectedRoles = []
    const values = $('#modalEditRoles').val()
    const text = $('#modalEditRoles option:selected').toArray().map(item => item.text)

    for (let i = 0; i < values.length; i++) {
        selectedRoles.push({
            id: values[i],
            role: text[i]
        })
    }

    const newUser = {
        firstName: modalEditFirstNameValue.value,
        lastName: modalEditLastNameValue.value,
        age: modalEditAgeValue.value,
        username: modalEditEmailValue.value,
        password: modalEditPasswordValue.value,
        roles: selectedRoles
    }
    const userId = modalEditIdValue.value;
    let urlUserId = url + '/' + userId

    fetch(urlUserId, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    })
        .then(() => {
            document.getElementById("exitModalEdit").click()
            usersTabRows.innerHTML = ""
            loadUsers()
        })
})


// Удаление пользователя
// Method: DELETE
// События удаления
modalDeleteForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const userId = modalDeleteIdValue.value;
    let urlUserId = url + '/' + userId

    fetch(urlUserId, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(() => {
            document.getElementById("exitModalDelete").click()
            usersTabRows.innerHTML = ""
            loadUsers()
        })
})


//Функция для загрузки таблицы юзеров
function loadUsers() {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            data.forEach(user => {
                usersTabRows.innerHTML += whiteRow(user)
            })
        })
}

//Функция для загрузки залогинившегося юзера
function loadCurrentUser() {
    fetch(urlCurrentUser)
        .then(res => res.json())
        .then(data => {
            let row = ''
            row = `
            <tr>
                <td>` + data.id + `</td>
                <td>` + data.firstName + `</td>
                <td>` + data.lastName + `</td>
                <td>` + data.age + `</td>
                <td>` + data.username + `</td>
                <td>` + transformRole(data.roles) + `</td>
            </tr>
            `
            currentUserRow.innerHTML += row
        })
}

//Функция для преобразования ролей для таблицы
function transformRole(roles) {
    let listRole = ''
    let delimiter = ''
    roles.forEach(r => {
        listRole += delimiter
        listRole += r.role.substring(5);
        delimiter = ' '
    })
    return listRole
}

//Функция для записи строки в таблицу
function whiteRow(user) {
    let tableBodyContent = ''
    tableBodyContent += `
    <tr>
        <td>` + user.id + `</td>
        <td>` + user.firstName + `</td>
        <td>` + user.lastName + `</td>
        <td>` + user.age + `</td>
        <td>` + user.username + `</td>
        <td>` + transformRole(user.roles) + `</td>
        <td>
            <button type="button" class="btn btn-info" id="editUser` + user.id + `" data-toggle="modal" data-target="#modalEdit" onclick="getDataUserEdit(` + user.id + `)">
                Edit
            </button>
        </td>
        <td>
            <button type="button" class="btn btn-danger" id="deleteUser" data-toggle="modal" data-target="#modalDelete" onclick="getDataUserDelete(` + user.id + `)">
                Delete
            </button> 
        </td>
    </tr>
    `
    return tableBodyContent
}

//Функция для очистки формы добавления нового юзера
function clearForm() {
    addNewUserFirstNameValue.value = ''
    addNewUserLastNameValue.value = ''
    addNewUserAgeValue.value = ''
    addNewUserEmailValue.value = ''
    addNewUserPasswordValue.value = ''
}

//Функция для заполнения в формы select ролями из бд
let listOptionRoles = ''
const renderRolesList = (roles) => {
    roles.forEach(roles => {
        listOptionRoles += '<option value="' + roles.id + '">' + roles.role.toString().replace('ROLE_', '') + '</option>'
    })
    addNewUserRoleValue.innerHTML = listOptionRoles
    modalDeleteRoleValue.innerHTML = listOptionRoles
    modalEditRolesValue.innerHTML = listOptionRoles
}

// Подтягивание данных для формы редактирования
function getDataUserEdit(userId) {
    let urlUserId = url + '/' + userId
    fetch(urlUserId)
        .then(res => res.json())
        .then(data => {
                modalEditIdValue.value = data.id
                modalEditFirstNameValue.value = data.firstName
                modalEditLastNameValue.value = data.lastName
                modalEditAgeValue.value = data.age
                modalEditEmailValue.value = data.username
                modalEditPasswordValue.value = data.password
                if (data.roles[0].role === 'ROLE_ADMIN') {
                    $('#modalEditRoles option[value="1"]').prop('selected', true)
                }
                if (data.roles[0].role === 'ROLE_USER') {
                    $('#modalEditRoles option[value="2"]').prop('selected', true)
                }
                if (data.roles.length > 1) {
                    $('#modalEditRoles option').prop('selected', true)
                }
            }
        )
}

// Подтягивание данных для формы удаления
function getDataUserDelete(userId) {
    let urlUserId = url + '/' + userId
    fetch(urlUserId)
        .then(res => res.json())
        .then(data => {
            modalDeleteIdValue.value = data.id
            modalDeleteFirstNameValue.value = data.firstName
            modalDeleteLastNameValue.value = data.lastName
            modalDeleteAgeValue.value = data.age
            modalDeleteEmailValue.value = data.username
            modalDeletePasswordValue.value = data.password
        })
}

//Функция для очистки выбранных селектов по закрытию окна редактирования
function clearSelectFormEdit() {
    $('#modalEditRoles option').prop('selected', false);
}