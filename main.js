/*
A loja de carros será nosso desafio final. Na aula anterior, você fez a parte
do cadastro dos carros. Agora nós vamos começar a deixar ele com cara de
projeto mesmo.
Crie um novo repositório na sua conta do GitHub, com o nome do seu projeto.
Na hora de criar, o GitHub te dá a opção de criar o repositório com um
README. Use essa opção.
Após criar o repositório, clone ele na sua máquina.
Crie uma nova branch chamada `challenge-30`, e copie tudo o que foi feito no
desafio da aula anterior para esse novo repositório, nessa branch
`challenge-30`.
Adicione um arquivo na raiz desse novo repositório chamado `.gitignore`.
O conteúdo desse arquivo deve ser somente as duas linhas abaixo:

node_modules
npm-debug.log

Faça as melhorias que você achar que são necessárias no seu código, removendo
duplicações, deixando-o o mais legível possível, e então suba essa alteração
para o repositório do seu projeto.
Envie um pull request da branch `challenge-30` para a `master` e cole aqui
nesse arquivo, dentro do `console.log`, o link para o pull request no seu
projeto.
*/

;(function (window, document) {
  'use strict'

  function app() {
    const form = new DOM('form')
    const header = new DOM('header').element[0]
    const imgValue = [...new DOM('#img').element][0]
    const brandValue = [...new DOM('#brand').element][0]
    const yearValue = [...new DOM('#year').element][0]
    const colorValue = [...new DOM('#color').element][0]
    const licensePlateValue = [...new DOM('#license-plate').element][0]
    const ajax = new XMLHttpRequest()
    const infos = [
      imgValue,
      brandValue,
      yearValue,
      colorValue,
      licensePlateValue,
    ]
    let table = [...new DOM('table').element][0]

    form.on('submit', isFormComplete)

    ajax.open('GET', 'company.json')
    ajax.send()
    ajax.addEventListener('readystatechange', isRequestOk)

    function isRequestOk() {
      if (ajax.readyState === 4 && ajax.status === 200) {
        handleCompanyInfos()
      }
    }
    function handleCompanyInfos() {
      const response = JSON.parse(ajax.responseText)
      const companyName = document.createElement('h1')
      const contact = document.createElement('h2')
      contact.className = 'phone'
      companyName.className = 'company-name'
      companyName.innerHTML = response['name']
      contact.innerHTML = `Telefone para contato: ${response['phone']}`
      header.appendChild(companyName)
      header.appendChild(contact)
    }

    function isFormComplete(event) {
      event.preventDefault()
      let formComplete = true
      infos.forEach(element => {
        element.value === '' ? (formComplete = false) : null
      })
      if (formComplete) {
        handleSubmitForm()
      } else {
        window.alert('Por favor, preencha todos os campos.')
      }
    }

    function handleSubmitForm() {
      let node = document.createElement('tr')
      infos.forEach((element, index) => {
        let newElement = document.createElement('td')
        let newElementImg = document.createElement('img')
        if (index === 0) {
          newElementImg.src = element.value
          newElementImg.className = 'table-content'
          node.appendChild(newElementImg)
        } else {
          newElement.innerHTML = element.value
          newElement.className = 'table-content'
          node.appendChild(newElement)
        }
      })
      table.appendChild(node)
      clearValues()
    }

    function clearValues() {
      infos.forEach(element => {
        element.value = null
      })
    }
  }
  app()
})(window, document)
