import { createRoles, getRolesByUserId, removeRole, updateRoles } from '../models/rolesModel.js'

export const getRolesForUser = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const roles = await getRolesByUserId(userId);

        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createRole = async (req, res) => {
    try {
        const { name } = req.body;

        const role = await createRoles({ name });

        res.status(200).json(role);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

export const updateRole = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;

        const updated = await updateRoles(id, { name });
        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const deleteRole = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await removeRole(id);

        if (!deleted) {
            return res.status(500).json({message: 'No roles found'});
        }
        res.status(200).json(deleted);
    } catch (error) {
        res.status(500).json(error);
    }
};