// horarios.controller.js
import Horario from '../models/horario.model.js';
import Parada from '../models/parada.model.js';
import Ruta from '../models/ruta.model.js';
import Tarifa from '../models/tarifa.model.js';

// Obtener paradas por ruta
export const getParadasPorRuta = async (req, res) => {
    try {
        const { id_ruta } = req.query;
        const paradas = await Parada.find({ id_ruta });
        res.json(paradas);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener paradas', error });
    }
};

// Obtener horarios para origen y destino
export const getHorariosPorRuta = async (req, res) => {
    try {
        const { id_ruta, origen, destino } = req.query;

        const paradaOrigen = await Parada.findOne({ nombre: origen, id_ruta });
        const paradaDestino = await Parada.findOne({ nombre: destino, id_ruta });
        if (!paradaOrigen || !paradaDestino) {
            return res.status(404).json({ message: 'Parada no encontrada' });
        }

        const horariosOrigen = await Horario.find({ id_ruta, id_parada: paradaOrigen._id });
        const horariosDestino = await Horario.find({ id_ruta, id_parada: paradaDestino._id });

        const resultados = horariosOrigen.map(h => {
            const llegada = horariosDestino.find(d => d.horario > h.horario);
            return llegada ? { salida: h.horario, llegada: llegada.horario } : null;
        }).filter(Boolean);

        res.json(resultados);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener horarios', error });
    }
};

// Obtener tarifa entre paradas
export const getTarifaPorRuta = async (req, res) => {
    try {
        const { id_ruta, origen, destino } = req.query;
        const tarifa = await Tarifa.findOne({ id_ruta, tipoOrigen: origen, destino });
        if (!tarifa) {
            return res.status(404).json({ message: 'Tarifa no encontrada' });
        }
        res.json(tarifa);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener tarifa', error });
    }
};

// Obtener rutas disponibles
export const getRutas = async (req, res) => {
    try {
        const rutas = await Ruta.find();
        res.json(rutas);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener rutas', error });
    }
};
