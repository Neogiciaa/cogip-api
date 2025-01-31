import connexion from "../database-config.js";

 export const getAllCompanies = async () => {
    try {
        const [companies] = await connexion.query('SELECT * FROM companies');
        return companies;
    } catch (error) {
        throw new Error(error.message);
    }
};

 export const getCompanyById = async (id) => {
    try {
        const [result] = await connexion.query('SELECT * FROM companies WHERE id = ?', [id]);
        return result;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getPaginatedCompanies = async (limit, offset) => {
    try {
        const parsedLimit = parseInt(limit, 10);
        const parsedOffset = parseInt(offset, 10);

        const [result] = await connexion.query(`SELECT * FROM companies ORDER BY name ASC LIMIT ${parsedLimit} OFFSET ${parsedOffset}`);
        return result;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const removeCompany = async (id) => {
    try {
        const [result] = await connexion.query('DELETE FROM companies WHERE id = ?', [id]);
        return result.affectedRows > 0;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const updateCompany = async (id, { name, type_id, country, tva }) => {
    try {
        const [result] = await connexion.query(
            `UPDATE companies 
             SET name = ?, type_id = ?, country = ?, tva = ? 
             WHERE id = ?`,
            [name, type_id, country, tva, id]
        );
        return result.affectedRows > 0;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const createCompany = async ({ name, type_id, country, tva }) => {
    try {
        const [result] = await connexion.query(
            `INSERT INTO companies (name, type_id, country, tva) 
             VALUES (?, ?, ?, ?)`,
            [name, type_id, country, tva]
        );
        return result.insertId;
    } catch (error) {
        throw new Error(error.message);
    }
};
