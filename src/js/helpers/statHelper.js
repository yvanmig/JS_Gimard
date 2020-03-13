import $ from 'jquery';

export function getStatName (rawName){
    let nameStat = rawName;
    if (nameStat == "str") {
        nameStat = "Strength"; //Changer l'abbréviation en mot complet
        //Changer le background-color en rouge quand on a un perso force
        $(".containerNameImage").css("background-color","rgba(151, 17, 17, 0.5)");        
    }
    else if (nameStat == "agi") {
        $(".containerNameImage").css("background-color","rgba(15, 69, 13, 0.5)");
        nameStat = "Agility";
    }
    else if (nameStat == "int") {
        $(".containerNameImage").css("background-color","rgba(0, 93, 112, 0.5)");
        nameStat = "Intelligence";
    }
    return nameStat;
}