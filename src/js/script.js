/**
 * @file Manages the generation of random password
 * @author maker27 evgeniy@maker27.ru
 */
'use strict';
import '../sass/style.scss';
/**
 * return HTML element by id
 * @example
 * // returns document.getElementById('id')
 * gebi('id');
 * @param {string} id - HTML attribute
 * @returns {Element}
 */
function gebi(id){
	return document.getElementById(id);
}

/**
 * return the word in the correct form depending on the number
 * @param {number} count - amount of something
 * @param {string} one - singular (1, 21, 101 etc.)
 * @param {string} some - plural (2, 4, 24 etc.)
 * @param {string} many - plural (5, 11, 110 etc.)
 */
function someThing (count, one, some, many){
	const mod = count%100;
	if(mod>10 && mod<20){
		return count+' '+many;
	}else{
		let out;
		switch(count%10){
			case 1:
				out = count+' '+one;
				break;
			case 2:
			case 3:
			case 4:
				out = count+' '+some;
				break;
			default:
				out = count+' '+many;
				break;
		}
		return out;
	}
}

/**
 * displays current length of password on change
 */
function changePasswordLength(){
	const len = this.value;
	gebi('passLengthView').innerHTML = someThing(len, 'символ', 'символа', 'символов');
	let className = '';
	if(len > 20){
		className += 'alert-info';
	}else if (len<8){
		className += 'alert-warning';
	}
	gebi('passwordStrength').className = className;
}

/**
 * displays result of generation (generated password or error)
 * @param {string} text - text message about result of generating
 * @param {string} [password] - new generated password
 */
function showResult(text, password){
	const resultText = gebi('resultText');
	resultText.className = '';
	gebi('generatedPassword').innerHTML = password || '';
	resultText.classList.add( password ? 'alert-success' : 'alert-danger' );
	resultText.innerHTML = text;
}

const passwordSymbols = {
	digits: [0,1,2,3,4,5,6,7,8,9],
	lowerChars: ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','p','q','r','s','t','u','v','w','x','y','z'],
	upperChars: ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','P','Q','R','S','T','U','V','W','X','Y','Z'],
	specialSymbols: ['!','#','$','%','&','*','+','-','=','?','@','^','_']
};

/**
 * generate password according to selected checkboxes
 */
function generatePassword(){
	const selectedSymbols = [];
	if(gebi('digitCheck').checked){
		selectedSymbols.push(...passwordSymbols.digits);
	}
	if(gebi('lowerCaseCheck').checked){
		selectedSymbols.push(...passwordSymbols.lowerChars);
	}
	if(gebi('upperCaseCheck').checked){
		selectedSymbols.push(...passwordSymbols.upperChars);
	}
	if(gebi('symbolsCheck').checked){
		selectedSymbols.push(...passwordSymbols.specialSymbols);
	}

	if(selectedSymbols.length === 0){
		showResult('Нужно выбрать по крайней мере 1 набор символов для генерации пароля!');
		return;
	}

	selectedSymbols.sort( () => Math.random()-0.5 );
	const currentLength = +gebi('stringLength').value || 10;

	let newPassword = '';
	for(let i=0; i<currentLength; i++){
		newPassword += selectedSymbols[i];
	}
	showResult('Пароль сгенерирован', newPassword);
}

gebi('stringLength').addEventListener('input', changePasswordLength);
gebi('runGenerating').addEventListener('click', generatePassword);

// first run
generatePassword();