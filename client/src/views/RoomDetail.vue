<template>
  <div id="wrapper" class="luxury-room-detail-page">
    <div class="container luxury-detail-container">
      <!-- Breadcrumbs -->
      <nav class="luxury-breadcrumbs">
        <router-link to="/">Trang chủ</router-link>
        <span class="breadcrumb-separator"><i class="im im-icon-Right-2"></i></span>
        <router-link to="/rooms">Danh sách phòng</router-link>
        <span class="breadcrumb-separator"><i class="im im-icon-Right-2"></i></span>
        <span class="current">{{ hasRoomData ? roomDetail.name : "Chi tiết phòng" }}</span>
      </nav>

      <!-- Trạng thái 1: Đang tải dữ liệu -->
      <section v-if="isLoading" class="luxury-detail-state-card">
        <div class="state-icon-spinner">
          <i class="im im-icon-Loading-3"></i>
        </div>
        <h3 class="state-title">Đang tải thông tin phòng nghỉ...</h3>
        <p class="state-desc">Vui lòng chờ trong giây lát trong khi chúng tôi chuẩn bị thông tin phòng cho quý khách.</p>
      </section>

      <!-- Trạng thái 2: Lỗi API hoặc không tìm thấy phòng (Không render khung đặt phòng / thông tin giả) -->
      <section v-else-if="loadError || !hasRoomData" class="luxury-detail-state-card error-state">
        <div class="state-icon-wrapper">
          <i class="im im-icon-Information"></i>
        </div>
        <h3 class="state-title">Không tìm thấy thông tin phòng nghỉ</h3>
        <p class="state-desc">
          {{ loadError || "Phòng nghỉ quý khách yêu cầu hiện không tồn tại hoặc đã thay đổi trên hệ thống." }}
        </p>
        <div class="state-actions">
          <router-link to="/rooms" class="state-action-btn primary">
            <i class="im im-icon-Left-2"></i>
            <span>Xem danh sách phòng khác</span>
          </router-link>
          <router-link to="/" class="state-action-btn secondary">
            <span>Trở về trang chủ</span>
          </router-link>
        </div>
      </section>

      <!-- Trạng thái 3: Đã có dữ liệu phòng hợp lệ từ API -->
      <div v-else class="luxury-detail-content-wrapper">
        <!-- Room Header -->
        <header class="luxury-detail-header">
          <div class="luxury-detail-header-left">
            <span class="luxury-detail-tier-badge" :class="roomCategoryClass">
              {{ roomCategoryName }}
            </span>
            <h1 class="luxury-detail-title">
              {{ roomDetail.name }}
            </h1>
            <div v-if="roomDetail.locationId && roomDetail.locationId.province" class="luxury-detail-location">
              <i class="im im-icon-Location-2"></i>
              <span>{{ roomDetail.locationId.province }}</span>
            </div>
          </div>

          <div class="luxury-detail-header-price">
            <span class="price-from">Giá phòng</span>
            <span class="price-val">{{ formatPrice(roomDetail.price) }}</span>
            <span class="price-unit">VNĐ / đêm</span>
          </div>
        </header>

        <!-- A. Gallery Hình ảnh lớn & Thumbnail phụ -->
        <section class="luxury-gallery-container">
          <div class="luxury-gallery-main" @click="activeMainImage = galleryImages[0]">
            <img
              :src="activeMainImage || galleryImages[0]"
              :alt="roomDetail.name"
              loading="lazy"
              @error="handleImageError"
            />
            <span class="main-image-tag">Không gian phòng</span>
          </div>

          <div class="luxury-gallery-thumbs" v-if="galleryImages.length > 1">
            <div
              class="luxury-gallery-thumb"
              @click="activeMainImage = galleryImages[1]"
            >
              <img :src="galleryImages[1]" :alt="roomDetail.name" loading="lazy" @error="handleImageError" />
              <span class="thumb-tag">Góc thư giãn</span>
            </div>
            <div
              v-if="galleryImages.length > 2"
              class="luxury-gallery-thumb"
              @click="activeMainImage = galleryImages[2]"
            >
              <img :src="galleryImages[2]" :alt="roomDetail.name" loading="lazy" @error="handleImageError" />
              <span class="thumb-tag">Phòng tắm</span>
            </div>
          </div>
        </section>

        <!-- Bố cục 2 cột chính -->
        <div class="luxury-main-layout">
          <!-- Cột trái: Thông tin phòng & Tiện nghi -->
          <main class="luxury-content-left">
            <!-- B. Thông tin phòng -->
            <article class="luxury-section-card">
              <h2 class="luxury-section-heading">
                <i class="im im-icon-Hotel"></i>
                <span>Tổng quan phòng nghỉ</span>
              </h2>

              <!-- Thông số thực tế từ API nếu có -->
              <div v-if="hasQuickSpecs" class="luxury-quick-specs">
                <div v-if="roomDetail.guests" class="luxury-spec-item">
                  <div class="spec-icon">
                    <i class="im im-icon-Male-2"></i>
                  </div>
                  <div>
                    <span class="spec-label">Sức chứa</span>
                    <span class="spec-val">{{ roomDetail.guests }} khách</span>
                  </div>
                </div>

                <div v-if="roomDetail.bedRoom" class="luxury-spec-item">
                  <div class="spec-icon">
                    <i class="im im-icon-Sleeping"></i>
                  </div>
                  <div>
                    <span class="spec-label">Phòng ngủ</span>
                    <span class="spec-val">{{ roomDetail.bedRoom }} phòng</span>
                  </div>
                </div>

                <div v-if="roomDetail.bath" class="luxury-spec-item">
                  <div class="spec-icon">
                    <i class="im im-icon-Bathtub"></i>
                  </div>
                  <div>
                    <span class="spec-label">Phòng tắm</span>
                    <span class="spec-val">{{ roomDetail.bath }} phòng</span>
                  </div>
                </div>
              </div>

              <!-- Mô tả phòng từ API -->
              <p v-if="roomDetail.description" class="luxury-room-desc-text">
                {{ roomDetail.description }}
              </p>
            </article>

            <!-- C. Tiện nghi thực tế từ API (chỉ hiển thị nếu API trả về true) -->
            <article v-if="hasAmenities" class="luxury-section-card">
              <h2 class="luxury-section-heading">
                <i class="im im-icon-Star"></i>
                <span>Tiện nghi phòng</span>
              </h2>

              <div class="luxury-amenities-list">
                <div v-if="roomDetail.wifi" class="luxury-amenity-pill">
                  <i class="im im-icon-Wifi"></i>
                  <span>Internet không dây (Wifi tốc độ cao)</span>
                </div>
                <div v-if="roomDetail.pool" class="luxury-amenity-pill">
                  <i class="im im-icon-Swimming"></i>
                  <span>Hồ bơi</span>
                </div>
                <div v-if="roomDetail.hotTub" class="luxury-amenity-pill">
                  <i class="im im-icon-Bathtub"></i>
                  <span>Bồn tắm nước nóng</span>
                </div>
                <div v-if="roomDetail.cableTV" class="luxury-amenity-pill">
                  <i class="im im-icon-Old-TV"></i>
                  <span>Truyền hình cáp</span>
                </div>
                <div v-if="roomDetail.elevator" class="luxury-amenity-pill">
                  <i class="im im-icon-Building"></i>
                  <span>Thang máy trong tòa nhà</span>
                </div>
                <div v-if="roomDetail.heating" class="luxury-amenity-pill">
                  <i class="im im-icon-Sun"></i>
                  <span>Hệ thống sưởi ấm</span>
                </div>
              </div>
            </article>
          </main>

          <!-- Cột phải: Khung đặt phòng & Hỗ trợ lễ tân -->
          <aside class="luxury-sticky-sidebar">
            <!-- E. Khung đặt phòng -->
            <div
              v-if="hasRoomData && !isLoading && !loadError"
              id="booking-widget-anchor"
              class="luxury-booking-card"
            >
              <div class="luxury-booking-price-header">
                <div>
                  <span class="main-price">{{ formatPrice(roomDetail.price) }}</span>
                  <span class="price-suffix">VNĐ / đêm</span>
                </div>
              </div>

              <div class="luxury-booking-form">
                <div class="luxury-form-group">
                  <label>Số lượng khách dự kiến</label>
                  <div class="select-input-wrap">
                    <select v-model="selectedGuests">
                      <option
                        v-for="g in maxGuestsOptions"
                        :key="g"
                        :value="g"
                      >
                        {{ g }} khách
                      </option>
                    </select>
                  </div>
                </div>

                <router-link
                  :to="`/booking/${roomDetail._id}`"
                  class="luxury-booking-btn"
                >
                  <span>Đặt phòng ngay</span>
                  <i class="im im-icon-Right-2"></i>
                </router-link>

                <p class="luxury-booking-note">
                  <i class="im im-icon-Security-Check"></i>
                  Cam kết giữ phòng và bảo mật thông tin đặt chỗ.
                </p>
              </div>
            </div>

            <!-- F. Hỗ trợ khách hàng / Lễ tân -->
            <div class="luxury-support-card">
              <div class="luxury-support-header">
                <div class="luxury-support-icon">
                  <i class="im im-icon-Bell"></i>
                </div>
                <div>
                  <h4>Bộ phận Lễ tân & Chăm sóc khách hàng</h4>
                  <span>Hỗ trợ quý khách 24/7</span>
                </div>
              </div>
              <p class="luxury-support-desc">
                Quý khách có nhu cầu tư vấn dịch vụ hoặc yêu cầu hỗ trợ đặt phòng, vui lòng liên hệ bộ phận lễ tân.
              </p>
              <router-link to="/contact" class="luxury-contact-link-btn">
                <i class="im im-icon-Support"></i>
                <span>Liên hệ lễ tân</span>
              </router-link>
            </div>
          </aside>
        </div>
      </div>
    </div>

    <!-- Mobile Sticky Footer Bar (chỉ hiển thị khi có dữ liệu phòng) -->
    <div v-if="hasRoomData && !isLoading && !loadError" class="luxury-mobile-booking-bar">
      <div class="luxury-mobile-booking-bar-inner">
        <div class="luxury-mobile-price">
          <span class="mobile-price-val">{{ formatPrice(roomDetail.price) }}</span>
          <span class="mobile-price-unit">VNĐ / đêm</span>
        </div>
        <router-link :to="`/booking/${roomDetail._id}`" class="luxury-mobile-btn">
          <span>Đặt phòng</span>
          <i class="im im-icon-Right-2"></i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

export default {
  name: "RoomDetail",

  setup() {
    const route = useRoute();
    const store = useStore();

    const activeMainImage = ref("");
    const selectedGuests = ref(1);
    const isLoading = ref(false);
    const loadError = ref("");

    const roomDetail = computed(
      () => store.state.rooms.roomDetail || {}
    );

    // Kiểm tra xem đã có dữ liệu phòng hợp lệ hay chưa
    const hasRoomData = computed(() => {
      const r = roomDetail.value;
      return Boolean(r && (r._id || r.id) && r.name);
    });

    // Gọi API mỗi khi roomId thay đổi
    watch(
      () => route.params.roomId,
      async (roomId) => {
        if (!roomId) {
          loadError.value = "Không tìm thấy mã phòng.";
          return;
        }

        isLoading.value = true;
        loadError.value = "";
        activeMainImage.value = "";

        try {
          await store.dispatch("rooms/getRoomDetailAction", roomId);

          if (!roomDetail.value || (!roomDetail.value._id && !roomDetail.value.id)) {
            loadError.value = "Không tìm thấy thông tin phòng nghỉ.";
            return;
          }

          selectedGuests.value = 1;
        } catch (error) {
          console.error("Lỗi lấy chi tiết phòng:", error);
          loadError.value = "Không thể tải thông tin phòng nghỉ. Quý khách vui lòng thử lại sau.";
        } finally {
          isLoading.value = false;
        }
      },
      { immediate: true }
    );

    const roomCategoryName = computed(() => {
      const name = (roomDetail.value.name || "").toLowerCase();
      const desc = (roomDetail.value.description || "").toLowerCase();

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

    // Ưu tiên hình ảnh thực tế từ dữ liệu API nếu có
    const galleryImages = computed(() => {
      const apiImage = roomDetail.value.image;
      const validApiImage = apiImage && !apiImage.includes("listing-item") ? apiImage : null;

      if (roomCategoryName.value === "Hạng VIP") {
        return [
          validApiImage || "/images/hotel/room-vip-suite.jpg",
          "/images/hotel/room-vip-bedroom.jpg",
          "/images/hotel/bathroom.jpg",
        ];
      }

      if (roomCategoryName.value === "Hạng Cao cấp") {
        return [
          validApiImage || "/images/hotel/room-premium.jpg",
          "/images/hotel/room-detail.jpg",
          "/images/hotel/bathroom.jpg",
        ];
      }

      return [
        validApiImage || "/images/hotel/room-standard.jpg",
        "/images/hotel/room-detail.jpg",
        "/images/hotel/bathroom.jpg",
      ];
    });

    watch(
      galleryImages,
      (images) => {
        if (images && images.length > 0) {
          activeMainImage.value = images[0] || "";
        }
      },
      { immediate: true }
    );

    const hasQuickSpecs = computed(() => {
      const room = roomDetail.value;
      return Boolean(room.guests || room.bedRoom || room.bath);
    });

    const hasAmenities = computed(() => {
      const room = roomDetail.value;
      return Boolean(
        room.wifi ||
        room.pool ||
        room.hotTub ||
        room.cableTV ||
        room.elevator ||
        room.heating
      );
    });

    const maxGuestsOptions = computed(() => {
      const max = Number(roomDetail.value.guests) || 2;
      return Array.from(
        { length: Math.max(max, 1) },
        (_, index) => index + 1
      );
    });

    const formatPrice = (value) => {
      if (value === undefined || value === null || value === "") {
        return "Liên hệ";
      }

      return Number(value).toLocaleString("vi-VN");
    };

    const handleImageError = (event) => {
      event.target.src = "/images/hotel/room-detail.jpg";
    };

    return {
      roomDetail,
      hasRoomData,
      roomCategoryName,
      roomCategoryClass,
      galleryImages,
      activeMainImage,
      hasQuickSpecs,
      hasAmenities,
      maxGuestsOptions,
      selectedGuests,
      isLoading,
      loadError,
      formatPrice,
      handleImageError,
    };
  },
};
</script>

<style src="@/assets/css/room-detail-luxury.css"></style>
