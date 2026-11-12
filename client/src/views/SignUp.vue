<template>
  <div
    class="luxury-auth-page"
    :style="{ backgroundImage: `url('/images/hotel/hotel-exterior.jpg')` }"
  >
    <div class="luxury-auth-overlay"></div>

    <div class="luxury-auth-card luxury-auth-card-wide">
      <!-- Nút quay lại trang chủ -->
      <router-link
        to="/"
        class="luxury-auth-close-btn"
        title="Trở về trang chủ"
      >
        <i class="im im-icon-Close"></i>
      </router-link>

      <!-- Header -->
      <div class="luxury-auth-header">
        <span class="luxury-auth-eyebrow">Trải nghiệm nghỉ dưỡng</span>
        <h1 class="luxury-auth-title">Đăng ký tài khoản</h1>
        <p class="luxury-auth-subtitle">
          Tạo tài khoản để dễ dàng quản lý đặt phòng và tận hưởng các ưu đãi đặc
          quyền.
        </p>
      </div>

      <!-- Form đăng ký -->
      <form class="luxury-auth-form" @submit.prevent="handleSubmit">
        <!-- Họ tên & Email -->
        <div class="luxury-auth-grid-2">
          <div class="luxury-auth-field">
            <label for="username2">Họ và tên</label>
            <div class="luxury-input-wrapper">
              <i class="im im-icon-Male"></i>
              <input
                type="text"
                id="username2"
                name="username"
                v-model="userRegister.name"
                placeholder="Nguyễn Văn A"
                required
              />
            </div>
          </div>

          <div class="luxury-auth-field">
            <label for="email2">Địa chỉ Email</label>
            <div class="luxury-input-wrapper">
              <i class="im im-icon-Mail"></i>
              <input
                type="email"
                id="email2"
                name="email"
                v-model="userRegister.email"
                placeholder="email@example.com"
                required
              />
            </div>
          </div>
        </div>

        <!-- Mật khẩu & Nhập lại mật khẩu -->
        <div class="luxury-auth-grid-2">
          <div class="luxury-auth-field">
            <label for="password1">Mật khẩu</label>
            <div class="luxury-input-wrapper">
              <i class="im im-icon-Lock-2"></i>
              <input
                type="password"
                id="password1"
                name="password1"
                v-model="userRegister.password"
                placeholder="Nhập mật khẩu"
                required
              />
            </div>
          </div>

          <div class="luxury-auth-field">
            <label for="password2">Nhập lại mật khẩu</label>
            <div class="luxury-input-wrapper">
              <i class="im im-icon-Lock-2"></i>
              <input
                type="password"
                id="password2"
                name="password2"
                v-model="userRegister.repeatPassword"
                placeholder="Nhập lại mật khẩu"
                required
              />
            </div>
          </div>
        </div>

        <!-- Số điện thoại & Giới tính -->
        <div class="luxury-auth-grid-2">
          <div class="luxury-auth-field">
            <label for="phone">Số điện thoại</label>
            <div class="luxury-input-wrapper">
              <i class="im im-icon-Phone-3G"></i>
              <input
                type="text"
                id="phone"
                name="phone"
                v-model="userRegister.phone"
                placeholder="0901234567"
                required
              />
            </div>
          </div>

          <div class="luxury-auth-field">
            <label for="gender">Giới tính</label>
            <div class="luxury-input-wrapper">
              <i class="im im-icon-User"></i>
              <select id="gender" v-model="userRegister.gender">
                <option value="true">Nam</option>
                <option value="false">Nữ</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Ngày sinh -->
        <div class="luxury-auth-field">
          <label>Ngày sinh</label>
          <div class="luxury-birthday-selects">
            <select v-model="userRegister.day" required>
              <option value="" disabled>Ngày</option>
              <option
                v-for="(day, index) in arrayDay"
                :key="index"
                :value="day"
              >
                {{ day }}
              </option>
            </select>
            <select v-model="userRegister.month" required>
              <option value="" disabled>Tháng</option>
              <option
                v-for="(month, index) in arrayMonth"
                :key="index"
                :value="month"
              >
                Tháng {{ month }}
              </option>
            </select>
            <select v-model="userRegister.year" required>
              <option value="" disabled>Năm</option>
              <option
                v-for="(year, index) in arrayYear"
                :key="index"
                :value="year"
              >
                {{ year }}
              </option>
            </select>
          </div>
        </div>

        <!-- Địa chỉ -->
        <div class="luxury-auth-field">
          <label for="address">Địa chỉ cư trú</label>
          <div class="luxury-input-wrapper">
            <i class="im im-icon-Location-2"></i>
            <input
              type="text"
              id="address"
              name="address"
              v-model="userRegister.address"
              placeholder="Tỉnh / Thành phố cư trú"
              required
            />
          </div>
        </div>

        <p v-if="errorMessage" class="luxury-auth-error" role="alert">
          {{ errorMessage }}
        </p>

        <button
          type="submit"
          class="luxury-auth-submit-btn"
          :disabled="isSubmitting"
          :aria-busy="isSubmitting"
        >
          <span>
            {{ isSubmitting ? "Đang đăng ký..." : "Đăng ký tài khoản" }}
          </span>
          <i v-if="!isSubmitting" class="im im-icon-Right-2"></i>
        </button>
      </form>

      <!-- Footer chuyển sang Đăng nhập -->
      <div class="luxury-auth-footer">
        <span>Quý khách đã có tài khoản?</span>
        <router-link to="/sign-in" class="luxury-auth-switch-link">
          Đăng nhập ngay
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive, ref, watch } from "vue";
import { createArrayNumber } from "../utils/createArrayNumber";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  name: "SignUp",
  setup() {
    const router = useRouter();
    const store = useStore();

    const userRegister = reactive({
      name: "",
      email: "",
      password: "",
      repeatPassword: "",
      phone: "",
      year: "",
      month: "",
      day: "",
      gender: "false",
      address: "",
    });

    const isSubmitting = ref(false);
    const errorMessage = ref("");
    const arrayMonth = createArrayNumber(1, 12);
    const arrayYear = createArrayNumber(1900, new Date().getFullYear());
    const arrayDay = computed(() => {
      if (!userRegister.month || !userRegister.year) {
        return createArrayNumber(1, 31);
      }
      const daysInMonth = new Date(
        Number(userRegister.year),
        Number(userRegister.month),
        0
      ).getDate();
      return createArrayNumber(1, daysInMonth);
    });

    watch(
      () => [userRegister.month, userRegister.year],
      () => {
        if (
          userRegister.day &&
          Number(userRegister.day) > arrayDay.value.length
        ) {
          userRegister.day = "";
        }
      }
    );

    const handleSubmit = async () => {
      if (isSubmitting.value) return;
      errorMessage.value = "";

      if (userRegister.password !== userRegister.repeatPassword) {
        errorMessage.value = "Mật khẩu nhập lại không khớp.";
        return;
      }

      const year = Number(userRegister.year);
      const month = Number(userRegister.month);
      const day = Number(userRegister.day);
      const birthday = new Date(Date.UTC(year, month - 1, day));
      const today = new Date();
      const todayUtc = Date.UTC(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
      );
      if (
        !Number.isInteger(year) ||
        !Number.isInteger(month) ||
        !Number.isInteger(day) ||
        birthday.getUTCFullYear() !== year ||
        birthday.getUTCMonth() !== month - 1 ||
        birthday.getUTCDate() !== day ||
        birthday.getTime() > todayUtc
      ) {
        errorMessage.value = "Ngày sinh không hợp lệ hoặc nằm trong tương lai.";
        return;
      }

      const data = {
        name: userRegister.name,
        email: userRegister.email,
        password: userRegister.password,
        phone: userRegister.phone,
        birthday: `${year}/${month}/${day}`,
        gender: userRegister.gender === "true",
        address: userRegister.address,
      };

      isSubmitting.value = true;
      try {
        try {
          await store.dispatch("auth/signUpAction", { data });
        } catch (error) {
          errorMessage.value =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            "Không thể đăng ký. Vui lòng kiểm tra thông tin và thử lại.";
          return;
        }

        await router.push("/sign-in");
      } finally {
        isSubmitting.value = false;
      }
    };

    return {
      arrayMonth,
      arrayYear,
      arrayDay,
      userRegister,
      isSubmitting,
      errorMessage,
      handleSubmit,
    };
  },
};
</script>

<style src="@/assets/css/auth-luxury.css"></style>
