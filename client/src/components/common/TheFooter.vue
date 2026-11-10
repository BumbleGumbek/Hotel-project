<template>
  <footer class="luxury-footer-wrapper">
    <div class="container">
      <div class="row">
        <!-- Cột 1: Giới thiệu khách sạn -->
        <div class="col-md-5 col-sm-12">
          <div class="luxury-footer-brand">
            <h3>Khách Sạn</h3>
            <span class="brand-sub">Boutique Hotel & Resort</span>
            <p>
              Không gian nghỉ dưỡng tinh tế, dịch vụ chu đáo và tiện nghi tiêu chuẩn. Chúng tôi tận tâm mang đến cho quý khách kỳ nghỉ thư thái và trọn vẹn nhất.
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
                <i class="im im-icon-Right-2"></i> Liên hệ lễ tân
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Cột 3: Tài khoản & Đặt phòng -->
        <div class="col-md-4 col-sm-6">
          <h4 class="luxury-footer-col-title">Tài khoản & Hỗ trợ</h4>
          <ul class="luxury-footer-links-list">
            <li>
              <router-link to="/sign-in">
                <i class="im im-icon-Right-2"></i> Đăng nhập tài khoản
              </router-link>
            </li>
            <li>
              <router-link to="/sign-up">
                <i class="im im-icon-Right-2"></i> Đăng ký thành viên
              </router-link>
            </li>
            <li>
              <router-link to="/contact">
                <i class="im im-icon-Right-2"></i> Gửi yêu cầu hỗ trợ
              </router-link>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bản quyền chân trang -->
      <div class="row">
        <div class="col-md-12">
          <div class="luxury-footer-bottom">
            © 2026 Khách Sạn. All Rights Reserved. Thiết kế cho trải nghiệm nghỉ dưỡng cao cấp.
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
