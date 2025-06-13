import fs from 'fs';
const idRuta = "6841ae01c11032698b6ade09";
const tipoDia = "habil";
const turno = "mañana";

// Diccionario de paradas en orden
const paradas = [
    { nombre: "SANTA LUCIA", id: "6841ae01c11032698b6ade0b" },
    { nombre: "ZAVALIA", id: "6841ae01c11032698b6ade0c" },
    { nombre: "LA CORTADA", id: "6841ae01c11032698b6ade0d" },
    { nombre: "LA CIÉNAGA", id: "6841ae01c11032698b6ade0e" },
    { nombre: "KM 3", id: "6841ae01c11032698b6ade0f" },
    { nombre: "ALTO VERDE", id: "6841ae01c11032698b6ade10" },
    { nombre: "ACHERAL", id: "6841ae01c11032698b6ade11" },
    { nombre: "CERVECERÍA", id: "6841ae01c11032698b6ade12" },
    { nombre: "STO. DOMINGO", id: "6841ae01c11032698b6ade13" },
    { nombre: "CITROMAX", id: "6841ae01c11032698b6ade14" },
    { nombre: "MONTEROS", id: "6841ae01c11032698b6ade15" },
];

const filas = `
2 7:00 7:07 7:09 7:11 7:13 7:14 7:15 7:18 7:20 7:22 7:30
3 7:30 7:37 7:39 7:41 7:43 7:44 7:45 7:48 7:50 7:52 8:00
4 8:00 8:07 8:09 8:11 8:13 8:14 8:15 8:18 8:20 8:22 8:30
5 8:30 8:37 8:39 8:41 8:43 8:44 8:45 8:48 8:50 8:52 9:00
6 9:30 9:37 9:39 9:41 9:43 9:44 9:45 9:48 9:50 9:52 10:00
7 10:30 10:37 10:39 10:41 10:43 10:44 10:45 10:48 10:50 10:52 11:00
8 11:30 11:37 11:39 11:41 11:43 11:44 11:45 11:48 11:50 11:52 12:00
10 12:30 12:37 12:39 12:41 12:43 12:44 12:45 12:48 12:50 12:52 13:00
11 12:45 12:52 12:54 12:56 12:58 12:59 13:00 13:03 13:05 13:07 13:15
12 13:00 13:07 13:09 13:11 13:13 13:14 13:15 13:18 13:20 13:22 13:30
13 13:30 13:37 13:39 13:41 13:43 13:44 13:45 13:48 13:50 13:52 14:00
15 14:30 14:37 14:39 14:41 14:43 14:44 14:45 14:48 14:50 14:52 15:00
16 15:30 15:37 15:39 15:41 15:43 15:44 15:45 15:48 15:50 15:52 16:00
`.trim();

const horarios = [];
const tabla = [];

// Procesar cada fila
filas.split("\n").forEach(linea => {
    const partes = linea.trim().split(/\s+/);
    const nroOrden = parseInt(partes[0]);
    const horariosParada = partes.slice(1);
    const filaTabla = [nroOrden];

    horariosParada.forEach((hora, index) => {
        const parada = paradas[index];
        horarios.push({
            id_ruta: idRuta,
            id_parada: parada.id,
            horario: hora,
            tipo_dia: tipoDia,
            nro_orden: nroOrden,
            turno: turno
        });
        filaTabla.push(hora);
    });

    tabla.push(filaTabla);
});

// Mostrar objetos
console.log("▶ OBJETOS GENERADOS:\n");
horarios.forEach(item => {
    console.log(item);
});

// Mostrar tabla
console.log("\n▶ TABLA DE HORARIOS:\n");

// Encabezado
const encabezado = ["Nº"].concat(paradas.map(p => p.nombre.padEnd(12)));
console.log(encabezado.join("  "));

// Filas de horarios
tabla.forEach(fila => {
    const filaTexto = fila.map((v, i) =>
        i === 0 ? v.toString().padEnd(2) : v.padEnd(12)
    );
    console.log(filaTexto.join("  "));
});

// Guardar como JSON

fs.writeFileSync('horarios.json', JSON.stringify(horarios, null, 2), 'utf8');
console.log("\n✅ Archivo 'horarios.json' generado correctamente.");