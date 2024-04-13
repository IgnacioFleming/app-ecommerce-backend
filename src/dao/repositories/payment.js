import Stripe from "stripe";
import config from "../../config/config.js";
export default class PaymentService {
  constructor() {
    this.payment = Stripe(config.stripe.secretApiKey);
  }
  async createPaymentIntent(data) {
    const paymentIntent = await this.payment.paymentIntents.create(data);
    return paymentIntent;
  }
}
