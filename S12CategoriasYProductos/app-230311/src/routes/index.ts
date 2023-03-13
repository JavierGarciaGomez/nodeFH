import authRouter from "./auth";
import categoriesRouter from "./categories";
import rolesRouter from "./roles";
import usersRouter from "./users";

export const routers = {
  auth: authRouter,
  categories: categoriesRouter,
  roles: rolesRouter,
  users: usersRouter,
};
