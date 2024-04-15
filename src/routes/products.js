import { Router } from "express";
import { uploader } from "../utils.js";
import { passportCall } from "../middlewares/auth/passportCall.js";
import productsController from "../controllers/products.js";
import { applyPolicy } from "../middlewares/policies/policies.js";

const router = Router();
router.get("/mockingproducts", productsController.mockingProducts);
router.use(passportCall("jwt"));
router.get("/categories", applyPolicy(["PUBLIC"]), productsController.productCategories);

router.get("/", applyPolicy(["PUBLIC"]), productsController.getProducts);

router.get("/:pid", applyPolicy(["PUBLIC"]), productsController.getProductById);

router.post("/", applyPolicy(["ADMIN", "PREMIUM"]), uploader.array("thumbnail"), productsController.addProduct);

router.put("/:pid", applyPolicy(["ADMIN", "PREMIUM"]), productsController.updateProduct);

router.delete("/:pid", applyPolicy(["ADMIN", "PREMIUM"]), productsController.deleteProduct);

export default router;
