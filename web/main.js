/*
Agora vamos criar a funcionalidade de "remover" um carro. Adicione uma nova
coluna na tabela, com um botão de remover.
Ao clicar nesse botão, a linha da tabela deve ser removida.
Faça um pull request no seu repositório, na branch `challenge-31`, e cole
o link do pull request no `console.log` abaixo.
Faça um pull request, também com a branch `challenge-31`, mas no repositório
do curso, para colar o link do pull request do seu repo.
*/

;(function (window, document) {
  function app() {
    const form = new DOM('form')
    let table = [...new DOM('table').element][0]
    const header = new DOM('header').element[0]
    const ajaxCompany = new XMLHttpRequest()
    const ajaxCars = new XMLHttpRequest()

    let tableId = 0

    form.on('submit', handleSubmitForm)

    ajaxCompany.open('GET', 'company.json')
    ajaxCompany.send()
    ajaxCompany.addEventListener('readystatechange', isCompanyRequestOk)

    function isCompanyRequestOk() {
      if (ajaxCompany.readyState === 4 && ajaxCompany.status === 200) {
        handleCompanyInfos()
      }
    }
    function handleCompanyInfos() {
      const response = JSON.parse(ajaxCompany.responseText)
      header.innerHTML = `<h1 class="company-name">${response['name']}</h1><h2 class="phone">Telefone para contato: ${response['phone']}</h2>`
    }

    function getCarsInfos() {
      ajaxCars.open('GET', 'http://localhost:3000/cars')
      ajaxCars.send()
      ajaxCars.addEventListener('readystatechange', isCarsRequestOk)
    }

    function isCarsRequestOk() {
      if (ajaxCars.readyState === 4 && ajaxCars.status === 200) {
        const responseCars = JSON.parse(ajaxCars.responseText)
        getTable(responseCars)
      }
    }

    function getTable(newCar) {
      const getTableDataCell = (element, index) =>
        index
          ? `<td>${element}</td>`
          : `<td><img src="${element}" alt="car-image"></td>`
      const newCarHtml = newCar.map(car => {
        tableId += 1
        return `<tr id=${tableId}>
            ${Object.values(car)
              .map((element, index) => getTableDataCell(element, index))
              .join('')}
            <td> <button id=${tableId} class="delete-button">Deletar</button> </td>
          </tr>`
      })

      table.innerHTML = `
        <tr>
          <th>Fotos</th>
          <th>Marca e Modelo</th>
          <th>Ano</th>
          <th>Placa</th>
          <th>Cor</th>
          <th></th>
        </tr>${newCarHtml.join('')}`

      const deleteButtons = document.querySelectorAll('[class="delete-button"]')
      deleteButtons.forEach(button => {
        button.addEventListener('click', deleteCar)
      })
    }

    function handleSubmitForm(event) {
      event.preventDefault()
      const newCar = {}
      ;[...form.element[0]].forEach((element, index) => {
        if (index < 5) {
          newCar[element.id] = element.value
        }
      })
      ajaxCars.open('POST', 'http://localhost:3000/cars')
      ajaxCars.setRequestHeader('Content-Type', 'application/json')
      ajaxCars.send(JSON.stringify(newCar))
      ajaxCars.onreadystatechange = getCarsInfos
    }

    function deleteCar(event) {
      const table = document.querySelector('tbody')
      let elementRemoved = document.querySelector(
        `tr[id = "${event.target.id}"]`
      )
      table.removeChild(elementRemoved)

      const licensePlate = [...elementRemoved.children][3].innerHTML

      ajaxCars.open('DELETE', `http://localhost:3000/cars/${licensePlate}`)
      ajaxCars.send(licensePlate)
    }
    getCarsInfos()
  }
  app()
})(window, document)

// ;(function (window, document) {
//   'use strict'

//   function app() {
//     const form = new DOM('form')
//     let table = [...new DOM('table').element][0]
//     const header = new DOM('header').element[0]
//     const imgValue = [...new DOM('#img').element][0]
//     const brandValue = [...new DOM('#brand').element][0]
//     const yearValue = [...new DOM('#year').element][0]
//     const colorValue = [...new DOM('#color').element][0]
//     const licensePlateValue = [...new DOM('#license-plate').element][0]
//     const ajax = new XMLHttpRequest()
//     const infos = [
//       imgValue,
//       brandValue,
//       yearValue,
//       colorValue,
//       licensePlateValue,
//     ]
//     let tableId = 0

//     form.on('submit', isFormComplete)

//     ajax.open('GET', 'company.json')
//     ajax.send()
//     ajax.addEventListener('readystatechange', isRequestOk)

//     function isRequestOk() {
//       if (ajax.readyState === 4 && ajax.status === 200) {
//         handleCompanyInfos()
//       }
//     }
//     function handleCompanyInfos() {
//       const response = JSON.parse(ajax.responseText)
//       const companyName = document.createElement('h1')
//       const contact = document.createElement('h2')
//       contact.className = 'phone'
//       companyName.className = 'company-name'
//       companyName.innerHTML = response['name']
//       contact.innerHTML = `Telefone para contato: ${response['phone']}`
//       header.appendChild(companyName)
//       header.appendChild(contact)
//     }

//     function isFormComplete(event) {
//       event.preventDefault()
//       let formComplete = true
//       infos.forEach(element => {
//         element.value === '' ? (formComplete = false) : null
//       })
//       if (formComplete) {
//         handleSubmitForm()
//       } else {
//         window.alert('Por favor, preencha todos os campos.')
//       }
//     }

//     function handleSubmitForm() {
//       let node = document.createElement('tr')
//       let newButton = document.createElement('button')

//       node.id = tableId
//       newButton.innerHTML = 'Deletar'
//       newButton.className = 'delete-button'
//       newButton.id = tableId
//       newButton.addEventListener('click', deleteCar)
//       infos.forEach((element, index) => {
//         let newElement = document.createElement('td')
//         let newElementImg = document.createElement('img')
//         if (index === 0) {
//           newElementImg.src = element.value
//           newElementImg.className = 'table-content'
//           node.appendChild(newElementImg)
//         } else {
//           newElement.innerHTML = element.value
//           newElement.className = 'table-content'
//           node.appendChild(newElement)
//         }
//       })
//       node.appendChild(newButton)
//       table.appendChild(node)
//       tableId += 1
//       clearValues()
//     }

//     function clearValues() {
//       infos.forEach(element => {
//         element.value = null
//       })
//     }

//     function deleteCar(event) {
//       let elementRemoved = document.querySelector(
//         `tr[id = "${event.target.id}"]`
//       )
//       table.removeChild(elementRemoved)
//     }
//   }
//   app()
// })(window, document)
