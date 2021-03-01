import { app } from "./app";

const port: Number = Number.parseInt(process.env.PORT) || 3333;

app.listen(port, () => console.log(`Server is listening at port ${port}`))
