import $ from 'jquery';

/*
* Objectif : récupérer une image aléatoire à partir d'une API et l'afficher
*
* Étapes :
* 1- Créer une référence vers les éléments du DOM qu'on va utiliser
* 2- Récupérer une image de façon asynchrone à partir de l'API d'Unsplash (https://source.unsplash.com/)
* 3- Définir l'image comme fond
* */

export default class Background 
{
	constructor () {
		this.initEls();
		this.initEvents();
	}
	initEls()
	{
		this.$Els = {
			background : $('.js-background'),
		}
		this.url = 'https://source.unsplash.com/collection';
		this.cat = '9787440'; //id d'une collection sur unsplash créée pour le site
		this.size = '1920x1080';

	}

	initEvents() {
		this.loadImage();
	}

	loadImage(){
		const promise = new Promise((resolve, reject) => {
			const image = new Image();
			image.src = `${this.url}/${this.cat}/${this.size}`;
			image.onload = () => {
				resolve(image);
			};
			image.onerror = (error) => {
				reject(error);
			}

		});

		promise.then((image) => {
			this.addBackground(image);
		});

		promise.catch((error) => {
			console.log('Error with the Unslapshimage',error);
		});

		
	}
	addBackground(image) {
		this.$Els.background.css('background-image', `url(${image.src})`);
		this.$Els.background.addClass('is-ready');
	}
}