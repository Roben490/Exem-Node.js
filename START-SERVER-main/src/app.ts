import express, { Express } from 'express'
import 'dotenv/config'
import router from './routers/router';
import { connectToMongo } from './DB/DB';
import loadInitialData from './helpers/seed';
import cookieParser from 'cookie-parser';
import cors from 'cors'


const app: Express = express();


app.use(cors({
    origin: "http://localhost:5173",
    credentials: true  
}));



connectToMongo()

loadInitialData()
app.use(cookieParser())
app.use(express.json())
app.use(router)

app.listen(process.env.PORT || 8000, () => {
    console.log(`listening on Port ${process.env.PORT || 8000}`);  
})
