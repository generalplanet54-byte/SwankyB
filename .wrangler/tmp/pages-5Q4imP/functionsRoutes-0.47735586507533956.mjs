import { onRequestPost as __api_admin_change_password_ts_onRequestPost } from "/workspaces/SwankyB/functions/api/admin/change-password.ts"
import { onRequestPost as __api_admin_generate_article_ts_onRequestPost } from "/workspaces/SwankyB/functions/api/admin/generate-article.ts"
import { onRequestGet as __api_admin_me_ts_onRequestGet } from "/workspaces/SwankyB/functions/api/admin/me.ts"
import { onRequestGet as __api_articles_d1_ts_onRequestGet } from "/workspaces/SwankyB/functions/api/articles-d1.ts"
import { onRequestPost as __api_login_ts_onRequestPost } from "/workspaces/SwankyB/functions/api/login.ts"
import { onRequestPost as __api_logout_ts_onRequestPost } from "/workspaces/SwankyB/functions/api/logout.ts"
import { onRequestGet as __api_products_d1_ts_onRequestGet } from "/workspaces/SwankyB/functions/api/products-d1.ts"
import { onRequest as __api_affiliate_click_ts_onRequest } from "/workspaces/SwankyB/functions/api/affiliate-click.ts"
import { onRequest as __api_site_info_ts_onRequest } from "/workspaces/SwankyB/functions/api/site-info.ts"

export const routes = [
    {
      routePath: "/api/admin/change-password",
      mountPath: "/api/admin",
      method: "POST",
      middlewares: [],
      modules: [__api_admin_change_password_ts_onRequestPost],
    },
  {
      routePath: "/api/admin/generate-article",
      mountPath: "/api/admin",
      method: "POST",
      middlewares: [],
      modules: [__api_admin_generate_article_ts_onRequestPost],
    },
  {
      routePath: "/api/admin/me",
      mountPath: "/api/admin",
      method: "GET",
      middlewares: [],
      modules: [__api_admin_me_ts_onRequestGet],
    },
  {
      routePath: "/api/articles-d1",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_articles_d1_ts_onRequestGet],
    },
  {
      routePath: "/api/login",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_login_ts_onRequestPost],
    },
  {
      routePath: "/api/logout",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_logout_ts_onRequestPost],
    },
  {
      routePath: "/api/products-d1",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_products_d1_ts_onRequestGet],
    },
  {
      routePath: "/api/affiliate-click",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_affiliate_click_ts_onRequest],
    },
  {
      routePath: "/api/site-info",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_site_info_ts_onRequest],
    },
  ]