"use strict"

const form = document.querySelector(".get-weather")
const resultado = document.querySelector(".resultado");
const país = document.querySelector(".países");
let provincia = document.querySelector(".provincia");
const enviar = document.querySelector(".btn-enviar");

function err(msg) {
    console.log(msg);
    const alerta = document.createElement("p");
    alerta.classList.add("alerta");
    alerta.innerHTML = msg;

    form.appendChild(alerta);
    setTimeout(() => {
        alerta.remove();
    },2000);
}

form.addEventListener("submit", e=>{
    e.preventDefault();
    if (país.value === "" || provincia.value === "") {
        err("*Debe llenar ambos campos");
        return;
    }

    callAPI(país.value,provincia.value);    // console.log(país.value);
    // console.log(cantón.value);
})

const mostrarClima = (data)=>{
    const {name,main:{temp, temp_min,temp_max}, weather:[arr]} = data;
    const grados = pasarACentígrados(temp);
    const gradosMax = pasarACentígrados(temp_max);
    const gradosMin = pasarACentígrados(temp_min);
    const content = document.createElement("div");

    content.innerHTML = `
        <img class="icono-nube" src="https://openweathermap.org/img/wn/${arr.icon}@2x.png">
        <h3>Clima en ${name}</h3>
        <h1 class="t-actual temperaturas">${grados}°C</h1>
        <h5 class="t1 temperaturas">Max: ${gradosMax}°C</h5>
        <h5 class="t2 temperaturas">Min: ${gradosMin}°C</h5>`;

resultado.appendChild(content);
}


const callAPI = (país,provincia)=>{
    const apiId = "f59f509d941e266f0d35c029d51dd822";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${provincia},${país}&appid=${apiId}`;

    fetch(url)
        .then(data=>{
            return data.json();
        })
        .then(dataJSON=>{
            if(dataJSON.cod == "404") {
                err("No se encontró la ciudad");
            }
            else {
                borrarHTML("se limpio el msg");
                mostrarClima(dataJSON);
            }
        }).catch(error=>{
            console.log(error);
        })
}


const pasarACentígrados = (temp)=>{
    return parseInt(temp -273.15);
}

const borrarHTML = ()=>{
    resultado.innerHTML = "";
}