<template>
  <div id="wrapper" class="luxury-booking-page">
    <div class="container luxury-booking-container">
      <!-- Breadcrumbs -->
      <nav class="luxury-booking-breadcrumbs">
        <router-link to="/">Trang chủ</router-link>
        <span class="separator"><i class="im im-icon-Right-2"></i></span>
        <router-link to="/rooms">Danh sách phòng</router-link>
        <span class="separator"><i class="im im-icon-Right-2"></i></span>
        <router-link :to="`/room-detail/${routeRoomId}`">
          {{ roomDetail.name || "Chi tiết phòng" }}
        </router-link>
        <span class="separator"><i class="im im-icon-Right-2"></i></span>
        <span class="current">Xác nhận đặt phòng</span>
      </nav>

      <!-- Main Layout -->
      <div class="luxury-booking-layout">
        <!-- Cột trái: Form đặt phòng -->
        <main class="luxury-booking-left">
          <!-- Thông báo xác thực nếu chưa đăng nhập -->
          <div v-if="!isLoggedIn" class="luxury-auth-notice">
            <div class="luxury-auth-notice-text">
              <i class="im im-icon-Information"></i>
              <span>Quý khách cần đăng nhập để hoàn tất xác nhận đặt phòng.</span>
            </div>
            <router-link to="/sign-in" class="luxury-auth-signin-link">
              <span>Đăng nhập ngay</span>
            </router-link>
          </div>

          <!-- Card 1: Thời gian lưu trú & Số lượng khách -->
          <section class="luxury-booking-card">
            <h2 class="luxury-booking-card-title">
              <i class="im im-icon-Calendar-4"></i>
              <span>1. Thời gian lưu trú & Số lượng khách</span>
            </h2>

            <div class="luxury-form-row">
              <div class="luxury-form-group">
                <label>Ngày nhận phòng</label>
                <input
                  type="date"
                  v-model="timeRequest.checkIn"
                  :min="todayString"
                />
              </div>

              <div class="luxury-form-group">
                <label>Ngày trả phòng</label>
                <input
                  type="date"
                  v-model="timeRequest.checkOut"
                  :min="timeRequest.checkIn || todayString"
                />
              </div>
            </div>

            <div class="luxury-form-row">
              <div class="luxury-form-group">
                <label>Số lượng khách</label>
                <select v-model.number="selectedGuests">
                  <option
                    v-for="g in guestOptions"
                    :key="g"
                    :value="g"
                  >
                    {{ g }} khách
                  </option>
                </select>
                <p class="luxury-form-hint">
                  Sức chứa tối đa của phòng: {{ roomDetail.guests || 2 }} khách
                </p>
              </div>
            </div>
          </section>

          <!-- Card 2: Thông tin người đặt phòng -->
          <section class="luxury-booking-card">
            <h2 class="luxury-booking-card-title">
              <i class="im im-icon-Male-2"></i>
              <span>2. Thông tin người đặt phòng</span>
            </h2>

            <div v-if="isLoggedIn" class="luxury-user-badge">
              <i class="im im-icon-Check"></i>
              <span>Tài khoản đã đăng nhập</span>
            </div>

            <div class="luxury-form-row">
              <div class="luxury-form-group">
                <label>Họ và tên</label>
                <input
                  type="text"
                  :value="guestInfo.name"
                  readonly
                  placeholder="Họ và tên khách hàng"
                />
              </div>

              <div class="luxury-form-group">
                <label>Địa chỉ Email</label>
                <input
                  type="email"
                  :value="guestInfo.email"
                  readonly
                  placeholder="email@example.com"
                />
              </div>
            </div>

            <div class="luxury-form-row">
              <div class="luxury-form-group">
                <label>Số điện thoại</label>
                <input
                  type="text"
                  :value="guestInfo.phone"
                  readonly
                  placeholder="Số điện thoại liên hệ"
                />
              </div>

              <div class="luxury-form-group">
                <label>Địa chỉ</label>
                <input
                  type="text"
                  :value="guestInfo.address"
                  readonly
                  placeholder="Địa chỉ cư trú"
                />
              </div>
            </div>
          </section>

          <!-- Card 3: Yêu cầu đặc biệt (Special Requests) - Chỉ hiển thị giao diện, không đưa vào request Backend -->
          <section class="luxury-booking-card">
            <h2 class="luxury-booking-card-title">
              <i class="im im-icon-Speach-Bubble"></i>
              <span>3. Yêu cầu đặc biệt (Special Requests)</span>
            </h2>

            <div class="luxury-form-group">
              <label>Ghi chú cho khách sạn</label>
              <textarea
                v-model="specialRequests"
                rows="3"
                placeholder="Ví dụ: Giờ check-in dự kiến, phòng tầng cao, giường phụ hoặc các yêu cầu lưu ý khác..."
              ></textarea>
              <p class="luxury-form-hint">
                Lưu ý: Các yêu cầu đặc biệt tùy thuộc vào tình trạng phòng thực tế của khách sạn khi nhận phòng.
              </p>
            </div>
          </section>

          <!-- Nút hành động xác nhận -->
          <div class="luxury-submit-action-area">
            <button
              type="button"
              class="luxury-confirm-booking-btn"
              @click="handleBooking"
            >
              <i class="im im-icon-Checked-User"></i>
              <span>Xác nhận đặt phòng</span>
            </button>

            <div v-if="errorMessage" class="luxury-booking-error-msg">
              <i class="im im-icon-Close"></i>
              <span>{{ errorMessage }}</span>
            </div>

            <p class="luxury-booking-security-note">
              <i class="im im-icon-Security-Check"></i>
              <span>Hệ thống bảo mật dữ liệu đặt chỗ và tôn trọng quyền riêng tư của quý khách.</span>
            </p>
          </div>
        </main>

        <!-- Cột phải: Tóm tắt đặt phòng -->
        <aside class="luxury-booking-sidebar">
          <div class="luxury-summary-card">
            <!-- Ảnh phòng & Hạng phòng -->
            <div class="luxury-summary-room-media">
              <img
                :src="computedRoomImage"
                :alt="roomDetail.name"
                loading="lazy"
              />
              <span class="luxury-summary-tier-tag">{{ roomCategoryName }}</span>
            </div>

            <div class="luxury-summary-body">
              <h3 class="luxury-summary-title">{{ roomDetail.name }}</h3>
              <div v-if="roomDetail.locationId" class="luxury-summary-location">
                <i class="im im-icon-Location-2"></i>
                <span>{{ roomDetail.locationId.province || "Khách sạn" }}</span>
              </div>

              <h4 class="luxury-summary-heading">
                <i class="im im-icon-Receipt-4"></i>
                <span>Chi tiết đặt phòng</span>
              </h4>

              <ul class="luxury-summary-list">
                <li>
                  <span class="item-label">Hạng phòng:</span>
                  <span class="item-val">{{ roomCategoryName }}</span>
                </li>
                <li>
                  <span class="item-label">Nhận phòng:</span>
                  <span class="item-val">{{ formattedCheckIn || "Chưa chọn" }}</span>
                </li>
                <li>
                  <span class="item-label">Trả phòng:</span>
                  <span class="item-val">{{ formattedCheckOut || "Chưa chọn" }}</span>
                </li>
                <li>
                  <span class="item-label">Thời gian:</span>
                  <span class="item-val">
                    {{ totalNights > 0 ? totalNights + " đêm" : "—" }}
                  </span>
                </li>
                <li>
                  <span class="item-label">Số lượng khách:</span>
                  <span class="item-val">{{ selectedGuests }} khách</span>
                </li>
                <li>
                  <span class="item-label">Giá mỗi đêm:</span>
                  <span class="item-val">{{ formatPrice(roomDetail.price) }} VNĐ</span>
                </li>
              </ul>

              <!-- Tổng tiền nếu tính toán được -->
              <div class="luxury-summary-total-area">
                <div class="luxury-summary-total-row">
                  <span class="total-title">Tổng chi phí</span>
                  <div>
                    <span class="total-amount">{{ formatPrice(calculatedTotalPrice) }}</span>
                    <span class="total-unit">VNĐ</span>
                  </div>
                </div>
                <div v-if="totalNights > 0" class="luxury-summary-total-nights">
                  (Tạm tính cho {{ totalNights }} đêm)
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  name: "Booking",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();

    const routeRoomId = computed(() => route.params.roomId);

    // Lấy thông tin phòng
    store.dispatch("rooms/getRoomDetailAction", route.params.roomId);

    const userLogin = computed(() => store.state.auth.userLogin || {});
    const roomDetail = computed(() => store.state.rooms.roomDetail || {});

    // Kiểm tra đăng nhập
    const isLoggedIn = computed(() => {
      const u = userLogin.value;
      return !!(u && (u._id || (u.user && u.user._id) || u.token));
    });

    // Thông tin người đặt phòng lấy an toàn từ userLogin
    const guestInfo = computed(() => {
      const u = userLogin.value.user || userLogin.value || {};
      return {
        name: u.name || "Chưa cập nhật",
        email: u.email || "Chưa cập nhật",
        phone: u.phone || "Chưa cập nhật",
        address: u.address || "Chưa cập nhật",
      };
    });

    const timeRequest = reactive({
      checkIn: "",
      checkOut: "",
    });

    const selectedGuests = ref(1);
    const specialRequests = ref("");
    const errorMessage = ref("");

    // Ngày hôm nay dạng yyyy-mm-dd
    const todayString = computed(() => {
      const d = new Date();
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${y}-${m}-${day}`;
    });

    // Hạng phòng
    const roomCategoryName = computed(() => {
      const name = (roomDetail.value.name || "").toLowerCase();
      const desc = (roomDetail.value.description || "").toLowerCase();
      if (name.includes("vip") || desc.includes("vip")) {
        return "Hạng VIP";
      }
      if (name.includes("cao cấp") || desc.includes("cao cấp") || name.includes("premium")) {
        return "Hạng Cao cấp";
      }
      return "Hạng Tiêu chuẩn";
    });

    // Ảnh đại diện phòng
    const computedRoomImage = computed(() => {
      if (roomCategoryName.value === "Hạng VIP") {
        return "/images/hotel/room-vip-suite.jpg";
      }
      if (roomCategoryName.value === "Hạng Cao cấp") {
        return "/images/hotel/room-premium.jpg";
      }
      return "/images/hotel/room-standard.jpg";
    });

    // Sức chứa dropdown
    const guestOptions = computed(() => {
      const max = roomDetail.value.guests || 2;
      return Array.from({ length: Math.max(max, 1) }, (_, i) => i + 1);
    });

    // Số đêm lưu trú
    const totalNights = computed(() => {
      if (!timeRequest.checkIn || !timeRequest.checkOut) return 0;
      const start = new Date(timeRequest.checkIn);
      const end = new Date(timeRequest.checkOut);
      const diffTime = end - start;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 0;
    });

    // Tổng tiền
    const calculatedTotalPrice = computed(() => {
      const price = Number(roomDetail.value.price) || 0;
      if (totalNights.value > 0) {
        return price * totalNights.value;
      }
      return price;
    });

    const formatPrice = (val) => {
      if (!val && val !== 0) return "Liên hệ";
      return Number(val).toLocaleString("vi-VN");
    };

    const formatDate = (dateStr) => {
      if (!dateStr) return "";
      const parts = dateStr.split("-");
      if (parts.length === 3) {
        return `${parts[2]}/${parts[1]}/${parts[0]}`;
      }
      return dateStr;
    };

    const formattedCheckIn = computed(() => formatDate(timeRequest.checkIn));
    const formattedCheckOut = computed(() => formatDate(timeRequest.checkOut));

    // Xử lý gửi đặt phòng - Bảo toàn chính xác cấu trúc request Backend
    const handleBooking = () => {
      errorMessage.value = "";

      if (!isLoggedIn.value) {
        errorMessage.value = "Quý khách vui lòng đăng nhập trước khi xác nhận đặt phòng.";
        router.push("/sign-in");
        return;
      }

      if (!timeRequest.checkIn || !timeRequest.checkOut) {
        errorMessage.value = "Vui lòng chọn ngày nhận phòng và ngày trả phòng.";
        return;
      }

      if (timeRequest.checkIn < todayString.value) {
        errorMessage.value = "Ngày nhận phòng không hợp lệ.";
        return;
      }

      if (timeRequest.checkOut <= timeRequest.checkIn) {
        errorMessage.value = "Ngày trả phòng phải sau ngày nhận phòng ít nhất 1 đêm.";
        return;
      }

      // Giữ nguyên chính xác cấu trúc request hiện tại: roomId, checkIn, checkOut
      // Không gửi specialRequests lên Backend vì schema API backend không hỗ trợ
      const data = {
        roomId: route.params.roomId,
        checkIn: timeRequest.checkIn,
        checkOut: timeRequest.checkOut,
      };

      store.dispatch("rooms/bookingRoomAction", { data });

      // Lấy id an toàn để điều hướng trang cá nhân
      const targetUserId =
        (userLogin.value.user && userLogin.value.user._id) ||
        userLogin.value._id;

      if (targetUserId) {
        router.push(`/user-profile/${targetUserId}`);
      } else {
        router.push("/");
      }
    };

    return {
      routeRoomId,
      roomDetail,
      roomCategoryName,
      computedRoomImage,
      guestOptions,
      selectedGuests,
      timeRequest,
      todayString,
      totalNights,
      calculatedTotalPrice,
      formattedCheckIn,
      formattedCheckOut,
      isLoggedIn,
      guestInfo,
      specialRequests,
      errorMessage,
      handleBooking,
      formatPrice,
    };
  },
};
</script>

<style src="@/assets/css/booking-luxury.css"></style>
