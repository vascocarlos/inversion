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
    if (fila10 && fila10[3]) cashflow10 = fila10[3].innerText;
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
  const original = document.getElementById("resumenPDF");

  // Clonar el nodo resumenPDF
  const clone = original.cloneNode(true);
  clone.style.display = "block"; // Asegúrate de que está visible
  clone.style.position = "static";
  clone.style.top = "auto";
  clone.style.left = "auto";
  clone.style.zIndex = "auto";

  // Añadirlo temporalmente al body
  document.body.appendChild(clone);

  const opciones = {
    margin: 0,
    filename: "simulador-inversion.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
  };

  html2pdf()
    .set(opciones)
    .from(clone)
    .save()
    .then(() => {
      // Eliminar el clon después de generar el PDF
      document.body.removeChild(clone);
    });
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

function rellenarResumenPDF() {
  const get = (id) => document.getElementById(id)?.value || "";

  document.getElementById("r_direccion").innerText = get("direccion");
  document.getElementById("r_superficieTotal").innerText =
    get("superficieTotal");
  document.getElementById("r_planta").innerText = get("planta");
  document.getElementById("r_habitaciones").innerText = get("habitaciones");
  document.getElementById("r_ascensor").innerText = get("ascensor");
  document.getElementById("r_banos").innerText = get("banos");
  document.getElementById("r_aseos").innerText = get("aseos");
  document.getElementById("r_superficieUtil").innerText = get("superficieUtil");
  document.getElementById("r_terraza").innerText = get("terraza");
  document.getElementById("r_patio").innerText = get("patio");
  document.getElementById("r_parking").innerText = get("parking");
  document.getElementById("r_trastero").innerText = get("trastero");
  document.getElementById("r_otrosDatos").innerText = get("otrosDatos");

  document.getElementById("r_precioInmueble").innerText = get("precioInmueble");
  document.getElementById("r_descuento").innerText = get("descuento");
  document.getElementById("r_precioDescontado").innerText =
    get("precioDescontado");
  document.getElementById("r_itp").innerText = get("itp");
  document.getElementById("r_itpEuro").innerText = get("itpEuro");
  document.getElementById("r_notaria").innerText = get("notaria");
  document.getElementById("r_registro").innerText = get("registro");
  document.getElementById("r_gestoria").innerText = get("gestoria");
  document.getElementById("r_comisionCompra").innerText = "—";
  document.getElementById("r_otrosGastosCompra").innerText =
    get("otrosGastosCompra");

  document.getElementById("r_costeReforma").innerText = get("costeReforma");
  document.getElementById("r_extras").innerText = get("extras");
  document.getElementById("r_totalGastos").innerText = get(
    "precioTotalConReforma"
  );
  document.getElementById("r_totalCompleto").innerText = get("precioTotal");
}
