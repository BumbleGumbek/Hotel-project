import {
  bookingRoomAPI,
  getRoomDetailAPI,
  getRoomListByLoactionAPI,
} from "../../api/rooms";

const state = () => {
  return {
    roomList: [],
    roomDetail: {},
    isLoadingRoomList: false,
    roomListError: "",
  };
};

const mutations = {
  setRoomListMutation(state, payload) {
    state.roomList = payload;
  },
  setRoomDetailMutation(state, payload) {
    state.roomDetail = payload;
  },
};

const actions = {
  async getRoomListAction({ commit, state }, payload) {
    state.isLoadingRoomList = true;
    state.roomListError = "";

    try {
      const data = await getRoomListByLoactionAPI(payload);
      commit("setRoomListMutation", Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Lỗi lấy danh sách phòng:", error);
      commit("setRoomListMutation", []);
      state.roomListError =
        "Hệ thống hiện chưa thể kết nối để lấy danh sách phòng. Quý khách vui lòng thử lại sau.";
    } finally {
      state.isLoadingRoomList = false;
    }
  },
  async getRoomDetailAction({ commit }, payload) {
    const roomDetail = await getRoomDetailAPI(payload);
    commit("setRoomDetailMutation", roomDetail);
  },
  async bookingRoomAction(_, { data }) {
    return bookingRoomAPI(data);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
