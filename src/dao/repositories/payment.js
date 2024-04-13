import Stripe from "stripe";
import config from "../../config/config.js";

export default class PaymentService {
  constructor() {
    this.payment = new Stripe(config.stripe.secretApiKey);
  }
  async createPaymentIntent(data) {
    const paymentItent = await this.payment.paymentIntents.create(data);
    return paymentItent;
  }
}
