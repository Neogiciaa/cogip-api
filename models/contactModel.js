import connexion from "../database-config.js";

export const getAllContacts = async () => {
    try {
        const [contact] = await connexion.query('SELECT * FROM contacts');
        return contact;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getPaginatedContacts = async (limit, offset) => {
    try {
        const parsedLimit = parseInt(limit, 10);
        const parsedOffset = parseInt(offset, 10);

        const [result] = await connexion.query(`SELECT c.name, c.phone, c.email, co.name AS company
                                                FROM contacts AS c
                                                JOIN companies AS co ON c.company_id = co.id
                                                ORDER BY c.name ASC
                                                LIMIT ${parsedLimit} OFFSET ${parsedOffset};`);
        return result;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const deleteContact = async (id) => {
    try {
        const [result] = await connexion.query('DELETE FROM contacts WHERE id = ?', [id]);
        return result.affectedRows > 0;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const editContact = async (id, { name, company_id, email, phone }) => {
    try {
        const [result] = await connexion.query(
            `UPDATE contacts 
             SET  name = ?, company_id = ?, email = ?, phone = ?
             WHERE id = ?`,
            [name, company_id, email, phone]
        );

        return result.affectedRows > 0;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const createContact = async ({ name, company_id, email, phone }) => {
    try {
        const [result] = await connexion.query(
            `INSERT INTO contacts (name, company_id, email, phone) 
             VALUES (?, ?, ?, ?`,
            [name, company_id, email, phone]
        );

        return result.insertId;
    } catch (error) {
        throw new Error(error.message);
    }
};
