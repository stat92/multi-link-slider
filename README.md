# Light slider in vanilla JS

## Usage

#### 1. Create the template of the sliders item
```
compositionsTemplate = '<div class="compositions-data">'+
                            '<span data-compositionid="{compositionId}">{title}</span>'+
                        '</div>';
```

Template may contain mustache in the curly braces ```{}``` that will be replaced by dataset after render

#### 2. Create new object with the config
```
compositions = new MultiLinkSlider({
		template: compositionsTemplate, 
		minWidth: 200,
        amountToShow: 2
	});
```

```template``` is the html string template that every item of the slider will implement. ```minWidth``` is the minimum width of the every item. If you set ```amountToShow```, ```minWidth``` will be ignored.

#### 3. Render it with the dataset

```
compositions.render(document.getElementById('compositions'), [{ 
    compositionsId: 1,
    title: 'Composition 1',
    listeners: {
        click: function (item, evt) {
            document.getElementById('composition').innerHTML = item.title // title is 'Composition 1'
        }
    }
},
...
]) 
```
To the ```render``` function add the target container and the array of datasets. Dataset contains the listeners and the data that will replace mustaches. Listener takes corresponding dataset and event object. 

#### API

```MultiLinkSlider``` provides next methods:
<br>```getLength()``` - to get amount of items
<br>```append(items)``` - to append new items to the existing slider
<br>```move(direction)``` - to slide (set direction -1 to go left, +1 to go right)
<br>```replace(items)``` - to replace with new items
