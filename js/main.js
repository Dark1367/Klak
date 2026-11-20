'use strict';

/* =========================================================
   KLAK: интерактивность сайта
   1. Данные и вспомогательные функции
   2. Меню, кнопка «Наверх», уведомления
   3. Избранное
   4. Сравнение
   5. Корзина
   6. Каталог: поиск, фильтры, сортировка, sticky-панель
   7. Страница товара
   8. Конструктор клавиатуры
   9. Формы: модальное окно и валидация
   10. Оформление заказа
   ========================================================= */

/* ---------- 1. Данные и вспомогательные функции ---------- */

const PRODUCTS = {
  "klak-75-pro": {
    "name": "KLAK 75 Pro",
    "cat": "keyboards",
    "price": 12900,
    "old": null,
    "badge": [
      "Хит",
      "hit"
    ],
    "short": "Алюминиевый корпус, gasket-mount и три режима подключения.",
    "desc": "Флагман KLAK: фрезерованный алюминиевый корпус, мягкое gasket-крепление платы и шумоизоляция в три слоя. Работает по проводу, по Bluetooth и через радиомодуль 2.4 ГГц.",
    "line": "75% · hot-swap · 2.4 ГГц / BT / USB-C",
    "specs": [
      [
        "Формат",
        "75%, 84 клавиши"
      ],
      [
        "Корпус",
        "алюминий"
      ],
      [
        "Крепление платы",
        "gasket"
      ],
      [
        "Hot-swap",
        "да, 5-pin"
      ],
      [
        "Подключение",
        "2.4 ГГц, Bluetooth 5.1, USB-C"
      ],
      [
        "Аккумулятор",
        "4000 мА·ч"
      ],
      [
        "Подсветка",
        "RGB, под клавишами"
      ],
      [
        "Вес",
        "1,4 кг"
      ]
    ],
    "weight": 1.4,
    "force": null,
    "stock": {
      "pokrovka": 4,
      "sokol": 0
    }
  },
  "klak-tkl-silent": {
    "name": "KLAK TKL Silent",
    "cat": "keyboards",
    "price": 9990,
    "old": null,
    "badge": null,
    "short": "Бесшумные свитчи и шумоизоляция для офиса и ночной работы.",
    "desc": "Клавиатура без цифрового блока с бесшумными линейными свитчами. Внутри два слоя пены, поэтому печатать можно на созвоне и ночью.",
    "line": "TKL · silent linear · USB-C",
    "specs": [
      [
        "Формат",
        "TKL, 87 клавиш"
      ],
      [
        "Корпус",
        "пластик ABS"
      ],
      [
        "Крепление платы",
        "tray"
      ],
      [
        "Hot-swap",
        "да, 3-pin"
      ],
      [
        "Подключение",
        "USB-C"
      ],
      [
        "Аккумулятор",
        "нет"
      ],
      [
        "Подсветка",
        "белая"
      ],
      [
        "Вес",
        "0,9 кг"
      ]
    ],
    "weight": 0.9,
    "force": null,
    "stock": {
      "pokrovka": 2,
      "sokol": 3
    }
  },
  "klak-65-air": {
    "name": "KLAK 65 Air",
    "cat": "keyboards",
    "price": 8490,
    "old": null,
    "badge": [
      "Новинка",
      "new"
    ],
    "short": "Компактная и лёгкая: помещается в рюкзак вместе с ноутбуком.",
    "desc": "Самая компактная модель линейки. Стрелки на месте, F-ряд убран в слой Fn. Весит 700 грамм и держит заряд до трёх недель.",
    "line": "65% · hot-swap · BT / USB-C",
    "specs": [
      [
        "Формат",
        "65%, 68 клавиш"
      ],
      [
        "Корпус",
        "пластик PC"
      ],
      [
        "Крепление платы",
        "gasket"
      ],
      [
        "Hot-swap",
        "да, 5-pin"
      ],
      [
        "Подключение",
        "Bluetooth 5.1, USB-C"
      ],
      [
        "Аккумулятор",
        "3000 мА·ч"
      ],
      [
        "Подсветка",
        "RGB"
      ],
      [
        "Вес",
        "0,7 кг"
      ]
    ],
    "weight": 0.7,
    "force": null,
    "stock": {
      "pokrovka": 0,
      "sokol": 2
    }
  },
  "klak-full-office": {
    "name": "KLAK Full Office",
    "cat": "keyboards",
    "price": 7990,
    "old": 9390,
    "badge": [
      "−15%",
      "sale"
    ],
    "short": "Полноразмерная с цифровым блоком для таблиц и бухгалтерии.",
    "desc": "Классическая полноразмерная раскладка с цифровым блоком. Надёжные тактильные свитчи, съёмный кабель и ножки с двумя углами наклона.",
    "line": "Full · tactile · USB-C",
    "specs": [
      [
        "Формат",
        "100%, 104 клавиши"
      ],
      [
        "Корпус",
        "пластик ABS"
      ],
      [
        "Крепление платы",
        "tray"
      ],
      [
        "Hot-swap",
        "нет"
      ],
      [
        "Подключение",
        "USB-C"
      ],
      [
        "Аккумулятор",
        "нет"
      ],
      [
        "Подсветка",
        "белая"
      ],
      [
        "Вес",
        "1,1 кг"
      ]
    ],
    "weight": 1.1,
    "force": null,
    "stock": {
      "pokrovka": 3,
      "sokol": 1
    }
  },
  "lime-linear": {
    "name": "Lime Linear ×70",
    "cat": "switches",
    "price": 2490,
    "old": null,
    "badge": [
      "Новинка",
      "new"
    ],
    "short": "Плавный линейный ход без щелчка, заводская смазка.",
    "desc": "Линейные свитчи с плавным ходом и мягким нижним упором. Смазаны на заводе, звучат глухо и негромко. В наборе 70 штук.",
    "line": "linear · 45 гс · ход 3.8 мм",
    "specs": [
      [
        "Тип",
        "линейный"
      ],
      [
        "Усилие нажатия",
        "45 гс"
      ],
      [
        "Полный ход",
        "3,8 мм"
      ],
      [
        "Точка срабатывания",
        "2,0 мм"
      ],
      [
        "Пины",
        "5-pin"
      ],
      [
        "Смазка",
        "заводская"
      ],
      [
        "Звук",
        "тихий"
      ],
      [
        "В наборе",
        "70 шт"
      ]
    ],
    "weight": null,
    "force": 45,
    "stock": {
      "pokrovka": 10,
      "sokol": 6
    }
  },
  "coral-tactile": {
    "name": "Coral Tactile ×70",
    "cat": "switches",
    "price": 2690,
    "old": null,
    "badge": null,
    "short": "Заметная «ступенька» в начале хода, удобно для текста.",
    "desc": "Тактильные свитчи: в начале хода пальцы чувствуют лёгкую ступеньку, поэтому опечаток меньше. Хороший выбор для тех, кто много пишет.",
    "line": "tactile · 55 гс · ход 4.0 мм",
    "specs": [
      [
        "Тип",
        "тактильный"
      ],
      [
        "Усилие нажатия",
        "55 гс"
      ],
      [
        "Полный ход",
        "4,0 мм"
      ],
      [
        "Точка срабатывания",
        "2,0 мм"
      ],
      [
        "Пины",
        "5-pin"
      ],
      [
        "Смазка",
        "заводская"
      ],
      [
        "Звук",
        "средний"
      ],
      [
        "В наборе",
        "70 шт"
      ]
    ],
    "weight": null,
    "force": 55,
    "stock": {
      "pokrovka": 5,
      "sokol": 0
    }
  },
  "ice-clicky": {
    "name": "Ice Clicky ×70",
    "cat": "switches",
    "price": 2290,
    "old": 2690,
    "badge": [
      "−15%",
      "sale"
    ],
    "short": "Звонкий щелчок на каждое нажатие, как у старых клавиатур.",
    "desc": "Кликающие свитчи с отчётливым щелчком. Звучат громко, зато каждое нажатие хорошо слышно и чувствуется. Для дома, а не для open space.",
    "line": "clicky · 60 гс · ход 4.0 мм",
    "specs": [
      [
        "Тип",
        "кликающий"
      ],
      [
        "Усилие нажатия",
        "60 гс"
      ],
      [
        "Полный ход",
        "4,0 мм"
      ],
      [
        "Точка срабатывания",
        "2,2 мм"
      ],
      [
        "Пины",
        "3-pin"
      ],
      [
        "Смазка",
        "нет"
      ],
      [
        "Звук",
        "громкий"
      ],
      [
        "В наборе",
        "70 шт"
      ]
    ],
    "weight": null,
    "force": 60,
    "stock": {
      "pokrovka": 8,
      "sokol": 4
    }
  },
  "graphite-caps": {
    "name": "Кейкапы «Graphite»",
    "cat": "keycaps",
    "price": 4290,
    "old": 5190,
    "badge": [
      "−17%",
      "sale"
    ],
    "short": "Плотный PBT с double-shot надписями, профиль Cherry.",
    "desc": "Набор из 140 кейкапов из толстого PBT. Надписи отлиты вторым слоем пластика и не сотрутся. Подходят к раскладкам от 60% до полноразмерной.",
    "line": "140 шт · PBT · Cherry",
    "specs": [
      [
        "Материал",
        "PBT, 1,5 мм"
      ],
      [
        "Надписи",
        "double-shot"
      ],
      [
        "Профиль",
        "Cherry"
      ],
      [
        "Количество",
        "140 шт"
      ],
      [
        "Раскладка",
        "ANSI + кириллица"
      ],
      [
        "Совместимость",
        "MX-стебель"
      ],
      [
        "Цвет",
        "графит + лайм"
      ],
      [
        "Вес",
        "0,4 кг"
      ]
    ],
    "weight": 0.4,
    "force": null,
    "stock": {
      "pokrovka": 3,
      "sokol": 2
    }
  },
  "lime-caps": {
    "name": "Кейкапы «Lime Pop»",
    "cat": "keycaps",
    "price": 4590,
    "old": null,
    "badge": [
      "Хит",
      "hit"
    ],
    "short": "Яркий лаймовый набор с тёмными модификаторами.",
    "desc": "Лаймовые буквенные клавиши и тёмные модификаторы. Сочетаются с любым корпусом KLAK и выглядят ярко на рабочем столе.",
    "line": "130 шт · PBT · Cherry",
    "specs": [
      [
        "Материал",
        "PBT, 1,4 мм"
      ],
      [
        "Надписи",
        "dye-sub"
      ],
      [
        "Профиль",
        "Cherry"
      ],
      [
        "Количество",
        "130 шт"
      ],
      [
        "Раскладка",
        "ANSI + кириллица"
      ],
      [
        "Совместимость",
        "MX-стебель"
      ],
      [
        "Цвет",
        "лайм + графит"
      ],
      [
        "Вес",
        "0,38 кг"
      ]
    ],
    "weight": 0.38,
    "force": null,
    "stock": {
      "pokrovka": 0,
      "sokol": 4
    }
  },
  "retro-caps": {
    "name": "Кейкапы «Retro Beige»",
    "cat": "keycaps",
    "price": 4890,
    "old": null,
    "badge": null,
    "short": "Бежевые кейкапы в духе компьютеров 80-х.",
    "desc": "Тёплый бежевый и серый, как у компьютеров восьмидесятых. Высокий сферический профиль SA, громкий и глубокий звук.",
    "line": "150 шт · PBT · SA",
    "specs": [
      [
        "Материал",
        "PBT, 1,5 мм"
      ],
      [
        "Надписи",
        "dye-sub"
      ],
      [
        "Профиль",
        "SA"
      ],
      [
        "Количество",
        "150 шт"
      ],
      [
        "Раскладка",
        "ANSI + кириллица"
      ],
      [
        "Совместимость",
        "MX-стебель"
      ],
      [
        "Цвет",
        "бежевый + серый"
      ],
      [
        "Вес",
        "0,52 кг"
      ]
    ],
    "weight": 0.52,
    "force": null,
    "stock": {
      "pokrovka": 2,
      "sokol": 0
    }
  },
  "coil-cable": {
    "name": "Кабель-спираль «Coil»",
    "cat": "accessories",
    "price": 1490,
    "old": null,
    "badge": null,
    "short": "Витой кабель USB-C с авиаразъёмом, 1,5 м.",
    "desc": "Витой кабель USB-C → USB-C с отстёгивающимся авиаразъёмом посередине. Оплётка из нейлона, длина 1,5 метра.",
    "line": "USB-C · 1,5 м · авиаразъём",
    "specs": [
      [
        "Разъёмы",
        "USB-C → USB-C"
      ],
      [
        "Длина",
        "1,5 м"
      ],
      [
        "Спираль",
        "20 см"
      ],
      [
        "Разъём GX16",
        "да"
      ],
      [
        "Оплётка",
        "нейлон"
      ],
      [
        "Цвет",
        "лайм"
      ],
      [
        "Совместимость",
        "любые USB-C клавиатуры"
      ],
      [
        "Вес",
        "0,12 кг"
      ]
    ],
    "weight": 0.12,
    "force": null,
    "stock": {
      "pokrovka": 12,
      "sokol": 7
    }
  },
  "wrist-rest": {
    "name": "Подставка «Walnut»",
    "cat": "accessories",
    "price": 2190,
    "old": null,
    "badge": null,
    "short": "Подставка под запястья из массива ореха.",
    "desc": "Подставка под запястья из массива американского ореха с прорезиненным основанием. Снимает напряжение с кистей при долгой работе.",
    "line": "орех · 360 мм · для 75% / TKL",
    "specs": [
      [
        "Материал",
        "массив ореха"
      ],
      [
        "Длина",
        "360 мм"
      ],
      [
        "Ширина",
        "85 мм"
      ],
      [
        "Высота",
        "18 мм"
      ],
      [
        "Основание",
        "резина"
      ],
      [
        "Покрытие",
        "масло"
      ],
      [
        "Совместимость",
        "75% и TKL"
      ],
      [
        "Вес",
        "0,35 кг"
      ]
    ],
    "weight": 0.35,
    "force": null,
    "stock": {
      "pokrovka": 4,
      "sokol": 2
    }
  }
};

const CATEGORY_NAMES = {
  keyboards: 'Клавиатуры',
  switches: 'Свитчи',
  keycaps: 'Кейкапы',
  accessories: 'Аксессуары'
};

const STORAGE = {
  cart: 'klak-cart',
  favorites: 'klak-favorites',
  compare: 'klak-compare'
};

const MAX_COMPARE = 3;

const ICON_HEART = '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s-7-4.4-9-9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c-2 4.6-9 9-9 9z"/></svg>';
const ICON_COMPARE = '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h11M4 12h7M4 17h11M18 5v14M15 8l3-3 3 3"/></svg>';
const MAX_QTY = 10;

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

const formatPrice = (value) => value.toLocaleString('ru-RU') + ' ₽';

// «ё» и «е» считаем одной буквой, регистр не важен
const normalize = (text) => String(text).toLowerCase().replace(/ё/g, 'е').trim();

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function readList(key) {
  try {
    const data = JSON.parse(localStorage.getItem(key) || '[]');
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function saveList(key, list) {
  try {
    localStorage.setItem(key, JSON.stringify(list));
  } catch {
    /* хранилище недоступно (приватный режим), поэтому просто не сохраняем */
  }
}

function createEl(tag, className, text) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text !== undefined) el.textContent = text;
  return el;
}

function imageSet(img, id, alt) {
  img.src = `images/${id}-640.webp`;
  img.srcset = `images/${id}-640.webp 640w, images/${id}-1280.webp 1280w`;
  if (alt !== undefined) img.alt = alt;
}

function setCount(selector, value) {
  $$(selector).forEach((el) => {
    const changed = el.textContent !== String(value);
    el.textContent = value;
    if (el.classList.contains('icon-button__count')) {
      el.hidden = value === 0;
      if (changed && value > 0) {
        el.classList.remove('is-bump');
        void el.offsetWidth; // перезапуск анимации
        el.classList.add('is-bump');
      }
    }
  });
}

/* ---------- 2. Меню, «Наверх», уведомления ---------- */

let toastTimer;
function showToast(message, type = 'success', action = null) {
  const toast = $('[data-toast]');
  if (!toast) return;
  toast.replaceChildren(createEl('span', 'toast__text', message));
  if (action) {
    // например, «Открыть» сравнение: в шапке больше нет отдельной кнопки
    const button = createEl('button', 'toast__action', action.label);
    button.type = 'button';
    button.addEventListener('click', () => { toast.hidden = true; action.onClick(); });
    toast.append(button);
  }
  toast.classList.toggle('toast--warning', type === 'warning');
  toast.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { toast.hidden = true; }, action ? 4500 : 2600);
}

function initMenu() {
  const toggle = $('[data-menu-toggle]');
  const nav = $('#site-nav');
  if (!toggle || !nav) return;

  const setOpen = (open) => {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
  };

  toggle.addEventListener('click', () => setOpen(!nav.classList.contains('is-open')));
  nav.addEventListener('click', (event) => { if (event.target.closest('a')) setOpen(false); });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') setOpen(false); });
  window.matchMedia('(min-width: 1024px)').addEventListener('change', () => setOpen(false));
}

function initToTop() {
  const button = $('[data-to-top]');
  if (!button) return;
  const update = () => button.classList.toggle('is-visible', window.scrollY > 600);
  window.addEventListener('scroll', update, { passive: true });
  update();
  button.addEventListener('click', () => {
    // клавиша «нажимается», затем страница уезжает наверх
    button.classList.add('is-pressed');
    setTimeout(() => {
      button.classList.remove('is-pressed');
      window.scrollTo({ top: 0, behavior: reduceMotion() ? 'auto' : 'smooth' });
    }, 140);
  });
}

/* ---------- 3. Избранное ---------- */

const getFavorites = () => readList(STORAGE.favorites).filter((id) => PRODUCTS[id]);

function toggleFavorite(id) {
  const list = getFavorites();
  const index = list.indexOf(id);
  if (index === -1) {
    list.push(id);
    showToast(`«${PRODUCTS[id].name}» в избранном`);
  } else {
    list.splice(index, 1);
    showToast('Убрано из избранного');
  }
  saveList(STORAGE.favorites, list);
  renderFavorites();
  document.dispatchEvent(new CustomEvent('favorites:change'));
}

function renderFavorites() {
  const list = getFavorites();
  $$('[data-favorite]').forEach((button) => {
    const id = button.dataset.favorite;
    const active = list.includes(id);
    button.setAttribute('aria-pressed', String(active));
    const name = PRODUCTS[id] ? PRODUCTS[id].name : '';
    button.setAttribute('aria-label', active ? `Убрать «${name}» из избранного` : `Добавить «${name}» в избранное`);
  });
  setCount('[data-favorites-count]', list.length);
  setCount('[data-favorites-count-inline]', list.length);
}

/* ---------- 4. Сравнение ---------- */

const getCompare = () => readList(STORAGE.compare).filter((id) => PRODUCTS[id]);

function toggleCompare(id) {
  const list = getCompare();
  const index = list.indexOf(id);
  if (index !== -1) {
    list.splice(index, 1);
  } else if (list.length && PRODUCTS[list[0]].cat !== PRODUCTS[id].cat) {
    showToast(`Сравнивать можно товары одной категории. Сейчас в сравнении: ${CATEGORY_NAMES[PRODUCTS[list[0]].cat].toLowerCase()}`, 'warning');
    return;
  } else if (list.length >= MAX_COMPARE) {
    showToast('В сравнении уже 3 товара, уберите один', 'warning');
    return;
  } else {
    list.push(id);
    if (list.length === 1) showToast('Добавлено к сравнению. Выберите ещё товар');
    else showToast(`В сравнении ${list.length} из ${MAX_COMPARE}`, 'success', { label: 'Открыть', onClick: openCompare });
  }
  saveList(STORAGE.compare, list);
  renderCompare();
}

function renderCompare() {
  const list = getCompare();
  const full = list.length >= MAX_COMPARE;
  $$('[data-compare]').forEach((button) => {
    const active = list.includes(button.dataset.compare);
    button.setAttribute('aria-pressed', String(active));
    if (button.classList.contains('product-card__compare')) button.disabled = full && !active;
  });
  setCount('[data-compare-count]', list.length);
  setCount('[data-compare-count-inline]', list.length);
  const dialog = $('#compare-dialog');
  if (dialog && dialog.open) renderCompareTable();
}

// какие значения считаем лучшими: меньшая цена и меньший вес
function numberFrom(text) {
  const match = String(text).replace(',', '.').match(/[\d.]+/);
  return match ? parseFloat(match[0]) : NaN;
}

function renderCompareTable() {
  const box = $('[data-compare-table]');
  if (!box) return;
  const list = getCompare();
  box.replaceChildren();

  if (!list.length) {
    const empty = createEl('div', 'cart-empty');
    empty.append('Пока пусто. Нажмите ⇄ на карточке товара, чтобы добавить его к сравнению. ');
    const link = createEl('a', 'text-link', 'Перейти в каталог');
    link.href = 'catalog.html';
    empty.append(link);
    box.append(empty);
    return;
  }

  const products = list.map((id) => ({ id, ...PRODUCTS[id] }));
  const labels = products[0].specs.map(([label]) => label);
  const onlyDiff = box.dataset.onlyDiff === 'true';

  // переключатель «Все характеристики / Только различия»: сегменты, как вкладки
  if (products.length > 1) {
    const diffCount = labels.filter((_, row) => new Set(products.map((p) => (p.specs[row] || [])[1])).size > 1).length
      + (new Set(products.map((p) => p.price)).size > 1 ? 1 : 0);
    const bar = createEl('div', 'compare-switch');
    const segments = createEl('div', 'segmented');
    segments.setAttribute('role', 'group');
    segments.setAttribute('aria-label', 'Какие характеристики показать');
    [['false', 'Все характеристики', labels.length + 1], ['true', 'Только различия', diffCount]].forEach(([value, text, count]) => {
      const button = createEl('button', 'segmented__item');
      button.type = 'button';
      button.setAttribute('aria-pressed', String(String(onlyDiff) === value));
      button.append(createEl('span', '', text), createEl('span', 'segmented__count', String(count)));
      button.addEventListener('click', () => {
        if (String(onlyDiff) === value) return;
        box.dataset.onlyDiff = value;
        renderCompareTable();
        box.querySelector(`.segmented__item:nth-child(${value === 'true' ? 2 : 1})`).focus();
      });
      segments.append(button);
    });
    const legend = createEl('p', 'compare-switch__legend');
    legend.append(createEl('span', 'compare-switch__dot'), 'лучшее значение');
    bar.append(segments, legend);
    box.append(bar);
  }

  const wrapper = createEl('div', 'table-wrapper');
  const table = createEl('table', 'spec-table compare-table');
  const thead = createEl('thead');
  const headRow = createEl('tr');
  headRow.append(createEl('th', '', ''));
  products.forEach((p) => {
    const th = createEl('th');
    th.scope = 'col';
    const cell = createEl('div', 'compare-table__product');
    const img = createEl('img');
    imageSet(img, p.id, p.name);
    img.width = 160; img.height = 120; img.loading = 'lazy';
    // своя ссылка без «растягивающего» слоя карточки, иначе она перекрывает переключатель над таблицей
    const link = createEl('a', 'compare-table__link', p.name);
    link.href = `product.html?id=${p.id}`;
    const remove = createEl('button', 'compare-table__remove', 'Убрать');
    remove.type = 'button';
    remove.addEventListener('click', () => toggleCompare(p.id));
    cell.append(img, link, remove);
    th.append(cell);
    headRow.append(th);
  });
  thead.append(headRow);

  const tbody = createEl('tbody');
  const addRow = (label, values, bestIndex) => {
    if (onlyDiff && new Set(values).size === 1) return;
    const tr = createEl('tr');
    const th = createEl('th', '', label);
    th.scope = 'row';
    tr.append(th);
    values.forEach((value, i) => tr.append(createEl('td', i === bestIndex ? 'is-best' : '', value)));
    tbody.append(tr);
  };

  const prices = products.map((p) => p.price);
  const minPrice = Math.min(...prices);
  addRow('Цена', prices.map(formatPrice), products.length > 1 && prices.filter((v) => v === minPrice).length === 1 ? prices.indexOf(minPrice) : -1);

  labels.forEach((label, row) => {
    const values = products.map((p) => p.specs[row] ? p.specs[row][1] : 'нет данных');
    let best = -1;
    if (products.length > 1 && (label === 'Вес' || label === 'Усилие нажатия')) {
      const nums = values.map(numberFrom);
      const min = Math.min(...nums);
      if (nums.filter((n) => n === min).length === 1) best = nums.indexOf(min);
    }
    addRow(label, values, best);
  });

  table.append(thead, tbody);
  wrapper.append(table);
  box.append(wrapper);
}

function openCompare() {
  const dialog = $('#compare-dialog');
  if (!dialog) return;
  renderCompareTable();
  if (!dialog.open) dialog.showModal();
}

function initCompareDialog() {
  const dialog = $('#compare-dialog');
  if (!dialog) return;
  $$('[data-compare-open]').forEach((button) => button.addEventListener('click', openCompare));
  $$('[data-compare-close]', dialog).forEach((b) => b.addEventListener('click', () => dialog.close()));
  dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
  const clear = $('[data-compare-clear]', dialog);
  if (clear) clear.addEventListener('click', () => { saveList(STORAGE.compare, []); renderCompare(); renderCompareTable(); });
}

/* ---------- 5. Корзина ---------- */

function normalizeCartItem(item) {
  if (!item || typeof item !== 'object') return null;
  const product = PRODUCTS[item.id];
  if (!product && item.id !== 'custom-build') return null;
  return {
    key: String(item.key || item.id),
    id: item.id,
    name: String(item.name || (product && product.name) || 'Товар'),
    options: Array.isArray(item.options) ? item.options.map(String) : [],
    image: String(item.image || item.id),
    price: Number(item.price) || (product ? product.price : 0),
    qty: Math.min(Math.max(Math.round(Number(item.qty)) || 1, 1), MAX_QTY)
  };
}

const getCart = () => readList(STORAGE.cart).map(normalizeCartItem).filter(Boolean);
const saveCart = (cart) => { saveList(STORAGE.cart, cart); renderCart(); };
const cartTotal = (cart) => cart.reduce((sum, item) => sum + item.price * item.qty, 0);

function addToCart({ id, qty = 1, options = [], price, name, image }) {
  const product = PRODUCTS[id];
  const item = normalizeCartItem({
    id,
    key: id + (options.length ? '|' + options.join('|') : ''),
    name: name || (product && product.name),
    options,
    image: image || id,
    price: price || (product && product.price),
    qty
  });
  const cart = getCart();
  const same = cart.find((entry) => entry.key === item.key && entry.price === item.price);
  if (same) same.qty = Math.min(same.qty + item.qty, MAX_QTY);
  else cart.push(item);
  saveCart(cart);
  return item;
}

function changeQty(key, delta) {
  const cart = getCart();
  const item = cart.find((entry) => entry.key === key);
  if (!item) return;
  item.qty += delta;
  saveCart(item.qty < 1 ? cart.filter((entry) => entry !== item) : cart.map((entry) => entry === item ? { ...item, qty: Math.min(item.qty, MAX_QTY) } : entry));
}

function removeFromCart(key) {
  saveCart(getCart().filter((entry) => entry.key !== key));
}

function cartItemElement(item) {
  const row = createEl('div', 'cart-item');
  const img = createEl('img', 'cart-item__image');
  img.src = `images/${item.image}-640.webp`;
  img.alt = '';
  img.width = 64; img.height = 48;

  const info = createEl('div');
  info.append(createEl('p', 'cart-item__name', item.name));
  if (item.options.length) info.append(createEl('p', 'cart-item__options', item.options.join(' · ')));

  const controls = createEl('div', 'cart-item__controls');
  const qty = createEl('div', 'qty qty--sm');
  const minus = createEl('button', 'qty__button', '−');
  minus.type = 'button';
  minus.setAttribute('aria-label', `Уменьшить количество: ${item.name}`);
  // на последней штуке «−» не удаляет сразу, а спрашивает подтверждение
  minus.addEventListener('click', () => (item.qty > 1 ? changeQty(item.key, -1) : askRemove()));
  const value = createEl('span', 'qty__input', String(item.qty));
  value.style.display = 'grid';
  value.style.placeItems = 'center';
  const plus = createEl('button', 'qty__button', '+');
  plus.type = 'button';
  plus.disabled = item.qty >= MAX_QTY;
  plus.setAttribute('aria-label', `Увеличить количество: ${item.name}`);
  plus.addEventListener('click', () => changeQty(item.key, 1));
  qty.append(minus, value, plus);
  const remove = createEl('button', 'cart-item__remove', 'Удалить');
  remove.type = 'button';
  remove.addEventListener('click', askRemove);
  controls.append(qty, remove);

  // подтверждение прямо в строке товара
  const confirm = createEl('div', 'cart-item__confirm');
  confirm.hidden = true;
  confirm.setAttribute('role', 'group');
  confirm.setAttribute('aria-label', `Удалить «${item.name}» из корзины?`);
  const question = createEl('p', 'cart-item__question', 'Удалить из корзины?');
  const yes = createEl('button', 'cart-item__yes', 'Удалить');
  yes.type = 'button';
  const no = createEl('button', 'cart-item__no', 'Отмена');
  no.type = 'button';
  confirm.append(question, yes, no);
  info.append(controls, confirm);

  function askRemove() {
    row.classList.add('is-confirming');
    controls.hidden = true;
    confirm.hidden = false;
    no.focus(); // по умолчанию фокус на «Отмена», чтобы случайный Enter ничего не удалил
  }
  function cancelRemove() {
    row.classList.remove('is-confirming');
    confirm.hidden = true;
    controls.hidden = false;
    remove.focus();
  }
  yes.addEventListener('click', () => {
    removeFromCart(item.key);
    showToast(`«${item.name}» удалён из корзины`);
  });
  no.addEventListener('click', cancelRemove);
  confirm.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') { event.stopPropagation(); cancelRemove(); }
  });

  const price = createEl('p', 'cart-item__price', formatPrice(item.price * item.qty));
  row.append(img, info, price);
  return row;
}

function renderCart() {
  const cart = getCart();
  setCount('[data-cart-count]', cart.reduce((sum, item) => sum + item.qty, 0));

  const box = $('[data-cart-items]');
  if (box) {
    box.replaceChildren();
    if (!cart.length) {
      const empty = createEl('div', 'cart-empty', 'В корзине пока пусто. ');
      const link = createEl('a', 'text-link', 'Перейти в каталог');
      link.href = 'catalog.html';
      empty.append(link);
      box.append(empty);
    } else {
      cart.forEach((item) => box.append(cartItemElement(item)));
    }
  }
  $$('[data-cart-total]').forEach((el) => { el.textContent = formatPrice(cartTotal(cart)); });
  const checkout = $('[data-cart-checkout]');
  if (checkout) checkout.setAttribute('aria-disabled', String(!cart.length));
  document.dispatchEvent(new CustomEvent('cart:change'));
}

function initCartDrawer() {
  const drawer = $('#cart-drawer');
  if (!drawer) return;
  let lastFocus = null;

  const open = () => {
    lastFocus = document.activeElement;
    drawer.hidden = false;
    document.body.classList.add('is-locked');
    $('[data-cart-close].icon-button', drawer).focus();
  };
  const close = () => {
    drawer.hidden = true;
    document.body.classList.remove('is-locked');
    if (lastFocus) lastFocus.focus();
  };

  $$('[data-cart-open]').forEach((button) => button.addEventListener('click', open));
  $$('[data-cart-close]', drawer).forEach((el) => el.addEventListener('click', close));
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && !drawer.hidden) close(); });
  const checkout = $('[data-cart-checkout]', drawer);
  if (checkout) checkout.addEventListener('click', (event) => {
    if (!getCart().length) { event.preventDefault(); showToast('Сначала добавьте товары в корзину', 'warning'); }
  });
}

/* общие обработчики кнопок на карточках (делегирование) */
function initCardButtons() {
  document.addEventListener('click', (event) => {
    const fav = event.target.closest('[data-favorite]');
    if (fav) {
      event.preventDefault();
      toggleFavorite(fav.dataset.favorite);
      fav.classList.remove('is-pop'); void fav.offsetWidth; fav.classList.add('is-pop');
      return;
    }
    const cmp = event.target.closest('[data-compare]');
    if (cmp) {
      event.preventDefault();
      toggleCompare(cmp.dataset.compare);
      return;
    }
    const buy = event.target.closest('[data-add-to-cart]');
    if (buy) {
      event.preventDefault();
      const item = addToCart({ id: buy.dataset.addToCart });
      showToast(`«${item.name}» в корзине`);
      buy.textContent = 'Добавлено ✓';
      buy.classList.add('is-added');
      setTimeout(() => { buy.textContent = 'В корзину'; buy.classList.remove('is-added'); }, 1400);
    }
  });
}

/* карточка товара, собранная из данных (для блока «С этим смотрят») */
function createCard(id) {
  const p = PRODUCTS[id];
  const card = createEl('article', 'product-card' + (p.badge ? ` product-card--${p.badge[1]}` : ''));
  card.dataset.id = id;
  const media = createEl('a', 'product-card__media');
  media.href = `product.html?id=${id}`;
  media.tabIndex = -1;
  media.setAttribute('aria-hidden', 'true');
  const img = createEl('img', 'product-card__image');
  imageSet(img, id, p.name);
  img.sizes = '(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw';
  img.width = 640; img.height = 480; img.loading = 'lazy';
  media.append(img);
  card.append(media);
  if (p.badge) card.append(createEl('span', `product-card__badge product-card__badge--${p.badge[1]}`, p.badge[0]));
  const fav = createEl('button', 'product-card__favorite');
  fav.type = 'button';
  fav.dataset.favorite = id;
  fav.innerHTML = ICON_HEART;
  card.append(fav);

  const body = createEl('div', 'product-card__body');
  body.append(createEl('p', 'product-card__category', CATEGORY_NAMES[p.cat]));
  const title = createEl('h3', 'product-card__title');
  const link = createEl('a', 'product-card__link', p.name);
  link.href = `product.html?id=${id}`;
  title.append(link);
  body.append(title, createEl('p', 'product-card__description', p.short), createEl('p', 'product-card__specs', p.line));
  const footer = createEl('div', 'product-card__footer');
  const price = createEl('p', 'product-card__price', formatPrice(p.price));
  if (p.old) price.append(' ', createEl('s', 'product-card__old-price', formatPrice(p.old)));
  const cmp = createEl('button', 'product-card__compare');
  cmp.type = 'button';
  cmp.dataset.compare = id;
  cmp.setAttribute('aria-label', `Добавить «${p.name}» к сравнению`);
  cmp.innerHTML = ICON_COMPARE;
  footer.append(price, cmp);
  const buy = createEl('button', 'button button--primary product-card__buy', 'В корзину');
  buy.type = 'button';
  buy.dataset.addToCart = id;
  body.append(footer, buy);
  card.append(body);
  return card;
}

/* ---------- 6. Каталог ---------- */

function initCatalog() {
  const grid = $('[data-catalog-grid]');
  if (!grid) return;

  const form = $('[data-filters]');
  const search = $('[data-search]');
  const favButton = $('[data-favorites-only]');
  const status = $('[data-catalog-status]');
  const empty = $('[data-catalog-empty]');
  const toolbar = $('[data-toolbar]');
  const cards = $$('[data-product-card]', grid);
  cards.forEach((card, index) => { card.dataset.order = index; });

  // начальное состояние из адреса: ?cat=switches, ?fav=1, ?q=...
  const params = new URLSearchParams(location.search);
  if (params.get('cat') && CATEGORY_NAMES[params.get('cat')]) {
    const radio = $(`input[name="category"][value="${params.get('cat')}"]`, form);
    if (radio) radio.checked = true;
  }
  if (params.get('q')) search.value = params.get('q');
  let favoritesOnly = params.get('fav') === '1';

  function apply() {
    const data = new FormData(form);
    const category = data.get('category') || 'all';
    const min = Number(data.get('min')) || 0;
    const max = Number(data.get('max')) || Infinity;
    const flags = data.getAll('flag');
    const words = normalize(search.value).split(/\s+/).filter(Boolean);
    const favorites = getFavorites();

    let shown = 0;
    cards.forEach((card) => {
      const price = Number(card.dataset.price);
      const haystack = normalize(card.dataset.search);
      const cardFlags = card.dataset.flags.split(' ');
      const visible =
        (category === 'all' || card.dataset.category === category) &&
        price >= min && price <= max &&
        flags.every((flag) => cardFlags.includes(flag)) &&
        words.every((word) => haystack.includes(word)) &&
        (!favoritesOnly || favorites.includes(card.dataset.id));
      card.hidden = !visible;
      if (visible) shown += 1;
    });

    // сортировка: переставляем карточки внутри сетки
    const sort = data.get('sort');
    const sorted = [...cards].sort((a, b) => {
      if (sort === 'cheap') return a.dataset.price - b.dataset.price;
      if (sort === 'expensive') return b.dataset.price - a.dataset.price;
      if (sort === 'name') return PRODUCTS[a.dataset.id].name.localeCompare(PRODUCTS[b.dataset.id].name, 'ru');
      return a.dataset.order - b.dataset.order;
    });
    grid.append(...sorted);

    favButton.setAttribute('aria-pressed', String(favoritesOnly));
    const parts = [category === 'all' ? 'Все категории' : CATEGORY_NAMES[category], `найдено ${shown}`];
    if (words.length) parts.push(`по запросу «${search.value.trim()}»`);
    if (favoritesOnly) parts.push('только избранное');
    status.textContent = parts.join(' · ');
    empty.hidden = shown > 0;
  }

  // если панель уже прилипла, при новом поиске возвращаем начало списка под панель,
  // чтобы карточки не «пролетали» под ней, пока список меняется
  const content = $('.catalog-layout__content');
  const keepResultsInView = () => {
    if (!toolbar.classList.contains('is-stuck')) return;
    const target = content.getBoundingClientRect().top + window.scrollY - $('.site-header').offsetHeight - 8;
    if (window.scrollY > target) window.scrollTo({ top: target, behavior: 'auto' });
  };
  const applyAndKeep = () => { keepResultsInView(); apply(); };

  form.addEventListener('input', applyAndKeep);
  form.addEventListener('change', applyAndKeep);
  form.addEventListener('submit', (event) => event.preventDefault());
  form.addEventListener('reset', () => setTimeout(() => { search.value = ''; favoritesOnly = false; apply(); }));
  search.addEventListener('input', applyAndKeep);
  favButton.addEventListener('click', () => {
    favoritesOnly = !favoritesOnly;
    if (favoritesOnly && !getFavorites().length) showToast('В избранном пока пусто. Нажмите ♥ на карточке', 'warning');
    apply();
  });
  $('[data-catalog-reset]').addEventListener('click', () => form.reset());
  document.addEventListener('favorites:change', () => { if (favoritesOnly) apply(); });

  // тень у sticky-панели, когда она «прилипла»
  const headerHeight = () => $('.site-header').offsetHeight;
  const updateStuck = () => {
    const top = toolbar.getBoundingClientRect().top;
    toolbar.classList.toggle('is-stuck', top <= headerHeight() + 9 && window.scrollY > 0);
  };
  window.addEventListener('scroll', updateStuck, { passive: true });
  updateStuck();

  // фильтры: на телефоне свёрнуты, на компьютере всегда открыты
  const panel = $('[data-filters-panel]');
  const desktop = window.matchMedia('(min-width: 1024px)');
  const syncPanel = () => { panel.open = desktop.matches; };
  desktop.addEventListener('change', syncPanel);
  syncPanel();

  if (location.hash === '#catalog-search') setTimeout(() => search.focus(), 100);
  apply();
}

/* ---------- 7. Страница товара ---------- */

function initProductPage() {
  const page = $('[data-product-page]');
  if (!page) return;
  const params = new URLSearchParams(location.search);
  let id = params.get('id') || page.dataset.id;
  if (!PRODUCTS[id]) {
    showToast('Товар не найден, показываем KLAK 75 Pro', 'warning');
    id = page.dataset.id;
  }
  const p = PRODUCTS[id];
  page.dataset.id = id;

  // короткий заголовок вкладки: «Кейкапы «Retro Beige»» → «Retro Beige | KLAK», «Lime Linear ×70» → «Lime Linear | KLAK»
  const shortName = (p.name.match(/«(.+)»/) || [])[1] || p.name.replace(/\s×\d+$/, '');
  document.title = `${shortName} | KLAK`;
  const meta = $('meta[name="description"]');
  if (meta) meta.content = `${p.name}: ${p.short} Цена ${formatPrice(p.price)}.`;
  $('[data-product-name]').textContent = p.name;
  $('[data-crumb-current]').textContent = p.name;
  $('[data-product-category]').textContent = CATEGORY_NAMES[p.cat];
  $('[data-product-line]').textContent = p.line;
  $('[data-product-price]').textContent = formatPrice(p.price);
  const old = $('[data-product-old]');
  old.hidden = !p.old;
  if (p.old) old.textContent = formatPrice(p.old);
  $('[data-product-desc]').textContent = p.desc;
  const badge = $('[data-product-badge]');
  badge.hidden = !p.badge;
  if (p.badge) {
    badge.className = `product__badge product-card__badge product-card__badge--${p.badge[1]}`;
    badge.textContent = p.badge[0];
  }
  imageSet($('[data-product-image]'), id, p.name);

  const specs = $('[data-product-specs]');
  specs.replaceChildren(...p.specs.map(([label, value]) => {
    const tr = createEl('tr');
    const th = createEl('th', '', label);
    th.scope = 'row';
    tr.append(th, createEl('td', '', value));
    return tr;
  }));

  $$('[data-favorite]', page).forEach((b) => { b.dataset.favorite = id; });
  $$('[data-compare]', page).forEach((b) => { b.dataset.compare = id; });
  $$('[data-dialog-open]', page).forEach((b) => { b.dataset.product = p.name; });

  // количество
  const form = $('[data-product-buy]');
  const qty = $('#product-qty');
  const clamp = (v) => Math.min(Math.max(Math.round(Number(v)) || 1, 1), MAX_QTY);
  $$('[data-qty-step]', form).forEach((b) => b.addEventListener('click', () => { qty.value = clamp(Number(qty.value) + Number(b.dataset.qtyStep)); }));
  qty.addEventListener('blur', () => { qty.value = clamp(qty.value); });
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const count = clamp(qty.value);
    addToCart({ id, qty: count });
    $('[data-product-added]').textContent = `Добавлено в корзину: ${p.name}${count > 1 ? ' × ' + count : ''}.`;
    showToast('Товар в корзине');
  });

  // «С этим смотрят»: сначала та же категория, потом остальные
  const related = $('[data-related]');
  if (related) {
    const ids = Object.keys(PRODUCTS).filter((key) => key !== id);
    ids.sort((a, b) => (PRODUCTS[b].cat === p.cat) - (PRODUCTS[a].cat === p.cat));
    related.replaceChildren(...ids.slice(0, 4).map(createCard));
  }
}

/* ---------- 8. Конструктор ---------- */

function initBuilder() {
  const form = $('[data-builder]');
  if (!form) return;
  const linesBox = $('[data-builder-lines]');
  const totalEl = $('[data-builder-total]');
  const qtyInput = $('[data-builder-qty]');
  const preview = $('[data-builder-preview]');
  const kbHolder = $('[data-builder-kb]');
  const caption = $('[data-builder-caption]');
  const MAX_BUILD = 5;
  const clamp = (v) => Math.min(Math.max(Math.round(Number(v)) || 1, 1), MAX_BUILD);

  const checked = (name) => $(`input[name="${name}"]:checked`, form);

  function read() {
    const format = checked('format');
    const caseInput = checked('case');
    const conn = checked('connection');
    const sw = checked('switch');
    const caps = checked('caps');
    const extras = $$('input[name="extra"]:checked', form);
    const keys = Number(format.dataset.keys);
    const switchCost = keys * Number(sw.dataset.unit);

    const lines = [[`Корпус ${format.dataset.label} + плата`, Number(format.dataset.price)]];
    if (Number(caseInput.dataset.price)) lines.push([`Корпус: ${caseInput.dataset.label.toLowerCase()}`, Number(caseInput.dataset.price)]);
    if (Number(conn.dataset.price)) lines.push(['Беспроводной модуль', Number(conn.dataset.price)]);
    lines.push([`${sw.dataset.label} ×${keys}`, switchCost]);
    if (Number(caps.dataset.price)) lines.push([`Кейкапы ${caps.dataset.label}`, Number(caps.dataset.price)]);
    extras.forEach((input) => lines.push([input.dataset.label, Number(input.dataset.price)]));

    const unit = lines.reduce((sum, [, price]) => sum + price, 0);
    const options = [caseInput.dataset.label, conn.dataset.label, sw.dataset.label, caps.value === 'none' ? 'без кейкапов' : 'кейкапы ' + caps.dataset.label, ...extras.map((i) => i.dataset.label)];
    return { format, lines, unit, options, qty: clamp(qtyInput.value) };
  }

  function render() {
    // полноразмерный корпус выпускаем только проводным
    const isFull = checked('format').value === 'full';
    const wireless = $('input[name="connection"][value="wireless"]', form);
    wireless.disabled = isFull;
    if (isFull && wireless.checked) {
      $('input[name="connection"][value="wired"]', form).checked = true;
      showToast('Full-формат выпускаем только проводным', 'warning');
    }

    const { format, lines, unit, qty } = read();
    linesBox.replaceChildren(...lines.map(([label, price], i) => {
      const row = createEl('p', 'receipt__line');
      row.append(createEl('span', '', label), createEl('span', 'receipt__dots'), createEl('span', '', (i ? '+' : '') + formatPrice(price)));
      return row;
    }));
    if (qty > 1) {
      const row = createEl('p', 'receipt__line');
      row.append(createEl('span', '', 'Количество'), createEl('span', 'receipt__dots'), createEl('span', '', `${formatPrice(unit)} × ${qty}`));
      linesBox.append(row);
    }
    totalEl.textContent = formatPrice(unit * qty);
    const bar = $('[data-builder-total-bar]');
    if (bar) bar.textContent = formatPrice(unit * qty);

    renderPreview();
  }

  // живая 3D-модель: перестраивается только когда меняется внешний вид (формат, корпус, свитчи, кейкапы)
  const CAPS_THEMES = {
    graphite: {},
    lime: { cap: '#c8ff3d', mod: '#33363d', acc: '#33363d', lg: '#1b2406', lgMod: '#c8ff3d', lgAcc: '#c8ff3d' },
    retro: { cap: '#ece3cc', mod: '#a29d91', acc: '#d0583a', lg: '#4c4537', lgMod: '#2f2b25', lgAcc: '#fff2e6' },
    none: { caps: false }
  };
  const STEMS = { 'lime-linear': '#c8ff3d', 'coral-tactile': '#ff7a59', 'ice-clicky': '#7cc7ff' };
  const WIDTH_UNITS = { 65: 16.6, 75: 17.2, tkl: 19, full: 23.4 };
  let lastKey = '';
  function renderPreview() {
    if (!preview || !kbHolder || !window.KlakKeyboard3) return;
    const format = checked('format').value;
    const caseValue = checked('case').value;
    const caps = checked('caps').value;
    const sw = checked('switch').value;
    const width = kbHolder.closest('.builder__stage').clientWidth || preview.clientWidth;
    const key = [format, caseValue, caps, sw, Math.round(width / 20)].join('|');
    caption.textContent = [checked('format').dataset.label, checked('case').dataset.label.toLowerCase(), checked('switch').dataset.label, caps === 'none' ? 'без кейкапов' : checked('caps').dataset.label].join(' · ');
    if (key === lastKey) return;
    lastKey = key;
    const u = Math.max(9, Math.min(24, Math.floor(width / (WIDTH_UNITS[format] * 1.3))));
    const theme = Object.assign({ u, kh: Math.round(u * 0.36), stem: STEMS[sw] },
      caseValue === 'alu' ? { caseStyle: 'alu', case: '#2b2e33' } : { caseStyle: 'plastic', case: '#26282d' },
      CAPS_THEMES[caps] || {});
    KlakKeyboard3.build(kbHolder, { layout: format, theme });
  }
  if (preview && window.KlakKeyboard3) preview.classList.add('is-live');
  let resizeTimer;
  window.addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(renderPreview, 200); });

  form.addEventListener('change', render);
  $$('[data-builder-step]').forEach((b) => b.addEventListener('click', () => { qtyInput.value = clamp(Number(qtyInput.value) + Number(b.dataset.builderStep)); render(); }));
  qtyInput.addEventListener('input', render);
  qtyInput.addEventListener('blur', () => { qtyInput.value = clamp(qtyInput.value); render(); });

  $('[data-builder-add]').addEventListener('click', () => {
    const { format, unit, options, qty } = read();
    addToCart({
      id: 'custom-build',
      name: `Сборка KLAK ${format.dataset.label}`,
      options,
      price: unit,
      image: format.dataset.image,
      qty
    });
    $('[data-builder-added]').textContent = `Сборка ${format.dataset.label} добавлена в корзину${qty > 1 ? ' × ' + qty : ''}.`;
    showToast('Сборка в корзине');
  });

  render();
}

/* ---------- 9. Формы: модальное окно и валидация ---------- */

const MESSAGES = {
  valueMissing: 'Заполните это поле',
  typeMismatch: { email: 'Введите e-mail в формате name@example.ru' },
  patternMismatch: { tel: 'Введите телефон: от 10 цифр, можно с +, пробелами и скобками' },
  tooShort: (el) => `Минимум ${el.minLength} символа`,
  rangeUnderflow: 'Выберите дату не раньше сегодняшней'
};

function errorText(el) {
  const v = el.validity;
  if (v.valid) return '';
  if (el.type === 'checkbox' && v.valueMissing) return 'Нужно ваше согласие';
  if (el.type === 'radio' && v.valueMissing) return el.dataset.errorMissing || 'Поставьте оценку от 1 до 5';
  if (el.tagName === 'SELECT' && v.valueMissing) return 'Выберите вариант из списка';
  if (v.valueMissing) return MESSAGES.valueMissing;
  if (v.typeMismatch) return MESSAGES.typeMismatch[el.type] || 'Проверьте формат';
  if (v.patternMismatch) return MESSAGES.patternMismatch[el.type] || 'Проверьте формат';
  if (v.tooShort) return MESSAGES.tooShort(el);
  if (v.rangeUnderflow) return MESSAGES.rangeUnderflow;
  if (v.customError) return el.validationMessage;
  return 'Проверьте значение';
}

function validateField(el) {
  const message = errorText(el);
  el.classList.toggle('is-invalid', Boolean(message));
  el.classList.toggle('is-valid', !message && el.type !== 'checkbox' && el.value !== '');
  el.setAttribute('aria-invalid', String(Boolean(message)));
  if (el._proxy) {
    el._proxy.classList.toggle('is-invalid', Boolean(message));
    el._proxy.classList.toggle('is-valid', !message && el.value !== '');
    el._proxy.setAttribute('aria-invalid', String(Boolean(message)));
  }
  // у группы радиокнопок одна общая подпись ошибки, ищем её по имени группы
  const box = el.type === 'radio' ? $(`[data-error-for="${el.name}"]`) : (el.id ? $(`[data-error-for="${el.id}"]`) : null);
  if (box) {
    box.textContent = message;
    box.id = box.id || `${el.id}-error`;
    el.setAttribute('aria-describedby', box.id);
  }
  return !message;
}

function setMinDates() {
  $$('[data-min-today]').forEach((input) => {
    const date = new Date();
    date.setDate(date.getDate() + Number(input.dataset.minToday || 0));
    const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    input.min = local.toISOString().slice(0, 10);
  });
}

function initForms() {
  setMinDates();
  $$('form[data-validate]').forEach((form) => {
    const fields = $$('input:not([type="hidden"]), select, textarea', form).filter((el) => el.willValidate);
    fields.forEach((el) => {
      el.addEventListener('blur', () => { if (el.value !== '' || el.dataset.touched) validateField(el); el.dataset.touched = '1'; });
      el.addEventListener('input', () => { if (el.dataset.touched) validateField(el); });
      el.addEventListener('change', () => {
        if (el.type === 'radio') { fields.filter((f) => f.name === el.name).forEach(validateField); return; }
        if (el.type === 'checkbox' || el.tagName === 'SELECT' || el.type === 'date') validateField(el);
      });
    });

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (form.dataset.orderForm !== undefined && !beforeOrderSubmit(form)) return;
      // радиогруппу проверяем один раз (по первой кнопке), иначе ошибка мигает
      const checked = new Set();
      const results = fields.map((el) => {
        if (el.type !== 'radio') return validateField(el);
        if (checked.has(el.name)) return true;
        checked.add(el.name);
        return validateField(el);
      });
      const firstInvalid = fields[results.indexOf(false)];
      const success = $('.success-message', form);
      if (firstInvalid) {
        firstInvalid.focus();
        if (success) success.hidden = true;
        return;
      }
      // backend пока не подключён: показываем сообщение и очищаем форму
      if (form.dataset.orderForm !== undefined) afterOrderSubmit(form);
      if (form.dataset.reviewForm !== undefined) saveReview(new FormData(form));
      form.reset();
      fields.forEach((el) => {
        el.classList.remove('is-valid', 'is-invalid');
        if (el._proxy) el._proxy.classList.remove('is-valid', 'is-invalid');
        delete el.dataset.touched;
      });
      if (success) success.hidden = false;
      showToast('Форма успешно отправлена!');
      const dialog = form.closest('dialog');
      if (dialog) setTimeout(() => { if (dialog.open) dialog.close(); if (success) success.hidden = true; }, 2600);
    });
  });
}

function initOrderDialog() {
  const dialog = $('#order-dialog');
  if (!dialog) return;
  const productField = $('[data-dialog-product]', dialog);
  const topic = $('#dialog-topic', dialog);
  const title = $('#order-dialog-title', dialog);

  $$('[data-dialog-open]').forEach((button) => button.addEventListener('click', () => {
    productField.value = button.dataset.product || '';
    title.textContent = button.dataset.topic === 'buy' ? `Купить в один клик: ${button.dataset.product}` : 'Подберём клавиатуру';
    topic.value = button.dataset.topic === 'buy' ? 'buy' : 'podbor';
    if (topic._sync) topic._sync();
    $('.success-message', dialog).hidden = true;
    dialog.showModal();
  }));
  $$('[data-dialog-close]', dialog).forEach((b) => b.addEventListener('click', () => dialog.close()));
  dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
}

/* ---------- 10. Оформление заказа ---------- */

function deliveryCost() {
  const select = $('[data-delivery]');
  const option = select && select.selectedOptions[0];
  return option && option.dataset.cost !== undefined ? Number(option.dataset.cost) : null;
}

function renderOrder() {
  const box = $('[data-order-items]');
  if (!box) return;
  const cart = getCart();
  box.replaceChildren();
  if (!cart.length) {
    const empty = createEl('div', 'cart-empty', 'Корзина пуста. ');
    const link = createEl('a', 'text-link', 'Выбрать товары');
    link.href = 'catalog.html';
    empty.append(link);
    box.append(empty);
  } else {
    cart.forEach((item) => box.append(cartItemElement(item)));
  }
  const subtotal = cartTotal(cart);
  const cost = deliveryCost();
  $('[data-order-subtotal]').textContent = formatPrice(subtotal);
  const mode = $('[data-delivery]').value;
  $('[data-order-delivery]').textContent = cost === null ? 'выберите способ' : mode === 'pickup' ? 'самовывоз, бесплатно' : formatPrice(cost);
  $('[data-order-total]').textContent = formatPrice(subtotal + (cost || 0));
  $('[data-order-cart-field]').value = cart.map((i) => `${i.name} × ${i.qty}`).join('; ');
}

function beforeOrderSubmit(form) {
  if (!getCart().length) {
    showToast('Корзина пуста. Добавьте товары перед оформлением', 'warning');
    return false;
  }
  return true;
}

function afterOrderSubmit(form) {
  const number = 'K-' + String(Date.now()).slice(-6);
  const mode = $('[data-delivery]', form).value;
  const shop = $('input[name="showroom"]:checked', form);
  let text = `Номер заказа ${number}.`;
  if (mode === 'pickup' && shop) {
    const { readyIn } = showroomStock(shop.value);
    text = `Заказ ${number} забронирован в шоуруме «${SHOWROOMS[shop.value]}», бронь до ${dayMonth(addDays(readyIn + 3))}.`;
  } else if (mode === 'point') {
    text = `Номер заказа ${number}. Трек-номер пришлём на e-mail после отправки.`;
  }
  $('[data-order-number]', form).textContent = text;
  saveCart([]);
}

/* наличие товаров корзины в шоуруме: что есть сейчас и когда заказ будет готов */
const SHOWROOMS = { pokrovka: 'Покровка', sokol: 'Сокол' };
const addDays = (days) => { const d = new Date(); d.setDate(d.getDate() + days); return d; };
const dayMonth = (d) => d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });

function showroomStock(shop) {
  const cart = getCart();
  const missing = [];
  let custom = false;
  cart.forEach((item) => {
    if (item.id === 'custom-build') { custom = true; return; }
    const have = (PRODUCTS[item.id].stock || {})[shop] || 0;
    if (have < item.qty) missing.push(item.name);
  });
  const readyIn = missing.length ? 2 : (custom ? 1 : 0);
  return { cart, missing, custom, readyIn };
}

function renderShowrooms() {
  Object.keys(SHOWROOMS).forEach((shop) => {
    const box = $(`[data-stock="${shop}"]`);
    if (!box) return;
    const { cart, missing, custom, readyIn } = showroomStock(shop);
    box.className = 'showroom-option__stock';
    if (!cart.length) { box.textContent = 'Добавьте товары в корзину'; return; }
    const total = cart.filter((i) => i.id !== 'custom-build').length;
    let text;
    if (!missing.length && !custom) { text = 'Всё в наличии · заберёте сегодня'; box.classList.add('is-ok'); }
    else if (!missing.length) { text = 'Сборку подготовим к завтрашнему дню'; box.classList.add('is-ok'); }
    else {
      text = `В наличии ${total - missing.length} из ${total} · остальное привезём за 1–2 дня`;
      box.classList.add('is-partial');
    }
    box.replaceChildren(createEl('span', '', text));
    if (missing.length) box.append(createEl('span', 'showroom-option__missing', 'Под заказ: ' + missing.join(', ')));
    box.dataset.ready = readyIn;
  });
  const chosen = $('input[name="showroom"]:checked');
  const note = $('[data-reserve-note]');
  if (note) {
    if (chosen && getCart().length) {
      const { readyIn } = showroomStock(chosen.value);
      const ready = addDays(readyIn);
      note.textContent = `${readyIn ? 'Заказ будет готов ' + dayMonth(ready) : 'Заказ можно забрать сегодня'}, бронь держим до ${dayMonth(addDays(readyIn + 3))} включительно. Оплата при получении.`;
    } else {
      note.textContent = 'Бронь держим 3 дня после того, как заказ будет готов. Оплата при получении.';
    }
  }
}

function initOrderPage() {
  const form = $('[data-order-form]');
  if (!form) return;
  const delivery = $('[data-delivery]');
  const panels = $$('[data-delivery-panel]', form);

  // показываем блок выбранного способа; поля скрытых блоков отключаем, чтобы они не проверялись и не отправлялись
  const syncDelivery = () => {
    const mode = delivery.value || 'none';
    panels.forEach((panel) => {
      const active = panel.dataset.deliveryPanel === mode;
      panel.hidden = !active;
      $$('input, select, textarea', panel).forEach((field) => {
        field.disabled = !active;
        if (field._proxy) field._proxy.disabled = !active;
        if (!active) {
          field.classList.remove('is-invalid', 'is-valid');
          if (field._proxy) field._proxy.classList.remove('is-invalid', 'is-valid');
          const box = $(`[data-error-for="${field.type === 'radio' ? field.name : field.id}"]`);
          if (box) box.textContent = '';
        }
      });
    });
    renderShowrooms();
  };
  delivery.addEventListener('change', () => { syncDelivery(); renderOrder(); });
  form.addEventListener('change', (event) => { if (event.target.name === 'showroom') renderShowrooms(); });
  form.addEventListener('reset', () => setTimeout(() => { syncDelivery(); renderOrder(); }));
  syncDelivery();
  document.addEventListener('cart:change', () => { renderOrder(); renderShowrooms(); });
  renderOrder();
}


/* ---------- Первый экран: 3D-клавиатура и печатающийся заголовок ---------- */

// русские буквы → клавиши латинской раскладки (ЙЦУКЕН)
const RU_TO_KEY = { 'й': 'q', 'ц': 'w', 'у': 'e', 'к': 'r', 'е': 't', 'н': 'y', 'г': 'u', 'ш': 'i', 'щ': 'o', 'з': 'p', 'х': '[', 'ъ': ']', 'ф': 'a', 'ы': 's', 'в': 'd', 'а': 'f', 'п': 'g', 'р': 'h', 'о': 'j', 'л': 'k', 'д': 'l', 'ж': ';', 'э': "'", 'я': 'z', 'ч': 'x', 'с': 'c', 'м': 'v', 'и': 'b', 'т': 'n', 'ь': 'm', 'б': ',', 'ю': '.', 'ё': '~', '.': '/', ',': '/' };
const HERO_PHRASES = [['Печатай со ', 'щелчком.'], ['Собери ', 'свою.'], ['Звучи ', 'громче.'], ['Тихо. ', 'Мягко.']];

function initHero() {
  const scene = $('[data-hero-scene]');
  const holder = $('[data-hero-keyboard]');
  const stage = $('.hero__stage');
  if (!scene || !holder || !stage || !window.KlakKeyboard3) return;

  // размер клавиши считаем от ширины блока, чтобы клавиатура помещалась на любом экране
  let keys = [];
  let builtFor = 0;
  const build = () => {
    scene.classList.add('is-3d');
    const width = stage.clientWidth;
    if (!width || Math.abs(width - builtFor) < 24) return;
    builtFor = width;
    const u = Math.max(12, Math.min(34, Math.round(width / 18.5)));
    KlakKeyboard3.build(holder, { theme: { u, kh: Math.round(u * 0.36) } });
    holder.classList.add('hero__keyboard');
    keys = $$('.k3', holder);
  };
  build();
  let resizeTimer;
  window.addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(build, 200); });

  const typingEl = $('[data-typing]');
  if (!typingEl || reduceMotion()) return; // без анимаций: статичная клавиатура и заголовок

  const keyBy = (label) => keys.find((k) => k.dataset.label === label);
  const spaceKey = () => keys.find((k) => k.dataset.label === '' && k.classList.contains('k3--acc'));
  const press = (key, ms = 110, glow = true) => {
    if (!key) return;
    key.classList.add('is-pressed');
    if (glow) key.classList.add('is-lit');
    setTimeout(() => key.classList.remove('is-pressed'), ms);
    if (glow) setTimeout(() => key.classList.remove('is-lit'), ms + 240);
  };
  const render = (a, b, n) => {
    const shown = (a + b).slice(0, n);
    typingEl.replaceChildren(shown.slice(0, a.length));
    if (shown.length > a.length) typingEl.append(createEl('span', 'hero__accent', shown.slice(a.length)));
    typingEl.append(createEl('span', 'hero__caret'));
  };

  // анимация идёт, только когда первый экран виден и вкладка активна
  let visible = true;
  let timer = null;
  let phrase = 0;
  let n = HERO_PHRASES[0].join('').length;
  let mode = 'wait';
  const tick = () => {
    timer = null;
    if (!visible || document.hidden) return;
    const [a, b] = HERO_PHRASES[phrase % HERO_PHRASES.length];
    const text = a + b;
    let delay;
    if (mode === 'wait') {
      mode = 'erase';
      delay = 1800;
    } else if (mode === 'erase') {
      if (n > 0) { n -= 1; render(a, b, n); press(keyBy('⌫'), 60); delay = 35; }
      else { phrase += 1; mode = 'type'; delay = 380; }
    } else {
      n += 1;
      render(a, b, n);
      const raw = text[n - 1];
      const ch = raw.toLowerCase();
      press(ch === ' ' ? spaceKey() : keyBy(RU_TO_KEY[ch] || ch));
      if (raw !== ch) press(keyBy('shift'), 170, false);
      delay = 70 + Math.random() * 90;
      if (n >= text.length) mode = 'wait';
    }
    timer = setTimeout(tick, delay);
  };
  const resume = () => { if (!timer && visible && !document.hidden) timer = setTimeout(tick, 300); };

  render(HERO_PHRASES[0][0], HERO_PHRASES[0][1], n);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; resume(); }).observe(scene);
  }
  document.addEventListener('visibilitychange', resume);
  resume();
}


/* ---------- Отзывы покупателей (страница «О нас») ---------- */

const REVIEWS_KEY = 'klak-reviews';

function reviewCard(r) {
  const card = createEl('article', 'review-card review-card--new');
  const head = createEl('header', 'review-card__head');
  const initials = r.name.split(/\s+/).map((w) => w[0]).join('').slice(0, 2).toUpperCase();
  head.append(createEl('span', 'review-card__avatar', initials));
  const who = createEl('div');
  who.append(createEl('p', 'review-card__name', r.name), createEl('p', 'review-card__meta', `${r.product} · ${r.date}`));
  const stars = createEl('p', 'review-card__stars', '★'.repeat(r.rating) + '☆'.repeat(5 - r.rating));
  stars.setAttribute('aria-label', `Оценка ${r.rating} из 5`);
  head.append(who, stars);
  card.append(head, createEl('p', 'review-card__text', r.text));
  return card;
}

function saveReview(data) {
  const review = {
    name: String(data.get('name') || '').trim().slice(0, 40),
    product: String(data.get('product') || ''),
    rating: Math.min(Math.max(Number(data.get('rating')) || 5, 1), 5),
    text: String(data.get('text') || '').trim().slice(0, 800),
    date: new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })
  };
  const list = readList(REVIEWS_KEY);
  list.unshift(review);
  saveList(REVIEWS_KEY, list.slice(0, 20));
  const box = $('[data-review-list]');
  if (box) box.prepend(reviewCard(review));
}

function initReviews() {
  const box = $('[data-review-list]');
  if (!box) return;
  // сохранённые отзывы этого браузера показываем первыми
  readList(REVIEWS_KEY).slice().reverse().forEach((r) => {
    if (r && r.name && r.text) box.prepend(reviewCard({ ...r, rating: Math.min(Math.max(Number(r.rating) || 5, 1), 5) }));
  });
}


/* ---------- Выпадающие списки и календарь в стиле сайта ----------
   Нативные <select> и <input type="date"> остаются в разметке (скрыты): через них отправляется
   форма и работает валидация. Поверх строим свои кнопку и всплывающее окно. */

const SUPPORTS_POPOVER = typeof HTMLElement !== 'undefined' && HTMLElement.prototype.hasOwnProperty('popover');
const CHEVRON = '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';
const CALENDAR_ICON = '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/></svg>';
let popupSeq = 0;

// всплывающее окно: в верхнем слое (popover), чтобы его не обрезали модалка и overflow
function showPopup(pop, anchor) {
  pop.hidden = false;
  if (SUPPORTS_POPOVER && !pop.matches(':popover-open')) pop.showPopover();
  placePopup(pop, anchor);
}

function hidePopup(pop) {
  if (SUPPORTS_POPOVER && pop.matches(':popover-open')) pop.hidePopover();
  pop.hidden = true;
}

function placePopup(pop, anchor) {
  const r = anchor.getBoundingClientRect();
  pop.style.minWidth = r.width + 'px';
  const h = pop.offsetHeight, w = pop.offsetWidth;
  let top = r.bottom + 6;
  if (top + h > window.innerHeight - 8 && r.top - h - 6 > 8) top = r.top - h - 6; // не влезает снизу, открываем вверх
  const left = Math.min(Math.max(8, r.left), window.innerWidth - w - 8);
  pop.style.top = Math.max(8, top) + 'px';
  pop.style.left = left + 'px';
}

function linkProxy(native, proxy) {
  native._proxy = proxy;
  native.tabIndex = -1;
  native.setAttribute('aria-hidden', 'true');
  native.addEventListener('focus', () => proxy.focus()); // клик по label и фокус при ошибке переходят на нашу кнопку
  const label = native.id && document.querySelector(`label[for="${native.id}"]`);
  if (label) {
    label.id = label.id || native.id + '-label';
    proxy.setAttribute('aria-labelledby', `${label.id} ${proxy.id}`);
  }
}

/* --- список --- */
function enhanceSelect(select) {
  const id = 'cs' + (++popupSeq);
  const wrap = createEl('div', 'cselect');
  select.before(wrap);
  wrap.append(select);
  select.classList.add('cselect__native');

  const button = createEl('button', select.className.replace('cselect__native', '').trim() + ' cselect__button');
  button.type = 'button';
  button.id = id + '-btn';
  button.setAttribute('aria-haspopup', 'listbox');
  button.setAttribute('aria-expanded', 'false');
  button.setAttribute('aria-controls', id + '-list');
  const value = createEl('span', 'cselect__value');
  button.append(value);
  button.insertAdjacentHTML('beforeend', CHEVRON);

  const list = createEl('ul', 'cselect__list popup');
  list.id = id + '-list';
  list.setAttribute('role', 'listbox');
  list.tabIndex = -1;
  list.hidden = true;
  if (SUPPORTS_POPOVER) list.popover = 'manual';

  const options = [...select.options].filter((o) => o.value !== '');
  const items = options.map((o, i) => {
    const li = createEl('li', 'cselect__option', o.textContent);
    li.id = `${id}-o${i}`;
    li.setAttribute('role', 'option');
    li.addEventListener('pointerdown', (e) => e.preventDefault());
    li.addEventListener('click', () => choose(i));
    li.addEventListener('pointermove', () => setActive(i));
    return li;
  });
  list.append(...items);
  wrap.append(button, list);
  linkProxy(select, button);

  let active = -1;
  let typed = '', typedTimer;
  const isOpen = () => button.getAttribute('aria-expanded') === 'true';

  function sync() {
    const opt = select.selectedOptions[0];
    const empty = !select.value;
    value.textContent = opt ? opt.textContent : '';
    button.classList.toggle('is-placeholder', empty);
    items.forEach((li, i) => li.setAttribute('aria-selected', String(options[i].value === select.value && !empty)));
  }
  function setActive(i) {
    active = Math.max(0, Math.min(items.length - 1, i));
    items.forEach((li, k) => li.classList.toggle('is-active', k === active));
    list.setAttribute('aria-activedescendant', items[active].id);
    items[active].scrollIntoView({ block: 'nearest' });
  }
  function open() {
    if (isOpen()) return;
    closeAllPopups(list);
    button.setAttribute('aria-expanded', 'true');
    wrap.classList.add('is-open');
    showPopup(list, button);
    setActive(Math.max(0, options.findIndex((o) => o.value === select.value)));
    list.focus({ preventScroll: true });
  }
  function close(focusButton = true) {
    if (!isOpen()) return;
    button.setAttribute('aria-expanded', 'false');
    wrap.classList.remove('is-open');
    hidePopup(list);
    if (focusButton) button.focus({ preventScroll: true });
  }
  function choose(i) {
    const changed = select.value !== options[i].value;
    select.value = options[i].value;
    sync();
    close();
    if (changed) {
      select.dispatchEvent(new Event('input', { bubbles: true }));
      select.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }

  button.addEventListener('click', () => (isOpen() ? close() : open()));
  button.addEventListener('keydown', (e) => {
    if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) { e.preventDefault(); open(); }
  });
  list.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive(active + 1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(active - 1); }
    else if (e.key === 'Home') { e.preventDefault(); setActive(0); }
    else if (e.key === 'End') { e.preventDefault(); setActive(items.length - 1); }
    else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); choose(active); }
    else if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); close(); }
    else if (e.key === 'Tab') { close(false); }
    else if (e.key.length === 1) {
      // поиск по первым буквам
      clearTimeout(typedTimer);
      typed += e.key.toLowerCase();
      typedTimer = setTimeout(() => { typed = ''; }, 600);
      const found = options.findIndex((o) => o.textContent.toLowerCase().startsWith(typed));
      if (found !== -1) setActive(found);
    }
  });
  list.addEventListener('focusout', (e) => { if (!wrap.contains(e.relatedTarget) && e.relatedTarget !== button) close(false); });
  select.addEventListener('change', sync);
  if (select.form) select.form.addEventListener('reset', () => setTimeout(sync));
  list._close = () => close(false);
  list._anchor = button;
  select._sync = sync;
  sync();
}

/* --- календарь --- */
const MONTHS = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
const MONTHS_GEN = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
const WEEKDAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
const toISO = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const fromISO = (s) => { const [y, m, d] = String(s).split('-').map(Number); return y ? new Date(y, m - 1, d) : null; };
const sameDay = (a, b) => a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

function enhanceDate(input) {
  const id = 'cd' + (++popupSeq);
  const wrap = createEl('div', 'cdate');
  input.before(wrap);
  wrap.append(input);
  input.classList.add('cdate__native');

  const button = createEl('button', 'order-form__input cdate__button');
  button.type = 'button';
  button.id = id + '-btn';
  button.setAttribute('aria-haspopup', 'dialog');
  button.setAttribute('aria-expanded', 'false');
  const value = createEl('span', 'cdate__value');
  button.append(value);
  button.insertAdjacentHTML('beforeend', CALENDAR_ICON);

  const pop = createEl('div', 'cdate__pop popup');
  pop.id = id + '-pop';
  pop.setAttribute('role', 'dialog');
  pop.setAttribute('aria-label', 'Выбор даты');
  pop.hidden = true;
  if (SUPPORTS_POPOVER) pop.popover = 'manual';
  const head = createEl('div', 'cdate__head');
  const prev = createEl('button', 'cdate__nav');
  prev.type = 'button'; prev.setAttribute('aria-label', 'Предыдущий месяц'); prev.innerHTML = CHEVRON;
  const title = createEl('p', 'cdate__title');
  title.setAttribute('aria-live', 'polite');
  const next = createEl('button', 'cdate__nav cdate__nav--next');
  next.type = 'button'; next.setAttribute('aria-label', 'Следующий месяц'); next.innerHTML = CHEVRON;
  head.append(prev, title, next);
  const week = createEl('div', 'cdate__week');
  WEEKDAYS.forEach((w, i) => week.append(createEl('span', i > 4 ? 'is-weekend' : '', w)));
  const grid = createEl('div', 'cdate__grid');
  grid.setAttribute('role', 'grid');
  const foot = createEl('div', 'cdate__foot');
  const todayBtn = createEl('button', 'cdate__link', 'Сегодня');
  todayBtn.type = 'button';
  const clearBtn = createEl('button', 'cdate__link cdate__link--muted', 'Очистить');
  clearBtn.type = 'button';
  foot.append(clearBtn, todayBtn);
  pop.append(head, week, grid, foot);
  wrap.append(button, pop);
  linkProxy(input, button);

  let view = new Date();
  let focusDate = null;
  const minDate = () => fromISO(input.min);
  const isDisabled = (d) => { const m = minDate(); return m && d < m; };
  const isOpen = () => button.getAttribute('aria-expanded') === 'true';

  function sync() {
    const d = fromISO(input.value);
    value.textContent = d ? `${d.getDate()} ${MONTHS_GEN[d.getMonth()]} ${d.getFullYear()}` : 'Выберите дату';
    button.classList.toggle('is-placeholder', !d);
  }

  function render() {
    const y = view.getFullYear(), m = view.getMonth();
    title.textContent = `${MONTHS[m]} ${y}`;
    const first = new Date(y, m, 1);
    const shift = (first.getDay() + 6) % 7; // неделя с понедельника
    const start = new Date(y, m, 1 - shift);
    const selected = fromISO(input.value);
    const today = new Date();
    const min = minDate();
    prev.disabled = !!(min && new Date(y, m, 0) < min);
    grid.replaceChildren();
    for (let i = 0; i < 42; i++) {
      const d = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i);
      const b = createEl('button', 'cdate__day', String(d.getDate()));
      b.type = 'button';
      b.dataset.date = toISO(d);
      b.setAttribute('aria-label', `${d.getDate()} ${MONTHS_GEN[d.getMonth()]} ${d.getFullYear()}`);
      if (d.getMonth() !== m) b.classList.add('is-outside');
      if ((d.getDay() + 6) % 7 > 4) b.classList.add('is-weekend');
      if (sameDay(d, today)) b.classList.add('is-today');
      if (sameDay(d, selected)) { b.classList.add('is-selected'); b.setAttribute('aria-pressed', 'true'); }
      if (isDisabled(d)) b.disabled = true;
      b.tabIndex = sameDay(d, focusDate) ? 0 : -1;
      b.addEventListener('click', () => choose(d));
      grid.append(b);
    }
    todayBtn.disabled = isDisabled(new Date(today.getFullYear(), today.getMonth(), today.getDate()));
  }

  function moveFocus(d) {
    if (isDisabled(d)) return;
    focusDate = d;
    if (d.getMonth() !== view.getMonth() || d.getFullYear() !== view.getFullYear()) view = new Date(d.getFullYear(), d.getMonth(), 1);
    render();
    const b = grid.querySelector(`[data-date="${toISO(d)}"]`);
    if (b) b.focus({ preventScroll: true });
  }

  function open() {
    if (isOpen()) return;
    closeAllPopups(pop);
    const base = fromISO(input.value) || minDate() || new Date();
    view = new Date(base.getFullYear(), base.getMonth(), 1);
    focusDate = new Date(base.getFullYear(), base.getMonth(), base.getDate());
    render();
    button.setAttribute('aria-expanded', 'true');
    wrap.classList.add('is-open');
    showPopup(pop, button);
    moveFocus(focusDate);
  }
  function close(focusButton = true) {
    if (!isOpen()) return;
    button.setAttribute('aria-expanded', 'false');
    wrap.classList.remove('is-open');
    hidePopup(pop);
    if (focusButton) button.focus({ preventScroll: true });
  }
  function choose(d) {
    input.value = d ? toISO(d) : '';
    sync();
    close();
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
  }

  button.addEventListener('click', () => (isOpen() ? close() : open()));
  button.addEventListener('keydown', (e) => { if (e.key === 'ArrowDown') { e.preventDefault(); open(); } });
  prev.addEventListener('click', () => { view = new Date(view.getFullYear(), view.getMonth() - 1, 1); render(); });
  next.addEventListener('click', () => { view = new Date(view.getFullYear(), view.getMonth() + 1, 1); render(); });
  todayBtn.addEventListener('click', () => { const t = new Date(); choose(new Date(t.getFullYear(), t.getMonth(), t.getDate())); });
  clearBtn.addEventListener('click', () => choose(null));
  pop.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); close(); return; }
    const day = e.target.closest('.cdate__day');
    if (!day) return;
    const d = fromISO(day.dataset.date);
    const step = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 }[e.key];
    if (step) { e.preventDefault(); moveFocus(new Date(d.getFullYear(), d.getMonth(), d.getDate() + step)); }
    else if (e.key === 'PageUp') { e.preventDefault(); moveFocus(new Date(d.getFullYear(), d.getMonth() - 1, d.getDate())); }
    else if (e.key === 'PageDown') { e.preventDefault(); moveFocus(new Date(d.getFullYear(), d.getMonth() + 1, d.getDate())); }
    else if (e.key === 'Home') { e.preventDefault(); moveFocus(new Date(d.getFullYear(), d.getMonth(), d.getDate() - ((d.getDay() + 6) % 7))); }
    else if (e.key === 'End') { e.preventDefault(); moveFocus(new Date(d.getFullYear(), d.getMonth(), d.getDate() + (6 - (d.getDay() + 6) % 7))); }
  });
  pop.addEventListener('focusout', (e) => { if (!pop.contains(e.relatedTarget) && e.relatedTarget !== button) close(false); });
  if (input.form) input.form.addEventListener('reset', () => setTimeout(sync));
  input.addEventListener('change', sync);
  pop._close = () => close(false);
  pop._anchor = button;
  sync();
}

function closeAllPopups(except) {
  $$('.popup').forEach((p) => { if (p !== except && !p.hidden && p._close) p._close(); });
}

function initPopups() {
  $$('select.order-form__input, select.catalog-filters__select').forEach(enhanceSelect);
  $$('input[type="date"].order-form__input').forEach(enhanceDate);
  // клик мимо закрывает, прокрутка и ресайз переставляют окно рядом с полем
  document.addEventListener('pointerdown', (e) => {
    if (!e.target.closest('.cselect, .cdate, .popup')) closeAllPopups();
  });
  const reposition = () => $$('.popup').forEach((p) => { if (!p.hidden && p._anchor) placePopup(p, p._anchor); });
  window.addEventListener('scroll', reposition, { passive: true, capture: true });
  window.addEventListener('resize', reposition);
  $$('dialog').forEach((d) => d.addEventListener('close', () => closeAllPopups()));
}

/* ---------- запуск ---------- */

document.addEventListener('DOMContentLoaded', () => {
  initMenu();
  initToTop();
  initHero();
  initCardButtons();
  initCartDrawer();
  initCompareDialog();
  initProductPage();
  initCatalog();
  initBuilder();
  initOrderDialog();
  initForms();
  initPopups();
  initOrderPage();
  initReviews();
  renderCart();
  renderFavorites();
  renderCompare();
});

// синхронизация между вкладками
window.addEventListener('storage', (event) => {
  if (event.key === STORAGE.cart) renderCart();
  if (event.key === STORAGE.favorites) renderFavorites();
  if (event.key === STORAGE.compare) renderCompare();
});
