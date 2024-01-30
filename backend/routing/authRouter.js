import express from "express";
import { validate } from "../middlewares/validate.js";
import { registrationController, loginController } from "../controllers/authControllers.js";

const router = express.Router();

router.post('/register', validate('registration'), registrationController);
router.post('/', validate('authorization'), loginController);

export default router;