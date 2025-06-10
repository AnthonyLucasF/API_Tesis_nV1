import { conmysql } from "../db.js";

// SELECT: Obtener todos los registros
export const getProveedor =
    async (req, res) => {
        try {
            const [result] = await conmysql.query('SELECT * FROM proveedor');
            res.json(result);
        } catch (error) {
            return res.status(500).json({ message: "Error al consultar Proveedores" });
        }
    };

// SELECT por ID
export const getProveedorxid =
    async (req, res) => {
        try {
            const [result] = await conmysql.query('SELECT * FROM proveedor WHERE proveedor_id = ?', [req.params.id]);
            if (result.length <= 0) {
                return res.status(404).json({
                    proveedor_id: 0,
                    message: "Proveedor no encontrado"
                });
            }
            res.json(result[0]);
        } catch (error) {
            return res.status(500).json({ message: "Error del Servidor" });
        }
    };

// INSERT: Crear un nuevo registro
export const postProveedor =
    async (req, res) => {
        try {
            const { proveedor_ruc, proveedor_codigo, proveedor_nombre, proveedor_camaronera, proveedor_contacto, proveedor_direccion } = req.body;

            const [rows] = await conmysql.query(
                `INSERT INTO proveedor 
                    (proveedor_ruc, proveedor_codigo, proveedor_nombre, proveedor_camaronera, proveedor_contacto, proveedor_direccion) 
                VALUES (?, ?, ?, ?, ?, ?)`,
                [proveedor_ruc, proveedor_codigo, proveedor_nombre, proveedor_camaronera, proveedor_contacto, proveedor_direccion]
            );

            res.json({
                id: rows.insertId,
                message: "Proveedor registrado con éxito"
            });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };

// UPDATE: Actualizar un registro completo
export const putProveedor =
    async (req, res) => {
        try {
            const { id } = req.params;
            const { proveedor_ruc, proveedor_codigo, proveedor_nombre, proveedor_camaronera, proveedor_contacto, proveedor_direccion } = req.body;

            const [result] = await conmysql.query(
                `UPDATE proveedor SET 
                    proveedor_ruc = ?, proveedor_codigo = ?, proveedor_nombre = ?, proveedor_camaronera = ?, proveedor_contacto = ?, proveedor_direccion = ?
                WHERE proveedor_id = ?`,
                [proveedor_ruc, proveedor_codigo, proveedor_nombre, proveedor_camaronera, proveedor_contacto, proveedor_direccion, id]
            );

            if (result.affectedRows <= 0) {
                return res.status(404).json({ message: "Proveedor no encontrado" });
            }

            const [rows] = await conmysql.query('SELECT * FROM proveedor WHERE proveedor_id = ?', [id]);
            res.json(rows[0]);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };

// UPDATE parcial: Actualizar algunos campos
export const pathProveedor =
    async (req, res) => {
        try {
            const { id } = req.params;
            const { proveedor_ruc, proveedor_codigo, proveedor_nombre, proveedor_camaronera, proveedor_contacto, proveedor_direccion } = req.body;

            const [result] = await conmysql.query(
                `UPDATE proveedor SET 
                    proveedor_ruc = IFNULL(?, proveedor_ruc), proveedor_codigo = IFNULL(?, proveedor_codigo), proveedor_nombre = IFNULL(?, proveedor_nombre), proveedor_camaronera = IFNULL(?, proveedor_camaronera), proveedor_contacto = IFNULL(?, proveedor_contacto), 
                    proveedor_direccion = IFNULL(?, proveedor_direccion)
                WHERE proveedor_id = ?`,
                [proveedor_ruc, proveedor_codigo, proveedor_nombre, proveedor_camaronera, proveedor_contacto, proveedor_direccion, id]
            );

            if (result.affectedRows <= 0) {
                return res.status(404).json({ message: "Proveedor no encontrado" });
            }

            const [rows] = await conmysql.query('SELECT * FROM proveedor WHERE proveedor_id = ?', [id]);
            res.json(rows[0]);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };

// DELETE: Eliminar un registro
export const deleteProveedor =
    async (req, res) => {
        try {
            const { id } = req.params;
            const [rows] = await conmysql.query('DELETE FROM proveedor WHERE proveedor_id = ?', [id]);

            if (rows.affectedRows <= 0) {
                return res.status(404).json({
                    proveedor_id: 0,
                    message: "Proveedor no encontrado"
                });
            }

            res.sendStatus(202); // Código HTTP 202 (Accepted)
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };
