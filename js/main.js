function mostrar(id) {
  // Oculta todos los módulos
  document
    .querySelectorAll(".modulo")
    .forEach((m) => (m.style.display = "none"));

  // Muestra el módulo seleccionado
  const modulo = document.getElementById(id);
  modulo.style.display = "block";

  // Desplaza suavemente hacia ese módulo
  modulo.scrollIntoView({ behavior: "smooth" });

  if (id === "crv") rellenarResumenInmueble();
}

function guardarDatos() {
  const campos = document.querySelectorAll("input");
  const datos = {};
  campos.forEach((input) => (datos[input.id] = input.value));
  localStorage.setItem("inversionDatos", JSON.stringify(datos));
  alert("✅ Datos guardados correctamente");
}

function cargarDatos() {
  const guardado = localStorage.getItem("inversionDatos");
  if (!guardado) return alert("⚠️ No hay datos guardados.");
  const datos = JSON.parse(guardado);
  Object.keys(datos).forEach((id) => {
    const input = document.getElementById(id);
    if (input) input.value = datos[id];
  });
  alert("✅ Datos cargados correctamente");
}

function borrarDatos() {
  if (confirm("¿Seguro que quieres borrar todos los datos guardados?")) {
    localStorage.removeItem("inversionDatos");
    alert("🗑️ Datos eliminados");
  }
}

function toggleTooltip(element) {
  document.querySelectorAll(".tooltip-wrapper").forEach((el) => {
    if (el !== element) el.classList.remove("active");
  });
  element.classList.toggle("active");
}

document.addEventListener("click", function (e) {
  if (!e.target.closest(".tooltip-wrapper")) {
    document
      .querySelectorAll(".tooltip-wrapper")
      .forEach((el) => el.classList.remove("active"));
  }
});
