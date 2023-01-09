import { Router } from "express";
import { deleteFuncionario, getFuncionarios, postFuncionario, putFuncionario, getFuncionario, getFuncionariosDisponibles, getFuncionariosRut } from "../controller/funcionarioController";
import { validarJWT } from "../middlewares/validarJWT";

const router = Router();

router.get('/',[ validarJWT ], getFuncionarios);
router.get('/disponibles',[ validarJWT ], getFuncionariosDisponibles);
router.get('/:id',[ validarJWT ], getFuncionario);
router.get('/rut/:id',[ validarJWT ], getFuncionariosRut);
router.post('/',[ validarJWT ], postFuncionario);
router.put('/:id',[ validarJWT ], putFuncionario);
router.delete('/:id',[ validarJWT ], deleteFuncionario);

export default router;