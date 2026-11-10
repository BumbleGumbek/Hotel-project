<template>
  <div id="wrapper" class="luxury-profile-page">
    <div class="container luxury-profile-container">
      <!-- Breadcrumbs -->
      <nav class="luxury-profile-breadcrumbs">
        <router-link to="/">Trang chủ</router-link>
        <span class="separator"><i class="im im-icon-Right-2"></i></span>
        <span class="current">Tài khoản khách hàng</span>
      </nav>

      <!-- Welcome Banner -->
      <section class="luxury-profile-banner">
        <div class="luxury-profile-banner-left">
          <div class="luxury-profile-avatar-wrap">
            <i class="im im-icon-User"></i>
          </div>
          <div class="luxury-profile-banner-text">
            <span class="welcome-eyebrow">Trải nghiệm nghỉ dưỡng</span>
            <h1>Xin chào, {{ currentCustomer.name || "Quý khách" }}</h1>
            <p>Quản lý thông tin cá nhân và lịch sử đặt phòng tại khách sạn.</p>
          </div>
        </div>

        <div class="luxury-profile-banner-right">
          <span class="luxury-profile-badge">
            <i class="im im-icon-Diamond"></i>
            <span>Khách hàng thân thiết</span>
          </span>
        </div>
      </section>

      <!-- Main Layout: 2 Columns -->
      <div class="luxury-profile-layout">
        <!-- Cột trái: Thông tin tài khoản khách hàng -->
        <aside class="luxury-profile-sidebar">
          <div class="luxury-profile-card">
            <h2 class="luxury-profile-card-title">
              <i class="im im-icon-Profile"></i>
              <span>Thông tin cá nhân</span>
            </h2>

            <ul class="luxury-user-info-list">
              <li>
                <span class="info-label">
                  <i class="im im-icon-Male"></i> Họ và tên
                </span>
                <span class="info-val">{{ currentCustomer.name || "Chưa cập nhật" }}</span>
              </li>

              <li>
                <span class="info-label">
                  <i class="im im-icon-Mail"></i> Địa chỉ Email
                </span>
                <span class="info-val">{{ currentCustomer.email || "Chưa cập nhật" }}</span>
              </li>

              <li>
                <span class="info-label">
                  <i class="im im-icon-Phone-3G"></i> Số điện thoại
                </span>
                <span class="info-val">{{ currentCustomer.phone || "Chưa cập nhật" }}</span>
              </li>

              <li>
                <span class="info-label">
                  <i class="im im-icon-Calendar-4"></i> Ngày sinh
                </span>
                <span class="info-val">{{ formatBirthday(currentCustomer.birthday) }}</span>
              </li>

              <li>
                <span class="info-label">
                  <i class="im im-icon-Location-2"></i> Địa chỉ cư trú
                </span>
                <span class="info-val">{{ currentCustomer.address || "Chưa cập nhật" }}</span>
              </li>

              <li v-if="currentCustomer.gender !== undefined">
                <span class="info-label">
                  <i class="im im-icon-Check"></i> Giới tính
                </span>
                <span class="info-val">{{ currentCustomer.gender ? "Nam" : "Nữ" }}</span>
              </li>
            </ul>
          </div>
        </aside>

        <!-- Cột phải: Lịch sử đặt phòng thực tế từ API Ticket -->
        <main class="luxury-history-section">
          <div class="luxury-history-header">
            <h2>
              <i class="im im-icon-Suitcase"></i>
              <span>Lịch sử đặt phòng</span>
            </h2>
            <span class="count-tag">
              Tổng cộng: <strong>{{ roomsByUser.length }}</strong> lượt đặt
            </span>
          </div>

          <!-- Danh sách phòng đã đặt -->
          <div v-if="roomsByUser && roomsByUser.length > 0" class="luxury-booking-list">
            <div
              v-for="(booking, index) in roomsByUser"
              :key="booking._id || index"
              class="luxury-booking-item-card"
            >
              <!-- Media ảnh phòng -->
              <div class="luxury-booking-card-media">
                <img
                  :src="getBookingImage(booking)"
                  :alt="booking.name"
                  loading="lazy"
                />
                <span class="luxury-booking-tier-tag">
                  {{ getBookingTier(booking) }}
                </span>
              </div>

              <!-- Nội dung chi tiết vé đặt -->
              <div class="luxury-booking-card-body">
                <div class="luxury-booking-card-top">
                  <div>
                    <h3 class="luxury-booking-card-title">{{ booking.name || "Phòng nghỉ khách sạn" }}</h3>
                  </div>

                  <div class="luxury-booking-price-badge">
                    <span class="price-num">{{ formatPrice(booking.price) }}</span>
                    <span class="price-sub">VNĐ / đêm</span>
                  </div>
                </div>

                <!-- Thời gian nhận / trả phòng thực tế từ API -->
                <div class="luxury-booking-dates">
                  <div class="luxury-date-col">
                    <span class="date-label">Nhận phòng</span>
                    <span class="date-val">{{ formatDateTime(booking.checkIn) }}</span>
                  </div>

                  <span class="luxury-date-arrow">
                    <i class="im im-icon-Right-2"></i>
                  </span>

                  <div class="luxury-date-col">
                    <span class="date-label">Trả phòng</span>
                    <span class="date-val">{{ formatDateTime(booking.checkOut) }}</span>
                  </div>
                </div>

                <!-- Footer thông tin và link xem chi tiết phòng -->
                <div class="luxury-booking-card-footer">
                  <span class="luxury-booking-id">
                    Mã đặt phòng: <strong>#{{ (booking._id || "").slice(-6).toUpperCase() || "HOTEL" }}</strong>
                  </span>

                  <!-- Link xem chi tiết phòng thực tế nếu có roomId -->
                  <router-link
                    v-if="booking._id"
                    :to="`/room-detail/${booking._id}`"
                    class="luxury-view-room-link"
                  >
                    <span>Xem lại phòng</span>
                    <i class="im im-icon-Right-2"></i>
                  </router-link>
                </div>
              </div>
            </div>
          </div>

          <!-- Trạng thái chưa có booking -->
          <div v-else class="luxury-history-empty">
            <div class="empty-icon">
              <i class="im im-icon-Hotel"></i>
            </div>
            <h3>Chưa có lịch sử đặt phòng</h3>
            <p>
              Quý khách hiện chưa có đặt phòng nào tại khách sạn. Hãy khám phá các hạng phòng sang trọng và đặt kỳ nghỉ ngay hôm nay.
            </p>
            <router-link to="/rooms" class="luxury-book-now-btn">
              <span>Khám phá các hạng phòng</span>
              <i class="im im-icon-Right-2"></i>
            </router-link>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

export default {
  name: "UserProfile",
  setup() {
    const route = useRoute();
    const store = useStore();

    store.dispatch("auth/loadUserLoginFromLocalStorageAction");
    store.dispatch("ticket/getTicketListByUserAction", route.params.userId);

    const userLogin = computed(() => store.state.auth.userLogin || {});
    const roomsByUser = computed(() => store.state.ticket.roomsByUser || []);

    const currentCustomer = computed(() => {
      return userLogin.value.user || userLogin.value || {};
    });

    const formatPrice = (val) => {
      if (!val && val !== 0) return "Liên hệ";
      return Number(val).toLocaleString("vi-VN");
    };

    const formatBirthday = (val) => {
      if (!val) return "Chưa cập nhật";
      return val;
    };

    const formatDateTime = (dateStr) => {
      if (!dateStr) return "Chưa xác định";
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      const day = String(d.getDate()).padStart(2, "0");
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const year = d.getFullYear();
      return `${day}/${month}/${year}`;
    };

    const getBookingTier = (booking) => {
      const name = (booking.name || "").toLowerCase();
      if (name.includes("vip")) return "Hạng VIP";
      if (name.includes("cao cấp") || name.includes("premium")) return "Hạng Cao cấp";
      return "Hạng Tiêu chuẩn";
    };

    const getBookingImage = (booking) => {
      if (booking.image && !booking.image.includes("listing-item")) {
        return booking.image;
      }
      const tier = getBookingTier(booking);
      if (tier === "Hạng VIP") return "/images/hotel/room-vip-suite.jpg";
      if (tier === "Hạng Cao cấp") return "/images/hotel/room-premium.jpg";
      return "/images/hotel/room-standard.jpg";
    };

    return {
      currentCustomer,
      roomsByUser,
      formatPrice,
      formatBirthday,
      formatDateTime,
      getBookingTier,
      getBookingImage,
    };
  },
};
</script>

<style src="@/assets/css/user-profile-luxury.css"></style>
