import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { auth } from 'express-oauth2-jwt-bearer'

const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());

const jwtCheck = auth({
    issuerBaseURL: process.env.AUTH0_ISSUER,
    audience: `${process.env.AUTH0_ISSUER}/api/v2/`,
    tokenSigningAlg: 'RS256',
});

app.use(jwtCheck);

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send({ message: 'Hello World!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
