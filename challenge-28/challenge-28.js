(function() {
  'use strict';
  
  /*
  No HTML:
  - Crie um formulário com um input de texto que receberá um CEP e um botão
  de submit;
  - Crie uma estrutura HTML para receber informações de endereço:
  "Logradouro, Bairro, Estado, Cidade e CEP." Essas informações serão
  preenchidas com os dados da requisição feita no JS.
  - Crie uma área que receberá mensagens com o status da requisição:
  "Carregando, sucesso ou erro."

  No JS:
  - O CEP pode ser entrado pelo usuário com qualquer tipo de caractere, mas
  deve ser limpo e enviado somente os números para a requisição abaixo;
  - Ao submeter esse formulário, deve ser feito um request Ajax para a URL:
  "https://viacep.com.br/ws/[CEP]/json/", onde [CEP] será o CEP passado
  no input criado no HTML;
  - Essa requisição trará dados de um CEP em JSON. Preencha campos na tela
  com os dados recebidos.
  - Enquanto os dados são buscados, na área de mensagens de status, deve mostrar
  a mensagem: "Buscando informações para o CEP [CEP]..."
  - Se não houver dados para o CEP entrado, mostrar a mensagem:
  "Não encontramos o endereço para o CEP [CEP]."
  - Se houver endereço para o CEP digitado, mostre a mensagem:
  "Endereço referente ao CEP [CEP]:"
  - Utilize a lib DOM criada anteriormente para facilitar a manipulação e
  adicionar as informações em tela.
  */

  var ajax = new XMLHttpRequest();

  var $cep = new DOM('#cep');
  var $buscar = new DOM('#buscar');
  var $status = new DOM('#status');
  var $logradouro = new DOM('#logradouro');
  var $bairro = new DOM('#bairro');
  var $cidade = new DOM('#cidade');
  var $estado = new DOM('#estado');

  function getCep() {
    return clearCep($cep.val());
  }

  function clearCep(string) {
    return string.replace(/\D/g, '');
  }

  function isValidCep(cep) {
    return !!cep && cep.length === 8;
  }

  function setMessageStatus(message) {
    $status.html(message);
  }

  function showAddress(address) {
    $logradouro.val(address.address);
    $bairro.val(address.district);
    $cidade.val(address.city);
    $estado.val(address.state);
  }

  function resetForm() {
    setMessageStatus('Aguardando solicitação.');
    $logradouro.val('');
    $bairro.val('');
    $cidade.val('');
    $estado.val('');
  }

  function buscarCep(cep) {  

    setMessageStatus('Buscando informações para o CEP ' + cep + '...');

    ajax.open('GET', 'http://apps.widenet.com.br/busca-cep/api/cep.json?code=' + cep);
    ajax.send();
    ajax.addEventListener('readystatechange', function() {
      if (isValidResponse()) {
        try {
          var response = JSON.parse(ajax.responseText);
          if (response.status === 1) {
            setMessageStatus('Endereço referente ao CEP ' + cep + ':');
            showAddress(response);
          } else if (response.status === 0) {
            setMessageStatus('Não encontramos o endereço para o CEP ' + cep + '.');
          } else {
            setMessageStatus(response.message);
          }
        } catch(e) {
          setMessageStatus('Não foi possível obter o endereço para o CEP informado.');
        }
      }
    }, false);
  }

  function isValidResponse() {
    return ajax.readyState === 4 && ajax.status === 200;
  }

  $buscar.on('click', () => {

    resetForm();

    var cep = getCep();

    if (!isValidCep(cep)) {
      setMessageStatus('Informe um CEP válido!');
      return false;
    }

    buscarCep(cep);
      
  });
  
  $cep.on('keydown keyup', () => {
    $cep.val($cep.val().replace(/\D/g, ''));
  });
  
})();