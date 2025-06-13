import fs from 'fs';

const idRuta = "6841af28447dea60cc03a67d";
const tipoDia = "habil";
const turno = "mañana";

// Orden de paradas desde MONTEROS a SANTA LUCIA
const paradas = [
    { nombre: "MONTEROS", id: "6841af28447dea60cc03a67f" },
    { nombre: "CITROMAX", id: "6841af28447dea60cc03a680" },
    { nombre: "STO. DOMINGO", id: "6841af28447dea60cc03a681" },
    { nombre: "CERVECERÍA", id: "6841af28447dea60cc03a682" },
    { nombre: "ACHERAL", id: "6841af28447dea60cc03a683" },
    { nombre: "ALTO VERDE", id: "6841af28447dea60cc03a684" },
    { nombre: "KM 3", id: "6841af28447dea60cc03a685" },
    { nombre: "LA CIÉNAGA", id: "6841af28447dea60cc03a686"},
    { nombre: "LA CORTADA", id: "6841af28447dea60cc03a687" },
    { nombre: "ZAVALIA", id: "6841af28447dea60cc03a688" },
    { nombre: "SANTA LUCIA", id: "6841af28447dea60cc03a689" },
];

const filas = `
2 6:30 6:32 6:34 6:38 6:45 6:50 6:53 7:55 6:57 6:58 7:00
3 7:00 7:02 7:04 7:06 7:15 7:20 7:23 7:25 7:27 7:28 7:30
4 7:30 7:32 7:34 7:36 7:45 7:50 7:53 7:55 7:57 7:58 8:00
5 8:00 8:02 8:04 8:06 8:15 8:20 8:23 8:25 8:27 8:28 8:30
6 9:00 9:02 9:04 9:06 9:15 9:20 9:23 9:25 9:27 9:28 9:30
7 10:00 10:02 10:04 10:06 10:15 10:20 10:23 10:25 10:27 10:28 10:30
8 11:00 11:02 11:04 11:06 11:15 11:20 11:23 11:25 11:27 11:28 11:30
10 12:00 12:02 12:04 12:06 12:15 12:20 12:23 12:25 12:27 12:28 12:30
11 12:15 12:17 12:19 12:21 12:30 12:35 12:38 12:41 12:43 12:44 12:45
12 12:30 12:32 12:34 12:36 12:45 12:50 12:53 12:55 12:57 12:58 13:00
13 13:00 13:02 13:04 13:06 13:15 13:20 13:23 13:25 13:27 13:28 13:30
15 14:00 14:02 14:04 14:06 14:15 14:20 14:23 14:25 14:27 14:28 14:30
16 15:00 15:02 15:04 15:06 15:15 15:20 15:23 15:25 15:27 15:28 15:30
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
fs.writeFileSync('horarios_monteros_a_stalucia.json', JSON.stringify(horarios, null, 2), 'utf8');
console.log("\n✅ Archivo 'horarios_monteros_a_stalucia.json' generado correctamente.");
