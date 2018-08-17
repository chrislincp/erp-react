import menus from "./menus";

const getRoutes = (menu, data) => {
  let arr = data.length ? data : [];
  let children = [];
  let hasChild = false;
  menu.forEach(item => {
      if (item.children && item.children.length) {
          hasChild = true;
          children = children.concat(item.children);
      } else {
         arr.push(item);
      }
  });
  return hasChild ? getRoutes(children, arr) : arr;
}

const Routes = getRoutes(menus, []);


export default Routes;