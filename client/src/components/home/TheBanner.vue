<template>
  <div
    class="main-search-container centered luxury-banner"
    :style="{ backgroundImage }"
  >
    <div class="luxury-banner-overlay"></div>
    <div class="main-search-inner luxury-banner-inner">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <h2 class="luxury-title">
              Tìm nơi lưu trú cho hành trình tiếp theo
            </h2>

            <h4 class="luxury-subtitle">
              Khám phá những chỗ ở đáng nhớ và điểm đến tuyệt vời dành riêng cho
              bạn.
            </h4>

            <the-main-search :locations="locations"></the-main-search>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import TheMainSearch from "./TheMainSearch.vue";

export default {
  name: "TheBanner",
  props: {
    locations: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    TheMainSearch,
  },
  setup(props) {
    const backgroundImage = computed(() => {
      const featuredLocation = props.locations
        .filter((location) => location.image)
        .slice()
        .sort(
          (first, second) =>
            (Number(second.valueate) || 0) - (Number(first.valueate) || 0)
        )[0];

      return featuredLocation
        ? `url("${featuredLocation.image}")`
        : "linear-gradient(135deg, #40372e, #8c6b37)";
    });

    return {
      backgroundImage,
    };
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
  }
}
</style>
