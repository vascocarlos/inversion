function calcularCRA() {
  const alquilerMensual = parseFloat(
    document.getElementById("alquilerMensual").value
  );

  if (!alquilerMensual || alquilerMensual <= 0) {
    alert(
      "⚠️ Introduce un alquiler mensual válido antes de calcular la rentabilidad CRA."
    );
    return;
  }

  const ingresosAnuales = alquilerMensual * 12;

  // ✅ Gastos anuales bien sumados
  const ibi = parseFloat(document.getElementById("ibi")?.value) || 0;
  const comunidad =
    parseFloat(document.getElementById("comunidadGasto")?.value) || 0;
  const seguros = parseFloat(document.getElementById("seguros")?.value) || 0;
  const alarma = parseFloat(document.getElementById("alarma")?.value) || 0;
  const gastosAnuales = ibi + comunidad + seguros + alarma;

  // Datos de inversión
  const precio =
    parseFloat(document.getElementById("precioInmueble").value) || 0;
  const descuento = parseFloat(document.getElementById("descuento").value) || 0;
  const itp = parseFloat(document.getElementById("itp").value) || 0;

  // Gastos de compra
  const notaria = parseFloat(document.getElementById("notaria")?.value) || 0;
  const registro = parseFloat(document.getElementById("registro")?.value) || 0;
  const gestoria = parseFloat(document.getElementById("gestoria")?.value) || 0;
  const comision =
    parseFloat(document.getElementById("comisionCompra")?.value) || 0;
  const otros =
    parseFloat(document.getElementById("otrosGastosCompra")?.value) || 0;

  const itpEuros = precio * (1 - descuento / 100) * (itp / 100);
  const totalGastosCompra =
    itpEuros + notaria + registro + gestoria + comision + otros;

  // Reforma
  const reforma =
    parseFloat(document.getElementById("costeReforma")?.value) || 0;
  const extras = parseFloat(document.getElementById("extras")?.value) || 0;

  // Cálculo inversión total
  const importeDescuento = precio * (descuento / 100);
  const inversionTotal =
    precio - importeDescuento + totalGastosCompra + reforma + extras;

  const rentabilidadBruta = (ingresosAnuales / precio) * 100;
  const rentabilidadNeta =
    ((ingresosAnuales - gastosAnuales) / inversionTotal) * 100;
  const roi = ((ingresosAnuales - gastosAnuales) / inversionTotal) * 100;

  // Mostrar resultados
  document.getElementById("inversionTotal").value =
    inversionTotal.toLocaleString("es-ES", {
      style: "currency",
      currency: "EUR",
    });

  document.getElementById("ingresosAnuales").value =
    ingresosAnuales.toLocaleString("es-ES", {
      style: "currency",
      currency: "EUR",
    });

  document.getElementById("gastosAnuales").value = gastosAnuales.toLocaleString(
    "es-ES",
    {
      style: "currency",
      currency: "EUR",
    }
  );

  document.getElementById("rentabilidadBruta").value =
    rentabilidadBruta.toFixed(2) + " %";
  document.getElementById("rentabilidadNeta").value =
    rentabilidadNeta.toFixed(2) + " %";
  document.getElementById("roi").value = roi.toFixed(2) + " %";
}
