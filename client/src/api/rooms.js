import axiosAPI from ".";

export const getRoomListByLoactionAPI = (locationId) => {
  const url = locationId
    ? `/api/rooms?locationId=${locationId}`
    : "/api/rooms";

  return axiosAPI.get(url);
};

export const getRoomDetailAPI = (roomId) => {
  return axiosAPI.get(`/api/rooms/${roomId}`);
};

export const bookingRoomAPI = (data) => {
  const { token } = JSON.parse(localStorage.getItem("userLogin"));
  return axiosAPI.post("/api/rooms/booking", data, {
    headers: {
      token,
    },
  });
};
