const d = document;
const $main = d.querySelector("main");
const $fragment = d.createDocumentFragment();
const $reportsToChange = d.querySelectorAll(".report-change");
let timeframe, json;

async function getData() {
  try {
    let res = await fetch("./assets/data.json");
    json = await res.json();

    if (!res.ok) throw { status: res.status, statusText: res.statusText };

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

      $p1.textContent = `${el.timeframes.weekly.current}hrs`;
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

    const changingState = (time) => {
      let i = 0;
      if (time === "weekly") {
        json.forEach((el) => {
          d.querySelectorAll(".time-mode")[
            i
          ].textContent = `${el.timeframes.weekly.current}hrs`;
          d.querySelectorAll(".last-time")[
            i
          ].textContent = `Last Week - ${el.timeframes.weekly.previous}hrs`;
          i++;
        });
      }
      if (time === "daily") {
        json.forEach((el) => {
          d.querySelectorAll(".time-mode")[
            i
          ].textContent = `${el.timeframes.daily.current}hrs`;
          d.querySelectorAll(".last-time")[
            i
          ].textContent = `Last Day - ${el.timeframes.daily.previous}hrs`;
          i++;
        });
      }
      if (time === "monthly") {
        json.forEach((el) => {
          d.querySelectorAll(".time-mode")[
            i
          ].textContent = `${el.timeframes.monthly.current}hrs`;
          d.querySelectorAll(".last-time")[
            i
          ].textContent = `Last Month - ${el.timeframes.monthly.previous}hrs`;
          i++;
        });
      }
    };

    $reportsToChange.forEach((el) => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        $reportsToChange.forEach((subEl) => {
          subEl.classList.remove("isActive");
        });

        el.classList.add("isActive");
        timeframe = el.textContent.toLowerCase().trim();
        changingState(timeframe);
      });
    });
  } catch (err) {
    let message = err.statusText || "Ocurrió un error";
    $main.classList.add("error");
    $main.innerHTML = `Error ${err.status}: ${message}`;
  }
}
getData();
