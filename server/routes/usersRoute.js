import { Express } from "express";

import { signin, signup } from "../controllers/userController";

const router = Express.Router();

router.post("/signin", signin);
router.post("/signup ", signup);
export default router;
