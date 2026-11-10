<template>
  <div class="hotel-search luxury-search">
    <div class="search-field location-field">
      <label for="destination-search">Điểm đến</label>
      <div class="location-input-wrap">
        <i class="im im-icon-Location-2 location-icon"></i>
        <input
          id="destination-search"
          v-model="searchText"
          type="search"
          placeholder="Bạn muốn đi đâu?"
          autocomplete="off"
          role="combobox"
          aria-autocomplete="list"
          aria-controls="location-suggestions"
          :aria-expanded="showSuggestions"
          :aria-activedescendant="
            activeIndex >= 0 ? `location-option-${activeIndex}` : undefined
          "
          @input="handleInput"
          @focus="showSuggestions = true"
          @keydown.down.prevent="moveSelection(1)"
          @keydown.up.prevent="moveSelection(-1)"
          @keydown.enter.prevent="selectActiveLocation"
          @keydown.esc="showSuggestions = false"
        />
        <div
          v-if="showSuggestions"
          id="location-suggestions"
          class="location-suggestions"
          role="listbox"
        >
          <div v-if="isLoading" class="suggestion-message" role="status">
            Đang tìm địa điểm...
          </div>
          <div v-else-if="searchError" class="suggestion-message error">
            {{ searchError }}
          </div>
          <button
            v-else
            v-for="(location, index) in suggestions"
            :id="`location-option-${index}`"
            :key="location.id || location._id || location.name"
            class="location-suggestion"
            :class="{ active: activeIndex === index }"
            type="button"
            role="option"
            :aria-selected="activeIndex === index"
            @mousedown.prevent="selectLocation(location)"
            @mouseenter="activeIndex = index"
          >
            <i class="im im-icon-Location-2"></i>
            <span>
              <strong>{{ location.name }}</strong>
              <small
                >{{ location.province
                }}<template v-if="location.country"
                  >, {{ location.country }}</template
                ></small
              >
            </span>
          </button>
          <div
            v-if="
              !isLoading &&
              !searchError &&
              searchText.trim() &&
              !suggestions.length
            "
            class="suggestion-message"
            role="status"
          >
            Không tìm thấy địa điểm phù hợp.
          </div>
          <div
            v-if="
              !isLoading &&
              !searchError &&
              !searchText.trim() &&
              !suggestions.length
            "
            class="suggestion-message"
            role="status"
          >
            Chưa có địa điểm để gợi ý.
          </div>
        </div>
      </div>
    </div>

    <div class="search-field">
      <label for="home-check-in">Ngày nhận phòng</label>
      <input id="home-check-in" v-model="checkIn" type="date" :min="today" />
    </div>

    <div class="search-field">
      <label for="home-check-out">Ngày trả phòng</label>
      <input
        id="home-check-out"
        v-model="checkOut"
        type="date"
        :min="checkIn || today"
      />
    </div>

    <div class="search-field">
      <label for="home-adults">Khách</label>
      <select id="home-adults" v-model.number="adults">
        <option :value="1">1 người lớn</option>
        <option :value="2">2 người lớn</option>
        <option :value="3">3 người lớn</option>
        <option :value="4">4 người lớn</option>
        <option :value="5">5 người lớn</option>
      </select>
    </div>

    <div class="search-field">
      <label for="home-children">Trẻ em</label>
      <select id="home-children" v-model.number="children">
        <option :value="0">Không có</option>
        <option :value="1">1 trẻ em</option>
        <option :value="2">2 trẻ em</option>
        <option :value="3">3 trẻ em</option>
      </select>
    </div>

    <button class="search-button" type="button" @click="handleSearch">
      <i class="fa fa-search"></i>
      Tìm chỗ ở
    </button>

    <p v-if="errorMessage" class="search-error" role="alert">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script>
import { computed, onUnmounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import "@/assets/css/hotel-search.css";

export default {
  name: "TheMainSearch",
  props: {
    locations: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const router = useRouter();
    const store = useStore();
    const searchText = ref("");
    const selectedLocation = ref(null);
    const suggestions = ref(props.locations);
    const showSuggestions = ref(false);
    const isLoading = ref(false);
    const searchError = ref("");
    const errorMessage = ref("");
    const activeIndex = ref(-1);
    const checkIn = ref("");
    const checkOut = ref("");
    const adults = ref(2);
    const children = ref(0);
    let searchTimer;
    let requestId = 0;

    const today = computed(() => {
      const date = new Date();
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    });

    watch(
      () => props.locations,
      (locations) => {
        if (!searchText.value.trim()) {
          suggestions.value = locations;
        }
      }
    );

    watch(searchText, (value) => {
      if (selectedLocation.value && value === selectedLocation.value.name) {
        return;
      }

      const currentRequestId = ++requestId;
      selectedLocation.value = null;
      errorMessage.value = "";
      searchError.value = "";
      activeIndex.value = -1;
      window.clearTimeout(searchTimer);

      const keyword = value.trim();
      if (!keyword) {
        suggestions.value = props.locations;
        isLoading.value = false;
        return;
      }

      isLoading.value = true;
      searchTimer = window.setTimeout(async () => {
        try {
          await store.dispatch("location/getLocationListAction", keyword);
          if (currentRequestId !== requestId) return;

          const locationList = store.state.location.locationList;
          if (!Array.isArray(locationList)) {
            throw new TypeError("API locations không trả về danh sách hợp lệ.");
          }
          suggestions.value = locationList;
        } catch {
          if (currentRequestId !== requestId) return;
          suggestions.value = [];
          searchError.value = "Không thể tải gợi ý địa điểm. Vui lòng thử lại.";
        } finally {
          if (currentRequestId === requestId) {
            isLoading.value = false;
          }
        }
      }, 300);
    });

    const validateDates = () => {
      if (!checkIn.value && !checkOut.value) return true;
      if (!checkIn.value || !checkOut.value) {
        errorMessage.value =
          "Vui lòng chọn cả ngày nhận phòng và ngày trả phòng.";
        return false;
      }
      if (checkIn.value < today.value) {
        errorMessage.value = "Ngày nhận phòng không hợp lệ.";
        return false;
      }
      if (checkOut.value <= checkIn.value) {
        errorMessage.value = "Ngày trả phòng phải sau ngày nhận phòng.";
        return false;
      }
      return true;
    };

    const navigateToLocation = (location) => {
      errorMessage.value = "";
      if (!validateDates()) return;

      const locationId = location && (location.id || location._id);
      if (!locationId) {
        errorMessage.value = "Địa điểm này chưa có mã để tìm chỗ ở.";
        return;
      }

      const query = {
        adults: String(adults.value),
        children: String(children.value),
      };
      if (checkIn.value && checkOut.value) {
        query.checkIn = checkIn.value;
        query.checkOut = checkOut.value;
      }

      showSuggestions.value = false;
      router.push({
        name: "Rooms",
        params: { locationId },
        query,
      });
    };

    const selectLocation = (location) => {
      requestId += 1;
      window.clearTimeout(searchTimer);
      isLoading.value = false;
      searchError.value = "";
      selectedLocation.value = location;
      searchText.value = location.name || location.province || "";
      showSuggestions.value = false;
      activeIndex.value = -1;
      navigateToLocation(location);
    };

    const moveSelection = (direction) => {
      showSuggestions.value = true;
      if (!suggestions.value.length) return;
      const nextIndex = activeIndex.value + direction;
      if (nextIndex < 0) {
        activeIndex.value = suggestions.value.length - 1;
      } else {
        activeIndex.value = nextIndex % suggestions.value.length;
      }
    };

    const selectActiveLocation = () => {
      if (activeIndex.value >= 0 && suggestions.value[activeIndex.value]) {
        selectLocation(suggestions.value[activeIndex.value]);
      } else if (selectedLocation.value) {
        navigateToLocation(selectedLocation.value);
      } else {
        errorMessage.value = "Vui lòng chọn một địa điểm từ danh sách gợi ý.";
        showSuggestions.value = true;
      }
    };

    const handleInput = () => {
      selectedLocation.value = null;
      showSuggestions.value = true;
    };

    const handleSearch = () => {
      if (selectedLocation.value) {
        navigateToLocation(selectedLocation.value);
        return;
      }

      errorMessage.value = "Vui lòng chọn một địa điểm từ danh sách gợi ý.";
      showSuggestions.value = true;
    };

    onUnmounted(() => {
      window.clearTimeout(searchTimer);
      requestId += 1;
    });

    return {
      searchText,
      suggestions,
      showSuggestions,
      isLoading,
      searchError,
      errorMessage,
      activeIndex,
      checkIn,
      checkOut,
      adults,
      children,
      today,
      handleInput,
      handleSearch,
      moveSelection,
      selectActiveLocation,
      selectLocation,
    };
  },
};
</script>
