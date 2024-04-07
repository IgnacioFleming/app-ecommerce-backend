import ProductsRepository from "../dao/repositories/products.js";
import CartsRepository from "../dao/repositories/carts.js";
import { productsPersistence, cartsPersistence } from "../dao/factory.js";
import MailingService from "./mails/mailingService.js";
import MessageRepository from "../dao/repositories/messages.js";
import MessageManager from "../dao/MongoDB/messageManager.mongoDB.js";
import UsersRepository from "../dao/repositories/users.js";
import UserManager from "../dao/MongoDB/userManager.mongoDB.js";

export const productsService = new ProductsRepository(new productsPersistence());
export const cartsService = new CartsRepository(new cartsPersistence());
export const mailingService = new MailingService();
export const messageService = new MessageRepository(new MessageManager());
export const userService = new UsersRepository(new UserManager());
