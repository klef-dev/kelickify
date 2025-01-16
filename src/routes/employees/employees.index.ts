import { createRouter } from "@/lib/create-app";

import * as handlers from "./employees.handlers";
import * as routes from "./employees.routes";

const router = createRouter()
  .openapi(routes.create, handlers.create)
  .openapi(routes.getAll, handlers.getAll)
  .openapi(routes.getOne, handlers.getOne);

export default router;
