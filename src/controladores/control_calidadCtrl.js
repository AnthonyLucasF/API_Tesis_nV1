/* import { conmysql } from "../db.js";

// SELECT: Obtener todos los registros
export const getControl_Calidad =
    async (req, res) => {
        try {
            const [result] = await conmysql.query('SELECT * FROM control_calidad');
            res.json(result);
        } catch (error) {
            return res.status(500).json({ message: "Error al consultar Control de Calidad" });
        }
    };

// SELECT por ID
export const getControl_Calidadxid =
    async (req, res) => {
        try {
            const [result] = await conmysql.query('SELECT * FROM control_calidad WHERE c_calidad_id=?', [req.params.id]);
            if (result.length <= 0) return res.status(404).json({ 
                c_calidad_id: 0,
                message: "Control de Calidad no encontrada" 
            });
            res.json(result[0]);
        } catch (error) {
            return res.status(500).json({ message: "Error del Servidor" });
        }
    };

// INSERT: Crear un nuevo registro
export const postControl_Calidad =
    async (req, res) => {
        try {
            const { usuario_id, lote_id , tipo_id , clase_id , c_calidad_hora_control, c_calidad_talla_real, c_calidad_talla_marcada, c_calidad_peso_bruto,
                    c_calidad_peso_neto, c_calidad_cuenta_x_libra, c_calidad_total, c_calidad_uniformidad, c_calidad_olor, c_calidad_sabor, c_calidad_observaciones,
                    defectos_id } = req.body;

            const [rows] = await conmysql.query(
                `INSERT INTO control_calidad 
                    (usuario_id, lote_id , tipo_id , clase_id , c_calidad_hora_control, c_calidad_talla_real, c_calidad_talla_marcada, c_calidad_peso_bruto,
                    c_calidad_peso_neto, c_calidad_cuenta_x_libra, c_calidad_total, c_calidad_uniformidad, c_calidad_olor, c_calidad_sabor, c_calidad_observaciones,
                    defectos_id)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [usuario_id, lote_id , tipo_id , clase_id , c_calidad_hora_control, c_calidad_talla_real, c_calidad_talla_marcada, c_calidad_peso_bruto,
                    c_calidad_peso_neto, c_calidad_cuenta_x_libra, c_calidad_total, c_calidad_uniformidad, c_calidad_olor, c_calidad_sabor, c_calidad_observaciones,
                    defectos_id]
            );

            res.json({
                id: rows.insertId,
                message: " registrada con éxito"
            });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };

// UPDATE: Actualizar un registro completo
export const putControl_Calidad =
    async (req, res) => {
        try {
            const { id } = req.params;
            const { usuario_id, lote_id , tipo_id , clase_id , c_calidad_hora_control, c_calidad_talla_real, c_calidad_talla_marcada, c_calidad_peso_bruto,
                    c_calidad_peso_neto, c_calidad_cuenta_x_libra, c_calidad_total, c_calidad_uniformidad, c_calidad_olor, c_calidad_sabor, c_calidad_observaciones,
                    defectos_id } = req.body;

            const [result] = await conmysql.query(
                `UPDATE control_calidad SET 
                    estado=?, lote=?, cantidad=?, id_proveedor=?, id_usuario=?  
                WHERE c_calidad_id = ?`,
                [usuario_id, lote_id , tipo_id , clase_id , c_calidad_hora_control, c_calidad_talla_real, c_calidad_talla_marcada, c_calidad_peso_bruto,
                    c_calidad_peso_neto, c_calidad_cuenta_x_libra, c_calidad_total, c_calidad_uniformidad, c_calidad_olor, c_calidad_sabor, c_calidad_observaciones,
                    defectos_id, id]
            );

            if (result.affectedRows <= 0) return res.status(404).json({ message: "Control de Calidad no encontrada" });

            const [rows] = await conmysql.query('SELECT * FROM control_calidad WHERE c_calidad_id=?', [id])
            res.json(rows[0])

            //res.json({ message: "Materia Prima actualizada con éxito" });
            res.json({
                success: true,
                message: "Control de Calidad registrada con éxito",
                data: { id: rows.insertId }
              });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };

// UPDATE parcial: Actualizar algunos campos
export const pathControl_Calidad =
    async (req, res) => {
        try {
            const { id } = req.params;
            const { usuario_id, lote_id , tipo_id , clase_id , c_calidad_hora_control, c_calidad_talla_real, c_calidad_talla_marcada, c_calidad_peso_bruto,
                    c_calidad_peso_neto, c_calidad_cuenta_x_libra, c_calidad_total, c_calidad_uniformidad, c_calidad_olor, c_calidad_sabor, c_calidad_observaciones,
                    defectos_id } = req.body;

            const [result] = await conmysql.query(
                `UPDATE control_calidad SET 
                    usuario_id = IFNULL(?, usuario_id), lote_id = IFNULL(?, lote_id), tipo_id = IFNULL(?, tipo_id), clase_id = IFNULL(?, clase_id), c_calidad_hora_control = IFNULL(?, c_calidad_hora_control), c_calidad_talla_real = IFNULL(?, c_calidad_talla_real), c_calidad_talla_marcada = IFNULL(?, c_calidad_talla_marcada), c_calidad_peso_bruto = IFNULL(?, c_calidad_peso_bruto), c_calidad_peso_neto = IFNULL(?, c_calidad_peso_neto), c_calidad_cuenta_x_libra = IFNULL(?, c_calidad_cuenta_x_libra), c_calidad_total = IFNULL(?, c_calidad_total), c_calidad_uniformidad = IFNULL(?, c_calidad_uniformidad), c_calidad_olor = IFNULL(?, c_calidad_olor), c_calidad_sabor = IFNULL(?, c_calidad_sabor), c_calidad_observaciones = IFNULL(?, c_calidad_observaciones), defectos_id = IFNULL(?, defectos_id)
                WHERE c_calidad_id=?`,
                [usuario_id, lote_id , tipo_id , clase_id , c_calidad_hora_control, c_calidad_talla_real, c_calidad_talla_marcada, c_calidad_peso_bruto,
                    c_calidad_peso_neto, c_calidad_cuenta_x_libra, c_calidad_total, c_calidad_uniformidad, c_calidad_olor, c_calidad_sabor, c_calidad_observaciones,
                    defectos_id, id]
            );

            if (result.affectedRows <= 0) return res.status(404).json({ message: "Control de Calidad no encontrada" });

            const [rows] = await conmysql.query('SELECT * FROM control_calidad WHERE c_calidad_id=?', [id])
            res.json(rows[0])

            res.json({ message: "Control de Calidad actualizada parcialmente" });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };

// DELETE: Eliminar un registro
export const deleteControl_Calidad =
    async (req, res) => {
        try {
            const { id } = req.params;
            const [rows] = await conmysql.query('DELETE FROM control_calidad WHERE c_calidad_id=?', [id]);

            if (rows.affectedRows <= 0) return res.status(404).json({ 
                id: 0,
                message: "Control de Calidad no encontrada" 
            });

            res.sendStatus(202); // Código HTTP 202 (Accepted)
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };
 */

import { conmysql } from "../db.js";

// SELECT: Obtener todos los registros
export const getControl_Calidad = async (req, res) => {
  try {
    const [result] = await conmysql.query('SELECT * FROM control_calidad');
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: "Error al consultar Control de Calidad" });
  }
};

// SELECT por ID
export const getControl_Calidadxid = async (req, res) => {
  try {
    const [result] = await conmysql.query('SELECT * FROM control_calidad WHERE c_calidad_id=?', [req.params.id]);
    if (result.length <= 0) {
      return res.status(404).json({ c_calidad_id: 0, message: "Control de Calidad no encontrado" });
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: "Error del Servidor" });
  }
};

// INSERT
export const postControl_Calidad = async (req, res) => {
  try {
    const {
      usuario_id, lote_id, tipo_id, clase_id,
      c_calidad_hora_control, c_calidad_talla_real, c_calidad_talla_marcada,
      c_calidad_peso_bruto, c_calidad_peso_neto, c_calidad_cuenta_x_libra,
      c_calidad_total, c_calidad_uniformidad, c_calidad_olor, c_calidad_sabor,
      c_calidad_observaciones, defectos_id
    } = req.body;

    const [rows] = await conmysql.query(
      `INSERT INTO control_calidad 
      (usuario_id, lote_id, tipo_id, clase_id, c_calidad_hora_control, c_calidad_talla_real,
       c_calidad_talla_marcada, c_calidad_peso_bruto, c_calidad_peso_neto, c_calidad_cuenta_x_libra,
       c_calidad_total, c_calidad_uniformidad, c_calidad_olor, c_calidad_sabor, c_calidad_observaciones, defectos_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        usuario_id, lote_id, tipo_id, clase_id,
        c_calidad_hora_control, c_calidad_talla_real, c_calidad_talla_marcada,
        c_calidad_peso_bruto, c_calidad_peso_neto, c_calidad_cuenta_x_libra,
        c_calidad_total, c_calidad_uniformidad, c_calidad_olor, c_calidad_sabor,
        c_calidad_observaciones, defectos_id
      ]
    );

    const nuevoRegistro = { c_calidad_id: rows.insertId, ...req.body };
    global._io.emit("control_calidad_nuevo", nuevoRegistro);

    res.json({ id: rows.insertId, message: "Control de Calidad registrado con éxito" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// UPDATE
export const putControl_Calidad = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      usuario_id, lote_id, tipo_id, clase_id,
      c_calidad_hora_control, c_calidad_talla_real, c_calidad_talla_marcada,
      c_calidad_peso_bruto, c_calidad_peso_neto, c_calidad_cuenta_x_libra,
      c_calidad_total, c_calidad_uniformidad, c_calidad_olor, c_calidad_sabor,
      c_calidad_observaciones, defectos_id
    } = req.body;

    const [result] = await conmysql.query(
      `UPDATE control_calidad SET 
        usuario_id=?, lote_id=?, tipo_id=?, clase_id=?, c_calidad_hora_control=?, c_calidad_talla_real=?,
        c_calidad_talla_marcada=?, c_calidad_peso_bruto=?, c_calidad_peso_neto=?, c_calidad_cuenta_x_libra=?,
        c_calidad_total=?, c_calidad_uniformidad=?, c_calidad_olor=?, c_calidad_sabor=?, c_calidad_observaciones=?,
        defectos_id=?
      WHERE c_calidad_id=?`,
      [
        usuario_id, lote_id, tipo_id, clase_id,
        c_calidad_hora_control, c_calidad_talla_real, c_calidad_talla_marcada,
        c_calidad_peso_bruto, c_calidad_peso_neto, c_calidad_cuenta_x_libra,
        c_calidad_total, c_calidad_uniformidad, c_calidad_olor, c_calidad_sabor,
        c_calidad_observaciones, defectos_id, id
      ]
    );

    if (result.affectedRows <= 0) return res.status(404).json({ message: "Control de Calidad no encontrado" });

    const [rows] = await conmysql.query('SELECT * FROM control_calidad WHERE c_calidad_id=?', [id]);
    global._io.emit("control_calidad_actualizado", rows[0]);

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// PATCH
export const pathControl_Calidad = async (req, res) => {
  try {
    const { id } = req.params;
    const campos = Object.keys(req.body);
    const valores = Object.values(req.body);

    const setClause = campos.map(c => `${c} = IFNULL(?, ${c})`).join(', ');
    const [result] = await conmysql.query(
      `UPDATE control_calidad SET ${setClause} WHERE c_calidad_id = ?`,
      [...valores, id]
    );

    if (result.affectedRows <= 0) return res.status(404).json({ message: "Control de Calidad no encontrado" });

    const [rows] = await conmysql.query('SELECT * FROM control_calidad WHERE c_calidad_id=?', [id]);
    global._io.emit("control_calidad_actualizado", rows[0]);

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// DELETE
export const deleteControl_Calidad = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await conmysql.query('DELETE FROM control_calidad WHERE c_calidad_id=?', [id]);

    if (rows.affectedRows <= 0) return res.status(404).json({
      id: 0,
      message: "Control de Calidad no encontrado"
    });

    global._io.emit("control_calidad_eliminado", { c_calidad_id: parseInt(id) });
    res.status(202).json({ message: "Control de Calidad eliminado con éxito" });

    res.sendStatus(202);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

