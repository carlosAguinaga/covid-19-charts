import {countries} from './countries.js'
import {getTotalCasesByDate} from "./utils.js"

var cargando = true

let select = document.getElementById('slc')
let slugCoutry = 'peru'
let chart
let ctx = document.querySelector("#myChart").getContext("2d");
var i = 0;

// ordenar los objetos alfabeticamente por su propidead Country
countries.sort((a,b)=>{
  if (a.country < b.country) {
    return -1
  }
  if (a.country > b.country) {
    return 1
  }
  return 0
})


// add to select input
for (const country_item of countries) {
  let option = document.createElement('option')
  option.value = `v_${country_item.country}`
  option.innerHTML = country_item.country
  select.appendChild(option)
}
select[173].selected = true // Perú  mejorar esta linea


select.addEventListener('change', () => {
  const optionSelected = select.options[select.selectedIndex].text;
  const country = countries.find((country) => optionSelected == country.country)
  if(chart != undefined ){
    chart.destroy()
  }
  renderChartsCountry(country.slug);
})

renderChartsCountry(slugCoutry);


async function renderChartsCountry(slugCoutry) {
  cargando = true
  spinner()
  const data = await getTotalCasesByDate(slugCoutry)
  cargando = false
  ctx = null
  ctx = document.querySelector("#myChart").getContext("2d");
  // //quitar loader
    // context.clearRect(0, 0, canvas.width, canvas.height);
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
      maintainAspectRatio: false,
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




function spinner() {


  console.log(i)
  console.log(cargando)
  i += 0.07;

  ctx.translate(50, 50);
  ctx.rotate(0.0);
  ctx.translate(-50, -50);
  ctx.clearRect(0, 0, 100, 100);

  ctx.beginPath();
  ctx.arc(50, 50, 30, i - Math.cos(i + 90), i + Math.sin(i + 180) + 2.3);
  ctx.lineWidth = 8;
  var gradient = ctx.createLinearGradient(0, 0, 170, 0);
  gradient.addColorStop("0", "#1cd44d");
  gradient.addColorStop("0.5", "#ff4e3b");
  ctx.strokeStyle = gradient;
  ctx.lineCap = "round";
  ctx.stroke();

  if (cargando) {
    window.requestAnimationFrame(spinner);
  }else{
    window.requestAnimationFrame()
    ctx.clearRect(200, 0, canvas.width, canvas.height)
  }

}
