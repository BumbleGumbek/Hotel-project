<template>
  <section class="luxury-places-section">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="luxury-section-header">
            <span class="luxury-section-eyebrow">Không gian nghỉ dưỡng</span>
            <h2 class="luxury-section-title">Khám phá các hạng phòng</h2>
            <div class="luxury-title-divider"></div>
            <p class="luxury-section-desc">
              Hệ thống 13 phòng nghỉ cao cấp được thiết kế tỉ mỉ, mang lại trải nghiệm tiện nghi và thư thái tuyệt đối.
            </p>
          </div>
        </div>
      </div>

      <div class="row luxury-room-grid">
        <!-- Hạng VIP -->
        <div class="col-md-4 col-sm-6 luxury-room-col">
          <div class="luxury-room-card">
            <div class="luxury-card-media">
              <img
                src="/images/hotel/room-vip.jpg"
                alt="Hạng VIP"
                loading="lazy"
              />
              <div class="luxury-card-badge">2 phòng</div>
            </div>
            <div class="luxury-card-body">
              <span class="luxury-room-tier">Hạng VIP</span>
              <h3 class="luxury-room-name">Phòng Nghỉ VIP</h3>
              <p class="luxury-room-desc">
                Không gian sang trọng bậc nhất với tầm nhìn rộng mở, trang thiết bị thượng hạng và dịch vụ chuẩn mực.
              </p>
              <div class="luxury-card-footer">
                <router-link
                  :to="{ name: 'Rooms', query: { type: 'VIP' } }"
                  class="luxury-explore-btn"
                >
                  <span>Khám phá</span>
                  <i class="im im-icon-Right-2"></i>
                </router-link>
              </div>
            </div>
          </div>
        </div>

        <!-- Hạng Cao cấp -->
        <div class="col-md-4 col-sm-6 luxury-room-col">
          <div class="luxury-room-card">
            <div class="luxury-card-media">
              <img
                src="/images/hotel/room-premium.jpg"
                alt="Hạng Cao cấp"
                loading="lazy"
              />
              <div class="luxury-card-badge">4 phòng</div>
            </div>
            <div class="luxury-card-body">
              <span class="luxury-room-tier">Hạng Cao cấp</span>
              <h3 class="luxury-room-name">Phòng Nghỉ Cao Cấp</h3>
              <p class="luxury-room-desc">
                Sự hòa quyện giữa nét hiện đại và ấm cúng, trang bị nội thất tinh xảo mang lại kỳ nghỉ trọn vẹn.
              </p>
              <div class="luxury-card-footer">
                <router-link
                  :to="{ name: 'Rooms', query: { type: 'Cao cấp' } }"
                  class="luxury-explore-btn"
                >
                  <span>Khám phá</span>
                  <i class="im im-icon-Right-2"></i>
                </router-link>
              </div>
            </div>
          </div>
        </div>

        <!-- Hạng Tiêu chuẩn -->
        <div class="col-md-4 col-sm-12 luxury-room-col">
          <div class="luxury-room-card">
            <div class="luxury-card-media">
              <img
                src="/images/hotel/room-standard.jpg"
                alt="Hạng Tiêu chuẩn"
                loading="lazy"
              />
              <div class="luxury-card-badge">7 phòng</div>
            </div>
            <div class="luxury-card-body">
              <span class="luxury-room-tier">Hạng Tiêu chuẩn</span>
              <h3 class="luxury-room-name">Phòng Nghỉ Tiêu Chuẩn</h3>
              <p class="luxury-room-desc">
                Thiết kế thông minh, tối ưu công năng và đầy đủ tiện nghi thiết yếu cho những khoảnh khắc nghỉ ngơi thư thái.
              </p>
              <div class="luxury-card-footer">
                <router-link
                  :to="{ name: 'Rooms', query: { type: 'Tiêu chuẩn' } }"
                  class="luxury-explore-btn"
                >
                  <span>Khám phá</span>
                  <i class="im im-icon-Right-2"></i>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "ThePlaces",
};
</script>

<style scoped lang="scss">
.luxury-places-section {
  padding: 85px 0 90px 0;
  background-color: #faf8f5;
  position: relative;

  .luxury-section-header {
    text-align: center;
    max-width: 720px;
    margin: 0 auto 50px auto;

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
      font-size: 34px;
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

  .luxury-room-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .luxury-room-col {
    display: flex;
    margin-bottom: 30px;
  }

  .luxury-room-card {
    display: flex;
    flex-direction: column;
    width: 100%;
    background: #ffffff;
    border-radius: 14px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(43, 37, 32, 0.06);
    border: 1px solid rgba(223, 186, 115, 0.2);
    transition: transform 0.35s ease, box-shadow 0.35s ease;

    &:hover {
      transform: translateY(-7px);
      box-shadow: 0 16px 36px rgba(43, 37, 32, 0.12);
      border-color: rgba(223, 186, 115, 0.45);

      .luxury-card-media img {
        transform: scale(1.05);
      }

      .luxury-explore-btn {
        background: #2b2520;
        color: #dfba73;
        border-color: #2b2520;

        i {
          transform: translateX(4px);
        }
      }
    }
  }

  .luxury-card-media {
    position: relative;
    width: 100%;
    height: 240px;
    overflow: hidden;
    background-color: #eee;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
    }

    .luxury-card-badge {
      position: absolute;
      top: 14px;
      right: 14px;
      padding: 6px 14px;
      background: rgba(43, 37, 32, 0.85);
      backdrop-filter: blur(4px);
      color: #dfba73;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.5px;
      border-radius: 20px;
      border: 1px solid rgba(223, 186, 115, 0.3);
    }
  }

  .luxury-card-body {
    padding: 24px 24px 22px 24px;
    display: flex;
    flex-direction: column;
    flex: 1;

    .luxury-room-tier {
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 1px;
      text-transform: uppercase;
      color: #b38e44;
      margin-bottom: 6px;
    }

    .luxury-room-name {
      font-size: 20px;
      font-weight: 700;
      color: #2b2520;
      margin: 0 0 10px 0;
      line-height: 1.3;
    }

    .luxury-room-desc {
      font-size: 14px;
      color: #6d645a;
      line-height: 1.6;
      margin: 0 0 20px 0;
      flex: 1;
    }

    .luxury-card-footer {
      border-top: 1px solid #f0eae1;
      padding-top: 16px;
      display: flex;
      justify-content: flex-end;
    }

    .luxury-explore-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 22px;
      border-radius: 25px;
      font-size: 13px;
      font-weight: 600;
      color: #2b2520;
      background: #faf6f0;
      border: 1px solid rgba(223, 186, 115, 0.4);
      text-decoration: none;
      transition: all 0.3s ease;

      i {
        font-size: 12px;
        transition: transform 0.3s ease;
      }
    }
  }

  @media (max-width: 991px) {
    padding: 65px 0 70px 0;

    .luxury-section-title {
      font-size: 28px;
    }

    .luxury-card-media {
      height: 220px;
    }
  }

  @media (max-width: 767px) {
    padding: 50px 0 55px 0;

    .luxury-section-header {
      margin-bottom: 35px;

      .luxury-section-title {
        font-size: 24px;
      }

      .luxury-section-desc {
        font-size: 14px;
      }
    }

    .luxury-room-col {
      margin-bottom: 24px;
    }

    .luxury-card-media {
      height: 200px;
    }
  }
}
</style>
