
<template>
  <div class="hotel-search">
    <div class="search-field">
      <label>Ngày nhận phòng</label>
      <input
        type="date"
        v-model="checkIn"
        :min="today"
      />
    </div>

    <div class="search-field">
      <label>Ngày trả phòng</label>
      <input
        type="date"
        v-model="checkOut"
        :min="checkIn || today"
      />
    </div>

    <div class="search-field">
      <label>Người lớn</label>
      <select v-model.number="adults">
        <option :value="1">1 người</option>
        <option :value="2">2 người</option>
        <option :value="3">3 người</option>
        <option :value="4">4 người</option>
        <option :value="5">5 người</option>
      </select>
    </div>

    <div class="search-field">
      <label>Trẻ em</label>
      <select v-model.number="children">
        <option :value="0">0 trẻ em</option>
        <option :value="1">1 trẻ em</option>
        <option :value="2">2 trẻ em</option>
        <option :value="3">3 trẻ em</option>
      </select>
    </div>

    <div class="search-field">
      <label>Hạng phòng</label>
      <select v-model="roomType">
        <option value="">Tất cả hạng phòng</option>
        <option value="VIP">VIP</option>
        <option value="Cao cấp">Cao cấp</option>
        <option value="Tiêu chuẩn">Tiêu chuẩn</option>
      </select>
    </div>

    <button
      class="search-button"
      type="button"
      @click="handleSearch"
    >
      <i class="fa fa-search"></i>
      Xem phòng phù hợp
    </button>

    <p v-if="errorMessage" class="search-error">
      {{ errorMessage }}
    </p>

  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import "@/assets/css/hotel-search.css";

export default {
  setup() {
    const router = useRouter();

    const checkIn = ref("");
    const checkOut = ref("");
    const adults = ref(2);
    const children = ref(0);
    const roomType = ref("");

    const errorMessage = ref("");

    const today = computed(() => {
      const date = new Date();
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");

      return `${year}-${month}-${day}`;
    });

    const handleSearch = () => {
      errorMessage.value = "";

      if (!checkIn.value || !checkOut.value) {
        errorMessage.value =
          "Vui lòng chọn ngày nhận phòng và trả phòng.";
        return;
      }

      if (checkIn.value < today.value) {
        errorMessage.value = "Ngày nhận phòng không hợp lệ.";
        return;
      }

      if (checkOut.value <= checkIn.value) {
        errorMessage.value =
          "Ngày trả phòng phải sau ngày nhận phòng.";
        return;
      }

      router.push({
        path: "/rooms",
        query: {
          ...(roomType.value ? { type: roomType.value } : {}),
          checkIn: checkIn.value,
          checkOut: checkOut.value,
          adults: String(adults.value),
          children: String(children.value),
        },
      });
    };

    return {
      checkIn,
      checkOut,
      adults,
      children,
      roomType,
      today,
      errorMessage,
      handleSearch,
    };
  },
};
</script>

