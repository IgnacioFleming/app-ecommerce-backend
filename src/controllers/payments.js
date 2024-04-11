import { paymentService } from "../services/index.js";

const createPaymentIntent = async (req, res) => {
  const { amount, currency } = req.body;
  const paymentIntent = await paymentService.createPaymentIntent({ amount, currency });
  res.send({ clientSecret: paymentIntent.client_secret });
};

export default { createPaymentIntent };
