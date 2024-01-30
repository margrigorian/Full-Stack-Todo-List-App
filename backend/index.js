import express from "express";
import cors from "cors";
import authRouter from "./routing/authRouter.js";
import expeditionsRouter from "./routing/expeditionsRouter.js"

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());
app.use('/', authRouter);
app.use('/expeditions', expeditionsRouter);

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
})
