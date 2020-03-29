import $ from 'jquery';
import { getStatName } from './helpers/statHelper'; //Helper pour traiter le nom de la stat principale
/*
* Objectif : récupérer un personnage à l'aide de l'API OpenDota et afficher ses informations
*
* */
export default class Hero {
    
    constructor() {
        this.initEls();
        this.initEvents();

    }
    initEls(){
        this.$els = {
            charImage : $('.js-char-image'),
            charName : $('.js-char-name'),
            charMainStat : $('.js-char-mainStat'),
            charStat : $('.js-char-str'),
            charAgi : $('.js-char-agi'),
            charInt : $('.js-char-int'),
            container : $('.js-container'),
            charRole1 : $('#role1'),
            charRole2 : $('#role2'),
            charRole3 : $('#role3'),
            charWinRate : $(".winRate"),
            charWinFill : $(".winFill"),
        }
        //Déclarer mes éléments interactibles
        this.refreshButton = document.querySelector('#refresh');
        this.modeCarry = document.querySelector('.carry');
        this.modeSupport = document.querySelector('.support');
        this.modeInitiator = document.querySelector('.initiator');
        
        
    }
    initEvents() {
        
        this.getQuote();
        //Lancer les écouteurs d'évènements et les fonctions associées
        this.refreshButton.addEventListener('click', event => this.getQuote());
        this.modeCarry.addEventListener('click', event => this.getMode("Carry"));
        this.modeSupport.addEventListener('click', event => this.getMode("Support"));
        this.modeInitiator.addEventListener('click', event => this.getMode("Initiator"));
    }
    getQuote() {
        $(".char").addClass('containerAppear'); //Brouiller le personnage tant que toutes les valeurs ne sont pas affichées
        const api = {
            endpoint: 'https://api.opendota.com/api/heroStats',  //point de sortie, URL de la requête
        };
        $.ajaxSetup({cache:false});

        $.getJSON(api.endpoint) // Obtenir un fichier JSON avec le résulat de la requête
        .then((response) => { //Si tout marche, on lance le then avec notre fichier JSON en paramètre
            // console.log(response);
            var winRate =0;
            var indexRandom = Math.floor(Math.random()*response.length); //Variable pour aller chercher un personnage aléatoirement
            winRate = Math.floor((response[indexRandom].pro_win*100)/response[indexRandom].pro_pick);
            //On appelle la fonction renderQuote en passant en paramètre les valeur de la requête trouvées dans le tableau json
            this.renderChar(response[indexRandom].localized_name, 
                response[indexRandom].primary_attr, 
                response[indexRandom].img,
                response[indexRandom].base_str,
                response[indexRandom].base_agi,
                response[indexRandom].base_int, 
                response[indexRandom].roles,  
                winRate,
                );
                
            
        }) 
        .catch((e) => {
            console.log('error with the quote :', e);
        }); 
    }


    //Fonction pour aller chercher un personnage dont le premier rôle est celui choisi par l'utilisateur, passé en paramètre
    getMode(nameRole) {
        $(".char").addClass('containerAppear'); //Brouiller le personnage tant que toutes les valeurs ne sont pas affichées
        const api = {
            endpoint: 'https://api.opendota.com/api/heroStats',  //point de sortie, requete ajax
        };
        $.ajaxSetup({cache:false});

        $.getJSON(api.endpoint) 
        .then((response) => { 
            console.log(response);
            var winRate =0;
            var indexRandom = Math.floor(Math.random()*response.length); //Variable pour aller chercher un personnage aléatoirement

            //Balayer le json de manière aléatoire tant que l'on n'a pas trouvé le rôle
            do {
                indexRandom = Math.floor(Math.random()*response.length);
            }
            while (!(response[indexRandom].roles[0] == nameRole));

            winRate = Math.floor((response[indexRandom].pro_win*100)/response[indexRandom].pro_pick);
            //On appelle la fonction renderQuote en passant en paramètre les valeur de la requête trouvées dans le tableau json
            this.renderChar(response[indexRandom].localized_name, 
                response[indexRandom].primary_attr, 
                response[indexRandom].img,
                response[indexRandom].base_str,
                response[indexRandom].base_agi,
                response[indexRandom].base_int, 
                response[indexRandom].roles,  
                winRate,
                );
                
            
        }) 
        .catch((e) => {
            console.log('error with the quote :', e);
        }); 
    }

//Mettre à jour la page avec les valeurs de la requête passées en paramètres
    renderChar(charName, mainStat, image, baseStrength, baseAgi, baseInt, roles, winRate) {
        var urlImage = "https://api.opendota.com" + image; //URL de base contenant l'image. Concaténer avec le résultat de la requête
        this.$els.charImage.attr("src",urlImage);
        this.$els.charName.text(charName);
        this.$els.charMainStat.text(getStatName(mainStat)); //Traiter le nom avec un helper pour le transformer en nom compréhensible (str devient Strength)
        this.$els.charStat.text(baseStrength);
        this.$els.charAgi.text(baseAgi);
        this.$els.charInt.text(baseInt);
        this.$els.charRole1.text(roles[0]);
        this.$els.charRole2.text(roles[1]);
        if(roles[2] == undefined) { //Effacer la div du troisième rôle s'il n'y en a pas
            this.$els.charRole3.addClass('disappear');
        } else {
            this.$els.charRole3.text(roles[2]);
            this.$els.charRole3.removeClass('disappear');
        }
        this.$els.charWinRate.text(winRate);
        this.$els.charWinFill.css("width", winRate+"%");
        this.$els.container.addClass('is-ready');
        
        this.checkImageLoad(); //Fonction pour vérifier que les images sont chargées, et enlever le flou une fois que c'est bon
        // $(".char").toggleClass('containerAppear');
    }

    checkImageLoad(){
        var imagesLoaded = 0;
        // Total images is the total number of <img> elements on the page.
        var totalImages = $('img').length;

        // Step through each image in the DOM, clone it, attach an onload event
        // listener, then set its source to the source of the original image. When
        // that new image has loaded, fire the imageLoaded() callback.
        $('img').each(function(idx, img) {
            
          $('<img>').on('load', imageLoaded).attr('src', $(img).attr('src'));
          
        });

        // Incrémenter la variable pour chaque image chargée. 
        // Quand elles sont toutes chargées, lancer allImagesLoaded()
        
        function imageLoaded() {
          imagesLoaded++;
          if (imagesLoaded == totalImages) {
            allImagesLoaded();
          }
        }
        function allImagesLoaded() {          
          $(".char").removeClass('containerAppear'); //Enlever le flou de la page une fois qu'on a tout chargé
        }
    }
}

