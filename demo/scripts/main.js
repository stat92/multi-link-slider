document.addEventListener('DOMContentLoaded',function() {

	composersTemplate = '<div data-composerid="{composerId}" class="composers-item">'+
	                       '<img class="composers-img" src="{source}">'+
	                       '<p class="composers-data">'+
	                       		'<span>{name}</span><br><span>{surname}</span><br>'+
	                       		'<span>{birthday}-{deathday}</span>'
	                       '</p>'+
	                    '</div>';

	composers = new MultiLinkSlider({
		container: document.getElementById('composers'), 
		template: composersTemplate, 
		minWidth: 200
	});

	composers.render([{
					   	name: 'Joseph',
					   	surname: 'Haydn',
					   	source: 'styles/img/Haydn.jpg',
					   	composerId: 1,
					   	birthday: 1732,
					   	deathday: 1809,
						listeners: {
							click: function (item, evt) {
								document.getElementById('composer').innerHTML = item.name + ' ' + item.surname
							}
						}
					},
					{ 
					   	name: 'Qurmangazy',
					   	surname: 'Sagyrbaiuly',
					   	source: 'styles/img/Sagyrbaiuly.png',
					   	composerId: 2,
					   	birthday: 1818,
					   	deathday: 1896,
						listeners: {
							click: function (item, evt) {
								document.getElementById('composer').innerHTML = item.name + ' ' + item.surname
							}
						}
					},
					{ 
					   	name: 'Pyotr',
					   	surname: 'Tchaikovsky',
					   	source: 'styles/img/Tschaikowski.jpg',
					   	composerId: 3,
					   	birthday: 1840,
					   	deathday: 1893,
						listeners: {
							click: function (item, evt) {
								document.getElementById('composer').innerHTML = item.name + ' ' + item.surname
							}
						}
					},
					{ 
					   	name: 'Nikolai',
					   	surname: 'Rimsky-Korsakov',
					   	source: 'styles/img/Rimsky.png',
					   	composerId: 4,
					   	birthday: 1844,
					   	deathday: 1908,
						listeners: {
							click: function (item, evt) {
								document.getElementById('composer').innerHTML = item.name + ' ' + item.surname
							}
						}
					}]);



	compositionsTemplate = '<div class="compositions-data">'+
	                       		'<span data-compositionid="{compositionId}">{title}</span>'+
	                    	'</div>';

	compositions = new MultiLinkSlider({
		container: document.getElementById('compositions'), 
		template: compositionsTemplate, 
		minWidth: 120
	});

	compositions.render([{ 
					   	compositionId: 1,
					   	title: 'Composition 1',
						listeners: {
							click: function (item, evt) {
								document.getElementById('composition').innerHTML = item.title
							}
						}
					}, 
					{
						compositionId: 1,
					   	title: 'Composition 2',
						listeners: {
							click: function (item, evt) {
								document.getElementById('composition').innerHTML = item.title
							}
						}
					},
					{
						compositionId: 1,
					   	title: 'Composition 3',
						listeners: {
							click: function (item, evt) {
								document.getElementById('composition').innerHTML = item.title
							}
						}
					},
					{
						compositionId: 1,
					   	title: 'Composition 4',
						listeners: {
							click: function (item, evt) {
								document.getElementById('composition').innerHTML = item.title
							}
						}
					}]);
})