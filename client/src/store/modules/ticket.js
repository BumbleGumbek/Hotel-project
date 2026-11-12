import { getTicketListByUserAPI } from "../../api/ticket";

const state = () => {
  return {
    roomsByUser: [],
  };
};

const mutations = {
  setTicketListByUserMutation(state, payload) {
    const data = payload.map((item) => ({
      ...(item.room || {}),
      _id: item.id,
      bookingId: item.id,
      roomId: item.roomId,
      checkIn: item.checkIn,
      checkOut: item.checkOut,
    }));
    state.roomsByUser = data;
  },
};

const actions = {
  async getTicketListByUserAction({ commit }, payload) {
    const data = await getTicketListByUserAPI(payload);
    commit("setTicketListByUserMutation", data);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
