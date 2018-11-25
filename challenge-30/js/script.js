(function(win, doc, $) {
    'use strict';

    var app = (function() {

        return {
            init: function init() {
                app.companyInfo();
                app.initEvents();
            },

            initEvents: function initEvents() {
                $('[data-js="form"]').on('submit', app.handleSubmit);
            },
 
            companyInfo: function companyInfo() {
                var $companyName = $('[data-js="company-name"]');
                var $companyPhone = $('[data-js="company-phone"]');
                var ajax = new XMLHttpRequest();
                ajax.open('GET', 'company.json');
                ajax.send();
                ajax.addEventListener('readystatechange', () => {
                    if (ajax.readyState === 4 && ajax.status === 200) {
                        var data = JSON.parse(ajax.responseText);
                        $companyName.text(data.name);
                        $companyPhone.text(data.phone);
                    }
                }, false);
            },

            handleSubmit: function handleSubmit(e) {
                e.preventDefault();
                $('[data-js="table-list"]').get().appendChild(app.createNewCar());
            },

            createNewCar: function createNewCar() {
                var $fragment = doc.createDocumentFragment();
                var $tr = doc.createElement('tr');
                var $tdImage = doc.createElement('td');
                var $tdModel = doc.createElement('td');
                var $tdYear = doc.createElement('td');
                var $tdPlate = doc.createElement('td');
                var $tdColor = doc.createElement('td');
                var $img = doc.createElement('img');

                $img.src = $('[data-js="image"]').val();
                $tdModel.textContent = $('[data-js="model"]').val();
                $tdYear.textContent = $('[data-js="year"]').val();
                $tdPlate.textContent = $('[data-js="plate"]').val();
                $tdColor.textContent = $('[data-js="color"]').val();

                $tdImage.appendChild($img);
                $tr.appendChild($tdImage);
                $tr.appendChild($tdModel);
                $tr.appendChild($tdYear);
                $tr.appendChild($tdPlate);
                $tr.appendChild($tdColor);
                $fragment.appendChild($tr);
                
                return $fragment.appendChild($tr);
            }
        };
    })();

    app.init();
    
})(window, document, window.DOM);