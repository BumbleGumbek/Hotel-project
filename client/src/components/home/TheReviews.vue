<template>
  <section v-if="reviews.length" class="hotel-reviews-section">
    <div class="container">
      <h3>Khách hàng nói gì về chúng tôi</h3>
      <!-- Sẽ hiển thị đánh giá thật khi có API -->
    </div>
  </section>
</template>

<script>
export default {
  setup() {
    return {
      reviews: [],
    };
  },
};
</script>