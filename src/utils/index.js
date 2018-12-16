import store from "../store";

const Utils = {
  auth() {
    return sessionStorage.getItem('admin_token') ? true : false;
  },
  logout() {
      sessionStorage.removeItem('admin_token');
      sessionStorage.removeItem('userInfo');
  },
  login(token, userInfo) {
    sessionStorage.setItem('admin_token', token);
    sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
    store.dispatch.user.setUserInfo(userInfo);
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
  trim(val) {
      return val.replace(/\s+/g, '');     
  }
}

export default Utils;