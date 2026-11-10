<template>
  <div
    class="luxury-auth-page"
    :style="{ backgroundImage: `url('/images/hotel/hotel-exterior.jpg')` }"
  >
    <div class="luxury-auth-overlay"></div>

    <div class="luxury-auth-card">
      <!-- Nút quay lại trang chủ -->
      <router-link to="/" class="luxury-auth-close-btn" title="Trở về trang chủ">
        <i class="im im-icon-Close"></i>
      </router-link>

      <!-- Header -->
      <div class="luxury-auth-header">
        <span class="luxury-auth-eyebrow">Trải nghiệm nghỉ dưỡng</span>
        <h1 class="luxury-auth-title">Đăng nhập tài khoản</h1>
        <p class="luxury-auth-subtitle">
          Chào mừng quý khách quay trở lại không gian nghỉ dưỡng tinh tế.
        </p>
      </div>

      <!-- Form đăng nhập -->
      <form @submit.prevent="handleSubmit" class="luxury-auth-form">
        <div class="luxury-auth-field">
          <label for="email">Địa chỉ Email</label>
          <div class="luxury-input-wrapper">
            <i class="im im-icon-Mail"></i>
            <input
              type="email"
              id="email"
              name="email"
              v-model="userLogin.email"
              placeholder="nhapemail@example.com"
              required
            />
          </div>
        </div>

        <div class="luxury-auth-field">
          <label for="password">Mật khẩu</label>
          <div class="luxury-input-wrapper">
            <i class="im im-icon-Lock-2"></i>
            <input
              type="password"
              id="password"
              name="password"
              v-model="userLogin.password"
              placeholder="Nhập mật khẩu"
              required
            />
          </div>
        </div>

        <div class="luxury-auth-extras">
          <label class="luxury-auth-remember">
            <input type="checkbox" id="remember-me" name="remember" />
            <span>Ghi nhớ đăng nhập</span>
          </label>
          <a href="#" class="luxury-forgot-link" @click.prevent>Quên mật khẩu?</a>
        </div>

        <button type="submit" class="luxury-auth-submit-btn">
          <span>Đăng nhập</span>
          <i class="im im-icon-Right-2"></i>
        </button>
      </form>

      <!-- Footer chuyển sang Đăng ký -->
      <div class="luxury-auth-footer">
        <span>Quý khách chưa có tài khoản?</span>
        <router-link to="/sign-up" class="luxury-auth-switch-link">
          Đăng ký ngay
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  name: "SignIn",
  setup() {
    const store = useStore();
    const router = useRouter();

    const userLogin = reactive({
      email: "",
      password: "",
    });

    const handleSubmit = () => {
      store.dispatch("auth/signInAction", { data: userLogin, router });
    };

    return {
      userLogin,
      handleSubmit,
    };
  },
};
</script>

<style src="@/assets/css/auth-luxury.css"></style>
