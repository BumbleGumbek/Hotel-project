<template>
  <header class="luxury-header-wrapper">
    <div class="container">
      <div class="luxury-header-inner">
        <!-- Logo / Thương hiệu -->
        <div class="luxury-brand-area">
          <router-link to="/" class="luxury-brand-link">
            <img
              src="/images/hotel/hotel-logo.png"
              alt="Logo khách sạn"
              />
            <div class="luxury-brand-title-box">
              <span class="luxury-brand-title">StayFinder</span>
              <span class="luxury-brand-subtitle">Khám phá &amp; đặt chỗ</span>
            </div>
          </router-link>
        </div>

        <!-- Navigation Menu Desktop -->
        <nav class="luxury-nav-wrapper">
          <ul class="luxury-nav-menu">
            <li class="luxury-nav-item">
              <router-link to="/">Trang chủ</router-link>
            </li>
            <li class="luxury-nav-item">
              <router-link to="/rooms">Phòng nghỉ</router-link>
            </li>
            <li class="luxury-nav-item">
              <router-link to="/blog">Cẩm nang</router-link>
            </li>
            <li class="luxury-nav-item">
              <router-link to="/contact">Liên hệ</router-link>
            </li>
          </ul>
        </nav>

        <!-- Right Side: Tài khoản / Nút Đăng nhập -->
        <div class="luxury-header-account">
          <!-- Đã đăng nhập -->
          <div class="luxury-user-menu" v-if="isLoggedIn">
            <div
              class="luxury-user-toggle"
              @click="toggleUserDropdown"
            >
              <div class="luxury-user-avatar">
                <i class="im im-icon-User"></i>
              </div>
              <span class="luxury-user-name">{{ customerName }}</span>
              <i class="im im-icon-Arrow-Down2" style="font-size: 11px; color: #b38e44;"></i>
            </div>

            <!-- Dropdown Menu -->
            <ul
              v-if="showDropdown"
              class="luxury-user-dropdown"
              @click="showDropdown = false"
            >
              <li v-if="customerUserId">
                <router-link
                  :to="{ name: 'UserProfile', params: { userId: customerUserId } }"
                >
                  <i class="im im-icon-Profile"></i>
                  <span>Thông tin tài khoản</span>
                </router-link>
              </li>
              <li v-if="customerUserId">
                <router-link
                  :to="{ name: 'UserProfile', params: { userId: customerUserId } }"
                >
                  <i class="im im-icon-Suitcase"></i>
                  <span>Lịch sử đặt phòng</span>
                </router-link>
              </li>
              <li class="divider"></li>
              <li>
                <a href="#" @click.prevent="handleLogout">
                  <i class="im im-icon-Power-2"></i>
                  <span>Đăng xuất</span>
                </a>
              </li>
            </ul>
          </div>

          <!-- Khách vãng lai chưa đăng nhập -->
          <div class="luxury-guest-links" v-else>
            <router-link to="/sign-in" class="luxury-guest-btn-signin">
              <i class="im im-icon-Lock-2"></i>
              <span>Đăng nhập</span>
            </router-link>
            <router-link to="/sign-up" class="luxury-guest-btn-signup">
              <span>Đăng ký</span>
            </router-link>
          </div>

          <!-- Hamburger Button Mobile -->
          <button
            class="luxury-mobile-toggle-btn"
            type="button"
            aria-label="Toggle navigation"
            @click="toggleMobileMenu"
          >
            <i class="im im-icon-Line-Chart" style="transform: rotate(90deg);"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Navigation Drawer -->
    <div class="luxury-mobile-nav" :class="{ open: mobileMenuOpen }">
      <ul class="luxury-mobile-menu-list">
        <li>
          <router-link to="/" @click="mobileMenuOpen = false">Trang chủ</router-link>
        </li>
        <li>
          <router-link to="/rooms" @click="mobileMenuOpen = false">Phòng nghỉ</router-link>
        </li>
        <li>
          <router-link to="/blog" @click="mobileMenuOpen = false">Cẩm nang</router-link>
        </li>
        <li>
          <router-link to="/contact" @click="mobileMenuOpen = false">Liên hệ</router-link>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  name: "TheHeader",
  setup() {
    const store = useStore();
    const router = useRouter();

    const showDropdown = ref(false);
    const mobileMenuOpen = ref(false);

    const userLogin = computed(() => store.state.auth.userLogin || {});
    const currentUser = computed(() => {
      const login = userLogin.value;
      return login.user && typeof login.user === "object" ? login.user : login;
    });

    const customerUserId = computed(() => {
      const user = currentUser.value;
      const login = userLogin.value;
      const id = user.id ?? user._id ?? login.id ?? login._id;
      return id === undefined || id === null || id === "" ? "" : id;
    });

    const isLoggedIn = computed(() => {
      const u = userLogin.value;
      return Boolean(u && (customerUserId.value || u.token));
    });

    const customerName = computed(() => {
      const u = currentUser.value;
      return u && u.name ? u.name : "Quý khách";
    });

    const toggleUserDropdown = () => {
      showDropdown.value = !showDropdown.value;
    };

    const toggleMobileMenu = () => {
      mobileMenuOpen.value = !mobileMenuOpen.value;
    };

    const handleLogout = () => {
      localStorage.removeItem("userLogin");
      store.commit("auth/setUserLoginFromLocalStorage", {});
      showDropdown.value = false;
      router.push("/");
    };

    return {
      isLoggedIn,
      customerName,
      customerUserId,
      showDropdown,
      mobileMenuOpen,
      toggleUserDropdown,
      toggleMobileMenu,
      handleLogout,
    };
  },
};
</script>

<style src="@/assets/css/navigation-luxury.css"></style>
