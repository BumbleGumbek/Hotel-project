<template>
  <section class="hotel-plan-section">
    <div class="container">
      <div class="hotel-plan-heading">
        <h3>Lên kế hoạch cho chuyến đi</h3>
        <p>
          Từ cảm hứng điểm đến đến nơi lưu trú phù hợp, hành trình của bạn bắt
          đầu thật dễ dàng.
        </p>
      </div>

      <div class="hotel-plan-list">
        <div class="hotel-plan-card">
          <div class="hotel-plan-icon">01</div>
          <h4>Khám phá điểm đến</h4>
          <p>
            Tìm cảm hứng từ những địa điểm du lịch và chọn nơi bạn muốn khám
            phá.
          </p>
          <router-link to="/">Khám phá địa điểm</router-link>
        </div>

        <div class="hotel-plan-card">
          <div class="hotel-plan-icon">02</div>
          <h4>Tìm chỗ ở phù hợp</h4>
          <p>Chọn điểm đến để xem các lựa chọn lưu trú đang có tại khu vực.</p>
          <router-link to="/">Tìm chỗ ở</router-link>
        </div>

        <div class="hotel-plan-card">
          <div class="hotel-plan-icon">03</div>
          <h4>Đặt chỗ và sẵn sàng đi</h4>
          <p>
            Xem chi tiết nơi lưu trú, xác nhận thông tin và chuẩn bị cho chuyến
            đi.
          </p>
          <router-link to="/rooms">Xem nơi lưu trú</router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import "@/assets/css/home-plan.css";

export default {};
</script>
