import { Router } from "express";
import { createPreference } from "../controllers/mercadopagoController";

const router = Router();

router.post('/create-preference', createPreference);

export default router