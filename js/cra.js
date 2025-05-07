// Función robusta para obtener números
function getNum(id) {
  const el = document.getElementById(id);
  if (!el || el.value.trim() === "") return 0;
  return parseFloat(el.value.replace(",", ".")) || 0;
}

// Solo calcular gastos anuales del módulo CRA
function calcularGastosCRA() {
  const ibi = getNum("ibiCRA");
  const comunidad = getNum("comunidadCRA");
  const seguros = getNum("segurosCRA"); // anual
  const alarma = getNum("alarmaCRA");

  const comunidadAnual = comunidad * 12;
  const segurosAnual = seguros; // YA NO SE MULTIPLICA POR 12
  const alarmaAnual = alarma * 12;

  document.getElementById("ibiAnualCRA").value = ibi.toLocaleString("es-ES");
  document.getElementById("comunidadAnualCRA").value =
    comunidadAnual.toLocaleString("es-ES");
  document.getElementById("segurosAnualCRA").value =
    segurosAnual.toLocaleString("es-ES");
  document.getElementById("alarmaAnualCRA").value =
    alarmaAnual.toLocaleString("es-ES");

  const gastosTotales = ibi + comunidadAnual + segurosAnual + alarmaAnual;
  document.getElementById("gastosCRA").value =
    gastosTotales.toLocaleString("es-ES") + " €";
}

// Cálculo completo del módulo CRA
function calcularCRA() {
  // Ingresos
  const alquilerMensual = getNum("alquilerMensual");
  const ingresosAnuales = alquilerMensual * 12;
  document.getElementById("ingresosAnuales").value =
    ingresosAnuales.toLocaleString("es-ES", {
      style: "currency",
      currency: "EUR",
    });

  // Gastos anuales
  const ibi = getNum("ibiCRA");
  const comunidad = getNum("comunidadCRA");
  const seguros = getNum("segurosCRA"); // anual
  const alarma = getNum("alarmaCRA");

  const comunidadAnual = comunidad * 12;
  const segurosAnual = seguros; // YA NO SE MULTIPLICA POR 12
  const alarmaAnual = alarma * 12;

  document.getElementById("ibiAnualCRA").value = ibi.toLocaleString("es-ES");
  document.getElementById("comunidadAnualCRA").value =
    comunidadAnual.toLocaleString("es-ES");
  document.getElementById("segurosAnualCRA").value =
    segurosAnual.toLocaleString("es-ES");
  document.getElementById("alarmaAnualCRA").value =
    alarmaAnual.toLocaleString("es-ES");

  const gastosAnuales = ibi + comunidadAnual + segurosAnual + alarmaAnual;
  document.getElementById("gastosCRA").value = gastosAnuales.toLocaleString(
    "es-ES",
    {
      style: "currency",
      currency: "EUR",
    }
  );

  // Inversión
  const precio = getNum("precioInmueble");
  const descuento = getNum("descuento");
  const itp = getNum("itp");
  const notaria = getNum("notaria");
  const registro = getNum("registro");
  const gestoria = getNum("gestoria");
  const comision = getNum("comisionCompra");
  const otros = getNum("otrosGastosCompra");

  const itpEuros = precio * (1 - descuento / 100) * (itp / 100);
  const totalGastosCompra =
    itpEuros + notaria + registro + gestoria + comision + otros;

  const reforma = getNum("costeReforma");
  const extras = getNum("extras");
  const importeDescuento = precio * (descuento / 100);

  const inversionTotal =
    precio - importeDescuento + totalGastosCompra + reforma + extras;
  document.getElementById("inversionTotal").value =
    inversionTotal.toLocaleString("es-ES", {
      style: "currency",
      currency: "EUR",
    });

  // Rentabilidad
  const rentabilidadBruta = precio > 0 ? (ingresosAnuales / precio) * 100 : 0;
  const rentabilidadNeta =
    inversionTotal > 0
      ? ((ingresosAnuales - gastosAnuales) / inversionTotal) * 100
      : 0;
  const roi = rentabilidadNeta;

  document.getElementById("rentabilidadBruta").value =
    rentabilidadBruta.toFixed(2) + " %";
  document.getElementById("rentabilidadNeta").value =
    rentabilidadNeta.toFixed(2) + " %";
  document.getElementById("roi").value = roi.toFixed(2) + " %";
}
