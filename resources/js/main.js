var data = localStorage.getItem('todoList') ? JSON.parse(localStorage.getItem('todoList')) : {
	todo: [],
	completed: []
};

// (function() {
	renderTodoList();

	document.getElementById('add').addEventListener('click', function () {
		var itemValue = document.getElementById('item').value;
		if(itemValue) {
			addItem(itemValue);
		}
	});

	document.getElementById('item').addEventListener('keydown', function (e) {
		var value = this.value;
		if((e.code === 'Enter') || (e.code === 'NumpadEnter') && value) {
			addItem(value);
		}
	});

// }());

function renderTodoList() {
	if(!data.todo.length && !data.completed.length) return;

	for (var i = 0; i < data.todo.length; i++) {
		addItemToDOM(data.todo[i]);
	}

	for (var j = 0; j < data.completed.length; j++) {
		addItemToDOM(data.completed[j], true);
	}
}

function addItem (value) {
	addItemToDOM(value);
	document.getElementById('item').value = '';

	data.todo.push(value);

	updateDataObject();
}

function removeItem() {
	var item = this.parentNode.parentNode;
	var parent = item.parentNode;
	var value = item.innerText;
	var id = parent.id;

	if (id === 'todo') {
		data.todo.splice(data.todo.indexOf(value), 1);
	} else {
		data.completed.splice(data.completed.indexOf(value), 1);
	}

	parent.removeChild(item);

	updateDataObject();

}

function completeItem() {
	var item = this.parentNode.parentNode;
	var parent = item.parentNode;
	var value = item.innerText;
	var id = parent.id;

	if (id === 'todo') {
		data.todo.splice(data.todo.indexOf(value), 1);
		data.completed.push(value);
	} else {
		data.completed.splice(data.completed.indexOf(value), 1);
		data.todo.push(value);
	}

	var target = (id === 'todo') ? (document.getElementById('completed')) : (document.getElementById('todo'));

	parent.removeChild(item);
	target.insertBefore(item, target.childNodes[0]);

	updateDataObject();

}

function updateDataObject() {
	localStorage.setItem('todoList', JSON.stringify(data));
}


function addItemToDOM (value, completed) {
	var listEl = completed ? document.getElementById('completed') : document.getElementById('todo');

	var listItem = document.createElement('li');
	listItem.innerText = value;


	var buttons = document.createElement('div');
	buttons.classList.add('buttons');

	var deleteButton = document.createElement('button');
	deleteButton.classList.add('delete');

	deleteButton.addEventListener('click', removeItem);

	var completeButton = document.createElement('button');
	completeButton.classList.add('complete');

	completeButton.addEventListener('click', completeItem);

	buttons.appendChild(deleteButton);
	buttons.appendChild(completeButton);
	listItem.appendChild(buttons);

	listEl.appendChild(listItem, listEl.childNodes[0]);
}
