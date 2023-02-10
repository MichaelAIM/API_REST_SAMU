import { Router } from "express";
import { deleteTripulacionTurno, getTripulacionTurno, getTripulacionTurnos, postTripulacionTurno, putTripulacionTurno, getTripulacionTurnoDisponible, postAllripulacionTurno } from "../controller/tripulacionTurnoController";
import { validarJWT } from "../middlewares/validarJWT";

const router = Router();

router.get('/',[ validarJWT ], getTripulacionTurnos);
router.get('/disponibles',[ validarJWT ], getTripulacionTurnoDisponible);
router.get('/:id',[ validarJWT ], getTripulacionTurno);
router.post('/',[ validarJWT ], postTripulacionTurno);
router.post('/all',[ validarJWT ], postAllripulacionTurno);
router.put('/:id',[ validarJWT ], putTripulacionTurno);
router.delete('/:id',[ validarJWT ], deleteTripulacionTurno);

export default router;