//Elements du DOM

const divVies = document.querySelector(".vies");
const message = document.getElementById("message");
const formulaire = document.getElementById("inputBox");

const input = document.getElementById("number");
const essayerBtn = document.getElementById("essayerBtn");
const rejouerBtn = document.getElementById("rejouer");
const body = document.getElementsByTagName("body")[0];

//Modèle de coeurs

const coeurVide = '<i class="bi bi-heart"></i>'
const coeurPlein = '<i class="bi bi-heart-fill"></i>'
//Fond 
const bgFroid = 'linear-gradient(to top, #5ee7df 0%, #b490ca 100%)';
const bgTiede = 'linear-gradient(to top, #30cfd0 0%, #330867 100%)';
const bgChaud = 'linear-gradient(to right, #f78ca0 0%, #f9748f 19%, #fd868c 60%, #fe9a8b 100%)';
const bgBrulant ='linear-gradient(to top, #ff0844 0%, #ffb199 100%)';

//Fond si tu gagne ou perd
const bgWin = 'linear-gradient(-60deg, #16a085 0%, #f4d03f 100%)';
const bgLoose = 'linear-gradient(60deg, #29323c 0%, #485563 100%)';

//Play : 
const play = () => {
    //nombre aléatoire   C'est une fonction       Multiplier par 
    const randomNumber = Math.floor(Math.random() * 101);
    //Math floor c'est une fonction mathematique qui arrondie les nombres en entier 

    //nombre total de nos vies (celle qui ne change pas )
    const totalVie = 6;
    //nombbre de vie au fil du jeu
    let vies = totalVie;
    // Pour voir le nombre aleatoir dans la console (choisit par la machine)
    console.log(randomNumber);

    //actualisation a chaque essaie
                        //Des que le formulaire est envoyer
    formulaire.addEventListener("submit", (e) =>{
        //Pour empecher le renouvellement de la page 
        e.preventDefault();
        const valeurInput = parseInt(input.value); // c'est pour passe de chaine de caractere a chiffre (parseint)
        //Faut pas la valeur mise par le joueur soit en dessous ou au dessus de 100 sinon recommencer le jeu
        if(valeurInput < 0 || valeurInput > 100) return;
        //Si la valeur input est la meme que le chiffre aleatoire alors le joueur a gagner 
        if(valeurInput === randomNumber){
            //Si c'est le cas alors change le background
            body.style.backgroundImage = bgWin                  
                                                        //C'est pour ajoutrer des variables changeant
            message.textContent = `Bravo !!! Le nombre est juste ${randomNumber}`;
            //pour afficher le bouton rejouer
            rejouerBtn.style.display = "block";
            essayerBtn.setAttribute("disabled" , "");
        }
        if(valeurInput !== randomNumber){
            if(randomNumber < valeurInput + 3 && randomNumber > valeurInput - 3){
                //les Point c'est des connecteur de connections donc body + style
                body.style.backgroundImage = bgBrulant;
                message.textContent = "C'est brulant !! : 🥵";
            }
            else if (randomNumber < valeurInput + 6 && randomNumber > valeurInput - 6){
                body.style.backgroundImage = bgChaud;
                message.textContent = "Tu est chaud ! 😎"
            }
            else if (randomNumber < valeurInput + 11 && randomNumber > valeurInput - 11){
                body.style.backgroundImage = bgTiede;
                message.textContent = "C'est Tiède 😐"
            }
            else{
                body.style.backgroundImage = bgFroid;
                message.textContent = "T'es froid 🥶 "
            }
            //c'est ce qui fait baisse la vie quand tu perd 
            vies--;
            verifyLoose();
        }

        actualiseCoeurs(vies);
    })

    //Verifie  si j'ai perdu
    const verifyLoose = () => {
        if(vies === 0){
            body.style.backgroundImage = bgLoose;
            body.style.color = "#99000";
            //Desactiver le bouton essayer (si ta perdu)
                                //c'est le nom de l'attribut et le 2eme c'est la valeur
            essayerBtn.setAttribute("disabled" , "");
            message.textContent = `Vous avez perdu. La réponse était ${randomNumber}`;
            //le bouton rejouer
            rejouerBtn.style.display = "block";
        }
    }
     //fonction de la ligne 82 (actualisecoeurs(vies))
    const actualiseCoeurs = (vies) =>{
        //on enelve tous le code html a l'interieur 
        divVies.innerHTML = "";
                            // ceci est un tableau
        let tableauDeVies = [];
                    //c'est ce qui calcul tous nos coeur qu'on doit avoir
        for (let i = 0; i < vies; i++){
            tableauDeVies.push(coeurPlein);
        }           
                    //c'est le calcul pour ajouter des coeurs vides
        for (let i = 0; i<totalVie - vies; i++){
            tableauDeVies.push(coeurVide);
        }
        //ca ajoute tous ceci a l'html
        tableauDeVies.forEach(coeur =>{
            divVies.innerHtML += coeur;
        })
    }
    actualiseCoeurs(vies);

    //parametre bouton rejouer
    rejouerBtn.addEventListener("click", () => {
        message.style.display = "none";
        //cette ligne force le rechargement de la page
        document.location.reload(true);
    })
}
play();