function setITPporZona() {
  const comunidad = document.getElementById("comunidad").value;
  const itpInput = document.getElementById("itp");

  const itpPorComunidad = {
    andalucia: 7,
    aragon: 8,
    asturias: 8,
    baleares: 8,
    canarias: 6.5,
    cantabria: 10,
    castillalamancha: 9,
    castillayleon: 8,
    catalunya: 10,
    ceuta: 6,
    extremadura: 8,
    galicia: 10,
    madrid: 6,
    murcia: 8,
    navarra: 6,
    paisvasco: 4,
    valencia: 10,
  };

  if (comunidad && itpPorComunidad[comunidad] !== undefined) {
    itpInput.value = itpPorComunidad[comunidad];
  } else {
    itpInput.value = "";
  }

  calcularPrecioTotal();
}

function calcularPrecioTotal() {
  const precioBase =
    parseFloat(document.getElementById("precioInmueble").value) || 0;
  const descuento = parseFloat(document.getElementById("descuento").value) || 0;
  const itpPorcentaje = parseFloat(document.getElementById("itp").value) || 0;

  // Precio con descuento
  const precioDescontado = precioBase * (1 - descuento / 100);
  const inputPrecioDescontado = document.getElementById("precioDescontado");
  if (inputPrecioDescontado) {
    inputPrecioDescontado.value = precioDescontado.toLocaleString("es-ES", {
      style: "currency",
      currency: "EUR",
    });
  }

  // ITP en €
  const itpEuros = precioDescontado * (itpPorcentaje / 100);
  const itpEuroInput = document.getElementById("itpEuro");
  if (itpEuroInput) {
    itpEuroInput.value = itpEuros.toLocaleString("es-ES", {
      style: "currency",
      currency: "EUR",
    });
  }

  // Gastos de compra
  const notaria = parseFloat(document.getElementById("notaria")?.value) || 0;
  const registro = parseFloat(document.getElementById("registro")?.value) || 0;
  const gestoria = parseFloat(document.getElementById("gestoria")?.value) || 0;
  const comision =
    parseFloat(document.getElementById("comisionCompra")?.value) || 0;
  const otrosGastosCompra =
    parseFloat(document.getElementById("otrosGastosCompra")?.value) || 0;
  const totalGastosCompra =
    notaria + registro + gestoria + comision + otrosGastosCompra;

  // Reforma
  const reforma =
    parseFloat(document.getElementById("costeReforma")?.value) || 0;
  const extras = parseFloat(document.getElementById("extras")?.value) || 0;
  const totalReforma = reforma + extras;

  // Gastos anuales
  const ibi = parseFloat(document.getElementById("ibi")?.value) || 0;
  const comunidad =
    parseFloat(document.getElementById("comunidadGasto")?.value) || 0;
  const seguros = parseFloat(document.getElementById("seguros")?.value) || 0;
  const alarma = parseFloat(document.getElementById("alarma")?.value) || 0;
  const totalAnuales = ibi + comunidad + seguros + alarma;

  // Cálculos finales
  const totalSinReforma = precioDescontado + itpEuros + totalGastosCompra;
  const totalConReforma = totalSinReforma + totalReforma;
  const totalCompleto = totalConReforma + totalAnuales;

  // Mostrar resultados
  document.getElementById("precioTotal").value = totalSinReforma.toLocaleString(
    "es-ES",
    {
      style: "currency",
      currency: "EUR",
    }
  );

  const inputTotalConReforma = document.getElementById("precioTotalConReforma");
  if (inputTotalConReforma) {
    inputTotalConReforma.value = totalConReforma.toLocaleString("es-ES", {
      style: "currency",
      currency: "EUR",
    });
  }

  const inputTotalFinal = document.getElementById("precioTotalFinal");
  if (inputTotalFinal) {
    inputTotalFinal.value = totalCompleto.toLocaleString("es-ES", {
      style: "currency",
      currency: "EUR",
    });
  }

  // Sincronizar con CRA
  const inversionTotal = document.getElementById("inversionTotal");
  if (inversionTotal) {
    inversionTotal.value = totalCompleto.toLocaleString("es-ES", {
      style: "currency",
      currency: "EUR",
    });
  }

  // Sincronizar con CRV
  const resumenTotal = document.getElementById("resumenTotal");
  if (resumenTotal) {
    resumenTotal.textContent = totalCompleto.toLocaleString("es-ES", {
      style: "currency",
      currency: "EUR",
    });
  }

  const resumenReforma = document.getElementById("resumenReforma");
  if (resumenReforma) {
    resumenReforma.textContent = totalReforma.toLocaleString("es-ES", {
      style: "currency",
      currency: "EUR",
    });
  }

  const resumenDireccion = document.getElementById("resumenDireccion");
  const direccion = document.getElementById("direccion")?.value;
  if (resumenDireccion && direccion) {
    resumenDireccion.textContent = direccion;
  }
}
