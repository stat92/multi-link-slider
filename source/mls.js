MultiLinkSlider = (function () {

	function MultiLinkSlider (config) {
		
		if (!config.container || !config.template) {
			throw Error('Container and template is needed');
		}

		this.outerContainer = config.container;
		this.itemsTemplate = config.template;
		this.whereIs = 0;
		this.length = 0;
		this.numb = MultiLinkSlider.countSlider++;	
		this.minWidth = config.minWidth || 250;
		this.amountToShow = config.amountToShow || undefined
	}

	MultiLinkSlider.countSlider = 1;

	MultiLinkSlider.prototype = {
		
		constructor: MultiLinkSlider,

		getCount: function () {
			return this.length
		},

		/**
		 * Creates whole block of slider
		 * 
		 * @param {[object]} items 
		 * @returns {dom}
		 */
		getBlock: function(items) {
			var me = this,
				div, ul;

			div = document.createElement('div');
			div.className += ' mls-div mls-div-' + me.numb;

			ul = document.createElement('ul');
			ul.className += ' mls-ul mls-ul-' + me.numb;

			div.appendChild(ul);

			items.forEach(function (item) {
				ul.appendChild(me.getLiItem(item))
			})

			return div;
		},

		/**
		 * Creates and returns the items li element. Binds listeners
		 * 
		 * @param {object} item 
		 * @returns {domElement}
		 */
		getLiItem: function (item) {
			var li = document.createElement('li'),
				listeners = item['listeners']

			li.className += ' mls-li mls-li-' + this.numb;

			li.innerHTML = this.prepareTemplate(item)

			if (listeners) 
			{
				for (key in listeners)
				{
					if (listeners.hasOwnProperty(key)) 
					{
						li.addEventListener(key, listeners[key].bind(li, item))
					}
				}
			}

			return li;
		},

		/**
		 * Prepares the template with new values 
		 * 
		 * @param {object} item 
		 * @returns {string}
		 */
		prepareTemplate: function (item) {
			var temporary = this.itemsTemplate, key, value;

			for (key in item)
			{
			    if (item.hasOwnProperty(key)) 
				{
					value = item[key];

					if (value === undefined || value === null) value = "";

			    	temporary = temporary.replace(new RegExp('{'+key+'}'), value)
			    }
			}

			return temporary;
		},

		/**
		 * Gets amount of items that will be shown in the viewport
		 * 
		 * @returns {number}
		 */
		getAmountOfItemsToShow: function () {
			var me = this,
			    itemsToShow,
				all;

			if (me.amountToShow) {
				itemsToShow = me.amountToShow
			} else {
				itemsToShow = Math.floor(me.outerContainer.offsetWidth/me.minWidth);

				if (itemsToShow == 0) 
					itemsToShow++
				else if (itemsToShow > (all = me.getCount())) 
					itemsToShow = all;
			}
			
			return itemsToShow;
		},

		getUlWidth: function () {
			return this.getLiWidth()*this.getCount();
		},

		getLiWidth: function () {		
			return Math.floor(this.outerContainer.offsetWidth/this.getAmountOfItemsToShow());
		},

		getLiPercentWidth: function () {
			return 100/this.getCount();
		},

		render: function (items) {
			var me = this,
				lis;
				
			me.length = items.length;
			me.outerContainer.appendChild(me.getBlock(items));
			
			me.leftButton = me.createButton('left');
			me.rightButton = me.createButton('right');

			me.leftButton.addEventListener('click', function () { me.move(-1); })
			me.rightButton.addEventListener('click', function () { me.move(1); })
			
			lis = document.querySelectorAll('.mls-li-'+me.numb);

			document.querySelector('.mls-ul-'+me.numb).style.width = me.getUlWidth()+'px'
			
			lis.forEach(function(li) {
				li.style.width = me.getLiPercentWidth()+'%'
			})

			me.checkButtons();

			window.addEventListener('resize', function()
			{
				var style = document.querySelector('.mls-ul-'+me.numb).style;

				style.width = me.getUlWidth()+'px'
				style.left = (me.whereIs*me.getLiWidth())+'px'

				me.checkButtons();
			});
		},

		createButton: function (direction) {
			var div = document.createElement('div'),
				parent = document.querySelector('.mls-div-'+this.numb),
				ul = document.querySelector('.mls-ul-'+this.numb);

			div.className += 'mls-button-'+direction;

			parent.insertBefore(div, ul);

			return div;
		},

		/**
		 * Appends new items to the existing block
		 * 
		 * @param {[object]} items 
		 */
		append: function (items) {
			var me = this,
				temp = document.createElement('div'),
				ul = document.querySelector('.mls-ul-'+me.numb);

			me.length += items.length;

			items.forEach(function (item) {
				ul.appendChild(me.getLiItem(item))
			})

			ul.style.width = me.getUlWidth()+'px'
			
			document.querySelectorAll('.mls-li-'+me.numb).forEach(function(li) {
				li.style.width = me.getLiPercentWidth()+'%'
			})

			me.checkButtons();
		},

		move: function (direction) {
			var me = this;

			me.whereIs -= direction;
			me.checkButtons();
			
			document.querySelector('.mls-ul-'+me.numb).style.left = (me.whereIs*me.getLiWidth())+'px'
		},

		checkButtons: function () {
			var me = this,
				hasRight = (me.whereIs+me.getCount()-me.getAmountOfItemsToShow()) > 0,
				hasLeft  = (me.whereIs < 0);

			me.rightButton.style.display = hasRight ? 'block' : 'none'
			me.leftButton.style.display =  hasLeft  ? 'block' : 'none'
		}
	}

	return MultiLinkSlider;
}())

