
const Utils = {
  auth() {
    return sessionStorage.getItem('admin_token') ? true : false;
  },
}

export default Utils;