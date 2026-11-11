<template>
  <footer class="luxury-footer-wrapper">
    <div class="container">
      <div class="row">
        <!-- Cột 1: Giới thiệu nền tảng -->
        <div class="col-md-5 col-sm-12">
          <div class="luxury-footer-brand">
            <h3>StayFinder</h3>
            <span class="brand-sub">Tìm kiếm &amp; đặt phòng</span>
            <p>
              Khám phá và đặt chỗ lưu trú tại nhiều địa điểm, với những lựa chọn phù hợp cho mỗi hành trình.
            </p>
          </div>
        </div>

        <!-- Cột 2: Điều hướng nhanh -->
        <div class="col-md-3 col-sm-6">
          <h4 class="luxury-footer-col-title">Khám phá</h4>
          <ul class="luxury-footer-links-list">
            <li>
              <router-link to="/">
                <i class="im im-icon-Right-2"></i> Trang chủ
              </router-link>
            </li>
            <li>
              <router-link to="/rooms">
                <i class="im im-icon-Right-2"></i> Danh sách phòng
              </router-link>
            </li>
            <li>
              <router-link to="/blog">
                <i class="im im-icon-Right-2"></i> Cẩm nang du lịch
              </router-link>
            </li>
            <li>
              <router-link to="/contact">
                <i class="im im-icon-Right-2"></i> Liên hệ
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Cột 3: Tài khoản & Hỗ trợ -->
        <div class="col-md-4 col-sm-6">
          <h4 class="luxury-footer-col-title">Tài khoản & Hỗ trợ</h4>
          <ul class="luxury-footer-links-list">
            <li>
              <router-link to="/sign-in">
                <i class="im im-icon-Right-2"></i> Đăng nhập
              </router-link>
            </li>
            <li>
              <router-link to="/sign-up">
                <i class="im im-icon-Right-2"></i> Đăng ký
              </router-link>
            </li>
            <li>
              <router-link to="/contact">
                <i class="im im-icon-Right-2"></i> Hỗ trợ
              </router-link>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bản quyền chân trang -->
      <div class="row">
        <div class="col-md-12">
          <div class="luxury-footer-bottom">
            © 2026 StayFinder. Nền tảng tìm kiếm và đặt phòng lưu trú.
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "TheFooter",
};
</script>

<style src="@/assets/css/navigation-luxury.css"></style>
