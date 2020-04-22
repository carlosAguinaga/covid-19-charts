import {countries} from './countries.js'
import {getTotalCasesByDate} from "./utils.js";


let select = document.getElementById('slc')
let slugCoutry = 'peru'
let chart

// add to select input
for (const country of countries) {
  let option = document.createElement('option')
  option.value = `v_${country.Country}`
  option.innerHTML = country.Country
  select.appendChild(option)
}
select[173].selected = true // Perú  mejorar esta linea


select.addEventListener('change', () => {
  const optionSelected = select.options[select.selectedIndex].text;
  const country = countries.find((country) => optionSelected == country.Country)
  if(chart != undefined ){
    chart.destroy()
  }
  // mostrar loader
  renderChartsCountry(country.Slug);
})
// mostrar loader
renderChartsCountry(slugCoutry);


async function renderChartsCountry(slugCoutry) {
  const ctx = document.querySelector("#myChart").getContext("2d");
  const data = await getTotalCasesByDate(slugCoutry)
  //quitar loader
  totalCaseCharts(data, ctx);
}


function totalCaseCharts(data, ctx) {
  const { confirmed, deaths, recovered } = data;

  
  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: confirmed.map(item =>
        Intl.DateTimeFormat("es-PE", { month: "long", day: "numeric" }).format(
          new Date(item.Date)
        ),
      ),
      datasets: [
        {
          label: "Muertes",
          borderColor: "red",
          data: deaths.map(item => item.Cases),
        },
        {
          label: "Recuperados",
          borderColor: "green",
          data: recovered.map(item => item.Cases)
        },
        {
          label: "Confirmados",
          borderColor: "orange",
          data: confirmed.map(item => item.Cases)
        }
      ]
    },
    options: {
      scales: {
        xAxes: [
          {
            gridLines: false,
            ticks: {
                padding: 15
            }
          },   
        ]
      },
      title: {
        display: true,
        text: "Todos los casos dede el primer reporte covid-19",
        fontSize: 30,
        padding: 30,
        fontColor: "#12619c"
      },
      legend: {
        position: "bottom",
        labels: {
          padding: 20,
          boxWidth: 15,
          fontSize: 15,
          fontFamily: "system-iu",
          fontColor: "black"
        }
      },
      layout: {
        padding: {
          right: 50,
          bottom: 50,
        }
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
          borderWidth: 8,
          fill: false
        },
        point: {
          radius: 6,
          borderWidth: 4,
          backgroundColor: "white",
          hoverRadius: 8,
          hoverBorderWidth: 4
        }
      }
    }
  })
}





