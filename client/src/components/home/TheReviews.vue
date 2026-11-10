<template>
  <section class="luxury-featured-reviews">
    <div class="container">
      <header class="featured-reviews-header">
        <span class="luxury-section-eyebrow">Trải nghiệm từ cộng đồng</span>
        <h2>Đánh giá nổi bật</h2>
        <div class="luxury-title-divider"></div>
        <p>
          Chia sẻ thực tế từ những người đã lưu trú tại các điểm đến của chúng
          tôi.
        </p>
      </header>

      <div v-if="isLoading" class="featured-reviews-state" role="status">
        Đang tải đánh giá...
      </div>
      <div
        v-else-if="loadError"
        class="featured-reviews-state error"
        role="alert"
      >
        {{ loadError }}
      </div>
      <div v-else-if="!reviews.length" class="featured-reviews-state">
        Chưa có đánh giá để hiển thị.
      </div>
      <div v-else class="featured-reviews-grid">
        <article
          v-for="review in reviews"
          :key="review.id || review._id"
          class="featured-review-card"
        >
          <div class="review-quote-mark">“</div>
          <p class="review-content">{{ review.content }}</p>
          <div class="review-divider"></div>
          <div class="review-author">
            <img
              v-if="review.user && review.user.avatar"
              :src="review.user.avatar"
              :alt="review.user.name || 'Khách lưu trú'"
              loading="lazy"
            />
            <div class="review-author-details">
              <strong>{{
                review.user && review.user.name
                  ? review.user.name
                  : "Khách lưu trú"
              }}</strong>
              <span>{{
                review.room && review.room.name
                  ? review.room.name
                  : "Địa điểm lưu trú"
              }}</span>
            </div>
            <time
              v-if="formatDate(review.createdAt)"
              :datetime="review.createdAt"
            >
              {{ formatDate(review.createdAt) }}
            </time>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script>
import { onMounted, ref } from "vue";
import axiosAPI from "../../api";

export default {
  name: "TheReviews",
  setup() {
    const reviews = ref([]);
    const isLoading = ref(true);
    const loadError = ref("");

    const formatDate = (dateValue) => {
      if (!dateValue) return "";
      const date = new Date(dateValue);
      if (Number.isNaN(date.getTime())) return "";
      return date.toLocaleDateString("vi-VN", {
        year: "numeric",
        month: "long",
      });
    };

    onMounted(async () => {
      try {
        const rooms = await axiosAPI.get("/api/rooms");
        if (!Array.isArray(rooms)) {
          throw new TypeError("API phòng không trả về danh sách hợp lệ.");
        }

        const roomList = rooms.filter((room) => room.id || room._id);
        const reviewsByRoom = await Promise.all(
          roomList.map((room) =>
            axiosAPI.get(`/api/reviews/byRoom?roomId=${room.id || room._id}`)
          )
        );

        reviews.value = reviewsByRoom
          .filter(Array.isArray)
          .flat()
          .filter((review) => review && review.content)
          .sort(
            (first, second) =>
              new Date(second.createdAt).getTime() -
              new Date(first.createdAt).getTime()
          )
          .slice(0, 3);
      } catch {
        loadError.value = "Chưa thể tải đánh giá. Vui lòng thử lại sau.";
      } finally {
        isLoading.value = false;
      }
    });

    return {
      reviews,
      isLoading,
      loadError,
      formatDate,
    };
  },
};
</script>

<style scoped lang="scss">
.luxury-featured-reviews {
  padding: 78px 0 84px;
  background: #2b2520;
}

.featured-reviews-header {
  max-width: 720px;
  margin: 0 auto 42px;
  text-align: center;

  .luxury-section-eyebrow {
    color: #dfba73;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  h2 {
    margin: 10px 0 14px;
    color: #fcfbf9;
    font-size: 32px;
    font-weight: 700;
  }

  .luxury-title-divider {
    width: 50px;
    height: 2px;
    margin: 0 auto 16px;
    background: #dfba73;
  }

  p {
    margin: 0;
    color: #d3c7b8;
    font-size: 15px;
    line-height: 1.7;
  }
}

.featured-reviews-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
}

.featured-review-card {
  position: relative;
  padding: 26px 24px 22px;
  border: 1px solid rgba(223, 186, 115, 0.25);
  border-radius: 14px;
  background: #352e27;
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.12);

  .review-quote-mark {
    height: 34px;
    color: #dfba73;
    font-family: Georgia, serif;
    font-size: 48px;
    line-height: 1;
  }

  .review-content {
    min-height: 84px;
    margin: 8px 0 22px;
    color: #f5f0e9;
    font-size: 15px;
    line-height: 1.75;
  }

  .review-divider {
    height: 1px;
    margin-bottom: 17px;
    background: rgba(223, 186, 115, 0.22);
  }

  .review-author {
    display: flex;
    align-items: center;
    gap: 11px;

    img {
      width: 42px;
      height: 42px;
      flex: 0 0 42px;
      border-radius: 50%;
      object-fit: cover;
    }

    .review-author-details {
      display: grid;
      min-width: 0;
      flex: 1;
      gap: 4px;
    }

    strong {
      overflow: hidden;
      color: #fcfbf9;
      font-size: 13px;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    span,
    time {
      color: #c5b7a5;
      font-size: 11px;
      line-height: 1.4;
    }

    time {
      flex: 0 0 auto;
    }
  }
}

.featured-reviews-state {
  max-width: 620px;
  margin: 0 auto;
  padding: 28px;
  border: 1px solid rgba(223, 186, 115, 0.25);
  border-radius: 12px;
  background: #352e27;
  color: #e8dfd2;
  text-align: center;

  &.error {
    color: #ffc9c1;
  }
}

@media (max-width: 991px) {
  .featured-reviews-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 600px) {
  .luxury-featured-reviews {
    padding: 52px 0;
  }

  .featured-reviews-header h2 {
    font-size: 25px;
  }

  .featured-reviews-grid {
    grid-template-columns: 1fr;
  }

  .featured-review-card .review-content {
    min-height: 0;
  }
}
</style>
