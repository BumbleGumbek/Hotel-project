import { signInAPI, signUpAPI } from "../../api/auth";

const normalizeUserLogin = (payload) => {
  if (!payload || typeof payload !== "object") return null;

  const user = payload.user;
  const id = user && (user.id ?? user._id);
  if (
    typeof payload.token !== "string" ||
    !payload.token ||
    !user ||
    typeof user !== "object" ||
    id === undefined ||
    id === null ||
    String(id).trim() === ""
  ) {
    return null;
  }

  const safeUser = { ...user };
  delete safeUser.password;
  return {
    token: payload.token,
    user: safeUser,
  };
};

const normalizeRegisteredUser = (response) => {
  const user = response && response.user;
  const id = user && (user.id ?? user._id);
  if (
    !user ||
    typeof user !== "object" ||
    id === undefined ||
    id === null ||
    String(id).trim() === ""
  ) {
    return null;
  }

  const safeUser = { ...user };
  delete safeUser.password;
  return {
    message: response.message,
    user: safeUser,
  };
};

const state = () => ({
  userRegister: {},
  userLogin: {},
});

const mutations = {
  setUserRegisterMutation(state, payload) {
    state.userRegister = payload;
  },
  setUserLoginMutation(state, payload) {
    const userLogin = normalizeUserLogin(payload);
    if (!userLogin) {
      throw new TypeError("Phản hồi đăng nhập không hợp lệ.");
    }
    localStorage.setItem("userLogin", JSON.stringify(userLogin));
    state.userLogin = userLogin;
  },
  setUserLoginFromLocalStorage(state, payload) {
    state.userLogin = normalizeUserLogin(payload) || {};
  },
};

const actions = {
  async signUpAction({ commit }, { data }) {
    const response = await signUpAPI(data);
    const userRegister = normalizeRegisteredUser(response);
    if (!userRegister) {
      throw new TypeError("Phản hồi đăng ký không hợp lệ.");
    }
    commit("setUserRegisterMutation", userRegister);
    return userRegister;
  },
  async signInAction({ commit }, { data }) {
    const response = await signInAPI(data);
    const userLogin = normalizeUserLogin(response);
    if (!userLogin) {
      throw new TypeError("Phản hồi đăng nhập không hợp lệ.");
    }
    commit("setUserLoginMutation", userLogin);
    return userLogin;
  },
  loadUserLoginFromLocalStorageAction({ commit }) {
    const storedLogin = localStorage.getItem("userLogin");
    if (!storedLogin) {
      commit("setUserLoginFromLocalStorage", {});
      return;
    }

    let parsedLogin;
    try {
      parsedLogin = JSON.parse(storedLogin);
    } catch {
      localStorage.removeItem("userLogin");
      commit("setUserLoginFromLocalStorage", {});
      return;
    }

    const userLogin = normalizeUserLogin(parsedLogin);
    if (!userLogin) {
      localStorage.removeItem("userLogin");
      commit("setUserLoginFromLocalStorage", {});
      return;
    }

    commit("setUserLoginMutation", userLogin);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
