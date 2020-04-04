import data from "./data.js";

function totalCaseCharts(ctx) {
  const { confirmed, deaths, recovered } = data;
  const chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: confirmed.map(item =>
        Intl.DateTimeFormat("es-PE", { month: "long", day: "numeric" }).format(
          new Date(item.date)
        ),
      ),
      datasets: [
        {
          label: "Muertes",
          borderColor: "red",
          data: deaths.map(item => item.cases),
        },
        {
          label: "Recuperados",
          borderColor: "green",
          data: recovered.map(item => item.cases)
        },
        {
          label: "Confirmados",
          borderColor: "orange",
          data: confirmed.map(item => item.cases)
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
        mode: "x"
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
  });
}

function renderCharts() {
  const ctx = document.querySelector("#myChart").getContext("2d");
  totalCaseCharts(ctx);
}

renderCharts();
