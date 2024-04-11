import Stripe from "stripe";
import config from "../../config/config.js";
// const Stripe = require("stripe")(config.stripe.secretApiKey);
export default class PaymentService {
  constructor() {
    this.payment = Stripe(config.stripe.secretApiKey);
  }
  async createPaymentIntent(data) {
    // console.log(ata);
    const paymentIntent = await this.payment.paymentIntents.create(data);
    return paymentIntent;
  }
}
