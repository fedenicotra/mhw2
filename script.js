/* TODO: inserite il codice JavaScript necessario a completare il MHW! */
const madechs = {};
const button = document.querySelector('.button');
const choices = document.querySelectorAll('.choice-grid div');

function removeListeners(){
	for(let item of choices){
		item.removeEventListener("click", makeChoice);
	}
}
function addListeners(){
	for(let item of choices){
		item.addEventListener("click", makeChoice);
	}
}
function decMaker(){
	if(madechs["two"] === madechs["three"])
		return "two";
	else
		return "one";
}
function resetMadechs(){
	madechs["one"] = madechs["two"] = madechs["three"] = null;
}
function mdeselection(div){
	const chbd = div.querySelector(".checkbox");
	chbd.src = "./images/unchecked.png";
	div.classList.remove('selected');
	div.classList.add('unchecked');
}
function mselection(div){
	const chb = div.querySelector(".checkbox");
	chb.src = "images/checked.png";
	div.classList.remove('unchecked');
	div.classList.add('selected');
}

function makeChoice(event){
	const madeCh = event.currentTarget;
	const divs = madeCh.parentNode.childNodes;
	for(let div of divs){
		if(div.nodeType === 1){
			mdeselection(div);
		}
	}
	mselection(madeCh);
	madechs[madeCh.dataset.questionId] = madeCh.dataset.choiceId;
	displayResult();
}

function restartQ(){
	const res = document.querySelector('.results');
	for(let div of choices){
		div.querySelector(".checkbox").src = "./images/unchecked.png";
		div.classList.remove('selected');
		div.classList.remove('unchecked');
	}
	resetMadechs();
	res.classList.add("hidden");
	addListeners();
	scrollTo(0, 0);
}

function displayResult(){
	if(madechs["one"]   !== null &&
	   madechs["two"]   !== null &&
	   madechs["three"] !== null){
		removeListeners();
		document.querySelector('.results').classList.remove("hidden");
		const descr = document.querySelector('#descr');
		const title = document.createElement("h1");
		const content = document.createElement("p");
		descr.innerHTML = '';
		const to_resmap = decMaker();
		title.innerText = RESULTS_MAP[madechs[to_resmap]]["title"];
		content.innerText = RESULTS_MAP[madechs[to_resmap]]["contents"];
		descr.appendChild(title);
		descr.appendChild(content);
	}
}

/*
 * Aggiunta dei listener e inizializzazione scelte
 */

resetMadechs();
addListeners();
button.addEventListener('click', restartQ);
