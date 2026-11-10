<template>
  <div
    class="main-search-container centered luxury-banner"
    :style="{ backgroundImage: `url('/images/hotel/hotel-exterior.jpg')` }"
  >
    <div class="luxury-banner-overlay"></div>
    <div class="main-search-inner luxury-banner-inner">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <h2 class="luxury-title">
              Chào mừng đến với không gian nghỉ dưỡng
            </h2>

            <h4 class="luxury-subtitle">
              Tận hưởng những phút giây thư giãn trong không gian tinh tế và ấm cúng.
            </h4>

            <the-main-search></the-main-search>
          </div>
        </div>

        <!-- Hạng phòng nổi bật -->
        <div class="row">
          <div class="col-md-12">
            <h5 class="luxury-categories-headline">
              Các hạng phòng nổi bật
            </h5>

            <div class="luxury-categories">
              <router-link
                :to="{ name: 'Rooms', query: { type: 'VIP' } }"
                class="luxury-category-card"
              >
                <div class="category-icon">
                  <i class="im im-icon-Crown"></i>
                </div>
                <div class="category-info">
                  <h4>Hạng VIP</h4>
                  <span>2 phòng</span>
                </div>
              </router-link>

              <router-link
                :to="{ name: 'Rooms', query: { type: 'Cao cấp' } }"
                class="luxury-category-card"
              >
                <div class="category-icon">
                  <i class="im im-icon-Star"></i>
                </div>
                <div class="category-info">
                  <h4>Hạng Cao cấp</h4>
                  <span>4 phòng</span>
                </div>
              </router-link>

              <router-link
                :to="{ name: 'Rooms', query: { type: 'Tiêu chuẩn' } }"
                class="luxury-category-card"
              >
                <div class="category-icon">
                  <i class="im im-icon-Check"></i>
                </div>
                <div class="category-info">
                  <h4>Hạng Tiêu chuẩn</h4>
                  <span>7 phòng</span>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TheMainSearch from "./TheMainSearch.vue";

export default {
  name: "TheBanner",
  components: {
    TheMainSearch,
  },
};
</script>

<style scoped lang="scss">
.main-search-container.luxury-banner {
  position: relative;
  height: auto;
  min-height: 640px;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  padding: 80px 0;
  box-sizing: border-box;

  /* Ghi đè gradient trắng mờ gốc của template */
  &::before {
    display: none !important;
  }

  .luxury-banner-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(20, 18, 16, 0.45) 0%,
      rgba(20, 18, 16, 0.65) 100%
    );
    z-index: 1;
    pointer-events: none;
  }

  .luxury-banner-inner {
    position: relative;
    z-index: 2;
    width: 100%;
    transform: none;
    top: auto;
    padding: 0;
  }

  .luxury-title {
    color: #fcfbf9;
    font-size: 38px;
    font-weight: 700;
    line-height: 1.3;
    margin-bottom: 12px;
    letter-spacing: -0.5px;
    text-shadow: 0 2px 12px rgba(0, 0, 0, 0.35);
  }

  .luxury-subtitle {
    color: #eedcc6;
    font-size: 17px;
    font-weight: 400;
    line-height: 1.6;
    margin-bottom: 30px;
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
    text-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
  }

  /* Nút danh mục hạng phòng phong cách Modern Luxury */
  .luxury-categories-headline {
    color: #e5cfb3;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    margin-top: 36px;
    margin-bottom: 18px;
  }

  .luxury-categories {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
    max-width: 780px;
    margin: 0 auto;
  }

  .luxury-category-card {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 12px 24px;
    background: rgba(28, 25, 23, 0.65);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border: 1px solid rgba(212, 175, 55, 0.35);
    border-radius: 50px;
    text-decoration: none;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);

    .category-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      background: rgba(212, 175, 55, 0.15);
      border-radius: 50%;
      color: #dfba73;
      font-size: 16px;
      transition: all 0.3s ease;
    }

    .category-info {
      text-align: left;

      h4 {
        color: #fdfdfd;
        font-size: 15px;
        font-weight: 600;
        margin: 0;
        line-height: 1.2;
        transition: color 0.3s ease;
      }

      span {
        color: #eedcc6;
        font-size: 12px;
        font-weight: 400;
        line-height: 1;
      }
    }

    &:hover {
      background: rgba(43, 37, 34, 0.9);
      border-color: #dfba73;
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(212, 175, 55, 0.25);

      .category-icon {
        background: #dfba73;
        color: #1a1715;
      }

      .category-info h4 {
        color: #dfba73;
      }
    }
  }

  /* Responsive Mobile & Tablet */
  @media (max-width: 992px) {
    min-height: auto;
    padding: 60px 0;

    .luxury-title {
      font-size: 30px;
    }

    .luxury-subtitle {
      font-size: 15px;
    }
  }

  @media (max-width: 600px) {
    padding: 45px 0;

    .luxury-title {
      font-size: 24px;
      line-height: 1.35;
    }

    .luxury-subtitle {
      font-size: 14px;
      margin-bottom: 24px;
    }

    .luxury-categories {
      flex-direction: column;
      gap: 12px;
      width: 100%;
    }

    .luxury-category-card {
      width: 100%;
      max-width: 280px;
      justify-content: center;
      padding: 10px 20px;
    }
  }
}
</style>
