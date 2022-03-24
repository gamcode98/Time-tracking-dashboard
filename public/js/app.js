const d = document;
const xhr = new XMLHttpRequest();
const $reports = d.querySelectorAll(".report");
const $main = d.querySelector("main");
const $xhr = d.getElementById("xhr");
const $fragment = d.createDocumentFragment();

xhr.addEventListener("readystatechange", (e) => {
  if (xhr.readyState !== 4) return;

  if (xhr.status >= 200 && xhr.status < 300) {
    let json = JSON.parse(xhr.responseText);
    console.log(json[5].title.replace(/ /g, ""));
    json.forEach((el) => {
      //Creating elements and seetings properties
      const $section = d.createElement("section");
      // console.log(el.title.toString());
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
      $p1.textContent = `${el.timeframes.weekly.current}hrs`;
      const $p2 = d.createElement("p");
      $p2.classList.add("last-week-time");
      $p2.textContent = `Last Week - ${el.timeframes.weekly.previous}hrs`;

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
  } else {
    //console.log("error");
    let message = xhr.statusText || "Ocurrió un error";
    $xhr.innerHTML = `Error ${xhr.status}: ${message}`;
  }
});

xhr.open("GET", "./assets/data.json");

xhr.send();
