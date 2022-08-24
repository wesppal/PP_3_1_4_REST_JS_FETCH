// Заполнение таблицы всеми юзерами из запроса
// Method: get

const usersTabRows = document.querySelector('#usersTabRow')
let outputUser = ``
const url = 'http://localhost:8080/api/admin'

fetch(url)
    .then(res => res.json())
    .then(data => renderContentTab(data))

// renderAllUsers()
//
// function renderAllUsers() {
//     fetch(url)
//         .then(r => r.json())
//         .then(data => {
//             const dataArr = []
//             dataArr.push(data)
//             dataArr[0].forEach(user => {
//                 usersTabRows.innerHTML = renderRowTab(user)
//             })
//         })
// }
//
// function renderRowTab(user) {
//     outputUser += '<tr>'
//     outputUser += '<td>' + user.id + '</td>'
//     outputUser += '<td>' + user.firstName + '</td>'
//     outputUser += '<td>' + user.lastName + '</td>'
//     outputUser += '<td>' + user.age + '</td>'
//     outputUser += '<td>' + user.username + '</td>'
//     outputUser += '<td>' + user.roles + '</td>'
//     outputUser += '<td><button type="button" class="btn btn-info" id="editUserId' + user.id + '"> Edit </button> </td>'
//     outputUser += '<td><button type="button" class="btn btn-danger" id="deleteUserId' + user.id + '"> Delete </button> </td>'
//     outputUser += '</tr>'
//
//     return outputUser
// }

const renderContentTab = (users) => {
    users.forEach(user => {
        outputUser += '<tr>'
        outputUser += '<td>' + user.id + '</td>'
        outputUser += '<td>' + user.firstName + '</td>'
        outputUser += '<td>' + user.lastName + '</td>'
        outputUser += '<td>' + user.age + '</td>'
        outputUser += '<td>' + user.username + '</td>'
        outputUser += '<td>' + user.roles + '</td>'
        outputUser += '<td><button type="button" class="btn btn-info" id="editUserId' + user.id + '"> Edit </button> </td>'
        outputUser += '<td><button type="button" class="btn btn-danger" id="deleteUserId' + user.id + '"> Delete </button> </td>'
        outputUser += '</tr>'

        usersTabRows.innerHTML = outputUser
    })
}

// Лист значений ролей при создании нового пользователя из запроса к бд
const urlRoles = 'http://localhost:8080/api/admin/roles'

fetch(urlRoles)
    .then(res => res.json())
    .then(data => renderRolesList(data))

const renderRolesList = (roles) => {
    roles.forEach(roles => {
        listOptionRoles += '<option value="' + roles.id + '">' + roles.role.replace('ROLE_', '') + '</option>'
    })
    addNewUserRoleValue.innerHTML = listOptionRoles
}

// Добавление нового пользователя
// Method: post

const createNewUserForm = document.querySelector('#defaultAddForm')
const addNewUserFirstNameValue = document.querySelector('#addNewUserFirstName')
const addNewUserLastNameValue = document.querySelector('#addNewUserLastName')
const addNewUserAgeValue = document.querySelector('#addNewUserAge')
const addNewUserEmailValue = document.querySelector('#addNewUserEmail')
const addNewUserPasswordValue = document.querySelector('#addNewUserPassword')
const addNewUserRoleValue = document.querySelector('#addNewUserRoles')


let listOptionRoles = ''

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
        .then(r => r.json())
        .then(data => {
            const dataArr = []
            dataArr.push(data)
            renderContentTab(dataArr)
            // console.log(dataArr)
        })
        // .then(() => location.reload())
})




