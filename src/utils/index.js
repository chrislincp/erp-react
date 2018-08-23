
const Utils = {
  auth() {
    return sessionStorage.getItem('admin_token') ? true : false;
  },
  recursionKeys(key, data) {
    let menu = {};
    let children = [];
    data.forEach((item) => {
        if (item.key === key) {
            menu = item;
        } else {
            if (item.children && item.children.length) {
                children = children.concat(item.children);
            }
        }
    });
    return Object.keys(menu).length ? menu : this.recursionKeys(key, children);
  },
}

export default Utils;