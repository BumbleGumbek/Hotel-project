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

      <section
        v-if="isLoadingRoom"
        class="luxury-booking-card luxury-room-load-state"
        role="status"
      >
        Đang tải thông tin chỗ ở...
      </section>
      <section
        v-else-if="roomLoadError"
        class="luxury-booking-card luxury-room-load-state error"
        role="alert"
      >
        {{ roomLoadError }}
      </section>

      <!-- Main Layout -->
      <div v-else class="luxury-booking-layout">
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

          <!-- Nút hành động xác nhận -->
          <div class="luxury-submit-action-area">
            <button
              type="button"
              class="luxury-confirm-booking-btn"
              :disabled="isSubmitting"
              @click="handleBooking"
            >
              <i :class="isSubmitting ? 'im im-icon-Loading-3' : 'im im-icon-Checked-User'"></i>
              <span>{{ isSubmitting ? "Đang gửi yêu cầu..." : "Xác nhận đặt phòng" }}</span>
            </button>

            <div v-if="errorMessage" class="luxury-booking-error-msg">
              <i class="im im-icon-Close"></i>
              <span>{{ errorMessage }}</span>
            </div>

          </div>
        </main>

        <!-- Cột phải: Tóm tắt đặt phòng -->
        <aside class="luxury-booking-sidebar">
          <div class="luxury-summary-card">
            <!-- Ảnh phòng từ listing -->
            <div class="luxury-summary-room-media">
              <img v-if="roomDetail.image" :src="roomDetail.image" :alt="roomDetail.name" loading="lazy" />
              <div v-else class="luxury-summary-image-empty">
                Chưa có hình ảnh cho chỗ ở này.
              </div>
            </div>

            <div class="luxury-summary-body">
              <h3 class="luxury-summary-title">{{ roomDetail.name }}</h3>
              <div v-if="roomDetail.location" class="luxury-summary-location">
                <i class="im im-icon-Location-2"></i>
                <span>{{ roomDetail.location.province || roomDetail.location.name }}</span>
              </div>

              <h4 class="luxury-summary-heading">
                <i class="im im-icon-Receipt-4"></i>
                <span>Chi tiết đặt phòng</span>
              </h4>

              <ul class="luxury-summary-list">
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
                  <span class="total-title">Tổng tiền tạm tính</span>
                  <div>
                    <span class="total-amount">
                      {{
                        calculatedTotalPrice === null
                          ? "Chưa tính"
                          : formatPrice(calculatedTotalPrice)
                      }}
                    </span>
                    <span v-if="calculatedTotalPrice !== null" class="total-unit">VNĐ</span>
                  </div>
                </div>
                <div v-if="totalNights > 0" class="luxury-summary-total-nights">
                  (Tạm tính cho {{ totalNights }} đêm)
                </div>
                <div v-else class="luxury-summary-total-nights">
                  Chọn ngày nhận phòng và trả phòng hợp lệ để tính tổng.
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
import { computed, reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { getRoomDetailAPI } from "../api/rooms";

export default {
  name: "Booking",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();

    const routeRoomId = computed(() => route.params.roomId);
    const userLogin = computed(() => store.state.auth.userLogin || {});
    const roomDetail = computed(() => store.state.rooms.roomDetail || {});
    const isLoadingRoom = ref(false);
    const roomLoadError = ref("");
    let roomRequestId = 0;

    watch(
      routeRoomId,
      async (roomId) => {
        const requestId = ++roomRequestId;
        store.commit("rooms/setRoomDetailMutation", {});
        roomLoadError.value = "";

        if (!roomId) {
          isLoadingRoom.value = false;
          roomLoadError.value = "Không tìm thấy mã chỗ ở.";
          return;
        }

        isLoadingRoom.value = true;

        try {
          const result = await getRoomDetailAPI(roomId);

          if (requestId !== roomRequestId) return;

          const resultRoomId = result && (result.id ?? result._id);
          if (!resultRoomId || String(resultRoomId) !== String(roomId)) {
            roomLoadError.value = "Không tìm thấy thông tin chỗ ở.";
            return;
          }

          store.commit("rooms/setRoomDetailMutation", result);
        } catch (error) {
          if (requestId !== roomRequestId) return;
          console.error("Lỗi lấy chi tiết chỗ ở:", error);
          roomLoadError.value =
            "Không thể tải thông tin chỗ ở. Vui lòng thử lại sau.";
        } finally {
          if (requestId === roomRequestId) {
            isLoadingRoom.value = false;
          }
        }
      },
      { immediate: true }
    );

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
    const errorMessage = ref("");
    const isSubmitting = ref(false);

    // Ngày hôm nay dạng yyyy-mm-dd
    const todayString = computed(() => {
      const d = new Date();
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${y}-${m}-${day}`;
    });

    // Sức chứa dropdown
    const guestOptions = computed(() => {
      const max = roomDetail.value.guests || 2;
      return Array.from({ length: Math.max(max, 1) }, (_, i) => i + 1);
    });

    watch(
      guestOptions,
      (options) => {
        const maxGuests = options[options.length - 1] || 1;
        if (selectedGuests.value > maxGuests) {
          selectedGuests.value = maxGuests;
        }
      },
      { immediate: true }
    );

    const toUtcDate = (dateString) => {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(dateString || "")) return null;

      const [year, month, day] = dateString.split("-").map(Number);
      const timestamp = Date.UTC(year, month - 1, day);
      const parsedDate = new Date(timestamp);

      if (
        parsedDate.getUTCFullYear() !== year ||
        parsedDate.getUTCMonth() !== month - 1 ||
        parsedDate.getUTCDate() !== day
      ) {
        return null;
      }

      return timestamp;
    };

    // Chỉ đếm số ngày lịch hợp lệ, không phụ thuộc múi giờ hoặc DST.
    const totalNights = computed(() => {
      const checkIn = toUtcDate(timeRequest.checkIn);
      const checkOut = toUtcDate(timeRequest.checkOut);
      const today = toUtcDate(todayString.value);

      if (
        checkIn === null ||
        checkOut === null ||
        today === null ||
        checkIn < today ||
        checkOut <= checkIn
      ) {
        return 0;
      }

      return (checkOut - checkIn) / (24 * 60 * 60 * 1000);
    });

    // Không hiển thị giá một đêm như tổng khi chưa có khoảng ngày hợp lệ.
    const calculatedTotalPrice = computed(() => {
      const price = Number(roomDetail.value.price);
      if (totalNights.value === 0 || !Number.isFinite(price)) return null;
      return price * totalNights.value;
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
    const handleBooking = async () => {
      if (isSubmitting.value) return;
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

      isSubmitting.value = true;
      try {
        await store.dispatch("rooms/bookingRoomAction", { data });
      } catch (error) {
        console.error("Lỗi tạo đặt phòng:", error);
        errorMessage.value =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          "Không thể hoàn tất đặt phòng. Vui lòng thử lại sau.";
        return;
      } finally {
        isSubmitting.value = false;
      }

      // Lấy id an toàn để điều hướng trang cá nhân
      const currentUser = userLogin.value.user || {};
      const targetUserId =
        currentUser.id ??
        currentUser._id ??
        userLogin.value.id ??
        userLogin.value._id;

      if (targetUserId !== undefined && targetUserId !== null && targetUserId !== "") {
        router.push({
          name: "UserProfile",
          params: { userId: targetUserId },
        });
      } else {
        router.push("/");
      }
    };

    return {
      routeRoomId,
      roomDetail,
      isLoadingRoom,
      roomLoadError,
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
      errorMessage,
      isSubmitting,
      handleBooking,
      formatPrice,
    };
  },
};
</script>

<style src="@/assets/css/booking-luxury.css"></style>
