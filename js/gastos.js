function calcularGastos() {
  const itp = parseFloat(document.getElementById("itp").value) || 0;
  const notaria = parseFloat(document.getElementById("notaria").value) || 0;
  const registro = parseFloat(document.getElementById("registro").value) || 0;
  const gestoria = parseFloat(document.getElementById("gestoria").value) || 0;
  const comision = parseFloat(document.getElementById("comision").value) || 0;
  const financiacion =
    parseFloat(document.getElementById("financiacion").value) || 0;
  const captacion = parseFloat(document.getElementById("captacion").value) || 0;
  const otrosCompra =
    parseFloat(document.getElementById("otrosCompra").value) || 0;

  const ocupacion = parseFloat(document.getElementById("ocupacion").value) || 0;
  const reforma =
    parseFloat(document.getElementById("costeReforma").value) || 0;
  const extras = parseFloat(document.getElementById("extras").value) || 0;

  const ibi = parseFloat(document.getElementById("ibi").value) || 0;
  const comunidad = parseFloat(document.getElementById("comunidad").value) || 0;
  const seguros = parseFloat(document.getElementById("seguros").value) || 0;
  const alarma = parseFloat(document.getElementById("alarma").value) || 0;

  const precio =
    parseFloat(document.getElementById("precioInmueble").value) || 0;
  const gastoITP = precio * (itp / 100);

  const total =
    gastoITP +
    notaria +
    registro +
    gestoria +
    comision +
    financiacion +
    captacion +
    otrosCompra +
    ocupacion +
    reforma +
    extras +
    ibi +
    comunidad +
    seguros +
    alarma;

  document.getElementById("totalGastos").value = total.toFixed(2) + " €";
}
