; (function (window) {

   function Calendario(options) {
      this.options = extend({}, this.options);
      extend(this.options, options);

      this._init();
   }

   Calendario.prototype.options = {
      json: {},
      url: null,
      data: moment(),
      diasSemana: ['Domingo', 'Segunda', 'Terca', 'Quarta', 'Quinta', 'Sexta', 'Sabado'],
      meses: ['Janeiro', 'Fevereiro', 'Marco', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
   }

   Calendario.prototype._init = function () {
      var mes = this.options.data.month() + 1;

      var inicioMes = '01-' + mes + '-' + this.options.data.year();
      var diaSemanaInicioMes = moment(inicioMes, 'DD-MM-YYYY').day() + 1;

      var inicioCalendario = currentDate = moment(inicioMes, 'DD-MM-YYYY').subtract(diaSemanaInicioMes, 'days');

      this._montarCalendario(inicioCalendario);
      this._populaEventos(this.options.json);
   }

   Calendario.prototype._montarCalendario = function (inicioCalendario) {

      var divElement = document.createElement('div');
      divElement.className = 'fullcalendar';

      var calendarTable = document.createElement('table');
      calendarTable.className = 'calendarTable';

      var navHeader = calendarTable.insertRow(0);
      navHeader.className = 'trnav';

      var navCell = navHeader.insertCell(0);
      navCell.innerHTML = this.options.meses[inicioCalendario.get('month') + 1] + '/' + inicioCalendario.get('year');
      navCell.setAttribute('colspan', 7);
      navCell.className = 'nav';

      var header = calendarTable.insertRow(1);

      for (var i = 0; i < this.options.diasSemana.length; i++) {
         var cell = header.insertCell(i);
         cell.innerHTML = this.options.diasSemana[i];
         cell.className = 'day size';
      }


      var currentMonth = inicioCalendario.month() + 1;

      var qtdSemanas = calculaQtdSemanas(inicioCalendario);


      for (var linha = 0; linha < qtdSemanas; linha++) {
         var semana = calendarTable.insertRow(linha + 2);

         for (var coluna = 0; coluna < 7; coluna++) {

            inicioCalendario = inicioCalendario.add(1, 'days');

            var dia = semana.insertCell(coluna);

            if (currentMonth != inicioCalendario.month()) {
               dia.className = 'fadeDay';
            }

            var dateDiv = document.createElement('div');
            dateDiv.className = 'dateDiv size';
            dateDiv.id = currentDate.format('DD-MM-YYYY');

            var dayDivClass = document.createElement('div');
            dayDivClass.className = 'dayDiv';
            dayDivClass.innerHTML = inicioCalendario.date();

            dateDiv.appendChild(dayDivClass);
            dia.appendChild(dateDiv);
         }
      }
      
      divElement.appendChild(calendarTable);

      document.getElementById('calendario').appendChild(divElement);
   }
   
   
   Calendario.prototype._populaEventos = function (jsonData) {
     
      if (jsonData != null) {
         $.each(jsonData, function(index, element) {
            console.log(element);
            
            if (element.hasOwnProperty('datetype')) {
               $('#'+element.date).addClass('busy')
            }
            
            if (element.hasOwnProperty('events')) {
               $.each(element.events, function(index, event) {
                  $('#'+element.date).append('<div class="divsEvents ' + event.eventtype + 'event crop" title="' + event.eventtext + '">'+event.eventtext+'</div>')
               });
            }
         });
      }
   }
   
   function calculaQtdSemanas(inicioCalendario) {
      var ano = inicioCalendario.year();
      var mes = inicioCalendario.get('month');
      
      var inicioMes = new Date(ano, mes, 1);
      var fimMes = new Date(ano, mes, 0);
      
      var used = inicioMes.getDay() + fimMes.getDate();
      var qtdSemanas = Math.ceil(used / 7);

      return qtdSemanas;
   }

   function extend(a, b) {
      for (var key in b) {
         if (b.hasOwnProperty(key)) {
            a[key] = b[key];
         }
      }
      return a;
   }

   window.Calendario = Calendario;
})(window);