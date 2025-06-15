import { conmysql } from "../db.js";

// SELECT: Obtener todas las clasificaciones con JOINs completos
/* export const getClasificacion = async (req, res) => {
  try {
    const [result] = await conmysql.query(`
      SELECT c.*, l.lote_codigo, u.usuario_nombre, pr.proveedor_nombre, t.tipo_nombre,
             cl.clase_nombre, co.color_nombre, cr.corte_nombre, ta.talla_nombre, pe.peso_nombre,
             g.glaseo_nombre, p.presentacion_nombre, o.orden_codigo, m.maquina_nombre, gr.grupo_nombre,

             cal.c_calidad_peso_bruto, cal.c_calidad_peso_neto, cal.c_calidad_uniformidad,
             cal.c_calidad_olor, cal.c_calidad_sabor, cal.c_calidad_observaciones,

             def.defectos_total_defectos, def.defectos_observaciones, def.defectos_acciones_correctivas

      FROM clasificacion c
      LEFT JOIN lote l ON c.lote_id = l.lote_id
      LEFT JOIN usuario u ON c.usuario_id = u.usuario_id
      LEFT JOIN proveedor pr ON c.proveedor_id = pr.proveedor_id
      LEFT JOIN tipo t ON c.tipo_id = t.tipo_id
      LEFT JOIN clase cl ON c.clase_id = cl.clase_id
      LEFT JOIN color co ON c.color_id = co.color_id
      LEFT JOIN corte cr ON c.corte_id = cr.corte_id
      LEFT JOIN talla ta ON c.talla_id = ta.talla_id
      LEFT JOIN peso pe ON c.peso_id = pe.peso_id
      LEFT JOIN glaseo g ON c.glaseo_id = g.glaseo_id
      LEFT JOIN presentacion p ON c.presentacion_id = p.presentacion_id
      LEFT JOIN orden o ON c.orden_id = o.orden_id
      LEFT JOIN maquina m ON c.maquina_id = m.maquina_id
      LEFT JOIN grupo gr ON c.grupo_id = gr.grupo_id
      LEFT JOIN control_calidad cal ON c.c_calidad_id = cal.c_calidad_id
      LEFT JOIN defectos def ON c.defectos_id = def.defectos_id
    `);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: "Error al consultar Clasificaciones" });
  }
}; */

export const getClasificacion = async (req, res) => {
    try {
        const [result] = await conmysql.query(`
      SELECT c.*, 
             l.lote_codigo, 
             u.usuario_nombre, 
             pr.proveedor_nombre, 
             t.tipo_descripcion,
             cl.clase_descripcion, 
             co.color_descripcion, 
             cr.corte_descripcion, 
             ta.talla_descripcion, 
             pe.peso_descripcion,
             g.glaseo_cantidad, 
             p.presentacion_descripcion, 
             o.orden_codigo, 
             m.maquina_descripcion, 
             gr.grupo_nombre,
             cal.c_calidad_peso_bruto, cal.c_calidad_peso_neto, cal.c_calidad_uniformidad,
             cal.c_calidad_olor, cal.c_calidad_sabor, cal.c_calidad_observaciones,
             def.defectos_total_defectos, def.defectos_observaciones, def.defectos_acciones_correctivas
      FROM clasificacion c
      LEFT JOIN lote l ON c.lote_id = l.lote_id
      LEFT JOIN usuario u ON c.usuario_id = u.usuario_id
      LEFT JOIN proveedor pr ON c.proveedor_id = pr.proveedor_id
      LEFT JOIN tipo t ON c.tipo_id = t.tipo_id
      LEFT JOIN clase cl ON c.clase_id = cl.clase_id
      LEFT JOIN color co ON c.color_id = co.color_id
      LEFT JOIN corte cr ON c.corte_id = cr.corte_id
      LEFT JOIN talla ta ON c.talla_id = ta.talla_id
      LEFT JOIN peso pe ON c.peso_id = pe.peso_id
      LEFT JOIN glaseo g ON c.glaseo_id = g.glaseo_id
      LEFT JOIN presentacion p ON c.presentacion_id = p.presentacion_id
      LEFT JOIN orden o ON c.orden_id = o.orden_id
      LEFT JOIN maquina m ON c.maquina_id = m.maquina_id
      LEFT JOIN grupo gr ON c.grupo_id = gr.grupo_id
      LEFT JOIN control_calidad cal ON c.c_calidad_id = cal.c_calidad_id
      LEFT JOIN defectos def ON c.defectos_id = def.defectos_id
    `);
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: "Error al consultar Clasificaciones", error: error.message });
    }
};

// SELECT por ID
export const getClasificacionxid = async (req, res) => {
    try {
        const [result] = await conmysql.query('SELECT * FROM clasificacion WHERE clasificacion_id = ?', [req.params.id]);
        if (result.length <= 0)
            return res.status(404).json({ clasificacion_id: 0, message: "Clasificación no encontrada" });
        res.json(result[0]);
    } catch (error) {
        return res.status(500).json({ message: "Error del Servidor" });
    }
};

// INSERT
/* export const postClasificacion = async (req, res) => {
  try {
    const {
      usuario_id, orden_id, grupo_id, maquina_id, lote_id, proveedor_id, tipo_id, color_id,
      clasificacion_n_coche, clase_id, corte_id, talla_id, peso_id, glaseo_id, presentacion_id,
      clasificacion_peso_neto, clasificacion_n_cajas, clasificacion_libras_netas,
      clasificacion_subtotales, clasificacion_total, clasificacion_observaciones,
      defectos_id, c_calidad_id,
      clasificacion_coche_fecha, clasificacion_coche_hora, clasificacion_fecha
    } = req.body;

    if (!usuario_id || !lote_id || !clasificacion_n_coche) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }

    const [rows] = await conmysql.query(
      `INSERT INTO clasificacion (
        usuario_id, orden_id, grupo_id, maquina_id, lote_id, proveedor_id, tipo_id, color_id,
        clasificacion_n_coche, clase_id, corte_id, talla_id, peso_id, glaseo_id, presentacion_id,
        clasificacion_peso_neto, clasificacion_n_cajas, clasificacion_libras_netas,
        clasificacion_subtotales, clasificacion_total, clasificacion_observaciones,
        defectos_id, c_calidad_id,
        clasificacion_coche_fecha, clasificacion_coche_hora, clasificacion_fecha
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,

      [
        usuario_id, orden_id, grupo_id, maquina_id, lote_id, proveedor_id, tipo_id, color_id,
        clasificacion_n_coche, clase_id, corte_id, talla_id, peso_id, glaseo_id, presentacion_id,
        clasificacion_peso_neto, clasificacion_n_cajas, clasificacion_libras_netas,
        clasificacion_subtotales, clasificacion_total, clasificacion_observaciones,
        defectos_id, c_calidad_id,
        clasificacion_coche_fecha, clasificacion_coche_hora, clasificacion_fecha
      ]
    );

    const nuevaClasificacion = { clasificacion_id: rows.insertId, ...req.body };
    global._io.emit("clasificacion_nueva", nuevaClasificacion);

    res.json({ id: rows.insertId, message: "Clasificación registrada con éxito" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
 */

// INSERT
export const postClasificacion = async (req, res) => {
    try {
        const {
            usuario_id, orden_id, grupo_id, maquina_id, lote_id, proveedor_id, tipo_id, color_id,
            clasificacion_n_coche, clase_id, corte_id, talla_id, peso_id, glaseo_id, presentacion_id,
            clasificacion_peso_neto, clasificacion_n_cajas, clasificacion_libras_netas,
            clasificacion_subtotales, clasificacion_total, clasificacion_observaciones,
            defectos_id, c_calidad_id,
            clasificacion_coche_fecha, clasificacion_coche_hora, clasificacion_fecha
        } = req.body;

        if (!usuario_id || !lote_id || !clasificacion_n_coche) {
            return res.status(400).json({ message: "Faltan campos obligatorios" });
        }

        // Si no se especifican, se calculan fecha y hora actual
        const fechaHoy = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
        const horaHoy = new Date().toTimeString().slice(0, 8);   // HH:MM:SS

        const fechaCoche = clasificacion_coche_fecha || fechaHoy;
        const horaCoche = clasificacion_coche_hora || horaHoy;
        const fechaProceso = clasificacion_fecha || fechaHoy;

        const [rows] = await conmysql.query(
            `INSERT INTO clasificacion (
        usuario_id, orden_id, grupo_id, maquina_id, lote_id, proveedor_id, tipo_id, color_id,
        clasificacion_n_coche, clase_id, corte_id, talla_id, peso_id, glaseo_id, presentacion_id,
        clasificacion_peso_neto, clasificacion_n_cajas, clasificacion_libras_netas,
        clasificacion_subtotales, clasificacion_total, clasificacion_observaciones,
        defectos_id, c_calidad_id,
        clasificacion_coche_fecha, clasificacion_coche_hora, clasificacion_fecha
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                usuario_id, orden_id, grupo_id, maquina_id, lote_id, proveedor_id, tipo_id, color_id,
                clasificacion_n_coche, clase_id, corte_id, talla_id, peso_id, glaseo_id, presentacion_id,
                clasificacion_peso_neto, clasificacion_n_cajas, clasificacion_libras_netas,
                clasificacion_subtotales, clasificacion_total, clasificacion_observaciones,
                defectos_id, c_calidad_id,
                fechaCoche, horaCoche, fechaProceso
            ]
        );

        const nuevaClasificacion = {
            clasificacion_id: rows.insertId,
            ...req.body,
            clasificacion_coche_fecha: fechaCoche,
            clasificacion_coche_hora: horaCoche,
            clasificacion_fecha: fechaProceso
        };

        global._io.emit("clasificacion_nueva", nuevaClasificacion);

        res.json({ id: rows.insertId, message: "Clasificación registrada con éxito" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// UPDATE
export const putClasificacion = async (req, res) => {
    try {
        const { id } = req.params;
        const campos = Object.keys(req.body);
        const valores = Object.values(req.body);

        const setClause = campos.map(c => `${c} = ?`).join(',');

        const [result] = await conmysql.query(
            `UPDATE clasificacion SET ${setClause} WHERE clasificacion_id = ?`,
            [...valores, id]
        );

        if (result.affectedRows <= 0)
            return res.status(404).json({ message: "Clasificación no encontrada" });

        const [rows] = await conmysql.query('SELECT * FROM clasificacion WHERE clasificacion_id=?', [id]);
        global._io.emit("clasificacion_actualizada", rows[0]);

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// PATCH
export const pathClasificacion = async (req, res) => {
    try {
        const { id } = req.params;
        const campos = Object.keys(req.body);
        const valores = Object.values(req.body);

        if (campos.length === 0)
            return res.status(400).json({ message: "No se enviaron campos para actualizar" });

        const setClause = campos.map(campo => `${campo} = IFNULL(?, ${campo})`).join(', ');

        const [result] = await conmysql.query(
            `UPDATE clasificacion SET ${setClause} WHERE clasificacion_id = ?`,
            [...valores, id]
        );

        if (result.affectedRows === 0)
            return res.status(404).json({ message: "Clasificación no encontrada" });

        const [rows] = await conmysql.query('SELECT * FROM clasificacion WHERE clasificacion_id = ?', [id]);
        global._io.emit("clasificacion_actualizada", rows[0]);

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getLibrasClasificadasPorLote = async (req, res) => {
    try {
        const { lote_id } = req.params;
        const [result] = await conmysql.query(
            'SELECT SUM(clasificacion_libras_netas) AS total_clasificado FROM clasificacion WHERE lote_id = ?',
            [lote_id]
        );
        res.json(result[0]);
    } catch (error) {
        return res.status(500).json({ message: "Error al calcular libras clasificadas", error: error.message });
    }
};

// DELETE
export const deleteClasificacion = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await conmysql.query('DELETE FROM clasificacion WHERE clasificacion_id = ?', [id]);

        if (rows.affectedRows <= 0)
            return res.status(404).json({ id: 0, message: "Clasificación no encontrada" });

        global._io.emit("clasificacion_eliminada", { clasificacion_id: parseInt(id) });

        res.status(202).json({ message: "Clasificación eliminada con éxito" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
