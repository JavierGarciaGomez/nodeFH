import authRouter from "./auth";
import categoriesRouter from "./categories";
import rolesRouter from "./roles";
import usersRouter from "./users";
import productsRouter from "./products";
import searchRouter from "./search";

export const routers = {
  auth: authRouter,
  categories: categoriesRouter,
  roles: rolesRouter,
  users: usersRouter,
  products: productsRouter,
  search: searchRouter,
};
