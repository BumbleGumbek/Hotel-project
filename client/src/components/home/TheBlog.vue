<template>
  <section class="hotel-home-guide">
    <div class="container">
      <div class="hotel-home-guide-heading">
        <span>CẨM NANG KHÁCH SẠN</span>
        <h3>Cẩm nang nghỉ dưỡng</h3>
        <p>
          Những thông tin hữu ích dành cho kỳ nghỉ
          và trải nghiệm lưu trú của bạn.
        </p>
      </div>

      <div class="hotel-home-guide-empty">
        <h4>Nội dung đang được cập nhật</h4>
        <p>
          Chúng tôi đang chuẩn bị những thông tin hữu ích
          để mang đến trải nghiệm tốt hơn cho khách hàng.
        </p>
        <router-link to="/blog">
          Khám phá cẩm nang
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
import "@/assets/css/home-guide.css";
export default {};
</script>