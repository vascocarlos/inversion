function calcularFiscalidad() {
  const precioVenta =
    parseFloat(document.getElementById("precioVenta").value) || 0;
  const porcentajeCostesVenta =
    parseFloat(document.getElementById("costesVenta").value) || 0;

  const precio =
    parseFloat(document.getElementById("precioInmueble").value) || 0;
  const descuento = parseFloat(document.getElementById("descuento").value) || 0;
  const gastos = parseFloat(document.getElementById("gastos").value) || 0;
  const reforma =
    parseFloat(document.getElementById("costeReforma").value) || 0;
  const extras = parseFloat(document.getElementById("extras").value) || 0;

  const importeDescuento = precio * (descuento / 100);
  const inversionTotal = precio - importeDescuento + gastos + reforma + extras;
  const costesVenta = precioVenta * (porcentajeCostesVenta / 100);
  const ganancia = precioVenta - costesVenta - inversionTotal;

  // Calcular impuestos progresivos
  let impuestos = 0;
  let resto = ganancia;

  if (resto > 50000) {
    impuestos += (resto - 50000) * 0.23;
    resto = 50000;
  }
  if (resto > 6000) {
    impuestos += (resto - 6000) * 0.21;
    resto = 6000;
  }
  if (resto > 0) {
    impuestos += resto * 0.19;
  }

  const gananciaFinal = ganancia - impuestos;

  document.getElementById("gananciaBruta").value = ganancia.toFixed(2) + " €";
  document.getElementById("impuestosCalculados").value =
    impuestos.toFixed(2) + " €";
  document.getElementById("gananciaFinal").value =
    gananciaFinal.toFixed(2) + " €";
}
