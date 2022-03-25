const d = document;
const xhr = new XMLHttpRequest();
const $main = d.querySelector("main");
const $xhr = d.getElementById("xhr");
const $fragment = d.createDocumentFragment();
const $reportsToChange = d.querySelectorAll(".report-change");
let timeframe;

// console.log($reportsToChange[0].textContent.toUpperCase().trim());

const oldMethod = (time) => {
  xhr.addEventListener("readystatechange", (e) => {
    if (xhr.readyState !== 4) return;

    if (xhr.status >= 200 && xhr.status < 300) {
      let json = JSON.parse(xhr.responseText);

      json.forEach((el) => {
        //Creating elements and seetings properties
        const $section = d.createElement("section");

        $section.classList.add("report", el.title.replace(/ /g, ""));
        const $header = d.createElement("header");
        $header.classList.add("report-to");
        const $h2 = d.createElement("h2");
        $h2.textContent = el.title;
        const $img = d.createElement("img");
        $img.classList.add("icon-ellipsis");
        $img.setAttribute("src", "./assets/images/icon-ellipsis.svg");
        $img.setAttribute("alt", "icon-ellipsis");
        const $div = d.createElement("div");
        $div.classList.add("time");
        const $p1 = d.createElement("p");
        $p1.classList.add("time-mode");

        const $p2 = d.createElement("p");
        $p2.classList.add("last-time");

        if (time === "weekly") {
          $p1.textContent = `${el.timeframes.weekly.current}hrs`;
          $p2.textContent = `Last Week - ${el.timeframes.weekly.previous}hrs`;
          console.log("hola", time);
        }
        if (time === "daily") {
          $p1.textContent = `${el.timeframes.daily.current}hrs`;
          $p2.textContent = `Last Day - ${el.timeframes.daily.previous}hrs`;
          console.log("hola", time);
        }
        if (time === "monthly") {
          $p1.textContent = `${el.timeframes.monthly.current}hrs`;
          $p2.textContent = `Last Month - ${el.timeframes.monthly.previous}hrs`;
          console.log("hola", time);
        }

        //Adding elements
        $header.appendChild($h2);
        $header.appendChild($img);
        $div.appendChild($p1);
        $div.appendChild($p2);
        $section.appendChild($header);
        $section.appendChild($div);

        $fragment.appendChild($section);
      });
      $main.appendChild($fragment);
      console.log("Agregando al fragmento");
    } else {
      //console.log("error");
      let message = xhr.statusText || "Ocurrió un error";
      $xhr.innerHTML = `Error ${xhr.status}: ${message}`;
    }
  });

  xhr.open("GET", "./assets/data.json");

  xhr.send();

  console.log("estoy aqui de nuevo");
};

$reportsToChange.forEach((el) => {
  el.addEventListener("click", () => {
    $reportsToChange.forEach((subEl) => {
      subEl.classList.remove("isActive");
    });

    el.classList.add("isActive");
    timeframe = el.textContent.toLowerCase().trim();
    console.log(timeframe);
    oldMethod(timeframe);
  });
});

// $reportsToChange.forEach((el) => {
//   if (el.classList.contains("isActive")) {
//     timeframe = el.textContent.toLowerCase().trim();
//     console.log(timeframe);
//   }
// });
