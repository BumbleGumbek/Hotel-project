<template>
  <aside class="luxury-rooms-map-panel">
    <header class="rooms-map-heading">
      <div>
        <span class="map-eyebrow">Khám phá khu vực</span>
        <h2>Bản đồ nơi lưu trú</h2>
      </div>
      <i class="im im-icon-Map-Marker"></i>
    </header>

    <div v-if="isLoading" class="rooms-map-state" role="status">
      <i class="im im-icon-Loading-3"></i>
      <h3>Đang tải địa điểm</h3>
      <p>Vị trí bản đồ sẽ xuất hiện khi tải xong danh sách.</p>
    </div>
    <div v-else-if="loadError" class="rooms-map-state" role="alert">
      <i class="im im-icon-Information"></i>
      <h3>Chưa thể hiển thị bản đồ</h3>
      <p>{{ loadError }}</p>
    </div>
    <div v-else-if="!mappedRooms.length" class="rooms-map-state">
      <i class="im im-icon-Location-2"></i>
      <h3>Chưa có tọa độ bản đồ</h3>
      <p>
        Dữ liệu nơi lưu trú hiện chưa cung cấp tọa độ hợp lệ. Bản đồ sẽ hiển thị
        khi có thông tin vị trí; chúng tôi không ước lượng vị trí.
      </p>
    </div>
    <div v-else-if="mapError" class="rooms-map-state" role="alert">
      <i class="im im-icon-Information"></i>
      <h3>Không thể khởi tạo bản đồ</h3>
      <p>{{ mapError }}</p>
    </div>
    <div
      v-else
      class="rooms-map-canvas"
      ref="mapElement"
      aria-label="Bản đồ nơi lưu trú"
    ></div>
  </aside>
</template>

<script>
import { computed, nextTick, onUnmounted, ref, watch } from "vue";
import { useStore } from "vuex";

const readNumber = (value) => {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : null;
  }
  if (typeof value !== "string" || value.trim() === "") return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

const validCoordinates = (latitude, longitude) => {
  const lat = readNumber(latitude);
  const lng = readNumber(longitude);
  if (
    lat === null ||
    lng === null ||
    lat < -90 ||
    lat > 90 ||
    lng < -180 ||
    lng > 180
  ) {
    return null;
  }
  return { lat, lng };
};

const coordinatesFromEntity = (entity) => {
  if (!entity || typeof entity !== "object") return null;

  const direct = validCoordinates(
    entity.latitude !== undefined ? entity.latitude : entity.lat,
    entity.longitude !== undefined
      ? entity.longitude
      : entity.lng !== undefined
      ? entity.lng
      : entity.lon
  );
  if (direct) return direct;

  const coordinates = entity.coordinates;
  if (Array.isArray(coordinates) && coordinates.length >= 2) {
    return validCoordinates(coordinates[1], coordinates[0]);
  }

  if (coordinates && typeof coordinates === "object") {
    const nested = validCoordinates(
      coordinates.latitude !== undefined
        ? coordinates.latitude
        : coordinates.lat,
      coordinates.longitude !== undefined
        ? coordinates.longitude
        : coordinates.lng !== undefined
        ? coordinates.lng
        : coordinates.lon
    );
    if (nested) return nested;
  }

  const geometryCoordinates = entity.geometry && entity.geometry.coordinates;
  if (Array.isArray(geometryCoordinates) && geometryCoordinates.length >= 2) {
    return validCoordinates(geometryCoordinates[1], geometryCoordinates[0]);
  }

  return null;
};

let leafletLoadPromise;

const loadLeaflet = () => {
  if (window.L && typeof window.L.map === "function") {
    return Promise.resolve(window.L);
  }
  if (leafletLoadPromise) return leafletLoadPromise;

  leafletLoadPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "/scripts/leaflet.min.js";
    script.onload = () => {
      if (window.L && typeof window.L.map === "function") {
        resolve(window.L);
      } else {
        leafletLoadPromise = null;
        reject(new Error("Leaflet did not expose its map API."));
      }
    };
    script.onerror = () => {
      leafletLoadPromise = null;
      reject(new Error("Could not load the existing Leaflet script."));
    };
    document.head.appendChild(script);
  });

  return leafletLoadPromise;
};

export default {
  name: "RoomsMap",
  setup() {
    const store = useStore();
    const mapElement = ref(null);
    const mapError = ref("");
    let mapInstance = null;
    let markerLayer = null;

    const isLoading = computed(() => store.state.rooms.isLoadingRoomList);
    const loadError = computed(() => store.state.rooms.roomListError || "");
    const mappedRooms = computed(() => {
      if (isLoading.value || loadError.value) return [];

      return (store.state.rooms.roomList || [])
        .map((room) => {
          const coordinates =
            coordinatesFromEntity(room) || coordinatesFromEntity(room.location);
          return coordinates ? { room, coordinates } : null;
        })
        .filter(Boolean);
    });

    const destroyMap = () => {
      if (mapInstance) {
        mapInstance.remove();
        mapInstance = null;
        markerLayer = null;
      }
    };

    const renderMap = async (locations) => {
      mapError.value = "";
      if (!locations.length) {
        destroyMap();
        return;
      }

      await nextTick();
      if (!mapElement.value) return;

      try {
        const leaflet = await loadLeaflet();
        if (!mapInstance) {
          const first = locations[0].coordinates;
          mapInstance = leaflet.map(mapElement.value, {
            scrollWheelZoom: false,
          });
          leaflet
            .tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
              attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
              maxZoom: 19,
            })
            .addTo(mapInstance);
          markerLayer = leaflet.featureGroup().addTo(mapInstance);
          mapInstance.setView([first.lat, first.lng], 13);
        }

        markerLayer.clearLayers();
        locations.forEach(({ room, coordinates }) => {
          const marker = leaflet.circleMarker(
            [coordinates.lat, coordinates.lng],
            {
              radius: 9,
              color: "#2b2520",
              weight: 2,
              fillColor: "#dfba73",
              fillOpacity: 0.95,
            }
          );
          const popup = document.createElement("div");
          const title = document.createElement("strong");
          title.textContent = room.name || "Nơi lưu trú";
          popup.appendChild(title);
          if (room.price !== undefined && room.price !== null) {
            const price = document.createElement("div");
            price.textContent = `${Number(room.price).toLocaleString(
              "vi-VN"
            )} VNĐ / đêm`;
            popup.appendChild(price);
          }
          marker.bindPopup(popup);
          markerLayer.addLayer(marker);
        });

        if (locations.length > 1) {
          mapInstance.fitBounds(markerLayer.getBounds().pad(0.15));
        } else {
          const { lat, lng } = locations[0].coordinates;
          mapInstance.setView([lat, lng], 14);
        }

        window.setTimeout(() => {
          if (mapInstance) mapInstance.invalidateSize();
        }, 0);
      } catch {
        destroyMap();
        mapError.value =
          "Không thể khởi tạo bản đồ cho dữ liệu tọa độ hiện có.";
      }
    };

    watch(
      mappedRooms,
      (locations) => {
        renderMap(locations);
      },
      { immediate: true }
    );

    onUnmounted(destroyMap);

    return {
      isLoading,
      loadError,
      mappedRooms,
      mapElement,
      mapError,
    };
  },
};
</script>

<style scoped lang="scss">
.luxury-rooms-map-panel {
  position: sticky;
  top: 24px;
  overflow: hidden;
  border: 1px solid rgba(223, 186, 115, 0.3);
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 10px 30px rgba(43, 37, 32, 0.07);
}

.rooms-map-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 20px 22px;
  border-bottom: 1px solid #f0eae1;

  .map-eyebrow {
    color: #b38e44;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1.4px;
    text-transform: uppercase;
  }

  h2 {
    margin: 5px 0 0;
    color: #2b2520;
    font-size: 19px;
    font-weight: 700;
  }

  > i {
    display: flex;
    width: 42px;
    height: 42px;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: rgba(223, 186, 115, 0.18);
    color: #a77f35;
    font-size: 20px;
  }
}

.rooms-map-canvas,
.rooms-map-state {
  height: 68vh;
  max-height: 680px;
  min-height: 390px;
}

.rooms-map-canvas {
  z-index: 0;
  background: #f2eee7;
}

.rooms-map-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 28px;
  background: radial-gradient(
      circle at 20% 20%,
      rgba(223, 186, 115, 0.12),
      transparent 35%
    ),
    #faf8f5;
  text-align: center;

  > i {
    color: #b38e44;
    font-size: 28px;
  }

  h3 {
    margin: 4px 0 0;
    color: #2b2520;
    font-size: 17px;
    font-weight: 700;
  }

  p {
    max-width: 330px;
    margin: 0;
    color: #74695d;
    font-size: 13px;
    line-height: 1.7;
  }
}

@media (max-width: 767px) {
  .luxury-rooms-map-panel {
    position: static;
  }

  .rooms-map-canvas,
  .rooms-map-state {
    min-height: 280px;
    height: 42vh;
  }

  .rooms-map-heading {
    padding: 16px 18px;

    h2 {
      font-size: 17px;
    }
  }
}
</style>
