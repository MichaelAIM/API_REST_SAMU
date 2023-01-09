import { Router } from "express";
import { deleteTurno, getTurno, getTurnos, postTurno, putTurno, getTurnoDisponible } from "../controller/turnoController";
import { validarJWT } from "../middlewares/validarJWT";

const router = Router();


router.get('/',[ validarJWT ], getTurnos);
router.get('/disponibles',[ validarJWT ], getTurnoDisponible);
router.get('/:id',[ validarJWT ], getTurno);
router.post('/',[ validarJWT ], postTurno);
router.put('/:id',[ validarJWT ], putTurno);
router.delete('/:id',[ validarJWT ], deleteTurno);

export default router;