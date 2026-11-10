<template>
  <section class="luxury-destination-categories">
    <div class="container">
      <header class="destination-categories-header">
        <span class="luxury-section-eyebrow">Khám phá điểm đến</span>
        <h2 class="luxury-section-title">Tìm cảm hứng theo khu vực</h2>
        <div class="luxury-title-divider"></div>
        <p>
          Khám phá những địa điểm lưu trú theo từng tỉnh thành và chọn nơi bắt
          đầu hành trình.
        </p>
      </header>

      <div v-if="isLoading" class="destination-category-state" role="status">
        Đang tải danh sách điểm đến...
      </div>
      <div
        v-else-if="loadError"
        class="destination-category-state error"
        role="alert"
      >
        {{ loadError }}
      </div>
      <div
        v-else-if="!groupedLocations.length"
        class="destination-category-state"
      >
        Hiện chưa có địa điểm để khám phá.
      </div>
      <div v-else class="destination-category-grid">
        <article
          v-for="group in groupedLocations"
          :key="group.name"
          class="destination-category-card"
        >
          <div class="destination-category-icon">
            <i class="im im-icon-Map-Marker"></i>
          </div>
          <div class="destination-category-content">
            <h3>{{ group.name }}</h3>
            <span>{{ group.locations.length }} điểm đến</span>
            <ul>
              <li
                v-for="location in group.locations"
                :key="location.id || location._id || location.name"
              >
                <router-link
                  v-if="location.id || location._id"
                  :to="{
                    name: 'Rooms',
                    params: { locationId: location.id || location._id },
                  }"
                >
                  {{ location.name }}
                  <i class="im im-icon-Right-2"></i>
                </router-link>
                <span v-else>{{ location.name }}</span>
              </li>
            </ul>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script>
import { computed } from "vue";

export default {
  name: "TheCategories",
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
    const groupedLocations = computed(() => {
      const groups = new Map();
      props.locations.forEach((location) => {
        const name = location.province || location.country || "Điểm đến khác";
        if (!groups.has(name)) groups.set(name, []);
        groups.get(name).push(location);
      });

      return Array.from(groups, ([name, locations]) => ({ name, locations }));
    });

    return {
      groupedLocations,
    };
  },
};
</script>

<style scoped lang="scss">
.luxury-destination-categories {
  padding: 72px 0 78px;
  background: #fff;
}

.destination-categories-header {
  max-width: 720px;
  margin: 0 auto 38px;
  text-align: center;

  .luxury-section-eyebrow {
    color: #b38e44;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  .luxury-section-title {
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

.destination-category-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}

.destination-category-card {
  display: flex;
  gap: 16px;
  min-width: 0;
  padding: 22px;
  border: 1px solid rgba(223, 186, 115, 0.28);
  border-radius: 14px;
  background: #faf8f5;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 28px rgba(43, 37, 32, 0.08);
  }

  .destination-category-icon {
    display: flex;
    width: 42px;
    height: 42px;
    flex: 0 0 42px;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: rgba(223, 186, 115, 0.2);
    color: #a77f35;
    font-size: 19px;
  }

  .destination-category-content {
    min-width: 0;
    flex: 1;
  }

  h3 {
    margin: 0 0 4px;
    color: #2b2520;
    font-size: 17px;
    font-weight: 700;
  }

  span {
    color: #827970;
    font-size: 12px;
  }

  ul {
    display: grid;
    gap: 8px;
    margin: 16px 0 0;
    padding: 0;
    list-style: none;
  }

  li,
  li a {
    color: #5e5143;
    font-size: 13px;
  }

  li a {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    text-decoration: none;

    &:hover {
      color: #a77f35;
    }

    i {
      color: #b38e44;
      font-size: 11px;
    }
  }
}

.destination-category-state {
  max-width: 620px;
  margin: 0 auto;
  padding: 26px;
  border: 1px solid rgba(223, 186, 115, 0.28);
  border-radius: 12px;
  color: #6d645a;
  background: #faf8f5;
  text-align: center;

  &.error {
    color: #a63c32;
  }
}

@media (max-width: 991px) {
  .destination-category-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 600px) {
  .luxury-destination-categories {
    padding: 50px 0;
  }

  .destination-categories-header .luxury-section-title {
    font-size: 25px;
  }

  .destination-category-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .destination-category-card {
    padding: 18px;
  }
}
</style>
