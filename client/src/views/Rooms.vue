<template>
  <div id="wrapper" class="luxury-rooms-page">
    <div class="container margin-top-40 margin-bottom-60">
      <!-- Tiêu đề trang phong cách Modern Luxury -->
      <div class="row">
        <div class="col-md-12">
          <div class="luxury-rooms-header">
            <span class="luxury-header-eyebrow">Trải nghiệm lưu trú</span>
            <h1 class="luxury-header-title">Khám phá các hạng phòng</h1>
            <div class="luxury-header-divider"></div>
            <p class="luxury-header-desc">
              Không gian nghỉ dưỡng tinh tế, mang đến sự thoải mái trong từng khoảnh khắc.
            </p>
          </div>
        </div>
      </div>

      <!-- Thanh tìm kiếm phòng & Bộ lọc hạng phòng -->
      <section class="luxury-filter-section">
        <div class="row">
          <div class="col-md-12">
            <!-- Ô tìm kiếm từ khóa -->
            <div class="luxury-search-box">
              <i class="im im-icon-Magnifying-Glass2 search-icon"></i>
              <input
                type="text"
                placeholder="Tìm kiếm theo tên phòng hoặc tiện nghi..."
                v-model="keyword"
              />
              <button
                v-if="keyword"
                class="clear-keyword-btn"
                type="button"
                @click="keyword = ''"
              >
                <i class="im im-icon-Close"></i>
              </button>
            </div>

            <!-- Bộ lọc 4 nút: Tất cả, VIP, Cao cấp, Tiêu chuẩn -->
            <div class="luxury-filter-tabs">
              <button
                type="button"
                class="luxury-tab-btn"
                :class="{ active: selectedCategory === '' }"
                @click="selectedCategory = ''"
              >
                <i class="im im-icon-Home"></i>
                <span>Tất cả phòng</span>
              </button>

              <button
                type="button"
                class="luxury-tab-btn"
                :class="{ active: selectedCategory === 'VIP' }"
                @click="selectedCategory = 'VIP'"
              >
                <i class="im im-icon-Crown"></i>
                <span>Hạng VIP</span>
                <span class="tab-count">2 phòng</span>
              </button>

              <button
                type="button"
                class="luxury-tab-btn"
                :class="{ active: selectedCategory === 'Cao cấp' }"
                @click="selectedCategory = 'Cao cấp'"
              >
                <i class="im im-icon-Star"></i>
                <span>Hạng Cao cấp</span>
                <span class="tab-count">4 phòng</span>
              </button>

              <button
                type="button"
                class="luxury-tab-btn"
                :class="{ active: selectedCategory === 'Tiêu chuẩn' }"
                @click="selectedCategory = 'Tiêu chuẩn'"
              >
                <i class="im im-icon-Check"></i>
                <span>Hạng Tiêu chuẩn</span>
                <span class="tab-count">7 phòng</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Danh sách phòng -->
      <room-list :keyword="keyword" :category="selectedCategory" />
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import RoomList from "../components/rooms/RoomList.vue";

export default {
  name: "Rooms",
  components: {
    RoomList,
  },

  setup() {
    const store = useStore();
    const route = useRoute();
    const keyword = ref("");
    const selectedCategory = ref("");

    // Khởi tạo bộ lọc nếu có query param ?type=... từ Banner / ThePlaces
    if (route.query && route.query.type) {
      selectedCategory.value = route.query.type;
    }

    watch(
      () => route.query.type,
      (newType) => {
        selectedCategory.value = newType || "";
      }
    );

    onMounted(async () => {
    const locationId = route.params.locationId;

    try {
      await store.dispatch("rooms/getRoomListAction", locationId);
      console.log("Danh sách phòng từ Backend:", store.state.rooms.roomList);
    } catch (error) {
      console.error("Lỗi lấy danh sách phòng:", error);
    }
  });

    return {
      keyword,
      selectedCategory,
    };
  },
};
</script>

<style scoped lang="scss">
.luxury-rooms-page {
  background-color: #faf8f5;
  min-height: 100vh;
  padding-top: 10px;

  .luxury-rooms-header {
    text-align: center;
    max-width: 760px;
    margin: 10px auto 35px auto;

    .luxury-header-eyebrow {
      display: inline-block;
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 2.5px;
      text-transform: uppercase;
      color: #b38e44;
      margin-bottom: 8px;
    }

    .luxury-header-title {
      font-size: 36px;
      font-weight: 700;
      color: #2b2520;
      letter-spacing: -0.5px;
      margin: 0 0 14px 0;
    }

    .luxury-header-divider {
      width: 50px;
      height: 2px;
      background: #dfba73;
      margin: 0 auto 16px auto;
    }

    .luxury-header-desc {
      font-size: 16px;
      color: #6d645a;
      line-height: 1.6;
      margin: 0;
    }
  }

  .luxury-filter-section {
    margin-bottom: 35px;

    .luxury-search-box {
      position: relative;
      max-width: 650px;
      margin: 0 auto 22px auto;

      .search-icon {
        position: absolute;
        left: 20px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 18px;
        color: #b38e44;
        pointer-events: none;
      }

      input {
        width: 100%;
        height: 52px;
        padding: 0 45px 0 52px;
        border: 1px solid rgba(223, 186, 115, 0.4);
        border-radius: 30px;
        background: #ffffff;
        color: #2b2520;
        font-size: 14px;
        box-shadow: 0 4px 18px rgba(43, 37, 32, 0.05);
        outline: none;
        transition: all 0.3s ease;

        &:focus {
          border-color: #b38e44;
          box-shadow: 0 6px 22px rgba(223, 186, 115, 0.2);
        }

        &::placeholder {
          color: #a3988c;
        }
      }

      .clear-keyword-btn {
        position: absolute;
        right: 18px;
        top: 50%;
        transform: translateY(-50%);
        background: none;
        border: none;
        color: #a3988c;
        cursor: pointer;
        font-size: 14px;
        padding: 4px;
        display: flex;
        align-items: center;
        justify-content: center;

        &:hover {
          color: #2b2520;
        }
      }
    }

    .luxury-filter-tabs {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;

      .luxury-tab-btn {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 10px 22px;
        background: #ffffff;
        border: 1px solid rgba(223, 186, 115, 0.35);
        border-radius: 30px;
        color: #5c5248;
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.25s ease;
        box-shadow: 0 2px 8px rgba(43, 37, 32, 0.03);

        i {
          font-size: 14px;
          color: #b38e44;
          transition: color 0.25s ease;
        }

        .tab-count {
          font-size: 11px;
          font-weight: 500;
          color: #8c7e70;
          background: #f4eee6;
          padding: 2px 8px;
          border-radius: 10px;
          transition: all 0.25s ease;
        }

        &:hover {
          border-color: #b38e44;
          color: #2b2520;
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(43, 37, 32, 0.08);
        }

        &.active {
          background: #2b2520;
          border-color: #2b2520;
          color: #dfba73;
          box-shadow: 0 6px 18px rgba(43, 37, 32, 0.18);

          i {
            color: #dfba73;
          }

          .tab-count {
            background: rgba(223, 186, 115, 0.25);
            color: #dfba73;
          }
        }
      }
    }
  }

  @media (max-width: 991px) {
    .luxury-rooms-header {
      .luxury-header-title {
        font-size: 30px;
      }
    }
  }

  @media (max-width: 767px) {
    .luxury-rooms-header {
      margin-bottom: 25px;

      .luxury-header-title {
        font-size: 24px;
      }

      .luxury-header-desc {
        font-size: 14px;
      }
    }

    .luxury-filter-section {
      margin-bottom: 25px;

      .luxury-search-box {
        input {
          height: 48px;
          font-size: 13px;
        }
      }

      .luxury-filter-tabs {
        gap: 8px;

        .luxury-tab-btn {
          padding: 8px 16px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
