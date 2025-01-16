import { createRouter } from "@/lib/create-app";

import * as handlers from "./cpf.handlers";
import * as routes from "./cpf.routes";

const router = createRouter().openapi(routes.calculate, handlers.calculate);

export default router;
