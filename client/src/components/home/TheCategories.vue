<template>
  <div class="luxury-amenities-section">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="luxury-section-header">
            <span class="luxury-section-eyebrow">Tiện ích đẳng cấp</span>
            <h2 class="luxury-section-title">Dịch vụ & Tiện ích</h2>
            <div class="luxury-title-divider"></div>
            <p class="luxury-section-desc">
              Mang đến cho quý khách trải nghiệm lưu trú thư thái và trọn vẹn với các tiện nghi tiêu chuẩn.
            </p>
          </div>
        </div>

        <div class="col-md-12">
          <div class="luxury-amenities-grid">
            <!-- 1. Internet không dây (wifi) -->
            <div class="luxury-amenity-card">
              <div class="amenity-icon-wrapper">
                <i class="im im-icon-Wifi"></i>
              </div>
              <h4 class="amenity-name">Internet không dây</h4>
              <span class="amenity-badge">Tốc độ cao</span>
            </div>

            <!-- 2. Thang máy tòa nhà (elevator) -->
            <div class="luxury-amenity-card">
              <div class="amenity-icon-wrapper">
                <i class="im im-icon-Building"></i>
              </div>
              <h4 class="amenity-name">Thang máy tòa nhà</h4>
              <span class="amenity-badge">Tiện lợi</span>
            </div>

            <!-- 3. Chỗ đậu xe khuôn viên (parking) -->
            <div class="luxury-amenity-card">
              <div class="amenity-icon-wrapper">
                <i class="im im-icon-Car-2"></i>
              </div>
              <h4 class="amenity-name">Chỗ đậu xe miễn phí</h4>
              <span class="amenity-badge">Trong khuôn viên</span>
            </div>

            <!-- 4. Hồ bơi thư giãn (pool) -->
            <div class="luxury-amenity-card">
              <div class="amenity-icon-wrapper">
                <i class="im im-icon-Swimming"></i>
              </div>
              <h4 class="amenity-name">Hồ bơi thư giãn</h4>
              <span class="amenity-badge">Tiện ích</span>
            </div>

            <!-- 5. Bồn nước nóng thư giãn (hotTub) -->
            <div class="luxury-amenity-card">
              <div class="amenity-icon-wrapper">
                <i class="im im-icon-Bathtub"></i>
              </div>
              <h4 class="amenity-name">Bồn tắm nước nóng</h4>
              <span class="amenity-badge">Thư giãn</span>
            </div>

            <!-- 6. Truyền hình cáp (cableTV) -->
            <div class="luxury-amenity-card">
              <div class="amenity-icon-wrapper">
                <i class="im im-icon-Old-TV"></i>
              </div>
              <h4 class="amenity-name">Truyền hình cáp</h4>
              <span class="amenity-badge">Giải trí</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheCategories",
};
</script>

<style scoped lang="scss">
.luxury-amenities-section {
  padding: 75px 0 65px 0;
  background-color: #ffffff;

  .luxury-section-header {
    text-align: center;
    max-width: 700px;
    margin: 0 auto 45px auto;

    .luxury-section-eyebrow {
      display: inline-block;
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 2.5px;
      text-transform: uppercase;
      color: #b38e44;
      margin-bottom: 8px;
    }

    .luxury-section-title {
      font-size: 32px;
      font-weight: 700;
      color: #2b2520;
      letter-spacing: -0.5px;
      margin: 0 0 14px 0;
    }

    .luxury-title-divider {
      width: 50px;
      height: 2px;
      background: #dfba73;
      margin: 0 auto 16px auto;
    }

    .luxury-section-desc {
      font-size: 15px;
      color: #6d645a;
      line-height: 1.6;
      margin: 0;
    }
  }

  .luxury-amenities-grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 20px;
    margin-bottom: 20px;
  }

  .luxury-amenity-card {
    background: #faf8f5;
    border: 1px solid rgba(223, 186, 115, 0.25);
    border-radius: 12px;
    padding: 26px 16px 22px 16px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: all 0.35s ease;
    cursor: default;

    .amenity-icon-wrapper {
      width: 54px;
      height: 54px;
      border-radius: 50%;
      background: rgba(223, 186, 115, 0.15);
      border: 1px solid rgba(223, 186, 115, 0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 14px;
      transition: all 0.35s ease;

      i {
        font-size: 24px;
        color: #b38e44;
        transition: all 0.35s ease;
      }
    }

    .amenity-name {
      font-size: 14px;
      font-weight: 600;
      color: #2b2520;
      margin: 0 0 8px 0;
      line-height: 1.35;
      transition: color 0.35s ease;
    }

    .amenity-badge {
      font-size: 11px;
      font-weight: 500;
      color: #8c7e70;
      background: #eee8df;
      padding: 3px 10px;
      border-radius: 12px;
      letter-spacing: 0.3px;
    }

    &:hover {
      transform: translateY(-5px);
      background: #ffffff;
      border-color: #dfba73;
      box-shadow: 0 10px 24px rgba(43, 37, 32, 0.08);

      .amenity-icon-wrapper {
        background: #2b2520;
        border-color: #2b2520;

        i {
          color: #dfba73;
        }
      }

      .amenity-name {
        color: #b38e44;
      }
    }
  }

  @media (max-width: 1200px) {
    .luxury-amenities-grid {
      grid-template-columns: repeat(3, 1fr);
      gap: 18px;
    }
  }

  @media (max-width: 768px) {
    padding: 50px 0 45px 0;

    .luxury-section-header {
      margin-bottom: 30px;

      .luxury-section-title {
        font-size: 24px;
      }

      .luxury-section-desc {
        font-size: 14px;
      }
    }

    .luxury-amenities-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 14px;
    }

    .luxury-amenity-card {
      padding: 20px 12px 18px 12px;

      .amenity-icon-wrapper {
        width: 46px;
        height: 46px;

        i {
          font-size: 20px;
        }
      }

      .amenity-name {
        font-size: 13px;
      }
    }
  }

  @media (max-width: 480px) {
    .luxury-amenities-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
    }
  }
}
</style>
