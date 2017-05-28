document.addEventListener('DOMContentLoaded',function() {

	var composersTemplate = '<div data-composerid="{composerId}" class="composers-item">'+
	                       '<img class="composers-img" src="{source}">'+
	                       '<p class="composers-data">'+
	                       		'<span>{name}</span><br><span>{surname}</span><br>'+
	                       		'<span>{birthday}-{deathday}</span>'
	                       '</p>'+
	                    '</div>';
	
	var composersData = [{
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
					}];

	var composers = new MultiLinkSlider({
		template: composersTemplate, 
		minWidth: 200
	});

	composers.render(document.getElementById('composers'), composersData);





	var compositionsTemplate = '<div class="compositions-data">'+
	                       		'<span data-compositionid="{compositionId}">{title}</span>'+
	                    	'</div>';
	
	var compositionsData = [{ 
					   	compositionId: 1,
					   	title: 'Composition 1',
						listeners: {
							click: function (item, evt) {
								document.getElementById('composition').innerHTML = item.title
							}
						}
					}, 
					{
						compositionId: 2,
					   	title: 'Composition 2',
						listeners: {
							click: function (item, evt) {
								document.getElementById('composition').innerHTML = item.title
							}
						}
					},
					{
						compositionId: 3,
					   	title: 'Composition 3',
						listeners: {
							click: function (item, evt) {
								document.getElementById('composition').innerHTML = item.title
							}
						}
					},
					{
						compositionId: 4,
					   	title: 'Composition 4',
						listeners: {
							click: function (item, evt) {
								document.getElementById('composition').innerHTML = item.title
							}
						}
					}];

	var compositions = new MultiLinkSlider({
		template: compositionsTemplate, 
		minWidth: 120
	});

	compositions.render(document.getElementById('compositions'), compositionsData);
})