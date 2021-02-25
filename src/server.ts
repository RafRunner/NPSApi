import express, { Response, Request, Server } from 'express';

const app: Server = express();
const port: Number = 3333;

app.get("/", (req : Request, res: Response) => {
	return res.json({
		"message": "Hello World - NLW04"
	});
})

app.post("/", (req: Request, res: Response) => {
	return res.json({
		"message": "The date was saved successfully!"
	})
});

app.listen(port, () => console.log(`Server is listening at port ${port}`))
