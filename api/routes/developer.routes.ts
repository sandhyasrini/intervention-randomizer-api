import { Router } from "express";
const router = Router();
import {
  addDeveloper,
  editDeveloper,
  findAllDevelopers,
} from "../controller/developer.controller";

router.get("/getDevelopers", findAllDevelopers);

router.post("/addDeveloper", addDeveloper);
router.put("/editDeveloper", editDeveloper);

export default router;
