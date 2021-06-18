const dogTable = document.getElementById('table-body')
const editDogForm = document.getElementById('dog-form')

document.addEventListener('DOMContentLoaded', initialize)

function initialize() {
    fetch('http://localhost:3000/dogs')
    .then(resp => resp.json())
    .then(data => data.forEach(renderDogs))
}

function renderDogs(data) {
    let tableRow = document.createElement('tr')
    tableRow.setAttribute('id', data.id)
    let dogName = document.createElement('td')
    dogName.innerText = data.name
    let dogBreed = document.createElement('td')
    dogBreed.innerText = data.breed
    let dogSex = document.createElement('td')
    dogSex.innerText = data.sex
    let editButton = document.createElement('button')
    editButton.innerText = 'Edit Dog'
    
    dogTable.append(tableRow)
    tableRow.append(dogName)
    tableRow.append(dogBreed)
    tableRow.append(dogSex)
    tableRow.append(editButton)

    editButton.addEventListener('click', editDogs)

    function editDogs(editEvent) {
        editDogForm.name.value = editEvent.target.previousSibling.previousSibling.previousSibling.innerText
        editDogForm.breed.value = editEvent.target.previousSibling.previousSibling.innerText
        editDogForm.sex.value = editEvent.target.previousSibling.innerText

        editDogForm.addEventListener('submit', editDogInfo)

        function editDogInfo(submitEvent) {
            submitEvent.preventDefault()
            fetch(`http://localhost:3000/dogs/${editEvent.path[1].id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "name": submitEvent.target[0].value,
                    'breed': submitEvent.target[1].value,
                    'sex': submitEvent.target[2].value,
                })
            })
            .then(() => {
                editEvent.target.previousSibling.previousSibling.previousSibling.innerText = submitEvent.target[0].value
                editEvent.target.previousSibling.previousSibling.innerText = submitEvent.target[1].value
                editEvent.target.previousSibling.innerText = submitEvent.target[2].value
            })
        }
    }
}

