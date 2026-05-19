const videos = [
  {
    "id": 1,
    "title": "Свежая публикация #1",
    "category": "крупным планом",
    "views": "5K",
    "duration": "5:12",
    "premium": false,
    "date": "2026-05-19",
    "video": "https://www.w3schools.com/html/mov_bbb.mp4",
    "image": "https://picsum.photos/600/380?random=1",
    "tags": [
      "крупным планом",
      "новое",
      "обновление"
    ]
  },
  {
    "id": 2,
    "title": "Видео из подборки #2",
    "category": "чулки",
    "views": "82K",
    "duration": "5:21",
    "premium": false,
    "date": "2026-05-19",
    "video": "https://www.w3schools.com/html/mov_bbb.mp4",
    "image": "https://picsum.photos/600/380?random=2",
    "tags": [
      "чулки",
      "новое",
      "обновление"
    ]
  },
  {
    "id": 3,
    "title": "Сегодняшнее обновление #3",
    "category": "мжм",
    "views": "38K",
    "duration": "5:24",
    "premium": false,
    "date": "2026-05-19",
    "video": "https://www.w3schools.com/html/mov_bbb.mp4",
    "image": "https://picsum.photos/600/380?random=3",
    "tags": [
      "мжм",
      "новое",
      "обновление"
    ]
  },
  {
    "id": 4,
    "title": "Горячий выпуск #4",
    "category": "тик ток",
    "views": "14K",
    "duration": "5:19",
    "premium": false,
    "date": "2026-05-19",
    "video": "https://www.w3schools.com/html/mov_bbb.mp4",
    "image": "https://picsum.photos/600/380?random=4",
    "tags": [
      "тик ток",
      "новое",
      "обновление"
    ]
  },
  {
    "id": 5,
    "title": "Новое видео #5",
    "category": "познавательное",
    "views": "80K",
    "duration": "7:28",
    "premium": false,
    "date": "2026-05-19",
    "video": "https://www.w3schools.com/html/mov_bbb.mp4",
    "image": "https://picsum.photos/600/380?random=5",
    "tags": [
      "познавательное",
      "новое",
      "обновление"
    ]
  },
  {
    "id": 6,
    "title": "Ролик недели #6",
    "category": "жмж",
    "views": "14K",
    "duration": "28:41",
    "premium": true,
    "date": "2026-05-19",
    "video": "https://www.w3schools.com/html/mov_bbb.mp4",
    "image": "https://picsum.photos/600/380?random=6",
    "tags": [
      "жмж",
      "новое",
      "обновление"
    ]
  },
  {
    "id": 7,
    "title": "Свежий контент #7",
    "category": "бдсм",
    "views": "5K",
    "duration": "27:52",
    "premium": false,
    "date": "2026-05-19",
    "video": "https://www.w3schools.com/html/mov_bbb.mp4",
    "image": "https://picsum.photos/600/380?random=7",
    "tags": [
      "бдсм",
      "новое",
      "обновление"
    ]
  },
  {
    "id": 8,
    "title": "Новый ролик дня #8",
    "category": "сексвайф",
    "views": "69K",
    "duration": "4:09",
    "premium": false,
    "date": "2026-05-19",
    "video": "https://www.w3schools.com/html/mov_bbb.mp4",
    "image": "https://picsum.photos/600/380?random=8",
    "tags": [
      "сексвайф",
      "новое",
      "обновление"
    ]
  },
  {
    "id": 9,
    "title": "Свежая публикация #9",
    "category": "грязные разговоры",
    "views": "81K",
    "duration": "12:04",
    "premium": false,
    "date": "2026-05-19",
    "video": "https://www.w3schools.com/html/mov_bbb.mp4",
    "image": "https://picsum.photos/600/380?random=9",
    "tags": [
      "грязные разговоры",
      "новое",
      "обновление"
    ]
  },
  {
    "id": 10,
    "title": "Видео из подборки #10",
    "category": "в поезде",
    "views": "74K",
    "duration": "11:11",
    "premium": false,
    "date": "2026-05-19",
    "video": "https://www.w3schools.com/html/mov_bbb.mp4",
    "image": "https://picsum.photos/600/380?random=10",
    "tags": [
      "в поезде",
      "новое",
      "обновление"
    ]
  },
  {
    "id": 11,
    "title": "Сегодняшнее обновление #11",
    "category": "в тренде",
    "views": "62K",
    "duration": "12:46",
    "premium": false,
    "date": "2026-05-19",
    "video": "https://www.w3schools.com/html/mov_bbb.mp4",
    "image": "https://picsum.photos/600/380?random=11",
    "tags": [
      "в тренде",
      "новое",
      "обновление"
    ]
  },
  {
    "id": 12,
    "title": "Горячий выпуск #12",
    "category": "русское",
    "views": "65K",
    "duration": "25:45",
    "premium": true,
    "date": "2026-05-19",
    "video": "https://www.w3schools.com/html/mov_bbb.mp4",
    "image": "https://picsum.photos/600/380?random=12",
    "tags": [
      "русское",
      "новое",
      "обновление"
    ]
  },
  {
    "id": 13,
    "title": "Новое видео #13",
    "category": "крупным планом",
    "views": "60K",
    "duration": "4:36",
    "premium": false,
    "date": "2026-05-19",
    "video": "https://www.w3schools.com/html/mov_bbb.mp4",
    "image": "https://picsum.photos/600/380?random=13",
    "tags": [
      "крупным планом",
      "новое",
      "обновление"
    ]
  },
  {
    "id": 14,
    "title": "Ролик недели #14",
    "category": "чулки",
    "views": "28K",
    "duration": "27:58",
    "premium": false,
    "date": "2026-05-19",
    "video": "https://www.w3schools.com/html/mov_bbb.mp4",
    "image": "https://picsum.photos/600/380?random=14",
    "tags": [
      "чулки",
      "новое",
      "обновление"
    ]
  },
  {
    "id": 15,
    "title": "Свежий контент #15",
    "category": "мжм",
    "views": "41K",
    "duration": "26:01",
    "premium": false,
    "date": "2026-05-19",
    "video": "https://www.w3schools.com/html/mov_bbb.mp4",
    "image": "https://picsum.photos/600/380?random=15",
    "tags": [
      "мжм",
      "новое",
      "обновление"
    ]
  },
  {
    "id": 16,
    "title": "Новый ролик дня #16",
    "category": "тик ток",
    "views": "70K",
    "duration": "6:59",
    "premium": false,
    "date": "2026-05-19",
    "video": "https://www.w3schools.com/html/mov_bbb.mp4",
    "image": "https://picsum.photos/600/380?random=16",
    "tags": [
      "тик ток",
      "новое",
      "обновление"
    ]
  },
  {
    "id": 17,
    "title": "Свежая публикация #17",
    "category": "познавательное",
    "views": "67K",
    "duration": "25:52",
    "premium": false,
    "date": "2026-05-19",
    "video": "https://www.w3schools.com/html/mov_bbb.mp4",
    "image": "https://picsum.photos/600/380?random=17",
    "tags": [
      "познавательное",
      "новое",
      "обновление"
    ]
  },
  {
    "id": 18,
    "title": "Видео из подборки #18",
    "category": "жмж",
    "views": "73K",
    "duration": "25:19",
    "premium": true,
    "date": "2026-05-19",
    "video": "https://www.w3schools.com/html/mov_bbb.mp4",
    "image": "https://picsum.photos/600/380?random=18",
    "tags": [
      "жмж",
      "новое",
      "обновление"
    ]
  },
  {
    "id": 19,
    "title": "Сегодняшнее обновление #19",
    "category": "бдсм",
    "views": "14K",
    "duration": "14:01",
    "premium": false,
    "date": "2026-05-19",
    "video": "https://www.w3schools.com/html/mov_bbb.mp4",
    "image": "https://picsum.photos/600/380?random=19",
    "tags": [
      "бдсм",
      "новое",
      "обновление"
    ]
  },
  {
    "id": 20,
    "title": "Горячий выпуск #20",
    "category": "сексвайф",
    "views": "12K",
    "duration": "6:11",
    "premium": false,
    "date": "2026-05-19",
    "video": "https://www.w3schools.com/html/mov_bbb.mp4",
    "image": "https://picsum.photos/600/380?random=20",
    "tags": [
      "сексвайф",
      "новое",
      "обновление"
    ]
  },
  {
    "id": 21,
    "title": "Новое видео #21",
    "category": "грязные разговоры",
    "views": "57K",
    "duration": "21:58",
    "premium": false,
    "date": "2026-05-19",
    "video": "https://www.w3schools.com/html/mov_bbb.mp4",
    "image": "https://picsum.photos/600/380?random=21",
    "tags": [
      "грязные разговоры",
      "новое",
      "обновление"
    ]
  },
  {
    "id": 22,
    "title": "Ролик недели #22",
    "category": "в поезде",
    "views": "43K",
    "duration": "14:43",
    "premium": false,
    "date": "2026-05-19",
    "video": "https://www.w3schools.com/html/mov_bbb.mp4",
    "image": "https://picsum.photos/600/380?random=22",
    "tags": [
      "в поезде",
      "новое",
      "обновление"
    ]
  },
  {
    "id": 23,
    "title": "Свежий контент #23",
    "category": "в тренде",
    "views": "52K",
    "duration": "9:19",
    "premium": false,
    "date": "2026-05-19",
    "video": "https://www.w3schools.com/html/mov_bbb.mp4",
    "image": "https://picsum.photos/600/380?random=23",
    "tags": [
      "в тренде",
      "новое",
      "обновление"
    ]
  },
  {
    "id": 24,
    "title": "Новый ролик дня #24",
    "category": "русское",
    "views": "10K",
    "duration": "9:01",
    "premium": true,
    "date": "2026-05-19",
    "video": "https://www.w3schools.com/html/mov_bbb.mp4",
    "image": "https://picsum.photos/600/380?random=24",
    "tags": [
      "русское",
      "новое",
      "обновление"
    ]
  }
];