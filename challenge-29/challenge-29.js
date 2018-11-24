(function(win, doc) {
  'use strict';

  /*
  Vamos estruturar um pequeno app utilizando módulos.
  Nosso APP vai ser um cadastro de carros. Vamos fazê-lo por partes.
  A primeira etapa vai ser o cadastro de veículos, de deverá funcionar da
  seguinte forma:
  - No início do arquivo, deverá ter as informações da sua empresa - nome e
  telefone (já vamos ver como isso vai ser feito)
  - Ao abrir a tela, ainda não teremos carros cadastrados. Então deverá ter
  um formulário para cadastro do carro, com os seguintes campos:
    - Imagem do carro (deverá aceitar uma URL)
    - Marca / Modelo
    - Ano
    - Placa
    - Cor
    - e um botão "Cadastrar"

  Logo abaixo do formulário, deverá ter uma tabela que irá mostrar todos os
  carros cadastrados. Ao clicar no botão de cadastrar, o novo carro deverá
  aparecer no final da tabela.

  Agora você precisa dar um nome para o seu app. Imagine que ele seja uma
  empresa que vende carros. Esse nosso app será só um catálogo, por enquanto.
  Dê um nome para a empresa e um telefone fictício, preechendo essas informações
  no arquivo company.json que já está criado.

  Essas informações devem ser adicionadas no HTML via Ajax.

  Parte técnica:
  Separe o nosso módulo de DOM criado nas últimas aulas em
  um arquivo DOM.js.

  E aqui nesse arquivo, faça a lógica para cadastrar os carros, em um módulo
  que será nomeado de "app".
  */

  function app() {
    return {
      init: function() {
        
      }
    }
  }

  app().init();

  var compayName;
  var compayPhone;

  var cars = [];

  var $companyInfo = new DOM('[data-js="company"]');
  var $form = new DOM('[data-js="form-cad"]');
  var $tableList = new DOM('[data-js="cars-list"]');

  $form.on('submit', handleFormCad);

  function setCompanyInfo(data) {
    if (!data) {
      data = {
        name: "Empresa não dentificada",
        phone: "(00) 0000-00000"
      };
    }
    compayName = data.name;
    compayPhone = data.phone;
    $companyInfo.text(compayName + ' - ' + compayPhone);
  }

  function isAjaxRespondeOk(ajax) {
    return ajax.readyState === 4 && ajax.status === 200;
  }

  function init() {
    var ajax = new XMLHttpRequest();
    ajax.open('GET', 'company.json');
    ajax.send();

    ajax.addEventListener('readystatechange', () => {
      if (isAjaxRespondeOk(ajax)) {
        try {
          var data = JSON.parse(ajax.responseText);
          setCompanyInfo(data);
        } catch(e) {
          setCompanyInfo();
        }
      }
    }, false);
  }

  function Car(image, model, year, board, color) {
    this.image = image;
    this.model = model;
    this.year = year;
    this.board = board;
    this.color = color;
  }

  function handleFormCad(ev) {
    ev.preventDefault();

    var $image = new DOM('[data-js="image"]');
    var $model = new DOM('[data-js="model"]');
    var $year = new DOM('[data-js="year"]');
    var $board = new DOM('[data-js="board"]');
    var $color = new DOM('[data-js="color"]');

    var car = {
      "image": $image.val(),
      "model": $model.val(),
      "year": $year.val(),
      "board": $board.val(),
      "color": $color.val()
    }

    cars.push(car);

    resetForm();

    populateCars();
  }

  function resetForm() {
    var $inputs = new DOM('input[data-js]');
    $inputs.val('');
  }

  function populateCars() {

    cars.forEach((car) => {
      var $tr = doc.createElement('tr');

      var $tdImage = doc.createElement('td');
      var $image = doc.createElement('img');
      $image.src = car.image;
      $tdImage.appendChild($image);
      $tr.appendChild($tdImage);

      var $tdModel = doc.createElement('td');
      $tdModel.textContent = car.model;
      $tr.appendChild($tdModel);

      var $tdYear = doc.createElement('td');
      $tdYear.textContent = car.year;
      $tr.appendChild($tdYear);

      var $tdBoard = doc.createElement('td');
      $tdBoard.textContent = car.board;
      $tr.appendChild($tdBoard);

      var $tdColor = doc.createElement('td');
      $tdColor.textContent = car.color;
      $tr.appendChild($tdColor);

      $tableList.get()[0].appendChild($tr);

    });
  }

  init();

})(window, document);
