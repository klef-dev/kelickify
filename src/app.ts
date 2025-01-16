import configureOpenAPI from "@/lib/configure-open-api";
import createApp from "@/lib/create-app";
import employees from "@/routes/employees/employees.index";
import index from "@/routes/index.route";

const app = createApp();

configureOpenAPI(app);

const routes = [index, employees] as const;

routes.forEach((route) => {
  app.route("/", route);
});

export type AppType = (typeof routes)[number];

export default app;
