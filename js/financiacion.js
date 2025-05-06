function calcularFinanciacion() {
  const interesAnual = parseFloat(document.getElementById("interes").value);
  const plazo = parseInt(document.getElementById("plazo").value);
  const porcentaje = parseFloat(
    document.getElementById("porcentajeFinanciado").value
  );

  if (!interesAnual || !plazo || !porcentaje) {
    alert("⚠️ Por favor, completa todos los campos de financiación.");
    document.getElementById("cuotaMensual").value = "";
    return;
  }

  const precio =
    parseFloat(document.getElementById("precioInmueble").value) || 0;
  const descuento = parseFloat(document.getElementById("descuento").value) || 0;
  const gastos = parseFloat(document.getElementById("gastos").value) || 0;
  const reforma =
    parseFloat(document.getElementById("costeReforma").value) || 0;
  const extras = parseFloat(document.getElementById("extras").value) || 0;

  const importeDescuento = precio * (descuento / 100);
  const inversionTotal = precio - importeDescuento + gastos + reforma + extras;
  const capitalFinanciado = inversionTotal * (porcentaje / 100);

  const interesMensual = interesAnual / 100 / 12;
  const numeroPagos = plazo * 12;

  const cuota =
    (capitalFinanciado * interesMensual) /
    (1 - Math.pow(1 + interesMensual, -numeroPagos));

  document.getElementById("cuotaMensual").value = cuota.toLocaleString(
    "es-ES",
    {
      style: "currency",
      currency: "EUR",
    }
  );
}
