const url = 'http://localhost:8080/api/admin'
const urlRoles = 'http://localhost:8080/api/admin/roles'
const urlCurrentUser = 'http://localhost:8080/api/user'

const usersTabRows = document.getElementById('usersTabRow')
const currentUserRow = document.getElementById('currentUserRow')

const createNewUserForm = document.getElementById('defaultAddForm')
const addNewUserFirstNameValue = document.getElementById('addNewUserFirstName')
const addNewUserLastNameValue = document.getElementById('addNewUserLastName')
const addNewUserAgeValue = document.getElementById('addNewUserAge')
const addNewUserEmailValue = document.getElementById('addNewUserEmail')
const addNewUserPasswordValue = document.getElementById('addNewUserPassword')
const addNewUserRoleValue = document.getElementById('addNewUserRoles')

const modalDefaultRoleValue = document.getElementById('modalDefaultRoles')

// Заполнение таблицы всеми юзерами из запроса
// Method: get
loadUsers()
loadCurrentUser()

// Заполнение лист значений ролей в options select-ов из запроса к бд
fetch(urlRoles)
    .then(res => res.json())
    .then(data => renderRolesList(data))


// Добавление нового пользователя
// Method: post

let listOptionRoles = ''

// События после отправки формы
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



function loadUsers() {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            data.forEach(user => {
                usersTabRows.innerHTML += whiteRow(user)
            })
        })
}

function loadCurrentUser() {
    fetch(urlCurrentUser)
        .then(res => res.json())
        .then(data => {
            let row = ''
            row += '<tr>'
            row += '<td>' + data.id + '</td>'
            row += '<td>' + data.firstName + '</td>'
            row += '<td>' + data.lastName + '</td>'
            row += '<td>' + data.age + '</td>'
            row += '<td>' + data.username + '</td>'
            row += '<td>' + transformRole(data.roles) + '</td>'
            row += '</tr>'
            currentUserRow.innerHTML += row
        })
}

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

function whiteRow(user) {
    let tableBodyContent = ''
    tableBodyContent += '<tr>'
    tableBodyContent += '<td>' + user.id + '</td>'
    tableBodyContent += '<td>' + user.firstName + '</td>'
    tableBodyContent += '<td>' + user.lastName + '</td>'
    tableBodyContent += '<td>' + user.age + '</td>'
    tableBodyContent += '<td>' + user.username + '</td>'
    tableBodyContent += '<td>' + transformRole(user.roles) + '</td>'
    tableBodyContent += '<td><button type="button" class="btn btn-info" id="editUserId' + user.id + '" data-toggle="modal" data-target="#defaultModal"> Edit </button> </td>'
    tableBodyContent += '<td><button type="button" class="btn btn-danger" id="deleteUserId' + user.id + '" data-toggle="modal" data-target="#defaultModal"> Delete </button> </td>'
    tableBodyContent += '</tr>'
    return tableBodyContent
}

function clearForm() {
    addNewUserFirstNameValue.value = ''
    addNewUserLastNameValue.value = ''
    addNewUserAgeValue.value = ''
    addNewUserEmailValue.value = ''
    addNewUserPasswordValue.value = ''
}

const renderRolesList = (roles) => {
    roles.forEach(roles => {
        listOptionRoles += '<option value="' + roles.id + '">' + roles.role.toString().replace('ROLE_', '') + '</option>'
    })
    addNewUserRoleValue.innerHTML = listOptionRoles
    modalDefaultRoleValue.innerHTML = listOptionRoles
}