$.fn.createCalendar = function(jsonData, currentDateString) {
	if ($.isEmptyObject(currentDateString)) {
		currentDate = moment();
	} else {
		currentDate = moment(currentDateString, "DD-MM-YYYY");
	}
	
	createCalendar(currentDate, jsonData);
};

function createCalendar(currentDate, jsonData) {
	
	var todaysDate = moment();
	var currentMonth = currentDate.month() + 1;
	
	
	var firstDate = "01-" + currentMonth + "-" + currentDate.year();
	var firstDayOfTheMonth = moment(firstDate, "DD-MM-YYYY").day() + 1;
	
	var mesAno = currentDate.format('MMMM YYYY');
	
	currentDate = moment(firstDate, "DD-MM-YYYY").subtract(firstDayOfTheMonth, 'days');
	
	
	var divElement = document.createElement("div");
	divElement.className = "fullcalendar";
	
	var calendarTable = document.createElement("table");
	calendarTable.className = "calendarTable";
	
	var navHeader = calendarTable.insertRow(0);
	navHeader.className = "trnav";
	
	var navCell = navHeader.insertCell(0);
	navCell.innerHTML = mesAno
	navCell.setAttribute("colspan", 7);
	navCell.className = "nav";
	
	var header = calendarTable.insertRow(1);
	
	var nomeDias = ["dom" ,"seg", "ter", "qua", "qui", "sex", "sab"];
	for (var i = 0; i < nomeDias.length; i++) {
		var cell = header.insertCell(i);
		cell.innerHTML = nomeDias[i];
		cell.className = "day size";
	}
	
	
	var firstOfMonth = new Date(currentDate.year(), currentMonth, 1);
	var lastOfMonth = new Date(currentDate.year(), currentMonth, 0);
	var used = firstOfMonth.getDay() + lastOfMonth.getDate();
	var qtdSemanas = Math.ceil(used / 7);
		
	
	for (var linha = 0; linha < qtdSemanas; linha++) {
		var semana = calendarTable.insertRow(linha + 2);
		
		for (var coluna = 0; coluna < 7; coluna++) {
			
			currentDate = currentDate.add(1, 'days');
			
			var dia = semana.insertCell(coluna);
			
			if (currentMonth != currentDate.month() + 1) {
				dia.className = 'fadeDay';
			}

			var dateDiv = document.createElement("div");
			dateDiv.className = "dateDiv size";
			dateDiv.id = currentDate.format('DD-MM-YYYY');
			
			var dayDivClass = document.createElement("div");
			dayDivClass.className = "dayDiv";
			dayDivClass.innerHTML = currentDate.date();
			
			dateDiv.appendChild(dayDivClass);
			dia.appendChild(dateDiv);
		}
	}
	
	
	
	
	
	
	
	divElement.appendChild(calendarTable);
	
	$(".calendario").append(divElement);
	
	
	if (jsonData != null) {
		$.each(jsonData, function(index, element) {
			if (element.hasOwnProperty('datetype')) {
				$('#'+element.date).addClass('busy')
			}
			
			if (element.hasOwnProperty('events')) {
				$.each(element.events, function(index, event) {
					
					$('#'+element.date).append('<div  class="divsEvents ' + event.eventtype + 'event crop" title="' + event.eventtext + '">'+event.eventtext+'</div>')
				});
			}
			
		});
	}
}