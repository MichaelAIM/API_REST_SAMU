import { Router } from "express";
import { deleteSolicitud, getSolicitud, getSolicitudes, postSolicitud, putSolicitud, getSolicitudesDisponibles, CloseSolicitud } from "../controller/solicitudController";
import { validarJWT } from "../middlewares/validarJWT";

const router = Router();


router.get('/', getSolicitudes);
router.get('/disponibles',[ validarJWT ], getSolicitudesDisponibles);
router.get('/:id',[ validarJWT ], getSolicitud);
router.post('/',[ validarJWT ], postSolicitud);
router.put('/:id',[ validarJWT ], putSolicitud);
router.put('/cerrar/:id',[ validarJWT ], CloseSolicitud);
router.delete('/:id',[ validarJWT ], deleteSolicitud);

export default router;