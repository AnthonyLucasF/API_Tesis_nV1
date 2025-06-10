/* import { conmysql } from "../db.js";

// SELECT: Obtener todos los registros con JOINs
export const getLote = async (req, res) => {
  try {
    console.log('📥 Obteniendo lotes...');
    const [result] = await conmysql.query(`
      SELECT 
          l.*, 
          t.tipo_descripcion AS lote_tipo_descripcion,
          v.vehiculo_placa AS lote_vehiculo_placa,
          c.chofer_nombre AS lote_chofer_nombre,
          p.proveedor_nombre AS lote_proveedor_nombre,
          u.usuario_nombre AS lote_usuario_nombre
      FROM lote l
      LEFT JOIN tipo t ON l.tipo_id = t.tipo_id
      LEFT JOIN vehiculo v ON l.vehiculo_id = v.vehiculo_id
      LEFT JOIN chofer c ON l.chofer_id = c.chofer_id
      LEFT JOIN proveedor p ON l.proveedor_id = p.proveedor_id
      LEFT JOIN usuario u ON l.usuario_id = u.usuario_id
    `);
    res.json(result);
  } catch (error) {
    console.error('Error getLote:', error);
    return res.status(500).json({ message: "Error al consultar Lote (Materia Prima)" });
  }
};

// SELECT por ID con JOINs
export const getLotexid = async (req, res) => {
  try {
    const [result] = await conmysql.query(`
      SELECT 
          l.*, 
          t.tipo_descripcion AS lote_tipo_descripcion,
          v.vehiculo_placa AS lote_vehiculo_placa,
          c.chofer_nombre AS lote_chofer_nombre,
          p.proveedor_nombre AS lote_proveedor_nombre,
          u.usuario_nombre AS lote_usuario_nombre
      FROM lote l
      LEFT JOIN tipo t ON l.tipo_id = t.tipo_id
      LEFT JOIN vehiculo v ON l.vehiculo_id = v.vehiculo_id
      LEFT JOIN chofer c ON l.chofer_id = c.chofer_id
      LEFT JOIN proveedor p ON l.proveedor_id = p.proveedor_id
      LEFT JOIN usuario u ON l.usuario_id = u.usuario_id
      WHERE l.lote_id = ?
    `, [req.params.id]);

    if (result.length <= 0) return res.status(404).json({ lote_id: 0, message: "Lote no encontrado" });
    res.json(result[0]);
  } catch (error) {
    console.error("Error getLotexid:", error);
    return res.status(500).json({ message: "Error del Servidor" });
  }
};

// INSERT
export const postLote = async (req, res) => {
  try {
    const {
      tipo_id, vehiculo_id, chofer_id, lote_codigo, lote_fecha_ingreso, lote_hora_ingreso,
      proveedor_id, lote_libras_remitidas, lote_peso_promedio, lote_n_piscina, lote_n_bines,
      lote_n_gavetas_conicas, lote_n_gavetas_caladas, lote_n_sacos_hielo, lote_n_sacos_metasulfito,
      lote_n_sacos_sal, lote_observaciones, usuario_id
    } = req.body;

    const [rows] = await conmysql.query(
      `INSERT INTO lote 
        (tipo_id, vehiculo_id, chofer_id, lote_codigo, lote_fecha_ingreso, lote_hora_ingreso,
        proveedor_id, lote_libras_remitidas, lote_peso_promedio, lote_n_piscina, lote_n_bines,
        lote_n_gavetas_conicas, lote_n_gavetas_caladas, lote_n_sacos_hielo, lote_n_sacos_metasulfito,
        lote_n_sacos_sal, lote_observaciones, usuario_id) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [tipo_id, vehiculo_id, chofer_id, lote_codigo, lote_fecha_ingreso, lote_hora_ingreso,
      proveedor_id, lote_libras_remitidas, lote_peso_promedio, lote_n_piscina, lote_n_bines,
      lote_n_gavetas_conicas, lote_n_gavetas_caladas, lote_n_sacos_hielo, lote_n_sacos_metasulfito,
      lote_n_sacos_sal, lote_observaciones, usuario_id]
    );

    const nuevoLote = { lote_id: rows.insertId, ...req.body };
    global._io.emit("nuevo_lote", nuevoLote);

    res.json({ id: rows.insertId, message: "Lote registrado con éxito" });
  } catch (error) {
    console.error("Error postLote:", error);
    return res.status(500).json({ message: error.message });
  }
};

// PUT
export const putLote = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      tipo_id, vehiculo_id, chofer_id, lote_codigo, lote_fecha_ingreso, lote_hora_ingreso,
      proveedor_id, lote_libras_remitidas, lote_peso_promedio, lote_n_piscina, lote_n_bines,
      lote_n_gavetas_conicas, lote_n_gavetas_caladas, lote_n_sacos_hielo, lote_n_sacos_metasulfito,
      lote_n_sacos_sal, lote_observaciones, usuario_id
    } = req.body;

    const [result] = await conmysql.query(
      `UPDATE lote SET 
        tipo_id=?, vehiculo_id=?, chofer_id=?, lote_codigo=?, lote_fecha_ingreso=?, lote_hora_ingreso=?,
        proveedor_id=?, lote_libras_remitidas=?, lote_peso_promedio=?, lote_n_piscina=?, lote_n_bines=?,
        lote_n_gavetas_conicas=?, lote_n_gavetas_caladas=?, lote_n_sacos_hielo=?, lote_n_sacos_metasulfito=?,
        lote_n_sacos_sal=?, lote_observaciones=?, usuario_id=?
      WHERE lote_id = ?`,
      [tipo_id, vehiculo_id, chofer_id, lote_codigo, lote_fecha_ingreso, lote_hora_ingreso,
      proveedor_id, lote_libras_remitidas, lote_peso_promedio, lote_n_piscina, lote_n_bines,
      lote_n_gavetas_conicas, lote_n_gavetas_caladas, lote_n_sacos_hielo, lote_n_sacos_metasulfito,
      lote_n_sacos_sal, lote_observaciones, usuario_id, id]
    );

    if (result.affectedRows <= 0) return res.status(404).json({ message: "Lote no encontrado" });

    const [rows] = await conmysql.query('SELECT * FROM lote WHERE lote_id=?', [id]);
    global._io.emit("lote_actualizado", rows[0]);

    res.json(rows[0]);
  } catch (error) {
    console.error("Error putLote:", error);
    return res.status(500).json({ message: error.message });
  }
};

// PATCH
export const pathLote = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      tipo_id, vehiculo_id, chofer_id, lote_codigo, lote_fecha_ingreso, lote_hora_ingreso,
      proveedor_id, lote_libras_remitidas, lote_peso_promedio, lote_n_piscina, lote_n_bines,
      lote_n_gavetas_conicas, lote_n_gavetas_caladas, lote_n_sacos_hielo, lote_n_sacos_metasulfito,
      lote_n_sacos_sal, lote_observaciones, usuario_id
    } = req.body;

    const [result] = await conmysql.query(
      `UPDATE lote SET
        tipo_id = IFNULL(?, tipo_id), vehiculo_id = IFNULL(?, vehiculo_id), chofer_id = IFNULL(?, chofer_id),
        lote_codigo = IFNULL(?, lote_codigo), lote_fecha_ingreso = IFNULL(?, lote_fecha_ingreso),
        lote_hora_ingreso = IFNULL(?, lote_hora_ingreso), proveedor_id = IFNULL(?, proveedor_id),
        lote_libras_remitidas = IFNULL(?, lote_libras_remitidas), lote_peso_promedio = IFNULL(?, lote_peso_promedio),
        lote_n_piscina = IFNULL(?, lote_n_piscina), lote_n_bines = IFNULL(?, lote_n_bines),
        lote_n_gavetas_conicas = IFNULL(?, lote_n_gavetas_conicas), lote_n_gavetas_caladas = IFNULL(?, lote_n_gavetas_caladas),
        lote_n_sacos_hielo = IFNULL(?, lote_n_sacos_hielo), lote_n_sacos_metasulfito = IFNULL(?, lote_n_sacos_metasulfito),
        lote_n_sacos_sal = IFNULL(?, lote_n_sacos_sal), lote_observaciones = IFNULL(?, lote_observaciones),
        usuario_id = IFNULL(?, usuario_id)
      WHERE lote_id = ?`,
      [tipo_id, vehiculo_id, chofer_id, lote_codigo, lote_fecha_ingreso, lote_hora_ingreso,
      proveedor_id, lote_libras_remitidas, lote_peso_promedio, lote_n_piscina, lote_n_bines,
      lote_n_gavetas_conicas, lote_n_gavetas_caladas, lote_n_sacos_hielo, lote_n_sacos_metasulfito,
      lote_n_sacos_sal, lote_observaciones, usuario_id, id]
    );

    if (result.affectedRows <= 0) return res.status(404).json({ message: "Lote no encontrado" });

    const [rows] = await conmysql.query('SELECT * FROM lote WHERE lote_id=?', [id]);
    global._io.emit("lote_actualizado", rows[0]);

    res.json(rows[0]);
  } catch (error) {
    console.error("Error pathLote:", error);
    return res.status(500).json({ message: error.message });
  }
};

// DELETE
export const deleteLote = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await conmysql.query('DELETE FROM lote WHERE lote_id=?', [id]);

    if (rows.affectedRows <= 0) return res.status(404).json({ id: 0, message: "Lote no encontrado" });

    res.sendStatus(202);
  } catch (error) {
    console.error("Error deleteLote:", error);
    return res.status(500).json({ message: error.message });
  }
};
 */


// XD

import { conmysql } from "../db.js";

// SELECT: Obtener todos los registros con JOINs
export const getLote = async (req, res) => {
  try {
    console.log('📥 Obteniendo lotes...');
    const [result] = await conmysql.query(`
      SELECT 
          l.*, 
          t.tipo_descripcion AS lote_tipo_descripcion,
          v.vehiculo_placa AS lote_vehiculo_placa,
          c.chofer_nombre AS lote_chofer_nombre,
          p.proveedor_nombre AS lote_proveedor_nombre,
          u.usuario_nombre AS lote_usuario_nombre
      FROM lote l
      LEFT JOIN tipo t ON l.tipo_id = t.tipo_id
      LEFT JOIN vehiculo v ON l.vehiculo_id = v.vehiculo_id
      LEFT JOIN chofer c ON l.chofer_id = c.chofer_id
      LEFT JOIN proveedor p ON l.proveedor_id = p.proveedor_id
      LEFT JOIN usuario u ON l.usuario_id = u.usuario_id
    `);
    res.json(result);
  } catch (error) {
    console.error('Error getLote:', error);
    return res.status(500).json({ message: "Error al consultar Lote (Materia Prima)" });
  }
};

// SELECT por ID con JOINs
export const getLotexid = async (req, res) => {
  try {
    const [result] = await conmysql.query(`
      SELECT 
          l.*, 
          t.tipo_descripcion AS lote_tipo_descripcion,
          v.vehiculo_placa AS lote_vehiculo_placa,
          c.chofer_nombre AS lote_chofer_nombre,
          p.proveedor_nombre AS lote_proveedor_nombre,
          u.usuario_nombre AS lote_usuario_nombre
      FROM lote l
      LEFT JOIN tipo t ON l.tipo_id = t.tipo_id
      LEFT JOIN vehiculo v ON l.vehiculo_id = v.vehiculo_id
      LEFT JOIN chofer c ON l.chofer_id = c.chofer_id
      LEFT JOIN proveedor p ON l.proveedor_id = p.proveedor_id
      LEFT JOIN usuario u ON l.usuario_id = u.usuario_id
      WHERE l.lote_id = ?
    `, [req.params.id]);

    if (result.length <= 0) return res.status(404).json({ lote_id: 0, message: "Lote no encontrado" });
    res.json(result[0]);
  } catch (error) {
    console.error("Error getLotexid:", error);
    return res.status(500).json({ message: "Error del Servidor" });
  }
};

// INSERT
export const postLote = async (req, res) => {
  try {
    const {
      tipo_id, vehiculo_id, chofer_id, lote_codigo, lote_fecha_ingreso, lote_hora_ingreso,
      proveedor_id, lote_libras_remitidas, lote_peso_promedio, lote_n_piscina, lote_n_bines,
      lote_n_gavetas_conicas, lote_n_gavetas_caladas, lote_n_sacos_hielo, lote_n_sacos_metasulfito,
      lote_n_sacos_sal, lote_observaciones, usuario_id
    } = req.body;

    const [rows] = await conmysql.query(
      `INSERT INTO lote 
        (tipo_id, vehiculo_id, chofer_id, lote_codigo, lote_fecha_ingreso, lote_hora_ingreso,
        proveedor_id, lote_libras_remitidas, lote_peso_promedio, lote_n_piscina, lote_n_bines,
        lote_n_gavetas_conicas, lote_n_gavetas_caladas, lote_n_sacos_hielo, lote_n_sacos_metasulfito,
        lote_n_sacos_sal, lote_observaciones, usuario_id) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [tipo_id, vehiculo_id, chofer_id, lote_codigo, lote_fecha_ingreso, lote_hora_ingreso,
      proveedor_id, lote_libras_remitidas, lote_peso_promedio, lote_n_piscina, lote_n_bines,
      lote_n_gavetas_conicas, lote_n_gavetas_caladas, lote_n_sacos_hielo, lote_n_sacos_metasulfito,
      lote_n_sacos_sal, lote_observaciones, usuario_id]
    );

    const nuevoLote = { lote_id: rows.insertId, ...req.body };
    global._io.emit("nuevo_lote", nuevoLote);

    res.json({ id: rows.insertId, message: "Lote registrado con éxito" });
  } catch (error) {
    console.error("Error postLote:", error);
    return res.status(500).json({ message: error.message });
  }
};

// PUT
export const putLote = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      tipo_id, vehiculo_id, chofer_id, lote_codigo, lote_fecha_ingreso, lote_hora_ingreso,
      proveedor_id, lote_libras_remitidas, lote_peso_promedio, lote_n_piscina, lote_n_bines,
      lote_n_gavetas_conicas, lote_n_gavetas_caladas, lote_n_sacos_hielo, lote_n_sacos_metasulfito,
      lote_n_sacos_sal, lote_observaciones, usuario_id
    } = req.body;

    const [result] = await conmysql.query(
      `UPDATE lote SET 
        tipo_id=?, vehiculo_id=?, chofer_id=?, lote_codigo=?, lote_fecha_ingreso=?, lote_hora_ingreso=?,
        proveedor_id=?, lote_libras_remitidas=?, lote_peso_promedio=?, lote_n_piscina=?, lote_n_bines=?,
        lote_n_gavetas_conicas=?, lote_n_gavetas_caladas=?, lote_n_sacos_hielo=?, lote_n_sacos_metasulfito=?,
        lote_n_sacos_sal=?, lote_observaciones=?, usuario_id=?
      WHERE lote_id = ?`,
      [tipo_id, vehiculo_id, chofer_id, lote_codigo, lote_fecha_ingreso, lote_hora_ingreso,
      proveedor_id, lote_libras_remitidas, lote_peso_promedio, lote_n_piscina, lote_n_bines,
      lote_n_gavetas_conicas, lote_n_gavetas_caladas, lote_n_sacos_hielo, lote_n_sacos_metasulfito,
      lote_n_sacos_sal, lote_observaciones, usuario_id, id]
    );

    if (result.affectedRows <= 0) return res.status(404).json({ message: "Lote no encontrado" });

    const [rows] = await conmysql.query('SELECT * FROM lote WHERE lote_id=?', [id]);
    global._io.emit("lote_actualizado", rows[0]);

    res.json(rows[0]);
  } catch (error) {
    console.error("Error putLote:", error);
    return res.status(500).json({ message: error.message });
  }
};

// PATCH
export const pathLote = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      tipo_id, vehiculo_id, chofer_id, lote_codigo, lote_fecha_ingreso, lote_hora_ingreso,
      proveedor_id, lote_libras_remitidas, lote_peso_promedio, lote_n_piscina, lote_n_bines,
      lote_n_gavetas_conicas, lote_n_gavetas_caladas, lote_n_sacos_hielo, lote_n_sacos_metasulfito,
      lote_n_sacos_sal, lote_observaciones, usuario_id
    } = req.body;

    const [result] = await conmysql.query(
      `UPDATE lote SET
        tipo_id = IFNULL(?, tipo_id), vehiculo_id = IFNULL(?, vehiculo_id), chofer_id = IFNULL(?, chofer_id),
        lote_codigo = IFNULL(?, lote_codigo), lote_fecha_ingreso = IFNULL(?, lote_fecha_ingreso),
        lote_hora_ingreso = IFNULL(?, lote_hora_ingreso), proveedor_id = IFNULL(?, proveedor_id),
        lote_libras_remitidas = IFNULL(?, lote_libras_remitidas), lote_peso_promedio = IFNULL(?, lote_peso_promedio),
        lote_n_piscina = IFNULL(?, lote_n_piscina), lote_n_bines = IFNULL(?, lote_n_bines),
        lote_n_gavetas_conicas = IFNULL(?, lote_n_gavetas_conicas), lote_n_gavetas_caladas = IFNULL(?, lote_n_gavetas_caladas),
        lote_n_sacos_hielo = IFNULL(?, lote_n_sacos_hielo), lote_n_sacos_metasulfito = IFNULL(?, lote_n_sacos_metasulfito),
        lote_n_sacos_sal = IFNULL(?, lote_n_sacos_sal), lote_observaciones = IFNULL(?, lote_observaciones),
        usuario_id = IFNULL(?, usuario_id)
      WHERE lote_id = ?`,
      [tipo_id, vehiculo_id, chofer_id, lote_codigo, lote_fecha_ingreso, lote_hora_ingreso,
      proveedor_id, lote_libras_remitidas, lote_peso_promedio, lote_n_piscina, lote_n_bines,
      lote_n_gavetas_conicas, lote_n_gavetas_caladas, lote_n_sacos_hielo, lote_n_sacos_metasulfito,
      lote_n_sacos_sal, lote_observaciones, usuario_id, id]
    );

    if (result.affectedRows <= 0) return res.status(404).json({ message: "Lote no encontrado" });

    const [rows] = await conmysql.query('SELECT * FROM lote WHERE lote_id=?', [id]);
    global._io.emit("lote_actualizado", rows[0]);

    res.json(rows[0]);
  } catch (error) {
    console.error("Error pathLote:", error);
    return res.status(500).json({ message: error.message });
  }
};

// DELETE
export const deleteLote = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await conmysql.query('DELETE FROM lote WHERE lote_id=?', [id]);

    if (rows.affectedRows <= 0) return res.status(404).json({ id: 0, message: "Lote no encontrado" });

    res.sendStatus(202);
  } catch (error) {
    console.error("Error deleteLote:", error);
    return res.status(500).json({ message: error.message });
  }
};
