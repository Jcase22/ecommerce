import express from 'express';
import axios from 'axios';
import Stripe from 'stripe';
import cors from 'cors';
import dotenv from 'dotenv'
import { keyBy } from '../src/utils/utils.js'

const app = express();
const port = 3000
app.use(express.static("public"));
app.use(express.json());
app.use(cors())
dotenv.config()

const stripe = new Stripe(process.env.SERVER_KEY)

const calcOrderAmount = async (items) => {

  let amount = 0;

  const itemKeys = Object.keys(items);
  let prices = [];

  try {
    const pricesRes = await stripe.prices.list()
    prices = pricesRes.data;
  } catch (error) {
    console.log(error)
  }

  const pricesKeyedByProductId = keyBy(prices, "product")

  itemKeys.forEach((productId) => {
    amount += pricesKeyedByProductId[productId].unit_amount * items[productId]
  })

  return amount
}


app.get('/products', async (req, res) => {

  try {
    const data = await stripe.products.list()
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send('Error fetching data');
    console.log(error)
  }

})

app.get('/prices', async (req, res) => {
  try {
    const data = await stripe.prices.list()
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send('Error fetching data');
    console.log(error)
  }
})

app.post('/createPaymentIntent', async (req, res) => {

  const items = req.body;

  const amount = await calcOrderAmount(items)

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
    });

    res.send({
      clientSecret: paymentIntent.client_secret
    })
  } catch (error) {
    res.status(500).send('Error fetching data')
    console.log(error)
  }
})


app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})