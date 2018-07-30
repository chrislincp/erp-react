import Home from "../views/home";
import Test from "../views/test";
import More from "../views/more";

const routes = [
  {path: '/admin/home', component: Home},
  {path: '/admin/test', component: Test},
  {path: '/admin/more/test1', component: More.Test1},
  {path: '/admin/more/test2', component: More.Test2},
]

export default routes;