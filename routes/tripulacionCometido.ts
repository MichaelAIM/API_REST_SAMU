import { Router } from "express";
import { getTripulacionCometido } from "../controller/tripulacionCometidoController";
import { validarJWT } from "../middlewares/validarJWT";

const router = Router();

// router.get('/',[ validarJWT ], getTripulacionTurnos);
router.get('/disponibles',[ validarJWT ], getTripulacionCometido);
// router.get('/:id',[ validarJWT ], getTripulacionTurno);
// router.post('/',[ validarJWT ], postTripulacionTurno);
// router.put('/:id',[ validarJWT ], putTripulacionTurno);
// router.delete('/:id',[ validarJWT ], deleteTripulacionTurno);

export default router;