import { Router } from "express";
import { deleteAmbulancia, getAmbulancia, getAmbulancias, postAmbulancia, putAmbulancia, getAmbulanciasDisponible, putAmbulanciaEstado, getAllAmbulanciasDisponible,  } from "../controller/ambulanciaController";
import { validarJWT } from '../middlewares/validarJWT';

const router = Router();

router.get('/',[ validarJWT ], getAmbulancias);
router.get('/disponibles',[ validarJWT ], getAmbulanciasDisponible);
router.get('/all_disponibles',[ validarJWT ], getAllAmbulanciasDisponible);
router.get('/:id',[ validarJWT ], getAmbulancia);
router.post('/',[ validarJWT ], postAmbulancia);
router.put('/:id',[ validarJWT ], putAmbulancia);
router.put('/estados/:id',[ validarJWT ], putAmbulanciaEstado);
router.delete('/:id',[ validarJWT ], deleteAmbulancia);

export default router;