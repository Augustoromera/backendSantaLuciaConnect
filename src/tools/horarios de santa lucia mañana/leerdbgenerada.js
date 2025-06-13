import mongoose from 'mongoose';
import Ruta from './src/models/ruta.model.js';
import Parada from './src/models/parada.model.js';
import Horario from './src/models/horario.model.js';

async function getMatrizHorarios(idRuta, tipoDia, turno) {
    const ruta = await Ruta.findById(idRuta);
    if (!ruta) throw new Error('Ruta no encontrada');

    const paradas = await Parada.find({ id_ruta: idRuta }).sort({ orden: 1 }).lean();
    const horarios = await Horario.find({ id_ruta: idRuta, tipo_dia: tipoDia, turno })
        .populate('id_parada', 'nombre orden')
        .lean();

    const viajesMap = new Map();

    for (const h of horarios) {
        const nro = h.nro_viaje;
        if (!viajesMap.has(nro)) viajesMap.set(nro, []);
        viajesMap.get(nro).push({
            nombre: h.id_parada.nombre,
            orden: h.id_parada.orden,
            horario: h.horario
        });
    }

    const filas = [];
    const nroViajesOrdenados = Array.from(viajesMap.keys()).sort((a, b) => a - b);

    for (const nro of nroViajesOrdenados) {
        const fila = new Array(paradas.length + 1).fill('');
        fila[0] = nro;
        const horariosViaje = viajesMap.get(nro);

        for (const h of horariosViaje) {
            const idx = paradas.findIndex(p => p.nombre === h.nombre);
            if (idx !== -1) fila[idx + 1] = h.horario;
        }

        filas.push(fila);
    }

    return {
        id_ruta: idRuta,
        tipo_dia: tipoDia,
        turno,
        matriz: {
            columnas: ["Nº", ...paradas.map(p => p.nombre)],
            filas
        }
    };
}

// ⚙️ CONFIG
const MONGO_URI = 'mongodb+srv://augusto:wallaby42@proyectoweb.e2tzutv.mongodb.net/santaluciaconnect?retryWrites=true&w=majority';
const ID_RUTA = '6841ae01c11032698b6ade09';
const TIPO_DIA = 'habil';
const TURNO = 'tarde';

// 🔧 Ejecutar
(async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('✅ Conectado a MongoDB');

        const resultado = await getMatrizHorarios(ID_RUTA, TIPO_DIA, TURNO);

        console.log('\n📋 MATRIZ EN TABLA:\n');
        console.table(resultado.matriz.filas, resultado.matriz.columnas);

        console.log('\n🧾 MATRIZ COMPLETA COMO OBJETO:\n');
        console.dir(resultado, { depth: null, colors: true });

        mongoose.disconnect();
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
})();
