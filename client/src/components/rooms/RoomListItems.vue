<template>
  <div class="luxury-room-card-wrapper">
    <div
      class="luxury-room-item-card"
      :class="{ 'room-card-disabled': !roomId }"
      :aria-disabled="!roomId"
      @click="handleClickRoom"
    >
      <!-- Media: Ảnh phòng lớn, sắc nét -->
      <div class="luxury-room-media">
        <img
          :src="computedRoomImage"
          :alt="room.name"
          loading="lazy"
          @error="handleImageError"
        />

        <!-- Badge hạng phòng -->
        <span class="luxury-room-badge" :class="roomCategoryClass">
          {{ roomCategoryName }}
        </span>

        <!-- Lớp gradient bảo vệ ánh sáng -->
        <div class="media-overlay"></div>
      </div>

      <!-- Content -->
      <div class="luxury-room-content">
        <div class="luxury-room-header">
          <div class="header-main">
            <span class="luxury-tier-label">{{ roomCategoryName }}</span>
            <h3 class="luxury-room-title">{{ room.name }}</h3>
          </div>
          <div class="luxury-price-box">
            <span class="price-amount">{{ formatPrice(room.price) }}</span>
            <span class="price-unit">VNĐ / đêm</span>
          </div>
        </div>

        <!-- Thông số phòng thực tế từ API: Sức chứa, phòng ngủ, phòng tắm -->
        <div class="luxury-room-meta">
          <span v-if="room.guests" class="meta-item">
            <i class="im im-icon-Male-2"></i>
            {{ room.guests }} khách
          </span>

          <span v-if="room.bedRoom" class="meta-item">
            <i class="im im-icon-Sleeping"></i>
            {{ room.bedRoom }} phòng ngủ
          </span>

          <span v-if="room.bath" class="meta-item">
            <i class="im im-icon-Bathtub"></i>
            {{ room.bath }} phòng tắm
          </span>
        </div>

        <!-- Mô tả phòng nếu có từ dữ liệu -->
        <p v-if="room.description" class="luxury-room-description">
          {{ room.description }}
        </p>

        <!-- Tiện nghi thực tế từ dữ liệu phòng -->
        <div class="luxury-room-amenities" v-if="hasAmenities">
          <span v-if="room.wifi" class="amenity-tag" title="Wifi tốc độ cao">
            <i class="im im-icon-Wifi"></i> Wifi
          </span>
          <span v-if="room.pool" class="amenity-tag" title="Hồ bơi">
            <i class="im im-icon-Swimming"></i> Hồ bơi
          </span>
          <span
            v-if="room.hotTub"
            class="amenity-tag"
            title="Bồn tắm nước nóng"
          >
            <i class="im im-icon-Bathtub"></i> Bồn nước nóng
          </span>
          <span v-if="room.cableTV" class="amenity-tag" title="Truyền hình cáp">
            <i class="im im-icon-Old-TV"></i> TV Cáp
          </span>
          <span v-if="room.elevator" class="amenity-tag" title="Thang máy">
            <i class="im im-icon-Building"></i> Thang máy
          </span>
          <span v-if="room.heating" class="amenity-tag" title="Hệ thống sưởi">
            <i class="im im-icon-Sun"></i> Sưởi ấm
          </span>
        </div>

        <!-- Nút hành động -->
        <div class="luxury-room-footer">
          <button
            type="button"
            class="luxury-detail-btn"
            :disabled="!roomId"
            @click.stop="handleClickRoom"
          >
            <span>Xem chi tiết</span>
            <i class="im im-icon-Right-2"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "RoomListItems",
  props: {
    room: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      default: 0,
    },
  },

  setup(props) {
    const router = useRouter();

    const roomId = computed(() =>
      props.room.id !== undefined && props.room.id !== null
        ? props.room.id
        : props.room._id
    );

    const handleClickRoom = () => {
      if (
        roomId.value === undefined ||
        roomId.value === null ||
        roomId.value === ""
      ) {
        return;
      }

      router.push({
        name: "RoomDetail",
        params: { roomId: roomId.value },
      });
    };

    // Xác định hạng phòng dựa trên tên hoặc mô tả trong dữ liệu thực
    const roomCategoryName = computed(() => {
      const name = (props.room.name || "").toLowerCase();
      const desc = (props.room.description || "").toLowerCase();

      if (name.includes("vip") || desc.includes("vip")) {
        return "Hạng VIP";
      }
      if (
        name.includes("cao cấp") ||
        desc.includes("cao cấp") ||
        name.includes("premium")
      ) {
        return "Hạng Cao cấp";
      }
      return "Hạng Tiêu chuẩn";
    });

    const roomCategoryClass = computed(() => {
      if (roomCategoryName.value === "Hạng VIP") return "tier-vip";
      if (roomCategoryName.value === "Hạng Cao cấp") return "tier-premium";
      return "tier-standard";
    });

    // Ưu tiên ảnh trong /images/hotel/ theo từng hạng phòng và bộ ảnh VIP
    const computedRoomImage = computed(() => {
      if (props.room.image && !props.room.image.includes("listing-item")) {
        return props.room.image;
      }

      if (roomCategoryName.value === "Hạng VIP") {
        const vipGallery = [
          "/images/hotel/room-vip-suite.jpg",
          "/images/hotel/room-vip-bedroom.jpg",
          "/images/hotel/room-vip-lounge.jpg",
          "/images/hotel/room-vip.jpg",
        ];
        return vipGallery[props.index % vipGallery.length];
      }

      if (roomCategoryName.value === "Hạng Cao cấp") {
        return "/images/hotel/room-premium.jpg";
      }

      return "/images/hotel/room-standard.jpg";
    });

    const handleImageError = (e) => {
      e.target.src = "/images/hotel/room-detail.jpg";
    };

    const hasAmenities = computed(() => {
      return (
        props.room.wifi ||
        props.room.pool ||
        props.room.hotTub ||
        props.room.cableTV ||
        props.room.elevator ||
        props.room.heating
      );
    });

    const formatPrice = (val) => {
      if (!val && val !== 0) return "Liên hệ";
      return Number(val).toLocaleString("vi-VN");
    };

    return {
      roomId,
      handleClickRoom,
      roomCategoryName,
      roomCategoryClass,
      computedRoomImage,
      handleImageError,
      hasAmenities,
      formatPrice,
    };
  },
};
</script>

<style scoped lang="scss">
.luxury-room-card-wrapper {
  width: 100%;
}

.luxury-room-item-card {
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid rgba(223, 186, 115, 0.25);
  box-shadow: 0 8px 24px rgba(43, 37, 32, 0.05);
  transition: all 0.35s ease;
  cursor: pointer;
  height: 100%;

  &:hover {
    transform: translateY(-6px);
    border-color: rgba(223, 186, 115, 0.5);
    box-shadow: 0 16px 36px rgba(43, 37, 32, 0.12);

    .luxury-room-media img {
      transform: scale(1.05);
    }

    .luxury-detail-btn {
      background: #2b2520;
      color: #dfba73;
      border-color: #2b2520;

      i {
        transform: translateX(4px);
      }
    }
  }

  .luxury-room-media {
    position: relative;
    width: 100%;
    height: 250px;
    overflow: hidden;
    background-color: #e9e3da;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
    }

    .media-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.15) 0%,
        rgba(0, 0, 0, 0) 40%,
        rgba(0, 0, 0, 0.25) 100%
      );
      pointer-events: none;
    }

    .luxury-room-badge {
      position: absolute;
      top: 14px;
      left: 14px;
      z-index: 2;
      padding: 5px 14px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.5px;
      backdrop-filter: blur(6px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

      &.tier-vip {
        background: rgba(30, 25, 20, 0.85);
        color: #dfba73;
        border: 1px solid rgba(223, 186, 115, 0.4);
      }

      &.tier-premium {
        background: rgba(43, 37, 32, 0.85);
        color: #f7ecd7;
        border: 1px solid rgba(223, 186, 115, 0.25);
      }

      &.tier-standard {
        background: rgba(56, 50, 44, 0.8);
        color: #ffffff;
        border: 1px solid rgba(255, 255, 255, 0.2);
      }
    }
  }

  .luxury-room-content {
    padding: 22px 24px 20px 24px;
    display: flex;
    flex-direction: column;
    flex: 1;

    .luxury-room-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 16px;
      margin-bottom: 12px;

      .header-main {
        flex: 1;

        .luxury-tier-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: #b38e44;
          display: block;
          margin-bottom: 4px;
        }

        .luxury-room-title {
          font-size: 20px;
          font-weight: 700;
          color: #2b2520;
          margin: 0;
          line-height: 1.35;
        }
      }

      .luxury-price-box {
        text-align: right;
        white-space: nowrap;

        .price-amount {
          display: block;
          font-size: 20px;
          font-weight: 700;
          color: #b38e44;
          line-height: 1.2;
        }

        .price-unit {
          font-size: 12px;
          color: #8c7e70;
        }
      }
    }

    .luxury-room-meta {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 14px;
      flex-wrap: wrap;

      .meta-item {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-size: 13px;
        color: #63574c;
        background: #faf7f2;
        padding: 4px 10px;
        border-radius: 6px;
        border: 1px solid rgba(223, 186, 115, 0.15);

        i {
          color: #b38e44;
          font-size: 14px;
        }
      }
    }

    .luxury-room-description {
      font-size: 13.5px;
      color: #6d645a;
      line-height: 1.55;
      margin: 0 0 16px 0;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .luxury-room-amenities {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 18px;
      flex: 1;
      align-content: flex-start;

      .amenity-tag {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        font-size: 12px;
        color: #70655a;
        background: #fdfcf9;
        border: 1px solid #ebd9c0;
        padding: 3px 9px;
        border-radius: 4px;

        i {
          font-size: 11px;
          color: #b38e44;
        }
      }
    }

    .luxury-room-footer {
      border-top: 1px solid #f2ece3;
      padding-top: 14px;
      display: flex;
      justify-content: flex-end;
      align-items: center;

      .luxury-detail-btn {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 9px 20px;
        border-radius: 22px;
        font-size: 13px;
        font-weight: 600;
        color: #2b2520;
        background: #faf6f0;
        border: 1px solid rgba(223, 186, 115, 0.4);
        cursor: pointer;
        transition: all 0.3s ease;

        i {
          font-size: 11px;
          transition: transform 0.3s ease;
        }
      }
    }
  }

  @media (max-width: 600px) {
    .luxury-room-media {
      height: 200px;
    }

    .luxury-room-content {
      padding: 18px 16px 16px 16px;

      .luxury-room-header {
        flex-direction: column;
        gap: 8px;

        .luxury-price-box {
          text-align: left;
        }
      }

      .luxury-room-meta {
        gap: 8px;
      }
    }
  }
}
</style>
