function calcularCRV() {
  const precioVenta = parseFloat(document.getElementById("precioVenta").value);

  if (!precioVenta || precioVenta <= 0) {
    alert("⚠️ Introduce un precio estimado de venta válido.");
    return;
  }

  const porcentajeCostesVenta =
    parseFloat(document.getElementById("costesVenta").value) || 0;
  const porcentajeImpuestos =
    parseFloat(document.getElementById("impuestosGanancia").value) || 0;

  const totalConGastosYReforma =
    parseFloat(
      document
        .getElementById("precioTotalConReforma")
        ?.value.replace(/\./g, "")
        .replace(",", ".")
    ) || 0;

  const gananciaBruta = precioVenta - totalConGastosYReforma;
  const costesVenta = precioVenta * (porcentajeCostesVenta / 100);
  const baseImponible = gananciaBruta - costesVenta;
  const impuestos =
    baseImponible > 0 ? baseImponible * (porcentajeImpuestos / 100) : 0;
  const gananciaNeta = baseImponible - impuestos;
  const roi = (gananciaNeta / totalConGastosYReforma) * 100;

  document.getElementById("gananciaBruta").value = gananciaBruta.toLocaleString(
    "es-ES",
    {
      style: "currency",
      currency: "EUR",
    }
  );

  document.getElementById("gananciaNeta").value = gananciaNeta.toLocaleString(
    "es-ES",
    {
      style: "currency",
      currency: "EUR",
    }
  );

  document.getElementById("roiCrv").value = roi.toFixed(2) + " %";
}

function rellenarResumenInmueble() {
  const direccion = document.getElementById("direccion").value || "—";

  const totalSinReforma =
    parseFloat(
      document
        .getElementById("precioTotal")
        ?.value.replace(/\./g, "")
        .replace(",", ".")
    ) || 0;

  const totalConReforma =
    parseFloat(
      document
        .getElementById("precioTotalConReforma")
        ?.value.replace(/\./g, "")
        .replace(",", ".")
    ) || 0;

  const reforma =
    parseFloat(document.getElementById("costeReforma")?.value) || 0;

  document.getElementById("resumenDireccion").innerText = direccion;

  document.getElementById("resumenTotal").innerText =
    totalSinReforma.toLocaleString("es-ES", {
      style: "currency",
      currency: "EUR",
    });

  document.getElementById("resumenReforma").innerText = reforma.toLocaleString(
    "es-ES",
    {
      style: "currency",
      currency: "EUR",
    }
  );

  document.getElementById("resumenTotalReforma").innerText =
    totalConReforma.toLocaleString("es-ES", {
      style: "currency",
      currency: "EUR",
    });

  // Escenarios de venta
  const escenarios = [
    {
      incremento: 30000,
      input: "ventaBajo",
      rent: "rentabilidadBajo",
      etiqueta: "moderado",
    },
    {
      incremento: 50000,
      input: "ventaMedio",
      rent: "rentabilidadMedio",
      etiqueta: "bueno",
    },
    {
      incremento: 80000,
      input: "ventaAlto",
      rent: "rentabilidadAlto",
      etiqueta: "muy bueno",
    },
    {
      incremento: 100000,
      input: "ventaTop",
      rent: "rentabilidadTop",
      etiqueta: "TOP",
    },
  ];

  escenarios.forEach((e) => {
    const precioVenta = totalConReforma + e.incremento;
    const rentabilidad = (e.incremento / totalConReforma) * 100;

    document.getElementById(e.input).value = precioVenta.toLocaleString(
      "es-ES",
      { style: "currency", currency: "EUR" }
    );

    const rentElem = document.getElementById(e.rent);
    rentElem.innerText = `+${rentabilidad.toFixed(2)} %`;
    rentElem.style.color = "green";
    rentElem.title = `Escenario ${e.etiqueta}`;
  });
}

function exportarCRVPDF() {
  document.getElementById("pdf_direccion").textContent =
    document.getElementById("resumenDireccion").textContent;
  document.getElementById("pdf_totalGastos").textContent =
    document.getElementById("resumenTotal").textContent;
  document.getElementById("pdf_reforma").textContent =
    document.getElementById("resumenReforma").textContent;
  document.getElementById("pdf_totalReforma").textContent =
    document.getElementById("resumenTotalReforma").textContent;
  document.getElementById("pdf_venta").textContent =
    document.getElementById("precioVenta").value;
  document.getElementById("pdf_bruta").textContent =
    document.getElementById("gananciaBruta").value;
  document.getElementById("pdf_neta").textContent =
    document.getElementById("gananciaNeta").value;
  document.getElementById("pdf_roi").textContent =
    document.getElementById("roiCrv").value;

  const contenido = document.getElementById("resumenCRVPDF");

  html2pdf()
    .set({
      margin: 0.5,
      filename: "resumen-crv.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    })
    .from(contenido)
    .save();
}
