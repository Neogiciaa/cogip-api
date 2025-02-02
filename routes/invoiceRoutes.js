import express from "express";
import {
    createOneInvoice,
    deleteInvoice,
    getAllInvoices,
    updateOneInvoice,
    getOneInvoice,
    getPaginatedSortedInvoices
} from "../controllers/invoiceController.js";

const router = express.Router();

router.get('/invoice', getAllInvoices );
router.get('/paginatedInvoices/:limit/:offset', getPaginatedSortedInvoices);
router.get('/invoice/:id', getOneInvoice);
router.put('/invoice/:id', updateOneInvoice );
router.post('/invoice', createOneInvoice );
router.delete('/invoice/:id', deleteInvoice );

export default router;
