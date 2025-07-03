import express from 'express';
const app = express();
app.get('/', (req,res)=>res.send('hi'));
app.listen(5050, ()=>console.log('5050 running'));
