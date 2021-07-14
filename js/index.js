async function getInfo(data, counter) {
	const dataJson = await fetch(`https://swapi.dev/api/${data}/${counter}`)
	const dataObj = await dataJson.json();
	return dataObj;
}

const dataProfile = document.getElementById('element-info');
let counter = 1;
let dataType = 'people';

const toPeopleSwitcher = document.getElementById('peolpe');
toPeopleSwitcher.addEventListener('click', switchToPeople);

const toPlanetSwitcher = document.getElementById('planets');
toPlanetSwitcher.addEventListener('click', switchToPlanet);

const toStarshipSwitcher = document.getElementById('starships');
toStarshipSwitcher.addEventListener('click', switchToStarship);

const next = document.getElementById('next');
next.addEventListener('click', getNext)

async function switchToPeople() {
	counter = 1;
	dataType = 'people';
	displayData(dataType, counter)
}

async function switchToPlanet() {
	counter = 2;
	dataType = 'planets';
	displayData(dataType, counter)
}

async function switchToStarship() {
	counter = 9;
	dataType = 'starships';
	displayData(dataType, counter)
}


async function displayData(dataType, counter) {
 let data = await getInfo(dataType, `${counter}`);

 let dataToInsert;

 switch(dataType) {
	case 'people':
		dataToInsert = {
			linkName: 'characters',
			headerOne: 'Gender',
			headerTwo: 'Birth Year',
			headerThree: 'Eye Color',
			infoOne: data.gender,
			infoTwo: data.birth_year,
			infoThree: data.eye_color
		}
		break;
	case 'planets':
		dataToInsert = {
			linkName: 'planets',
			headerOne: 'Climate',
			headerTwo: 'Terrain',
			headerThree: 'Population',
			infoOne: data.climate,
			infoTwo: data.terrain,
			infoThree: data.population
		}
	break;
	default: 
		dataToInsert = {
			linkName: 'starships',
			headerOne: 'Manufacturer',
			headerTwo: 'Class',
			headerThree: 'Price',
			infoOne: data.gender,
			infoTwo: data.starship_class,
			infoThree: data.cost_in_credits
		}
 }

	dataProfile.innerHTML = 
	`<div>` + 
		`<div class="display-flex mx-auto width-600-px">` + 
			`<img class="mt-20px width-200-px border-radius-4px height-auto" src="https://starwars-visualguide.com/assets/img/${dataToInsert.linkName}/${counter}.jpg" alt=${data.name}>` + 
			`<h3 class="pl-40px align-self-end">${data.name}</h2>` + 
		`</div>` + 
		`<ul class="width-600-px mx-auto mt-20px list-style-none">` + 
			`<li>${dataToInsert.headerOne}: ${dataToInsert.infoOne}</li>` + 
			`<li>${dataToInsert.headerTwo}: ${dataToInsert.infoTwo}</li>` + 
			`<li>${dataToInsert.headerThree}: ${dataToInsert.infoThree}</li>` + 
		`</ul>` +
	`</div>`
}

async function getNext() {
	if (counter === 10) {
		counter = 1;
	} else {
		++counter;
	}
	displayData(dataType, counter)
}

displayData(dataType, counter);

