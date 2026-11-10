<template>
  <section class="luxury-popular-destinations">
    <div class="container">
      <header class="popular-destinations-header">
        <span class="luxury-section-eyebrow">Được yêu thích</span>
        <h2>Những điểm đến nổi bật</h2>
        <div class="luxury-title-divider"></div>
        <p>
          Tìm cảm hứng cho hành trình tiếp theo từ những địa điểm được đánh giá
          cao.
        </p>
      </header>

      <div v-if="isLoading" class="popular-destination-state" role="status">
        Đang tải các điểm đến nổi bật...
      </div>
      <div
        v-else-if="loadError"
        class="popular-destination-state error"
        role="alert"
      >
        {{ loadError }}
      </div>
      <div
        v-else-if="!popularLocations.length"
        class="popular-destination-state"
      >
        Hiện chưa có điểm đến nổi bật.
      </div>
      <div v-else class="popular-destination-grid">
        <router-link
          v-for="location in popularLocations"
          :key="location.id || location._id || location.name"
          :to="{
            name: 'Rooms',
            params: { locationId: location.id || location._id },
          }"
          class="popular-destination-card"
        >
          <div class="destination-image">
            <img
              v-if="location.image"
              :src="location.image"
              :alt="location.name"
              loading="lazy"
            />
            <div class="destination-image-overlay"></div>
            <span v-if="location.valueate" class="destination-score">
              <i class="im im-icon-Star"></i>
              {{ location.valueate }}/10
            </span>
          </div>
          <div class="destination-card-content">
            <span class="destination-province">
              <i class="im im-icon-Location-2"></i>
              {{ location.province || location.country }}
            </span>
            <h3>{{ location.name }}</h3>
            <span class="destination-explore">
              Khám phá chỗ ở
              <i class="im im-icon-Right-2"></i>
            </span>
          </div>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
import { computed } from "vue";

export default {
  name: "ThePlaces",
  props: {
    locations: {
      type: Array,
      default: () => [],
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    loadError: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const popularLocations = computed(() =>
      props.locations
        .filter((location) => location.id || location._id)
        .slice()
        .sort(
          (first, second) =>
            (Number(second.valueate) || 0) - (Number(first.valueate) || 0)
        )
        .slice(0, 6)
    );

    return {
      popularLocations,
    };
  },
};
</script>

<style scoped lang="scss">
.luxury-popular-destinations {
  padding: 82px 0 88px;
  background: #faf8f5;
}

.popular-destinations-header {
  max-width: 720px;
  margin: 0 auto 42px;
  text-align: center;

  .luxury-section-eyebrow {
    color: #b38e44;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  h2 {
    margin: 10px 0 14px;
    color: #2b2520;
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
    color: #6d645a;
    font-size: 15px;
    line-height: 1.7;
  }
}

.popular-destination-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 22px;
}

.popular-destination-card {
  overflow: hidden;
  border: 1px solid rgba(223, 186, 115, 0.25);
  border-radius: 14px;
  background: #fff;
  box-shadow: 0 8px 26px rgba(43, 37, 32, 0.05);
  text-decoration: none;
  transition: transform 0.35s ease, box-shadow 0.35s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 16px 36px rgba(43, 37, 32, 0.12);

    .destination-image img {
      transform: scale(1.05);
    }

    .destination-explore {
      color: #a77f35;
    }
  }

  .destination-image {
    position: relative;
    height: 220px;
    overflow: hidden;
    background: linear-gradient(135deg, #574737, #b38e44);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
    }
  }

  .destination-image-overlay {
    position: absolute;
    inset: 45% 0 0;
    background: linear-gradient(180deg, transparent, rgba(20, 18, 16, 0.35));
    pointer-events: none;
  }

  .destination-score {
    position: absolute;
    top: 14px;
    right: 14px;
    padding: 7px 11px;
    border: 1px solid rgba(223, 186, 115, 0.45);
    border-radius: 20px;
    background: rgba(43, 37, 32, 0.82);
    color: #f3d89e;
    font-size: 12px;
    font-weight: 700;

    i {
      margin-right: 4px;
    }
  }

  .destination-card-content {
    padding: 20px 22px 22px;
  }

  .destination-province {
    color: #9c7940;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.4px;
    text-transform: uppercase;

    i {
      margin-right: 4px;
    }
  }

  h3 {
    min-height: 48px;
    margin: 9px 0 16px;
    color: #2b2520;
    font-size: 18px;
    font-weight: 700;
    line-height: 1.35;
  }

  .destination-explore {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 13px;
    border-top: 1px solid #f0eae1;
    color: #5e5143;
    font-size: 13px;
    font-weight: 600;
    transition: color 0.2s ease;
  }
}

.popular-destination-state {
  max-width: 620px;
  margin: 0 auto;
  padding: 28px;
  border: 1px solid rgba(223, 186, 115, 0.28);
  border-radius: 12px;
  background: #fff;
  color: #6d645a;
  text-align: center;

  &.error {
    color: #a63c32;
  }
}

@media (max-width: 991px) {
  .popular-destination-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 600px) {
  .luxury-popular-destinations {
    padding: 52px 0;
  }

  .popular-destinations-header h2 {
    font-size: 25px;
  }

  .popular-destination-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .popular-destination-card .destination-image {
    height: 210px;
  }
}
</style>
