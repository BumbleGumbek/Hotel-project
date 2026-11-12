<template>
  <section class="hotel-home-guide">
    <div class="container">
      <div class="hotel-home-guide-heading">
        <span>STAYFINDER | KHÁM PHÁ LƯU TRÚ</span>
        <h3>Cẩm nang lưu trú</h3>
        <p>Thông tin về tìm kiếm và đặt chỗ lưu trú tại nhiều địa điểm.</p>
      </div>

      <div class="hotel-home-guide-empty">
        <h4>Chưa có bài viết</h4>
        <p>Hiện StayFinder chưa có dữ liệu bài viết để hiển thị.</p>
        <router-link to="/blog"> Xem cẩm nang </router-link>
      </div>
    </div>
  </section>
</template>

<script>
import "@/assets/css/home-guide.css";
export default {};
</script>
