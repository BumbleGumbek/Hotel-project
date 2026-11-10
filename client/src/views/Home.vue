<template>
  <!-- Wrapper -->
  <div id="wrapper">
    <the-banner :locations="locations"></the-banner>

    <!-- Content
================================================== -->
    <the-categories
      :locations="locations"
      :is-loading="locationsLoading"
      :load-error="locationsError"
    ></the-categories>

    <!-- Fullwidth Section -->
    <the-places
      :locations="locations"
      :is-loading="locationsLoading"
      :load-error="locationsError"
    ></the-places>
    <!-- Fullwidth Section / End -->

    <the-reviews></the-reviews>

    <!-- Info Section -->
    <the-plan></the-plan>
    <!-- Info Section / End -->

    <!-- Recent Blog Posts -->
    <the-blog></the-blog>
    <!-- Recent Blog Posts / End -->

    <!-- Back To Top Button -->
    <div id="backtotop"><a href="#"></a></div>
  </div>
  <!-- Wrapper / End -->
</template>

<script>
import { onMounted, ref } from "vue";
import TheBanner from "../components/home/TheBanner.vue";
import TheCategories from "../components/home/TheCategories.vue";
import ThePlaces from "../components/home/ThePlaces.vue";
import TheReviews from "../components/home/TheReviews.vue";
import ThePlan from "../components/home/ThePlan.vue";
import TheBlog from "../components/home/TheBlog.vue";
import { useStore } from "vuex";
export default {
  name: "Home",
  components: {
    TheBanner,
    TheCategories,
    ThePlaces,
    TheReviews,
    ThePlan,
    TheBlog,
  },
  setup() {
    const store = useStore();
    const locations = ref([]);
    const locationsLoading = ref(true);
    const locationsError = ref("");

    store.dispatch("auth/loadUserLoginFromLocalStorageAction");

    onMounted(async () => {
      try {
        await store.dispatch("location/getLocationListAction", "");
        const locationList = store.state.location.locationList;
        if (!Array.isArray(locationList)) {
          throw new TypeError("API locations không trả về danh sách hợp lệ.");
        }
        locations.value = locationList;
      } catch {
        locationsError.value =
          "Chưa thể tải danh sách địa điểm. Vui lòng thử lại sau.";
      } finally {
        locationsLoading.value = false;
      }
    });

    return {
      locations,
      locationsLoading,
      locationsError,
    };
  },
};
</script>
