import {
    getAllCompanies,
    removeCompany,
    updateCompany,
    createCompany,
    getCompanyById,
    getPaginatedCompanies
} from "../models/companyModel.js";
import {getPaginatedInvoices} from "../models/invoiceModel.js";

export const getCompanies = async (req, res) => {
    try {
        const companies = await getAllCompanies();

        if (!companies) {
            return res.status(500).json({ message: "No companies found." });
        }
        res.status(200).json(companies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getOneCompany = async (req, res) => {
    try {
        const { id } = req.params;
        const company = await getCompanyById(id);

        if (!company) {
            return res.status(500).json({message: "No company found."});
        }
        res.status(200).json(company);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getPaginatedSortedCompanies = async (req, res) => {
    try {
        const { limit, offset } = req.params;

        const datas = await getPaginatedCompanies(limit, offset);

        if (!datas.length) {
            return res.status(500).json({message:"No companies found"});
        }

        res.status(200).json(datas);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const deleteCompany = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await removeCompany(id);

        if (!deleted) {
            return res.status(500).json({ message: "Company not found." });
        }
        res.status(200).json({ message: "Company deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateOneCompany = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, type_id, country, tva } = req.body;

        const updated = await updateCompany(id, { name, type_id, country, tva });

        if (!updated) {
            return res.status(404).json({ message: "Company not found" });
        }

        res.status(200).json({ message: "Company updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createOneCompany = async (req, res) => {
    try {
        const { name, type_id, country, tva } = req.body;

        const companyId = await createCompany({ name, type_id, country, tva });

        res.status(201).json({
            message: "Company created successfully",
            companyId: companyId
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

