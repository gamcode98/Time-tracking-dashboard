const d = document;
//Paso 1
const xhr = new XMLHttpRequest(); /* Se instancia el objeto */
const $reports = d.querySelectorAll(".report");
const $xhr = d.getElementById("xhr");
const $fragment = d.createDocumentFragment();
//Paso 2 - Se asigna el evento que se va a manipular, aqui va la lógica de prog
xhr.addEventListener("readystatechange", (e) => {
  if (xhr.readyState !== 4) return; //Validacion, si se ve el clg el objeto xhr se imprime 4 veces por los estados de la peticion,
  //READY_STATE_UNINITIALIZED, READY_STATE_LOADING, READY_STATE_LOADED, READY_STATE_INTERACTIVE, READY_STATE_COMPLETE
  //El primero no cuenta xd
  //console.log(xhr);
  //La callback solo se ejecuta cuando el readystate es !== 4, sino retorna nada

  if (xhr.status >= 200 && xhr.status < 300) {
    //Otra validacion xq solo importa los q estan bien, o sea los 200 -299
    //console.log("éxito");
    //console.log(xhr.responseText);
    //$xhr.innerHTML = xhr.responseText;
    let json = JSON.parse(xhr.responseText);
    //console.log(json);

    json.forEach((el) => {
      const $li = document.createElement("li");
      $li.innerHTML = `${el.title} -- ${el.timeframes.daily.current}`;
      $fragment.appendChild($li);
    });

    $xhr.appendChild($fragment);

    console.log($reports);

    // $work.children[0].firstElementChild.textContent = json[0].title;
    // $work.children[1].firstElementChild.textContent = `${json[0].timeframes.weekly.current}hrs `;
    // $work.children[1].lastElementChild.textContent = `Last Week - ${json[0].timeframes.weekly.previous}hrs `;
  } else {
    //console.log("error");
    let message = xhr.statusText || "Ocurrió un error";
    $xhr.innerHTML = `Error ${xhr.status}: ${message}`;
  }

  //console.log("Este mensaje cargará de cualquier forma");
});
//Paso 3 - Se abre la peticion

xhr.open("GET", "./assets/data.json");

//Paso 4 - Enviar la peticion
xhr.send();
