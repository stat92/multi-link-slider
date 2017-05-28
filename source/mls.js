MultiLinkSlider = (function () {

	function MultiLinkSlider (config) {
		
		if (!config.template) {
			throw Error('Template is needed');
		}

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

		getLength: function () {
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

			div.appendChild(me.getUlBlock(items));
			
			return div;
		},

		/**
		 * Creates ul block that will contain lists
		 * 
		 * @param {[object]} items 
		 * @returns {dom}
		 */
		getUlBlock: function (items) {
			var me = this,
				ul = document.createElement('ul');

			ul.className += ' mls-ul mls-ul-' + me.numb;

			items.forEach(function (item) {
				ul.appendChild(me.getLiItem(item))
			})

			return ul;
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
		 * Prepares the template. Replaces mustaches with the new values 
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
				itemsToShow = Math.floor(me.block.offsetWidth/me.minWidth);

				if (itemsToShow == 0) 
					itemsToShow++
				else if (itemsToShow > (all = me.getLength())) 
					itemsToShow = all;
			}
			
			return itemsToShow;
		},

		getUlWidth: function () {
			return this.getLiWidth()*this.getLength();
		},

		getLiWidth: function () {		
			return Math.floor(this.block.offsetWidth/this.getAmountOfItemsToShow());
		},

		getLiPercentWidth: function () {
			return 100/this.getLength();
		},

		/**
		 * Creates whole block and renders it to the container. 
		 * Use this method to remove all old items and to set news
		 * 
		 * @param {any} items 
		 */
		render: function (outerContainer, items) {
			var me = this;
				                      
			me.length = items.length;
			me.block = me.getBlock(items);

			outerContainer.appendChild(me.block);

			me.addButtons();
			me.normalizeWidth();
			me.checkButtons();

			window.addEventListener('resize', function()
			{
				var style = me.block.querySelector('.mls-ul').style;

				style.width = me.getUlWidth()+'px'
				style.left = (me.whereIs*me.getLiWidth())+'px'

				me.checkButtons();
			});	
		},

		/**
		 * Replaces old items with the news 
		 * 
		 * @param {[object]} items 
		 */
		replace: function (items) {
			var me = this,
			    ul = me.block.querySelector('.mls-ul');

			me.whereIs = 0;
			me.length = items.length;

			me.block.removeChild(ul);
			me.block.appendChild(me.getUlBlock(items));

			me.normalizeWidth();
			me.checkButtons();
		},

		addButtons: function () {
			var me = this,
				ul = me.block.querySelector('.mls-ul');
		
			me.leftButton = me.createButton('left');
			me.rightButton = me.createButton('right');

			me.block.insertBefore(me.rightButton, ul);
			me.block.insertBefore(me.leftButton, ul);

			me.leftButton.addEventListener('click', function () { me.move(-1); })
			me.rightButton.addEventListener('click', function () { me.move(1); })
		},

		createButton: function (direction) {
			var div = document.createElement('div');
			div.className += 'mls-button-'+direction;

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
				ul = me.block.querySelector('.mls-ul');

			me.length += items.length;

			items.forEach(function (item) {
				ul.appendChild(me.getLiItem(item))
			})

			me.normalizeWidth();
			me.checkButtons();
		},

		move: function (direction) {
			var me = this;

			me.whereIs -= direction;
			me.checkButtons();
			
			me.block.querySelector('.mls-ul').style.left = (me.whereIs*me.getLiWidth())+'px'
		},

		checkButtons: function () {
			var me = this,
				hasRight = (me.whereIs+me.getLength()-me.getAmountOfItemsToShow()) > 0,
				hasLeft  = (me.whereIs < 0);

			me.rightButton.style.display = hasRight ? 'block' : 'none'
			me.leftButton.style.display =  hasLeft  ? 'block' : 'none'
		},

		normalizeWidth: function () {
			var me = this;

			me.block.querySelector('.mls-ul').style.width = me.getUlWidth()+'px'
			
			me.block.querySelectorAll('.mls-li').forEach(function(li) {
				li.style.width = me.getLiPercentWidth()+'%'
			})
		}
	}

	return MultiLinkSlider;
}())

