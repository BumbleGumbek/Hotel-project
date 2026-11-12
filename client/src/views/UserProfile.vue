<template>
  <div v-if="isProfileAuthorized" id="wrapper" class="luxury-profile-page">
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
                  v-if="booking.image"
                  :src="booking.image"
                  :alt="booking.name"
                  loading="lazy"
                />
                <div v-else class="luxury-booking-image-empty">
                  Chưa có hình ảnh
                </div>
              </div>

              <!-- Nội dung chi tiết vé đặt -->
              <div class="luxury-booking-card-body">
                <div class="luxury-booking-card-top">
                  <div>
                    <h3 v-if="booking.name" class="luxury-booking-card-title">
                      {{ booking.name }}
                    </h3>
                  </div>

                  <div class="luxury-booking-price-badge">
                    <span class="price-num">
                      {{
                        booking.price !== undefined && booking.price !== null
                          ? formatPrice(booking.price)
                          : "Chưa có giá"
                      }}
                    </span>
                    <span
                      v-if="
                        booking.price !== undefined && booking.price !== null
                      "
                      class="price-sub"
                    >
                      VNĐ / đêm
                    </span>
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
                  <span v-if="booking.bookingId" class="luxury-booking-id">
                    Mã đặt phòng:
                    <strong>
                      #{{ String(booking.bookingId).slice(-6).toUpperCase() }}
                    </strong>
                  </span>

                  <router-link
                    v-if="booking.id || booking.roomId"
                    :to="`/room-detail/${booking.id || booking.roomId}`"
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
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";

export default {
  name: "UserProfile",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();

    const getLoginUserId = (login = {}) => {
      const user =
        login.user && typeof login.user === "object" ? login.user : {};
      const id = user.id ?? user._id ?? login.id ?? login._id;
      return id === undefined || id === null || String(id).trim() === ""
        ? null
        : String(id).trim();
    };

    let storedUserLogin = {};
    const storedLogin = localStorage.getItem("userLogin");
    if (storedLogin) {
      try {
        const parsedLogin = JSON.parse(storedLogin);
        if (parsedLogin && typeof parsedLogin === "object") {
          storedUserLogin = parsedLogin;
        }
      } catch {
        localStorage.removeItem("userLogin");
      }
    }

    if (
      !getLoginUserId(store.state.auth.userLogin) &&
      getLoginUserId(storedUserLogin)
    ) {
      store.commit("auth/setUserLoginFromLocalStorage", storedUserLogin);
    }

    const userLogin = computed(() => store.state.auth.userLogin || {});
    const currentUserId = computed(() => getLoginUserId(userLogin.value));
    const roomsByUser = computed(() => store.state.ticket.roomsByUser || []);
    const isProfileAuthorized = ref(false);

    const currentCustomer = computed(() => {
      const user = userLogin.value.user;
      return user && typeof user === "object" ? user : userLogin.value;
    });

    watch(
      () => [route.params.userId, currentUserId.value],
      ([routeUserId, loggedInUserId]) => {
        isProfileAuthorized.value = false;

        if (!loggedInUserId) {
          router.replace({ name: "SignIn" });
          return;
        }

        if (String(routeUserId || "") !== loggedInUserId) {
          router.replace({
            name: "UserProfile",
            params: { userId: loggedInUserId },
          });
          return;
        }

        store.commit("ticket/setTicketListByUserMutation", []);
        isProfileAuthorized.value = true;
        store.dispatch("ticket/getTicketListByUserAction", loggedInUserId);
      },
      { immediate: true }
    );

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

    return {
      currentCustomer,
      isProfileAuthorized,
      roomsByUser,
      formatPrice,
      formatBirthday,
      formatDateTime,
    };
  },
};
</script>

<style src="@/assets/css/user-profile-luxury.css"></style>
