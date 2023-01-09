import { Router } from "express";
import { deleteDap, getDaps, postDap, putDap, getDap } from "../controller/dapController";

const router = Router();

router.get('/', getDaps);
router.get('/:id', getDap);
router.post('/', postDap);
router.put('/:id', putDap);
router.delete('/:id', deleteDap);

export default router;