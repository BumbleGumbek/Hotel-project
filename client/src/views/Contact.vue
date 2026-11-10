<template>
  <div class="hotel-contact-page">
    <section class="hotel-contact-heading">
      <div class="container">
        <span class="hotel-contact-label">CONTACT US</span>
        <h1>Liên hệ với chúng tôi</h1>
        <p>
          Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn
          trong quá trình tìm kiếm và đặt phòng.
        </p>
      </div>
    </section>

    <section class="container hotel-contact-content">
      <div class="hotel-contact-info">
        <span class="hotel-contact-label">WE ARE HERE TO HELP</span>
        <h2>Chúng tôi có thể hỗ trợ bạn điều gì?</h2>
        <p>
          Nếu bạn có thắc mắc về thông tin phòng nghỉ,
          quá trình đặt phòng hoặc cần hỗ trợ, hãy gửi
          nội dung cho chúng tôi qua biểu mẫu liên hệ.
        </p>
      </div>

      <div class="hotel-contact-form">
        <h2>Gửi lời nhắn</h2>

        <form @submit.prevent="handleSubmit">
          <div class="hotel-contact-field">
            <label for="contact-name">Họ và tên</label>
            <input
              id="contact-name"
              v-model.trim="form.name"
              type="text"
              placeholder="Nhập họ và tên"
              required
            />
          </div>

          <div class="hotel-contact-field">
            <label for="contact-email">Email</label>
            <input
              id="contact-email"
              v-model.trim="form.email"
              type="email"
              placeholder="Nhập địa chỉ email"
              required
            />
          </div>

          <div class="hotel-contact-field">
            <label for="contact-subject">Tiêu đề</label>
            <input
              id="contact-subject"
              v-model.trim="form.subject"
              type="text"
              placeholder="Bạn cần hỗ trợ về vấn đề gì?"
              required
            />
          </div>

          <div class="hotel-contact-field">
            <label for="contact-message">Nội dung</label>
            <textarea
              id="contact-message"
              v-model.trim="form.message"
              rows="5"
              placeholder="Nhập nội dung lời nhắn..."
              required
            ></textarea>
          </div>

          <p v-if="notice" class="hotel-contact-notice">
            {{ notice }}
          </p>

          <button type="submit" class="hotel-contact-submit">
            Gửi lời nhắn
          </button>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import "@/assets/css/contact.css";
import { reactive, ref } from "vue";

export default {
  setup() {
    const form = reactive({
      name: "",
      email: "",
      subject: "",
      message: "",
    });

    const notice = ref("");

    const handleSubmit = () => {
      notice.value =
        "Biểu mẫu hiện chưa được kết nối hệ thống gửi liên hệ. Vui lòng thử lại sau.";

    };

    return {
      form,
      notice,
      handleSubmit,
    };
  },
};
</script>