import { Router } from "express";
import { deleteQtr, getQtrs, postQtr, putQtr, getQtr, postQtrs, getQtrsCometido } from "../controller/qtrsController";
import { validarJWT } from "../middlewares/validarJWT";

const router = Router();

router.get('/',[ validarJWT ], getQtrs);
router.get('/:id',[ validarJWT ], getQtr);
router.put('/comQtr/:id',[ validarJWT ], getQtrsCometido);
router.post('/',[ validarJWT ], postQtr);
router.post('/array',[ validarJWT ], postQtrs);
router.put('/:id',[ validarJWT ], putQtr);
router.delete('/:id',[ validarJWT ], deleteQtr);

export default router;