<template>
  <section class="hotel-room-list luxury-room-list">
    <div class="luxury-list-heading">
      <div class="heading-left">
        <h2>Danh sách phòng nghỉ</h2>
        <span v-if="category" class="active-category-tag">
          Hạng: {{ category }}
        </span>
      </div>

      <div class="heading-right">
        <span class="count-badge">
          <strong>{{ filteredRoomList.length }}</strong> phòng phù hợp
        </span>
      </div>
    </div>

    <!-- Đang tải -->
    <div v-if="isLoading" class="luxury-room-empty">
      <div class="empty-icon-wrapper">
        <i class="im im-icon-Loading-3"></i>
      </div>
      <h3>Đang tải danh sách phòng...</h3>
      <p>Vui lòng chờ trong giây lát.</p>
    </div>

    <!-- Lỗi API -->
    <div v-else-if="loadError" class="luxury-room-empty">
      <div class="empty-icon-wrapper">
        <i class="im im-icon-Information"></i>
      </div>
      <h3>Không thể tải danh sách phòng</h3>
      <p>{{ loadError }}</p>
    </div>

    <!-- Có phòng -->
    <div v-else-if="filteredRoomList.length > 0" class="luxury-room-grid">
      <room-list-items
        v-for="(room, index) in filteredRoomList"
        :key="room._id || room.id || index"
        :room="room"
        :index="index"
      />
    </div>

    <!-- API thành công nhưng không có phòng phù hợp -->
    <div v-else class="luxury-room-empty">
      <div class="empty-icon-wrapper">
        <i class="im im-icon-Home"></i>
      </div>
      <h3>Không tìm thấy phòng phù hợp</h3>
      <p>
        Không có phòng nào khớp với tiêu chí tìm kiếm hiện tại.
        Quý khách vui lòng thử chọn hạng phòng khác hoặc xóa từ khóa tìm kiếm.
      </p>
    </div>
  </section>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import RoomListItems from "./RoomListItems.vue";

export default {
  name: "RoomList",

  components: {
    RoomListItems,
  },

  props: {
    keyword: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      default: "",
    },
  },

  setup(props) {
    const store = useStore();

    const roomList = computed(() => store.state.rooms.roomList || []);
    const isLoading = computed(() => store.state.rooms.isLoadingRoomList);
    const loadError = computed(() => store.state.rooms.roomListError || "");

    const filteredRoomList = computed(() => {
      let list = roomList.value;

      if (props.category) {
        const cat = props.category.trim().toLowerCase();

        list = list.filter((room) => {
          const name = (room.name || "").toLowerCase();
          const desc = (room.description || "").toLowerCase();

          return name.includes(cat) || desc.includes(cat);
        });
      }

      const search = props.keyword.trim().toLowerCase();

      if (search) {
        list = list.filter((room) => {
          const name = (room.name || "").toLowerCase();
          const desc = (room.description || "").toLowerCase();

          return name.includes(search) || desc.includes(search);
        });
      }

      return list;
    });

    return {
      filteredRoomList,
      isLoading,
      loadError,
    };
  },
};
</script>


<style lang="scss" scoped>
.luxury-room-list {
  width: 100%;

  .luxury-list-heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 25px;
    padding-bottom: 15px;
    border-bottom: 1px solid rgba(223, 186, 115, 0.25);

    .heading-left {
      display: flex;
      align-items: center;
      gap: 12px;

      h2 {
        margin: 0;
        font-size: 22px;
        font-weight: 700;
        color: #2b2520;
      }

      .active-category-tag {
        font-size: 12px;
        font-weight: 600;
        color: #b38e44;
        background: rgba(223, 186, 115, 0.15);
        padding: 3px 10px;
        border-radius: 12px;
      }
    }

    .heading-right {
      .count-badge {
        font-size: 14px;
        color: #6d645a;

        strong {
          color: #b38e44;
          font-size: 16px;
        }
      }
    }
  }

  .luxury-room-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 28px;
  }

  .luxury-room-empty {
    padding: 70px 25px;
    text-align: center;
    background: #ffffff;
    border-radius: 14px;
    border: 1px dashed rgba(223, 186, 115, 0.4);
    box-shadow: 0 4px 20px rgba(43, 37, 32, 0.04);
    max-width: 600px;
    margin: 30px auto;

    .empty-icon-wrapper {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: rgba(223, 186, 115, 0.15);
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 16px auto;

      i {
        color: #b38e44;
        font-size: 26px;
      }
    }

    h3 {
      font-size: 20px;
      font-weight: 700;
      color: #2b2520;
      margin: 0 0 10px 0;
    }

    p {
      color: #7a7065;
      font-size: 14px;
      line-height: 1.6;
      margin: 0;
    }
  }

  @media (max-width: 991px) {
    .luxury-room-grid {
      grid-template-columns: 1fr;
      gap: 22px;
    }
  }

  @media (max-width: 767px) {
    .luxury-list-heading {
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;

      .heading-left {
        h2 {
          font-size: 18px;
        }
      }
    }
  }
}
</style>
