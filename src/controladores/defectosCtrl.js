import { conmysql } from "../db.js";

// SELECT: Obtener todos los registros
export const getDefectos =
    async (req, res) => {
        try {
            const [result] = await conmysql.query('SELECT * FROM defectos');
            res.json(result);
        } catch (error) {
            return res.status(500).json({ message: "Error al consultar Defectos" });
        }
    };

// SELECT por ID
export const getDefectosxid =
    async (req, res) => {
        try {
            const [result] = await conmysql.query('SELECT * FROM defectos WHERE defectos_id=?', [req.params.id]);
            if (result.length <= 0) return res.status(404).json({
                defectos_id: 0,
                message: "Defecto no encontrado"
            });
            res.json(result[0]);
        } catch (error) {
            return res.status(500).json({ message: "Error del Servidor" });
        }
    };

// INSERT: Crear un nuevo registro
export const postDefectos = async (req, res) => {
    try {
        const {
            defectos_cabeza_roja, defectos_cabeza_naranja, defectos_cabeza_floja, defectos_hepato_reventado, defectos_corbata, defectos_deformes,
            defectos_deshidratado_leve, defectos_deshidratado_moderado, defectos_deterioro, defectos_rojo, defectos_juvenil, defectos_flacido,
            defectos_mudado, defectos_mal_descabezado, defectos_mezclas_de_especies, defectos_necrosis_leve, defectos_necrosis_moderada,
            defectos_quebrado, defectos_pequenios, defectos_melanosis, defectos_3er_segmento_separado, defectos_porcentaje_cascara,
            defectos_porcentaje_intestino, defectos_porcentaje_sin_telon, defectos_porcentaje_falta_de_corte, defectos_porcentaje_corte_profundo,
            defectos_porcentaje_corte_desviado, defectos_basura, defectos_total_defectos, defectos_observaciones, defectos_acciones_correctivas,
            lote_id, usuario_id
        } = req.body;

        const [rows] = await conmysql.query(
            `INSERT INTO defectos 
                    (defectos_cabeza_roja, defectos_cabeza_naranja, defectos_cabeza_floja, defectos_hepato_reventado, defectos_corbata, defectos_deformes, 
                    defectos_deshidratado_leve, defectos_deshidratado_moderado, defectos_deterioro, defectos_rojo, defectos_juvenil, defectos_flacido, 
                    defectos_mudado, defectos_mal_descabezado, defectos_mezclas_de_especies, defectos_necrosis_leve, defectos_necrosis_moderada, 
                    defectos_quebrado, defectos_pequenios, defectos_melanosis, defectos_3er_segmento_separado, defectos_porcentaje_cascara, 
                    defectos_porcentaje_intestino, defectos_porcentaje_sin_telon, defectos_porcentaje_falta_de_corte, defectos_porcentaje_corte_profundo, 
                    defectos_porcentaje_corte_desviado, defectos_basura, defectos_total_defectos, defectos_observaciones, defectos_acciones_correctivas, 
                    lote_id, usuario_id) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [   defectos_cabeza_roja, defectos_cabeza_naranja, defectos_cabeza_floja, defectos_hepato_reventado, defectos_corbata, defectos_deformes,
                defectos_deshidratado_leve, defectos_deshidratado_moderado, defectos_deterioro, defectos_rojo, defectos_juvenil, defectos_flacido, 
                defectos_mudado, defectos_mal_descabezado, defectos_mezclas_de_especies, defectos_necrosis_leve, defectos_necrosis_moderada,
                defectos_quebrado, defectos_pequenios, defectos_melanosis, defectos_3er_segmento_separado, defectos_porcentaje_cascara,
                defectos_porcentaje_intestino, defectos_porcentaje_sin_telon, defectos_porcentaje_falta_de_corte, defectos_porcentaje_corte_profundo,
                defectos_porcentaje_corte_desviado, defectos_basura, defectos_total_defectos, defectos_observaciones, defectos_acciones_correctivas,
                lote_id, usuario_id ]
        );

        const nuevoDefecto = {
            defectos_id: rows.insertId,
            ...req.body
        };

        // 🚀 Emitir a todos los clientes conectados
        global._io.emit("defecto_nuevo", nuevoDefecto);

        res.json({
            id: rows.insertId,
            message: "Defectos registrada con éxito"
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


// UPDATE: Actualizar un registro completo
export const putDefectos =
    async (req, res) => {
        try {
            const { id } = req.params;
            const { defectos_cabeza_roja, defectos_cabeza_naranja, defectos_cabeza_floja, defectos_hepato_reventado, defectos_corbata, defectos_deformes,
                defectos_deshidratado_leve, defectos_deshidratado_moderado, defectos_deterioro, defectos_rojo, defectos_juvenil, defectos_flacido,
                defectos_mudado, defectos_mal_descabezado, defectos_mezclas_de_especies, defectos_necrosis_leve, defectos_necrosis_moderada,
                defectos_quebrado, defectos_pequenios, defectos_melanosis, defectos_3er_segmento_separado, defectos_porcentaje_cascara,
                defectos_porcentaje_intestino, defectos_porcentaje_sin_telon, defectos_porcentaje_falta_de_corte, defectos_porcentaje_corte_profundo,
                defectos_porcentaje_corte_desviado, defectos_basura, defectos_total_defectos, defectos_observaciones, defectos_acciones_correctivas,
                lote_id, usuario_id } = req.body;

            const [result] = await conmysql.query(
                `UPDATE defectos SET 
                    defectos_cabeza_roja=?, defectos_cabeza_naranja=?, defectos_cabeza_floja=?, defectos_hepato_reventado=?, defectos_corbata=?, defectos_deformes=?,
                    defectos_deshidratado_leve=?, defectos_deshidratado_moderado=?, defectos_deterioro=?, defectos_rojo=?, defectos_juvenil=?, defectos_flacido=?, 
                    defectos_mudado=?, defectos_mal_descabezado=?, defectos_mezclas_de_especies=?, defectos_necrosis_leve=?, defectos_necrosis_moderada=?,
                    defectos_quebrado=?, defectos_pequenios=?, defectos_melanosis=?, defectos_3er_segmento_separado=?, defectos_porcentaje_cascara=?,
                    defectos_porcentaje_intestino=?, defectos_porcentaje_sin_telon=?, defectos_porcentaje_falta_de_corte=?, defectos_porcentaje_corte_profundo=?,
                    defectos_porcentaje_corte_desviado=?, defectos_basura=?, defectos_total_defectos=?, defectos_observaciones=?, defectos_acciones_correctivas=?,
                    lote_id=?, usuario_id=?
                    WHERE defectos_id = ?`,
                [defectos_cabeza_roja, defectos_cabeza_naranja, defectos_cabeza_floja, defectos_hepato_reventado, defectos_corbata, defectos_deformes,
                    defectos_deshidratado_leve, defectos_deshidratado_moderado, defectos_deterioro, defectos_rojo, defectos_juvenil, defectos_flacido,
                    defectos_mudado, defectos_mal_descabezado, defectos_mezclas_de_especies, defectos_necrosis_leve, defectos_necrosis_moderada,
                    defectos_quebrado, defectos_pequenios, defectos_melanosis, defectos_3er_segmento_separado, defectos_porcentaje_cascara,
                    defectos_porcentaje_intestino, defectos_porcentaje_sin_telon, defectos_porcentaje_falta_de_corte, defectos_porcentaje_corte_profundo,
                    defectos_porcentaje_corte_desviado, defectos_basura, defectos_total_defectos, defectos_observaciones, defectos_acciones_correctivas,
                    lote_id, usuario_id]
            );

            if (result.affectedRows <= 0) return res.status(404).json({ message: "Defecto no encontrado" });

            // Después de consultar el registro actualizado:
            const [rows] = await conmysql.query('SELECT * FROM defectos WHERE defectos_id=?', [id]);

            // 🚀 Emitir a todos los clientes conectados
            global._io.emit("defecto_actualizado", rows[0]);

            res.json(rows[0]);

            res.json({
                success: true,
                message: "Defecto registrado con éxito",
                data: { id: rows.insertId }
            });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };

// UPDATE parcial: Actualizar algunos campos
export const pathDefectos =
    async (req, res) => {
        try {
            const { id } = req.params;
            const { defectos_cabeza_roja, defectos_cabeza_naranja, defectos_cabeza_floja, defectos_hepato_reventado, defectos_corbata, defectos_deformes,
                defectos_deshidratado_leve, defectos_deshidratado_moderado, defectos_deterioro, defectos_rojo, defectos_juvenil, defectos_flacido,
                defectos_mudado, defectos_mal_descabezado, defectos_mezclas_de_especies, defectos_necrosis_leve, defectos_necrosis_moderada,
                defectos_quebrado, defectos_pequenios, defectos_melanosis, defectos_3er_segmento_separado, defectos_porcentaje_cascara,
                defectos_porcentaje_intestino, defectos_porcentaje_sin_telon, defectos_porcentaje_falta_de_corte, defectos_porcentaje_corte_profundo,
                defectos_porcentaje_corte_desviado, defectos_basura, defectos_total_defectos, defectos_observaciones, defectos_acciones_correctivas,
                lote_id, usuario_id } = req.body;

            const [result] = await conmysql.query(
                `UPDATE defectos SET 
                    defectos_cabeza_roja = IFNULL(?, defectos_cabeza_roja), defectos_cabeza_naranja = IFNULL(?, defectos_cabeza_naranja), 
                    defectos_cabeza_floja = IFNULL(?, defectos_cabeza_floja), defectos_hepato_reventado = IFNULL(?, defectos_hepato_reventado), 
                    defectos_corbata = IFNULL(?, defectos_corbata), defectos_deformes = IFNULL(?, defectos_deformes), defectos_deshidratado_leve = IFNULL(?, defectos_deshidratado_leve), 
                    defectos_deshidratado_moderado = IFNULL(?, defectos_deshidratado_moderado), defectos_deterioro = IFNULL(?, defectos_deterioro), 
                    defectos_rojo = IFNULL(?, defectos_rojo), defectos_juvenil = IFNULL(?, defectos_juvenil), defectos_flacido = IFNULL(?, defectos_flacido), 
                    defectos_mudado = IFNULL(?, defectos_mudado), defectos_mal_descabezado = IFNULL(?, defectos_mal_descabezado), 
                    defectos_mezclas_de_especies = IFNULL(?, defectos_mezclas_de_especies), defectos_necrosis_leve = IFNULL(?, defectos_necrosis_leve), 
                    defectos_necrosis_moderada = IFNULL(?, defectos_necrosis_moderada), defectos_quebrado = IFNULL(?, defectos_quebrado), 
                    defectos_pequenios = IFNULL(?, defectos_pequenios), defectos_melanosis = IFNULL(?, defectos_melanosis), 
                    defectos_3er_segmento_separado = IFNULL(?, defectos_3er_segmento_separado), defectos_porcentaje_cascara = IFNULL(?, defectos_porcentaje_cascara), 
                    defectos_porcentaje_intestino = IFNULL(?, defectos_porcentaje_intestino), defectos_porcentaje_sin_telon = IFNULL(?, defectos_porcentaje_sin_telon), 
                    defectos_porcentaje_falta_de_corte = IFNULL(?, defectos_porcentaje_falta_de_corte), defectos_porcentaje_corte_profundo = IFNULL(?, defectos_porcentaje_corte_profundo), 
                    defectos_porcentaje_corte_desviado = IFNULL(?, defectos_porcentaje_corte_desviado), defectos_basura = IFNULL(?, defectos_basura), 
                    defectos_total_defectos = IFNULL(?, defectos_total_defectos), defectos_observaciones = IFNULL(?, defectos_observaciones), defectos_acciones_correctivas = IFNULL(?, defectos_acciones_correctivas), 
                    lote_id = IFNULL(?, lote_id), usuario_id = IFNULL(?, usuario_id) 
                WHERE defectos_id=?`,
                [defectos_cabeza_roja, defectos_cabeza_naranja, defectos_cabeza_floja, defectos_hepato_reventado, defectos_corbata, defectos_deformes,
                    defectos_deshidratado_leve, defectos_deshidratado_moderado, defectos_deterioro, defectos_rojo, defectos_juvenil, defectos_flacido,
                    defectos_mudado, defectos_mal_descabezado, defectos_mezclas_de_especies, defectos_necrosis_leve, defectos_necrosis_moderada,
                    defectos_quebrado, defectos_pequenios, defectos_melanosis, defectos_3er_segmento_separado, defectos_porcentaje_cascara,
                    defectos_porcentaje_intestino, defectos_porcentaje_sin_telon, defectos_porcentaje_falta_de_corte, defectos_porcentaje_corte_profundo,
                    defectos_porcentaje_corte_desviado, defectos_basura, defectos_total_defectos, defectos_observaciones, defectos_acciones_correctivas,
                    lote_id, usuario_id]
            );

            if (result.affectedRows <= 0) return res.status(404).json({ message: "Defecto no encontrado" });

            const [rows] = await conmysql.query('SELECT * FROM defectos WHERE defectos_id=?', [id])
            res.json(rows[0])

            res.json({ message: "Defecto actualizado parcialmente" });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };

// DELETE: Eliminar un registro
export const deleteDefectos =
    async (req, res) => {
        try {
            const { id } = req.params;
            const [rows] = await conmysql.query('DELETE FROM defectos WHERE defectos_id=?', [id]);

            if (rows.affectedRows <= 0) return res.status(404).json({
                id: 0,
                message: "Defecto no encontrado"
            });

            res.sendStatus(202); // Código HTTP 202 (Accepted)
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };
