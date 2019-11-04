 let todos = [];
let newTodo = document.getElementById('newTodo');
let closeBtn = document.getElementById('close');
let addBtn = document.getElementById('add');
let openBtn = document.getElementById('open');
let input = document.getElementById('input');
let dateInput = document.getElementById('date');
let timeInput = document.getElementById('time');
let listBody = document.getElementById('list-body');
let song = document.getElementsByTagName('audio')[0];


openBtn.addEventListener('click', open);
closeBtn.addEventListener('click', close);
addBtn.addEventListener('click', add);

function close() {
	newTodo.style.display = "none";
	openBtn.style.visibility = "visible";
	input.value = "";
}

function open() {
	newTodo.style.display = "block";
	openBtn.style.visibility = "hidden";
	input.value = "";
}

function add() {
	let value = input.value;
	let endDate = dateInput.value;
	let endTime = timeInput.value;
	let list = JSON.parse(localStorage.getItem('list'));

	if (endDate && value && endTime) {
		if (!list) {
			todos.push({
				index: todos.length,
				text: value,
				startDate: new Date().toUTCString(),
				endDate: new Date(endDate).toDateString(),
				endTime: endTime
			});
		}
		else {
			todos.concat(list);
			todos.push({
				index: todos.length,
				text: value,
				startDate: new Date().toUTCString(),
				endDate: new Date(endDate).toDateString(),
				endTime: endTime
			});
		}

		input.value = "";
		dateInput.value = "";
		timeInput.value = "";
		localStorage.setItem('list', JSON.stringify(todos));
		showList();
		close();
	}
	else {
		return false;
	}
}

function showList() {
	let list = JSON.parse(localStorage.getItem('list'));
	if (!list || list.length === 0) {
		return listBody.innerHTML =
			`
					<tr>
						<td> </td>
						<td> Please add an Item by clicking the button below </td>
						<td> </td>
						<td> </td>
						<td> </td>
					</tr>
			`;
	}
	else {
		todos = [].concat(list);
		console.log(todos);
		let content = '';
		todos.forEach((item, index) => {
			content += `
					<tr>
						<td> ${index + 1} </td>
						<td> ${item.startDate} </td>
						<td> ${item.endDate + ' : ' + item.endTime} </td>
						<td> ${item.text} </td>
						<td>
							<span class="fa fa-trash" onclick="remove(${index})" ></span>
							</td>
							</tr>`
		});
		listBody.innerHTML = content;
	}
}
//  adding the alarm clock 
// <span class="fa fa-mute" onclick="edit(${index})" ></span>                           
// <span class="fa fa-clock-o" onclick="edit(${index})" ></span>                           

function playAlarm() {
	song.play();
}

function remove(index) {
	// let list = JSON.parse(localStorage.getItem('list'));
	// console.log(index)

	todos.splice(index, 1);
	localStorage.setItem('list', JSON.stringify(todos));
	showList();
}

showList();
