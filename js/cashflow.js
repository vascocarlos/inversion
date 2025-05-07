let grafico = null;

function generarCashflow() {
  const alquilerBase =
    parseFloat(document.getElementById("alquilerMensual").value) || 0;

  const gastoBase =
    (parseFloat(document.getElementById("ibiCRA").value) || 0) +
    (parseFloat(document.getElementById("comunidadCRA").value) || 0) * 12 +
    (parseFloat(document.getElementById("segurosCRA").value) || 0) +
    (parseFloat(document.getElementById("alarmaCRA").value) || 0) * 12;

  const incrementoAlquiler =
    (parseFloat(document.getElementById("incrementoAlquiler").value) || 0) /
    100;
  const incrementoGastos =
    (parseFloat(document.getElementById("incrementoGastos").value) || 0) / 100;

  const años = [];
  const acumulados = [];
  let tabla =
    "<div style='overflow-x:auto;'><table border='1' style='width:100%; margin-top:20px; text-align:center;'>";
  tabla +=
    "<tr><th>Año</th><th>Alquiler anual (€)</th><th>Cashflow (€)</th><th>Acumulado (€)</th></tr>";

  let alquiler = alquilerBase * 12;
  let gastos = gastoBase;
  let acumulado = 0;

  for (let año = 1; año <= 25; año++) {
    let neto = alquiler - gastos;
    acumulado += neto;

    años.push(año);
    acumulados.push(acumulado.toFixed(2));

    tabla += `<tr>
      <td>${año}</td>
      <td>${alquiler.toFixed(2)}</td>
      <td>${neto.toFixed(2)}</td>
      <td>${acumulado.toFixed(2)}</td>
    </tr>`;

    alquiler *= 1 + incrementoAlquiler;
    gastos *= 1 + incrementoGastos;
  }

  tabla += "</table></div>";
  document.getElementById("tablaCashflow").innerHTML = tabla;

  // Crear gráfico
  if (grafico) {
    grafico.destroy();
  }

  const ctx = document.getElementById("graficoCashflow").getContext("2d");
  grafico = new Chart(ctx, {
    type: "line",
    data: {
      labels: años,
      datasets: [
        {
          label: "Cashflow acumulado (€)",
          data: acumulados,
          borderWidth: 2,
          fill: false,
          tension: 0.3,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}
