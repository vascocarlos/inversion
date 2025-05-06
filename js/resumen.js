function mostrarResumen() {
  const inversionTotal = document.getElementById("inversionTotal").value;
  const alquiler = document.getElementById("alquilerMensual").value;
  const venta = document.getElementById("precioVenta").value;

  if (!inversionTotal || !alquiler || !venta) {
    alert(
      "⚠️ Por favor, completa al menos CRA y CRV antes de generar el resumen."
    );
    return;
  }

  const inversion =
    parseFloat(inversionTotal.replace(/[^\d,.-]/g, "").replace(",", ".")) || 0;
  const rentaNeta =
    parseFloat(document.getElementById("rentabilidadNeta").value) || 0;
  const roiCrv = parseFloat(document.getElementById("roiCrv").value) || 0;
  const gananciaCrv =
    parseFloat(
      document
        .getElementById("gananciaNeta")
        .value?.replace(/[^\d,.-]/g, "")
        .replace(",", ".")
    ) || 0;

  let cashflow10 = "N/D";
  const tabla = document.querySelectorAll("#tablaCashflow table tr");
  if (tabla.length > 11) {
    const fila10 = tabla[11].children;
    if (fila10 && fila10[4]) cashflow10 = fila10[4].innerText;
  }

  let html = `
    <table border="1" style="width:100%; text-align:center;">
      <tr><th>Métrica</th><th>CRA (Alquilar)</th><th>CRV (Vender)</th></tr>
      <tr><td>Inversión Total (€)</td><td>${inversion.toLocaleString("es-ES", {
        style: "currency",
        currency: "EUR",
      })}</td><td>${inversion.toLocaleString("es-ES", {
    style: "currency",
    currency: "EUR",
  })}</td></tr>
      <tr><td>Rentabilidad Neta (%)</td><td>${rentaNeta.toFixed(
        2
      )}%</td><td>${roiCrv.toFixed(2)}%</td></tr>
      <tr><td>Cashflow 10 años (€)</td><td>${cashflow10}</td><td>—</td></tr>
      <tr><td>Ganancia neta final (€)</td><td>—</td><td>${gananciaCrv.toLocaleString(
        "es-ES",
        { style: "currency", currency: "EUR" }
      )}</td></tr>
    </table>
  `;

  document.getElementById("tablaResumen").innerHTML = html;
}

function exportarResumenPDF() {
  const element = document.body; // O puedes usar un div con id específico si lo deseas
  const opciones = {
    margin: 0.5,
    filename: "simulador-inversion.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
  };

  html2pdf().set(opciones).from(element).save();
}

function compartirResultado() {
  const url = window.location.href;
  const mensaje = encodeURIComponent(
    "Aquí tienes el resultado de mi simulación inmobiliaria:"
  );
  const textoFinal = `${mensaje}%0A${url}`;

  if (navigator.share) {
    navigator
      .share({
        title: "Simulación Inmobiliaria",
        text: "Mira este análisis de inversión inmobiliaria",
        url: url,
      })
      .catch((error) => console.log("Error al compartir:", error));
  } else {
    window.open(`https://wa.me/?text=${textoFinal}`, "_blank");
  }
}
