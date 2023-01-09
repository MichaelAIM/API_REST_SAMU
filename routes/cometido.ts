import { Router } from "express";
import { deleteCometido, getCometidos, postCometido, putCometido, getCometido, getLogCometidosDia } from "../controller/cometidoController";
import { validarJWT } from "../middlewares/validarJWT";

const router = Router();

router.get('/',[ validarJWT ], getCometidos);
router.get('/:id',[ validarJWT ], getCometido);
router.get('/Turno/dia',[ validarJWT ], getLogCometidosDia);
router.post('/',[ validarJWT ], postCometido);
router.put('/:id',[ validarJWT ], putCometido);
router.put('/delete/:id',[ validarJWT ], deleteCometido);

export default router;
