<template>
  <section class="hotel-plan-section">
    <div class="container">
      <div class="hotel-plan-heading">
        <h3>Đặt phòng dễ dàng</h3>
        <p>
          Lựa chọn không gian nghỉ dưỡng phù hợp và hoàn tất
          đặt phòng chỉ với vài bước đơn giản.
        </p>
      </div>

      <div class="hotel-plan-list">
        <div class="hotel-plan-card">
          <div class="hotel-plan-icon">01</div>
          <h4>Chọn thời gian lưu trú</h4>
          <p>
            Chọn ngày nhận phòng, ngày trả phòng và số lượng
            khách cho kỳ nghỉ của bạn.
          </p>
        </div>

        <div class="hotel-plan-card">
          <div class="hotel-plan-icon">02</div>
          <h4>Chọn hạng phòng</h4>
          <p>
            Khám phá các hạng phòng VIP, Cao cấp và
            Tiêu chuẩn để tìm lựa chọn phù hợp.
          </p>
          <router-link to="/rooms">Xem phòng nghỉ</router-link>
        </div>

        <div class="hotel-plan-card">
          <div class="hotel-plan-icon">03</div>
          <h4>Hoàn tất đặt phòng</h4>
          <p>
            Xem thông tin phòng, kiểm tra ngày lưu trú
            và xác nhận thông tin đặt phòng.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import "@/assets/css/home-plan.css";

export default {};
</script>