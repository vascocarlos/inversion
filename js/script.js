function calcular() {
  const precio = parseFloat(document.getElementById("precio").value) || 0;
  const descuento = parseFloat(document.getElementById("descuento").value) || 0;
  const gastos = parseFloat(document.getElementById("gastos").value) || 0;
  const reforma = parseFloat(document.getElementById("reforma").value) || 0;

  const descuentoTotal = precio * (descuento / 100);
  const precioFinal = precio - descuentoTotal + gastos + reforma;

  document.getElementById("resultados").innerHTML = `
    <p><strong>Descuento aplicado:</strong> ${descuentoTotal.toFixed(2)} €</p>
    <p><strong>Precio final con gastos y reforma:</strong> ${precioFinal.toFixed(
      2
    )} €</p>
  `;
}
