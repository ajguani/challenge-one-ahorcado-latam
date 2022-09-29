
const div1 = document.querySelector("#divCapa1");
const btnNuevaPalabra = document.querySelector("#btnNuevaPalabra");
const btnIniciar = document.querySelector("#btnIniciar");

const div2 = document.querySelector("#divCapa2");
const inpAgregaPalabra = document.querySelector("#inpAgregarPalabra");
const lbInformarivo = document.querySelector("#lb-informativo");
const btnGuardar = document.querySelector("#btnGuardar");
const btnCancelar = document.querySelector("#btnCancelar");

const div3 = document.querySelector("#divCapa3");
let pantallaHorca = document.querySelector("#canvasHorca"); 
let pincel = pantallaHorca.getContext("2d");
let pantallaLineas = document.querySelector("#canvasLineas");
let pincel2 = pantallaLineas.getContext("2d");
let pantallaLetraIncorrecta = document.querySelector("#canvasLetrasIncorrectas"); 
let pincel3 = pantallaLetraIncorrecta.getContext("2d");
const btnNuevo = document.querySelector("#btnNuevo");
const btnDesistir = document.querySelector("#btnDesistir");
let inputValidaLetra = document.querySelector("#inpValidaLetra");

let palabrasSecretasIniciales = ["MESSI","PELE","MARADONA","TOTTI","KAKA","ZIDANE","CRONALDO","ANDERSON","GUARNIZO","AHORCADO"];
let palabrasSecretas = palabrasSecretasIniciales;
let palabraSorteada = "";
let letraSorteadas = [];

let textoInput = ""; 

const letrasValidas = new RegExp("^[a-z]+$", "i"); 

let coorXletraInc = 0; 

let finalRecorridoInput = 0;

let intentos = 0;  
let letrasCompletas = 0; 

let letrasIncorrectas = ""; 

function dibujarHorca(){ 
    if(intentos == 1){
        pincel.fillStyle = "#8B4A0A";
        pincel.fillRect(0,345,300,5); 
        pincel.fillRect(75,5,5,350); 
    }if(intentos == 2){
        pincel.fillStyle = "#8B4A0A";
        pincel.fillRect(75,5,150,5); 
        pincel.fillRect(220,5,5,70); 
    }if(intentos == 3){
        pincel.fillStyle = "#0A3871";
        pincel.beginPath();
        pincel.arc(220,100, 25, 0, 2*3.14 ); 
        pincel.fill();
        pincel.fillStyle = "#F3F5FC";
        pincel.beginPath();
        pincel.arc(220,100, 20, 0, 2*3.14 ); 
        pincel.fill();
    }if(intentos == 4){
        pincel.fillStyle = "#0A3871";
        pincel.fillRect(220,125,5,150);
    }if(intentos == 5){
        pincel.beginPath();
        pincel.moveTo(225,150);
        pincel.lineTo(180,205);
        pincel.lineTo(185,205);
        pincel.fill();
        pincel.beginPath();
        pincel.moveTo(180,205);
        pincel.lineTo(220,150);
        pincel.lineTo(225,150);
        pincel.fill();        
    }if(intentos == 6){
        pincel.beginPath();
        pincel.moveTo(225,150);
        pincel.lineTo(270,205);
        pincel.lineTo(275,205);
        pincel.fill();
        pincel.beginPath();
        pincel.moveTo(270,205);
        pincel.lineTo(220,150);
        pincel.lineTo(225,150);
        pincel.fill();
    }if(intentos == 7){
        pincel.beginPath();
        pincel.moveTo(225,275);
        pincel.lineTo(180,330);
        pincel.lineTo(185,330);
        pincel.fill();
        pincel.beginPath();
        pincel.moveTo(180,330);
        pincel.lineTo(220,275);
        pincel.lineTo(225,275);
        pincel.fill();
    }if(intentos == 8){
        pincel.beginPath();
        pincel.moveTo(225,275);
        pincel.lineTo(270,330);
        pincel.lineTo(275,330);
        pincel.fill();
        pincel.beginPath();
        pincel.moveTo(270,330);
        pincel.lineTo(220,275);
        pincel.lineTo(225,275);
        pincel.fill();
    }
}

function dibujarLetras(){ 
    let ultimoCaracter = textoInput.charAt((textoInput.length)-1);
    let coordenadaLineaX = 0;
    let letraCorrecta = false;
    let i = 0;
    for (let i=0; i<letraSorteadas.length; i++){ 
        if(ultimoCaracter == (letraSorteadas[i])){
            pincel2.beginPath();
            pincel2.fillStyle="#0A3871";
            pincel2.textAling="center";
            pincel2.font="30px arial";
            pincel2.fillText(letraSorteadas[i],coordenadaLineaX,24);
            letraCorrecta=true;
            letrasCompletas = letrasCompletas + 1; 
        }
        coordenadaLineaX = coordenadaLineaX + 38; 
    }

    if(letraCorrecta==false && finalRecorridoInput==true){ 
        letrasIncorrectas = letrasIncorrectas + ultimoCaracter;
        let ancho = (letrasIncorrectas.length*19);
        pantallaLetraIncorrecta.width = ancho;
        pincel3.beginPath();
        pincel3.fillStyle="#0A3871";
        pincel3.textAling="center";
        pincel3.font="24px arial";
        pincel3.fillText(letrasIncorrectas,0,26);
        intentos = intentos + 1; 
        dibujarHorca();
    }


    
}

function dibujarLineas (){
    pincel2.clearRect(0,0,pantallaLineas.width, pantallaLineas.height);
    let ancho = 0;
    let coordenadaLineaX = 0;
    for(let inc=0; inc<letraSorteadas.length; inc++){ 
        ancho = ancho + 37;
    }
    pantallaLineas.width=ancho;

    for(let i=0; i<letraSorteadas.length; i++){
        pincel2.fillStyle = "#0A3871";
        pincel2.fillRect(coordenadaLineaX,28,30,2);
        coordenadaLineaX = coordenadaLineaX + 37; 
    }
}

function inicarJuego(){ 
    div1.style.display="none";
    div2.style.display="none";
    div3.style.display="block";
    inputValidaLetra.disabled=false;
    inputValidaLetra.focus();
    btnNuevo.disabled=false;
    btnNuevo.style.background="#0A3871";
    limpiarPantalla();
    textoInput="";
    intentos=0;
    letrasCompletas=0;
    letrasIncorrectas="";
    palabraSorteada = palabrasSecretas[Math.floor(Math.random()*palabrasSecretas.length)];
    letraSorteadas = [];
    for (let i = 0; i < palabraSorteada.length; i++){ 
        letraSorteadas.push(palabraSorteada.charAt(i));
    }
    dibujarLineas();
}

function validarLetras(){ 
    inputValidaLetra.value = inputValidaLetra.value.toUpperCase();
    textoInput = textoInput + inputValidaLetra.value; 
    let ultimoCaracter = textoInput.charAt((textoInput.length)-1);
    let letraRepetida = false;
    inputValidaLetra.value="";
    if(!letrasValidas.test(ultimoCaracter)){ 
        textoInput = textoInput.substring(0,(textoInput.length)-1);
    }else{

        finalRecorridoInput = false;
    
        if(textoInput.length == 1){ 
            finalRecorridoInput = true; 
            dibujarLetras();
        } else{
            for (let inc = 0; inc<((textoInput.length)-1); inc++){ 
                if(inc ==((textoInput.length)-2)){
                    finalRecorridoInput = true;
                } else if (ultimoCaracter == textoInput.charAt(inc)){
                    textoInput = textoInput.substring(0,(textoInput.length)-1);
                    letraRepetida = true;
                    break;
                }
            }
            if(letraRepetida==false){ 
                dibujarLetras();
            }
        }
   
    }
    verificarGanador();
}

function limpiarPantalla(){
    pincel.clearRect(0,0,pantallaHorca.width, pantallaHorca.height);
    pincel2.clearRect(0,0,pantallaLineas.width, pantallaLineas.height);
    pincel3.clearRect(0,0,pantallaLetraIncorrecta.width, pantallaLetraIncorrecta.height);
}

function verificarGanador (){
    if (letrasCompletas == letraSorteadas.length){
        Swal.fire({
            title: "¡FELICIDADES!",
            text: "usted ganó",
            icon: "success"
        });
        inputValidaLetra.disabled=true;
        btnNuevo.disabled=false;
        btnNuevo.style.background="#0A3871";
    }else if(intentos == 8){
        Swal.fire({
            title: "FIN DEL JUEGO",
            text: "usted perdió, la palabra correcta era " + palabraSorteada,
            icon: "error"
        });
        inputValidaLetra.disabled=true;
        btnNuevo.disabled=false;
        btnNuevo.style.background="#0A3871";
    }
}

function irPantallaInicial (){
    div2.style.display="none";
    div3.style.display="none";
    div1.style.display="block";
    palabrasSecretas = palabrasSecretasIniciales;
}

function irPantalla2(){
    div2.style.display="block";
    div3.style.display="none";
    div1.style.display="none";
    inpAgregaPalabra.focus();
    inpAgregaPalabra.value="";
    inpAgregaPalabra.placeholder="Ingrese una palabra";
}
function verificarNuevaPalabra(){
    if((!letrasValidas.test(inpAgregaPalabra.value)) || inpAgregaPalabra.value.length>8){
        inpAgregaPalabra.value = inpAgregaPalabra.value.substring(0,((inpAgregaPalabra.value).length-1));
        lbInformarivo.style.color = "red";
    }else{
        inpAgregaPalabra.value = inpAgregaPalabra.value.toUpperCase();
        lbInformarivo.style.color="#495057";
    }
}
function guardarNuevaPalabra(){
    palabrasSecretas = [inpAgregaPalabra.value];
    inicarJuego();
    btnNuevo.style.background="#D1CECD";
    btnNuevo.disabled = true;
}


btnIniciar.onclick = inicarJuego;
inpAgregaPalabra.oninput = verificarNuevaPalabra;
btnNuevo.onclick = inicarJuego;
btnDesistir.onclick = irPantallaInicial;
btnNuevaPalabra.onclick = irPantalla2;
btnGuardar.onclick= guardarNuevaPalabra;
inputValidaLetra.oninput = validarLetras;
btnCancelar.onclick = irPantallaInicial;
btnDesistir.onclick = irPantallaInicial;
