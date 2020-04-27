import { countries } from "./countries.js";
import { getTotalCasesByDate } from "./utils.js";

var cargando = true;
let select = document.getElementById("slc");
let ctx = document.querySelector("#myChart").getContext("2d");
let PorcentajeMuertes = document.querySelector("#muertes");
let chart;
let slugCoutry = "peru";
var progressSpinner = 0;

// ordenar los objetos alfabeticamente por su propidead Country
countries.sort((a, b) => {
  if (a.country < b.country) {
    return -1;
  }
  if (a.country > b.country) {
    return 1;
  }
  return 0;
});

// add to select
for (const country_item of countries) {
  let option = document.createElement("option");
  option.value = `v_${country_item.country}`;
  option.innerHTML = country_item.country;
  select.appendChild(option);
}
select[173].selected = true; // Perú

select.addEventListener("change", () => {
  const optionSelected = select.options[select.selectedIndex].text;
  const country = countries.find((country) => optionSelected == country.country);
  if (chart != undefined) {
    chart.destroy();
  }
  renderChartsCountry(country.slug);
});

renderChartsCountry(slugCoutry);

async function renderChartsCountry(slugCoutry) {
  cargando = true;
  PorcentajeMuertes.innerHTML = "";
  spinner();
  const data = await getTotalCasesByDate(slugCoutry);
  cargando = false;
  ctx = null;
  ctx = document.querySelector("#myChart").getContext("2d");
  totalCaseCharts(data, ctx);
  //agraga la tasa de fallecidos
  tasaDeMuertes(data);
}

function totalCaseCharts(data, ctx) {
  const { confirmed, deaths, recovered } = data;

  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: confirmed.map((item) =>
        Intl.DateTimeFormat("es-PE", { month: "long", day: "numeric" }).format(
          new Date(item.Date).setHours(24)
        )
      ),
      datasets: [
        {
          label: "Muertes",
          borderColor: "red",
          data: deaths.map((item) => item.Cases),
        },
        {
          label: "Recuperados",
          borderColor: "green",
          data: recovered.map((item) => item.Cases),
        },
        {
          label: "Confirmados",
          borderColor: "orange",
          data: confirmed.map((item) => item.Cases),
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      scales: {
        xAxes: [
          {
            gridLines: false,
            ticks: {
              padding: 15,
            },
          },
        ],
      },
      title: {
        display: true,
        text: "Todos los casos del covid-19",
        fontSize: 30,
        padding: 30,
        fontColor: "#12619c",
        // position: "bottom",
      },
      legend: {
        position: "bottom",
        labels: {
          padding: 20,
          boxWidth: 15,
          fontSize: 15,
          fontFamily: "Helvetica Neue",
          fontColor: "black",
        },
      },
      layout: {
        padding: {
          right: 15,
          left: 4,
          bottom: 5,
        },
      },
      tooltips: {
        backgroundColor: "#0584f6",
        titleFontSize: 20,
        xPadding: 20,
        yPadding: 20,
        bodyFontSize: 15,
        bodySpacing: 10,
        mode: "x",
      },
      elements: {
        line: {
          borderWidth: 2,
          fill: false,
        },
        point: {
          radius: 3,
          borderWidth: 2,
          backgroundColor: "white",
          hoverRadius: 4,
          hoverBorderWidth: 2,
        },
      },
    },
  });
}

function spinner() {
  progressSpinner += 0.07;

  ctx.translate(50, 50);
  ctx.rotate(0.0);
  ctx.translate(-50, -50);
  ctx.clearRect(0, 0, 100, 100);

  ctx.beginPath();
  ctx.arc(
    50,
    50,
    30,
    progressSpinner - Math.cos(progressSpinner + 90),
    progressSpinner + Math.sin(progressSpinner + 180) + 2.3
  );
  ctx.lineWidth = 8;
  var gradient = ctx.createLinearGradient(0, 0, 170, 0);
  gradient.addColorStop("0", "#1cd44d");
  gradient.addColorStop("0.5", "#ff4e3b");
  ctx.strokeStyle = gradient;
  ctx.lineCap = "round";
  ctx.stroke();

  if (cargando) {
    window.requestAnimationFrame(spinner);
  }
}

function tasaDeMuertes(data) {
  const { confirmed, deaths } = data;
  let confirmados = confirmed[confirmed.length - 1].Cases;
  let fallecidos = deaths[deaths.length - 1].Cases;
  PorcentajeMuertes.innerHTML = `Letalidad: % ${(
    (fallecidos / confirmados) *
    100
  ).toFixed(2)}`;
}
