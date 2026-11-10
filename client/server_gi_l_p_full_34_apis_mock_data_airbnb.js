/**
 * ============================================================================
 * FILE MOCK SERVER & DỮ LIỆU TẠM HOÀN CHỈNH CHO FRONTEND (PROJECT AIRBNB)
 * ============================================================================
 * Bạn Frontend có thể sử dụng file này theo 2 cách:
 *
 * CÁCH 1: Chạy làm Server API giả lập (Test được toàn bộ 34 APIs bằng Axios/Fetch)
 *   1. Mở Terminal tại thư mục chứa file này: npm install express cors
 *   2. Chạy lệnh: node mock-airbnb-server.js
 *   3. Server sẽ chạy tại: http://localhost:3000 (hoặc đổi PORT tùy ý)
 *
 * CÁCH 2: Copy riêng biến `mockData` bên dưới vào project React/Vue để map() giao diện tĩnh.
 * ============================================================================
 */

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============================================================================
// 1. KHO DỮ LIỆU MẪU CHUẨN MYSQL SEQUELIZE (ID SỐ NGUYÊN TỰ TĂNG)
// ============================================================================
const mockData = {
  users: [
    {
      id: 1,
      name: "La Thuy",
      email: "thuy@gmail.com",
      password: "123456", // Dùng để test POST /api/auth/login
      phone: "0934657867",
      birthday: "1998-05-11",
      gender: true,
      type: "ADMIN",
      address: "Long Xuyên, An Giang",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300",
      createdAt: "2026-01-10T08:00:00.000Z",
      updatedAt: "2026-01-10T08:00:00.000Z"
    },
    {
      id: 2,
      name: "Nguyễn Phong Kha",
      email: "kha9x0159@gmail.com",
      password: "123456",
      phone: "0909876987",
      birthday: "1998-05-11",
      gender: true,
      type: "CLIENT",
      address: "191A Trường Chinh, Quận 12, TP.HCM",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300",
      createdAt: "2026-01-12T09:30:00.000Z",
      updatedAt: "2026-01-12T09:30:00.000Z"
    },
    {
      id: 3,
      name: "Nguyễn Phong Hào",
      email: "hao9x0159@gmail.com",
      password: "123456",
      phone: "0909876967",
      birthday: "1998-05-10",
      gender: true,
      type: "CLIENT",
      address: "Quận 1, TP. Hồ Chí Minh",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300",
      createdAt: "2026-01-15T10:15:00.000Z",
      updatedAt: "2026-01-15T10:15:00.000Z"
    },
    {
      id: 4,
      name: "Trần Ngọc Ánh",
      email: "anh.tran@gmail.com",
      password: "123456",
      phone: "0912345678",
      birthday: "2000-08-20",
      gender: false,
      type: "CLIENT",
      address: "Hải Châu, Đà Nẵng",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300",
      createdAt: "2026-01-18T14:20:00.000Z",
      updatedAt: "2026-01-18T14:20:00.000Z"
    },
    {
      id: 5,
      name: "Lê Minh Tuấn",
      email: "tuan.le@gmail.com",
      password: "123456",
      phone: "0987654321",
      birthday: "1995-12-01",
      gender: true,
      type: "ADMIN",
      address: "Ninh Kiều, Cần Thơ",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300",
      createdAt: "2026-01-20T16:00:00.000Z",
      updatedAt: "2026-01-20T16:00:00.000Z"
    }
  ],

  locations: [
    {
      id: 1,
      name: "Khu du lịch sinh thái Hồng Hào",
      province: "Bến Tre",
      country: "Việt Nam",
      valueate: 8,
      image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800",
      createdAt: "2026-01-10T08:00:00.000Z",
      updatedAt: "2026-01-10T08:00:00.000Z"
    },
    {
      id: 2,
      name: "Bến Ninh Kiều",
      province: "Cần Thơ",
      country: "Việt Nam",
      valueate: 9,
      image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800",
      createdAt: "2026-01-10T08:00:00.000Z",
      updatedAt: "2026-01-10T08:00:00.000Z"
    },
    {
      id: 3,
      name: "Quảng trường Lâm Viên",
      province: "Đà Lạt",
      country: "Việt Nam",
      valueate: 10,
      image: "https://images.unsplash.com/photo-1558005530-a7958896ec60?w=800",
      createdAt: "2026-01-11T08:00:00.000Z",
      updatedAt: "2026-01-11T08:00:00.000Z"
    },
    {
      id: 4,
      name: "Bãi biển Mỹ Khê",
      province: "Đà Nẵng",
      country: "Việt Nam",
      valueate: 9,
      image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800",
      createdAt: "2026-01-12T08:00:00.000Z",
      updatedAt: "2026-01-12T08:00:00.000Z"
    },
    {
      id: 5,
      name: "Thị trấn Hoàng Hôn - Sunset Town",
      province: "Phú Quốc",
      country: "Việt Nam",
      valueate: 10,
      image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800",
      createdAt: "2026-01-13T08:00:00.000Z",
      updatedAt: "2026-01-13T08:00:00.000Z"
    },
    {
      id: 6,
      name: "Bản Cát Cát",
      province: "Lào Cai - Sapa",
      country: "Việt Nam",
      valueate: 8,
      image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
      createdAt: "2026-01-14T08:00:00.000Z",
      updatedAt: "2026-01-14T08:00:00.000Z"
    }
  ],

  rooms: [
    {
      id: 1,
      name: "Phòng Siêu Vip Pro Riverside",
      guests: 2,
      bedRoom: 1,
      bath: 1,
      description: "Khách sạn view sông tuyệt đẹp, không gian thoáng đãng, đầy đủ tiện nghi cao cấp.",
      price: 450000,
      elevator: false,
      hotTub: true,
      pool: true,
      indoorFireplace: false,
      dryer: true,
      gym: false,
      kitchen: true,
      wifi: true,
      heating: true,
      cableTV: true,
      locationId: 1,
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
      createdAt: "2026-01-15T08:00:00.000Z",
      updatedAt: "2026-01-15T08:00:00.000Z"
    },
    {
      id: 2,
      name: "Homestay Vườn Dừa Bến Tre",
      guests: 4,
      bedRoom: 2,
      bath: 2,
      description: "Trải nghiệm miền Tây sông nước yên bình, có hồ bơi ngoài trời và bếp nướng BBQ.",
      price: 650000,
      elevator: false,
      hotTub: false,
      pool: true,
      indoorFireplace: false,
      dryer: true,
      gym: false,
      kitchen: true,
      wifi: true,
      heating: false,
      cableTV: true,
      locationId: 1,
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800",
      createdAt: "2026-01-15T09:00:00.000Z",
      updatedAt: "2026-01-15T09:00:00.000Z"
    },
    {
      id: 3,
      name: "Căn hộ Penthouse Bến Ninh Kiều",
      guests: 4,
      bedRoom: 2,
      bath: 2,
      description: "Căn hộ cao cấp nhìn thẳng ra cầu đi bộ Ninh Kiều, cách chợ đêm 2 phút đi bộ.",
      price: 850000,
      elevator: true,
      hotTub: true,
      pool: true,
      indoorFireplace: false,
      dryer: true,
      gym: true,
      kitchen: true,
      wifi: true,
      heating: true,
      cableTV: true,
      locationId: 2,
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
      createdAt: "2026-01-16T08:00:00.000Z",
      updatedAt: "2026-01-16T08:00:00.000Z"
    },
    {
      id: 4,
      name: "Villa Thông Reo Đà Lạt",
      guests: 6,
      bedRoom: 3,
      bath: 3,
      description: "Biệt thự gỗ ấm cúng giữa rừng thông Đà Lạt, có lò sưởi trong nhà và sân nướng BBQ.",
      price: 1200000,
      elevator: false,
      hotTub: true,
      pool: false,
      indoorFireplace: true,
      dryer: true,
      gym: false,
      kitchen: true,
      wifi: true,
      heating: true,
      cableTV: true,
      locationId: 3,
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
      createdAt: "2026-01-17T08:00:00.000Z",
      updatedAt: "2026-01-17T08:00:00.000Z"
    },
    {
      id: 5,
      name: "Ocean Suite Resort Mỹ Khê",
      guests: 2,
      bedRoom: 1,
      bath: 1,
      description: "Phòng nghỉ dưỡng sát biển Mỹ Khê, ban công đón bình minh cực đẹp.",
      price: 950000,
      elevator: true,
      hotTub: true,
      pool: true,
      indoorFireplace: false,
      dryer: true,
      gym: true,
      kitchen: false,
      wifi: true,
      heating: true,
      cableTV: true,
      locationId: 4,
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
      createdAt: "2026-01-18T08:00:00.000Z",
      updatedAt: "2026-01-18T08:00:00.000Z"
    },
    {
      id: 6,
      name: "Bungalow Hoàng Hôn Phú Quốc",
      guests: 2,
      bedRoom: 1,
      bath: 1,
      description: "Hồ bơi vô cực ngắm trọn Cầu Hôn và pháo hoa mỗi tối tại Phú Quốc.",
      price: 1500000,
      elevator: true,
      hotTub: true,
      pool: true,
      indoorFireplace: false,
      dryer: true,
      gym: true,
      kitchen: true,
      wifi: true,
      heating: true,
      cableTV: true,
      locationId: 5,
      image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800",
      createdAt: "2026-01-19T08:00:00.000Z",
      updatedAt: "2026-01-19T08:00:00.000Z"
    }
  ],

  reviews: [
    {
      id: 1,
      content: "Phòng cực kỳ sạch sẽ, chủ nhà nhiệt tình, view đẹp đúng như hình!",
      roomId: 1,
      userId: 2,
      createdAt: "2026-02-01T10:00:00.000Z",
      updatedAt: "2026-02-01T10:00:00.000Z"
    },
    {
      id: 2,
      content: "Không gian yên tĩnh, hồ bơi rộng, rất đáng tiền cho kỳ nghỉ cuối tuần.",
      roomId: 1,
      userId: 3,
      createdAt: "2026-02-03T15:30:00.000Z",
      updatedAt: "2026-02-03T15:30:00.000Z"
    },
    {
      id: 3,
      content: "Ngay trung tâm Bến Ninh Kiều, đi bộ ra chợ đêm ăn uống rất tiện.",
      roomId: 3,
      userId: 4,
      createdAt: "2026-02-05T09:20:00.000Z",
      updatedAt: "2026-02-05T09:20:00.000Z"
    },
    {
      id: 4,
      content: "Villa Đà Lạt buổi tối se lạnh bật lò sưởi lên cực kỳ chill!",
      roomId: 4,
      userId: 2,
      createdAt: "2026-02-07T20:00:00.000Z",
      updatedAt: "2026-02-07T20:00:00.000Z"
    }
  ],

  tickets: [
    {
      id: 1,
      checkIn: "2026-05-11T14:00:00.000Z",
      checkOut: "2026-05-15T12:00:00.000Z",
      userId: 2,
      roomId: 1,
      createdAt: "2026-03-01T08:00:00.000Z",
      updatedAt: "2026-03-01T08:00:00.000Z"
    },
    {
      id: 2,
      checkIn: "2026-06-01T14:00:00.000Z",
      checkOut: "2026-06-04T12:00:00.000Z",
      userId: 3,
      roomId: 3,
      createdAt: "2026-03-02T09:00:00.000Z",
      updatedAt: "2026-03-02T09:00:00.000Z"
    },
    {
      id: 3,
      checkIn: "2026-07-10T14:00:00.000Z",
      checkOut: "2026-07-12T12:00:00.000Z",
      userId: 2,
      roomId: 4,
      createdAt: "2026-03-05T11:00:00.000Z",
      updatedAt: "2026-03-05T11:00:00.000Z"
    }
  ]
};

// Hàm phụ trợ tự động tăng ID
const getNextId = (collection) => {
  if (collection.length === 0) return 1;
  return Math.max(...collection.map(item => Number(item.id))) + 1;
};

// Hàm đính kèm thông tin khóa ngoại (giống lệnh include của Sequelize)
const populateRoom = (room) => {
  if (!room) return null;
  const location = mockData.locations.find(l => Number(l.id) === Number(room.locationId)) || null;
  return { ...room, location };
};

const populateReview = (review) => {
  if (!review) return null;
  const user = mockData.users.find(u => Number(u.id) === Number(review.userId)) || null;
  const room = mockData.rooms.find(r => Number(r.id) === Number(review.roomId)) || null;
  return { ...review, user, room };
};

const populateTicket = (ticket) => {
  if (!ticket) return null;
  const user = mockData.users.find(u => Number(u.id) === Number(ticket.userId)) || null;
  const room = mockData.rooms.find(r => Number(r.id) === Number(ticket.roomId)) || null;
  return { ...ticket, user, room };
};

// ============================================================================
// NHÓM 1: QUẢN LÝ NGƯỜI DÙNG (API 1 -> 6)
// ============================================================================

// [API Bổ sung] Lấy toàn bộ danh sách người dùng
app.get('/api/users', (req, res) => {
  res.status(200).json(mockData.users);
});

// [API 1] Tạo người dùng (POST /api/users)
app.post('/api/users', (req, res) => {
  const newUser = {
    id: getNextId(mockData.users),
    name: req.body.name || "Người dùng mới",
    email: req.body.email || `user${Date.now()}@gmail.com`,
    password: req.body.password || "123456",
    phone: req.body.phone || "0900000000",
    birthday: req.body.birthday || "2000-01-01",
    gender: req.body.gender !== undefined ? req.body.gender : true,
    type: req.body.type || "CLIENT",
    address: req.body.address || "Việt Nam",
    avatar: req.body.avatar || "https://i.pravatar.cc/300",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  mockData.users.push(newUser);
  res.status(201).json(newUser);
});

// [API 3] Lấy danh sách người dùng phân trang (GET /api/users/pagination?skip=0&limit=3)
app.get('/api/users/pagination', (req, res) => {
  const skip = Number(req.query.skip) || 0;
  const limit = Number(req.query.limit) || 10;
  const paginated = mockData.users.slice(skip, skip + limit);
  res.status(200).json(paginated);
});

// [API 6] Cập nhật ảnh đại diện người dùng (POST /api/users/upload-avatar)
app.post('/api/users/upload-avatar', (req, res) => {
  const userId = Number(req.body.userId) || 1;
  const user = mockData.users.find(u => Number(u.id) === userId) || mockData.users[0];
  user.avatar = req.body.avatar || `https://i.pravatar.cc/300?u=${Date.now()}`;
  user.updatedAt = new Date().toISOString();
  res.status(200).json({
    message: "Upload avatar thành công (Mock)",
    user
  });
});

// [API 2] Lấy thông tin chi tiết người dùng (GET /api/users/:id)
app.get('/api/users/:id', (req, res) => {
  const user = mockData.users.find(u => String(u.id) === String(req.params.id)) || mockData.users[0];
  if (!user) return res.status(404).json({ message: "Không tìm thấy người dùng" });
  res.status(200).json(user);
});

// [API 5] Cập nhật người dùng (PUT /api/users/:id)
app.put('/api/users/:id', (req, res) => {
  const index = mockData.users.findIndex(u => String(u.id) === String(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Không tìm thấy người dùng" });

  mockData.users[index] = {
    ...mockData.users[index],
    ...req.body,
    id: mockData.users[index].id,
    updatedAt: new Date().toISOString()
  };
  res.status(200).json(mockData.users[index]);
});

// [API 4] Xóa người dùng (DELETE /api/users/:id)
app.delete('/api/users/:id', (req, res) => {
  const index = mockData.users.findIndex(u => String(u.id) === String(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Không tìm thấy người dùng" });

  const deleted = mockData.users.splice(index, 1)[0];
  res.status(200).json({ message: "Xóa người dùng thành công", deleted });
});

// ============================================================================
// NHÓM 2: QUẢN LÝ VỊ TRÍ (API 7 -> 13)
// ============================================================================

// [API 7] Tạo vị trí (POST /api/locations)
app.post('/api/locations', (req, res) => {
  const newLocation = {
    id: getNextId(mockData.locations),
    name: req.body.name || "Vị trí du lịch mới",
    province: req.body.province || "TP. Hồ Chí Minh",
    country: req.body.country || "Việt Nam",
    valueate: Number(req.body.valueate) || 8,
    image: req.body.image || "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  mockData.locations.push(newLocation);
  res.status(201).json(newLocation);
});

// [API 9] Lấy danh sách vị trí (có phân trang & tìm kiếm theo ?location=...)
app.get('/api/locations', (req, res) => {
  let result = [...mockData.locations];
  const { location, skip, limit } = req.query;

  if (location) {
    const keyword = location.toLowerCase();
    result = result.filter(
      l => l.name.toLowerCase().includes(keyword) || l.province.toLowerCase().includes(keyword)
    );
  }

  if (skip !== undefined || limit !== undefined) {
    const s = Number(skip) || 0;
    const l = Number(limit) || result.length;
    result = result.slice(s, s + l);
  }

  res.status(200).json(result);
});

// [API 13] Lấy danh sách vị trí theo đánh giá (GET /api/locations/by-valueate?valueate=8)
app.get('/api/locations/by-valueate', (req, res) => {
  const valueate = Number(req.query.valueate);
  if (!valueate) return res.status(200).json(mockData.locations);
  const filtered = mockData.locations.filter(l => Number(l.valueate) >= valueate);
  res.status(200).json(filtered);
});

// [API 12] Cập nhật ảnh cho vị trí (POST /api/locations/upload-images/:id)
app.post('/api/locations/upload-images/:id', (req, res) => {
  const loc = mockData.locations.find(l => String(l.id) === String(req.params.id)) || mockData.locations[0];
  loc.image = req.body.image || "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800";
  loc.updatedAt = new Date().toISOString();
  res.status(200).json({ message: "Cập nhật ảnh vị trí thành công", location: loc });
});

// [API 10] Lấy thông tin chi tiết vị trí (GET /api/locations/:id)
app.get('/api/locations/:id', (req, res) => {
  const loc = mockData.locations.find(l => String(l.id) === String(req.params.id)) || mockData.locations[0];
  if (!loc) return res.status(404).json({ message: "Không tìm thấy vị trí" });
  const rooms = mockData.rooms.filter(r => Number(r.locationId) === Number(loc.id));
  res.status(200).json({ ...loc, rooms });
});

// [API 11] Cập nhật thông tin vị trí (PUT /api/locations/:id)
app.put('/api/locations/:id', (req, res) => {
  const index = mockData.locations.findIndex(l => String(l.id) === String(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Không tìm thấy vị trí" });

  mockData.locations[index] = {
    ...mockData.locations[index],
    ...req.body,
    id: mockData.locations[index].id,
    updatedAt: new Date().toISOString()
  };
  res.status(200).json(mockData.locations[index]);
});

// [API 8] Xóa vị trí (DELETE /api/locations/:id)
app.delete('/api/locations/:id', (req, res) => {
  const index = mockData.locations.findIndex(l => String(l.id) === String(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Không tìm thấy vị trí" });

  const deleted = mockData.locations.splice(index, 1)[0];
  res.status(200).json({ message: "Xóa vị trí thành công", deleted });
});

// ============================================================================
// NHÓM 3: XÁC THỰC NGƯỜI DÙNG - AUTH (API 14 -> 15)
// ============================================================================

// [API 14] Đăng nhập (POST /api/auth/login)
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = mockData.users.find(u => u.email === email);

  if (!user || (password && user.password !== password && password !== "123456")) {
    return res.status(401).json({ message: "Email hoặc mật khẩu không chính xác!" });
  }

  res.status(200).json({
    message: "Đăng nhập thành công!",
    token: `mock-jwt-token-user-${user.id}-${ user.type }`,
    user
  });
});

// [API 15] Đăng ký (POST /api/auth/register)
app.post('/api/auth/register', (req, res) => {
  const { email } = req.body;
  const existed = mockData.users.find(u => u.email === email);
  if (existed) {
    return res.status(400).json({ message: "Email đã tồn tại trong hệ thống!" });
  }

  const newUser = {
    id: getNextId(mockData.users),
    name: req.body.name || "Thành viên mới",
    email: req.body.email || `member${Date.now()}@gmail.com`,
    password: req.body.password || "123456",
    phone: req.body.phone || "0900000000",
    birthday: req.body.birthday || "2000-01-01",
    gender: req.body.gender !== undefined ? req.body.gender : true,
    type: "CLIENT",
    address: req.body.address || "Việt Nam",
    avatar: "https://i.pravatar.cc/300",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  mockData.users.push(newUser);
  res.status(201).json({
    message: "Đăng ký tài khoản thành công!",
    user: newUser
  });
});

// ============================================================================
// NHÓM 4: QUẢN LÝ PHÒNG CHO THUÊ (API 16 -> 22)
// ============================================================================

// [API 16] Tạo phòng cho thuê (POST /api/rooms)
app.post('/api/rooms', (req, res) => {
  const newRoom = {
    id: getNextId(mockData.rooms),
    name: req.body.name || "Phòng nghỉ mới",
    guests: Number(req.body.guests) || 2,
    bedRoom: Number(req.body.bedRoom) || 1,
    bath: Number(req.body.bath) || 1,
    description: req.body.description || "Phòng đầy đủ tiện nghi",
    price: Number(req.body.price) || 500000,
    elevator: Boolean(req.body.elevator),
    hotTub: Boolean(req.body.hotTub),
    pool: Boolean(req.body.pool),
    indoorFireplace: Boolean(req.body.indoorFireplace),
    dryer: Boolean(req.body.dryer),
    gym: Boolean(req.body.gym),
    kitchen: Boolean(req.body.kitchen),
    wifi: req.body.wifi !== undefined ? Boolean(req.body.wifi) : true,
    heating: Boolean(req.body.heating),
    cableTV: Boolean(req.body.cableTV),
    locationId: Number(req.body.locationId) || 1,
    image: req.body.image || "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  mockData.rooms.push(newRoom);
  res.status(201).json(populateRoom(newRoom));
});

// [API 17] Lấy danh sách phòng (theo locationId & phân trang) (GET /api/rooms)
app.get('/api/rooms', (req, res) => {
  let result = mockData.rooms.map(populateRoom);
  const { locationId, skip, limit } = req.query;

  if (locationId) {
    result = result.filter(r => String(r.locationId) === String(locationId));
  }

  if (skip !== undefined || limit !== undefined) {
    const s = Number(skip) || 0;
    const l = Number(limit) || result.length;
    result = result.slice(s, s + l);
  }

  res.status(200).json(result);
});

// [API 21] Đặt phòng cho thuê (POST /api/rooms/booking/:id hoặc POST /api/rooms/booking)
app.post(['/api/rooms/booking/:id', '/api/rooms/booking'], (req, res) => {
  const newTicket = {
    id: getNextId(mockData.tickets),
    roomId: Number(req.body.roomId || req.params.id) || 1,
    userId: Number(req.body.userId) || 2,
    checkIn: req.body.checkIn || new Date().toISOString(),
    checkOut: req.body.checkOut || new Date(Date.now() + 86400000 * 2).toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  mockData.tickets.push(newTicket);
  res.status(201).json({
    message: "Đặt phòng thành công!",
    ticket: populateTicket(newTicket)
  });
});

// [API 22] Cập nhật hình ảnh phòng cho thuê (POST /api/rooms/upload-image/:id)
app.post('/api/rooms/upload-image/:id', (req, res) => {
  const room = mockData.rooms.find(r => String(r.id) === String(req.params.id)) || mockData.rooms[0];
  room.image = req.body.image || "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800";
  room.updatedAt = new Date().toISOString();
  res.status(200).json({ message: "Cập nhật ảnh phòng thành công", room: populateRoom(room) });
});

// [API 18] Lấy thông tin chi tiết phòng cho thuê (GET /api/rooms/:id)
app.get('/api/rooms/:id', (req, res) => {
  const room = mockData.rooms.find(r => String(r.id) === String(req.params.id)) || mockData.rooms[0];
  if (!room) return res.status(404).json({ message: "Không tìm thấy phòng" });
  res.status(200).json(populateRoom(room));
});

// [API 19] Cập nhật thông tin phòng cho thuê (PUT /api/rooms/:id)
app.put('/api/rooms/:id', (req, res) => {
  const index = mockData.rooms.findIndex(r => String(r.id) === String(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Không tìm thấy phòng" });

  mockData.rooms[index] = {
    ...mockData.rooms[index],
    ...req.body,
    id: mockData.rooms[index].id,
    updatedAt: new Date().toISOString()
  };
  res.status(200).json(populateRoom(mockData.rooms[index]));
});

// [API 20] Xóa phòng cho thuê (DELETE /api/rooms/:id)
app.delete('/api/rooms/:id', (req, res) => {
  const index = mockData.rooms.findIndex(r => String(r.id) === String(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Không tìm thấy phòng" });

  const deleted = mockData.rooms.splice(index, 1)[0];
  res.status(200).json({ message: "Xóa phòng thành công", deleted });
});

// ============================================================================
// NHÓM 5: QUẢN LÝ ĐÁNH GIÁ - REVIEWS (API 23 -> 27)
// ============================================================================

// [API 23] Tạo một đánh giá (POST /api/reviews?roomId=1)
app.post('/api/reviews', (req, res) => {
  const newReview = {
    id: getNextId(mockData.reviews),
    content: req.body.content || "Phòng rất tuyệt vời!",
    roomId: Number(req.query.roomId || req.body.roomId) || 1,
    userId: Number(req.body.userId) || 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  mockData.reviews.push(newReview);
  res.status(201).json(populateReview(newReview));
});

// [API 24] Lấy danh sách đánh giá theo phòng (GET /api/reviews/byRoom?roomId=1)
app.get('/api/reviews/byRoom', (req, res) => {
  const { roomId } = req.query;
  let result = mockData.reviews;
  if (roomId) {
    result = result.filter(rv => String(rv.roomId) === String(roomId));
  }
  res.status(200).json(result.map(populateReview));
});

// [API 26] Lấy thông tin chi tiết một đánh giá (GET /api/reviews/:id)
app.get('/api/reviews/:id', (req, res) => {
  const review = mockData.reviews.find(rv => String(rv.id) === String(req.params.id)) || mockData.reviews[0];
  if (!review) return res.status(404).json({ message: "Không tìm thấy đánh giá" });
  res.status(200).json(populateReview(review));
});

// [API 27] Cập nhật thông tin đánh giá (PUT /api/reviews/:id)
app.put('/api/reviews/:id', (req, res) => {
  const index = mockData.reviews.findIndex(rv => String(rv.id) === String(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Không tìm thấy đánh giá" });

  mockData.reviews[index] = {
    ...mockData.reviews[index],
    content: req.body.content || mockData.reviews[index].content,
    updatedAt: new Date().toISOString()
  };
  res.status(200).json(populateReview(mockData.reviews[index]));
});

// [API 25] Xóa đánh giá (DELETE /api/reviews/:id)
app.delete('/api/reviews/:id', (req, res) => {
  const index = mockData.reviews.findIndex(rv => String(rv.id) === String(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Không tìm thấy đánh giá" });

  const deleted = mockData.reviews.splice(index, 1)[0];
  res.status(200).json({ message: "Xóa đánh giá thành công", deleted });
});

// ============================================================================
// NHÓM 6: QUẢN LÝ VÉ - TICKETS (API 28 -> 34)
// ============================================================================

// [API 28] Lấy danh sách vé (GET /api/tickets)
app.get('/api/tickets', (req, res) => {
  res.status(200).json(mockData.tickets.map(populateTicket));
});

// [API 32] Tạo vé (POST /api/tickets)
app.post('/api/tickets', (req, res) => {
  const newTicket = {
    id: getNextId(mockData.tickets),
    checkIn: req.body.checkIn || new Date().toISOString(),
    checkOut: req.body.checkOut || new Date(Date.now() + 86400000 * 3).toISOString(),
    userId: Number(req.body.userId) || 2,
    roomId: Number(req.body.roomId) || 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  mockData.tickets.push(newTicket);
  res.status(201).json(populateTicket(newTicket));
});

// [API 33] Lấy danh sách vé theo người dùng (GET /api/tickets/by-user?userId=2)
app.get('/api/tickets/by-user', (req, res) => {
  const { userId } = req.query;
  let result = mockData.tickets;
  if (userId) {
    result = result.filter(t => String(t.userId) === String(userId));
  }
  res.status(200).json(result.map(populateTicket));
});

// [API 34] Lấy danh sách vé theo phòng (GET /api/tickets/by-room?roomId=1)
app.get('/api/tickets/by-room', (req, res) => {
  const { roomId } = req.query;
  let result = mockData.tickets;
  if (roomId) {
    result = result.filter(t => String(t.roomId) === String(roomId));
  }
  res.status(200).json(result.map(populateTicket));
});

// [API 29] Lấy thông tin chi tiết vé (GET /api/tickets/:id)
app.get('/api/tickets/:id', (req, res) => {
  const ticket = mockData.tickets.find(t => String(t.id) === String(req.params.id)) || mockData.tickets[0];
  if (!ticket) return res.status(404).json({ message: "Không tìm thấy vé" });
  res.status(200).json(populateTicket(ticket));
});

// [API 30] Cập nhật thông tin vé (PUT /api/tickets/:id)
app.put('/api/tickets/:id', (req, res) => {
  const index = mockData.tickets.findIndex(t => String(t.id) === String(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Không tìm thấy vé" });

  mockData.tickets[index] = {
    ...mockData.tickets[index],
    ...req.body,
    id: mockData.tickets[index].id,
    updatedAt: new Date().toISOString()
  };
  res.status(200).json(populateTicket(mockData.tickets[index]));
});

// [API 31] Xóa vé (DELETE /api/tickets/:id)
app.delete('/api/tickets/:id', (req, res) => {
  const index = mockData.tickets.findIndex(t => String(t.id) === String(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Không tìm thấy vé" });

  const deleted = mockData.tickets.splice(index, 1)[0];
  res.status(200).json({ message: "Xóa vé thành công", deleted });
});

// ============================================================================
// KHỞI ĐỘNG MOCK SERVER HOẶC EXPORT CHO REACT/VUE
// ============================================================================
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`============================================================`);
    console.log(`🚀 MOCK SERVER AIRBNB (34 APIs) ĐANG CHẠY TẠI PORT ${PORT}`);
    console.log(`👉 Danh sách Vị trí : http://localhost:${PORT}/api/locations`);
    console.log(`👉 Danh sách Phòng  : http://localhost:${PORT}/api/rooms`);
    console.log(`👉 Danh sách User   : http://localhost:${PORT}/api/users`);
    console.log(`👉 Tài khoản test Login (POST /api/auth/login):`);
    console.log(`   - Admin : thuy@gmail.com | pass: 123456`);
    console.log(`   - Client: kha9x0159@gmail.com | pass: 123456`);
    console.log(`============================================================`);
  });
}

module.exports = { app, mockData };