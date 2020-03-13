import $ from 'jquery';
import { getStatName } from './helpers/statHelper'; //Helper pour traiter le nom de la stat principale
/*
* Objectif : récupérer une citation aléatoire à partir d'une API et l'afficher
*
* Étapes :
* 1- Créer une référence vers les éléments du DOM qu'on va utiliser
* 2- Récupérer une citation aléatoire à partir de l'API de QuotesOnDesign (https://quotesondesign.com/api/)
* 3- Afficher la citation
* */

export default class Quote {
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
        }
    }
    initEvents() {
        this.getQuote();
    }
    getQuote() {
        const api = {
            endpoint: 'https://api.opendota.com/api/heroStats',  //point de sortie, requete ajax
        };
        $.ajaxSetup({cache:false});

        $.getJSON(api.endpoint) // Obtenir un fichier JSON avec le résulat de la requête
        .then((response) => { //Si tout marche, on lance le then avec notre fichier JSON en parametre
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
    renderChar(quote, mainStat, image, baseStrength, baseAgi, baseInt, roles, winRate) {
        var urlImage = "https://api.opendota.com" + image; //URL de base contenant l'image. Concaténer avec le résultat de la requête

        //Faire comme une lootbox. Le cadre du personnage apparaît flouté, et en cliquant dessus, une petite animation se joue et les infos apparaissent
        // this.$els.charImageBack.attr("src",urlImage);
        this.$els.charImage.attr("src",urlImage);
        this.$els.charName.prepend(quote);
        this.$els.charMainStat.text(getStatName(mainStat)); //Traiter le nom avec un helper pour le transformer en nom compréhensible (str devient Strength)
        this.$els.charStat.text(baseStrength);
        this.$els.charAgi.text(baseAgi);
        this.$els.charInt.text(baseInt);
        this.$els.charRole1.text(roles[0]);
        this.$els.charRole2.text(roles[1]);
        if(roles[2] == undefined) { //Effacer la div du troisième rôle s'il n'en a pas
            console.log("YA RIEN");
            this.$els.charRole3.addClass('disappear');
        } else {
            this.$els.charRole3.text(roles[2]);
            this.$els.charRole2.addClass('role2Padd');
        }
        this.$els.charWinRate.append(winRate);
        
        console.log(roles[2]);
        this.$els.container.addClass('is-ready');

    }
}