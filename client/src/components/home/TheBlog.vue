<template>
  <section class="hotel-home-guide">
    <div class="container">
      <div class="hotel-home-guide-heading">
        <span>CẢM HỨNG DU LỊCH</span>
        <h3>Bài viết mới nhất</h3>
        <p>
          Câu chuyện, kinh nghiệm và gợi ý hữu ích cho những chuyến đi đáng nhớ.
        </p>
      </div>

      <div class="hotel-home-guide-empty">
        <h4>Chưa có bài viết được xuất bản</h4>
        <p>Nội dung cẩm nang du lịch sẽ xuất hiện tại đây khi được cập nhật.</p>
        <router-link to="/blog"> Xem cẩm nang </router-link>
      </div>
    </div>
  </section>
</template>

<script>
import "@/assets/css/home-guide.css";
export default {};
</script>
