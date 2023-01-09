import { Router } from "express";
import { deletePaciente, getPacientes, postPaciente, putPaciente, getPaciente } from "../controller/pacienteController";

const router = Router();

router.get('/', getPacientes);
router.get('/:id', getPaciente);
router.post('/', postPaciente);
router.put('/:id', putPaciente);
router.delete('/:id', deletePaciente);

export default router;