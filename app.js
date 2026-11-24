(function () {
  "use strict";

  var ALL_ID = "all";
  var tabs = [{ id: ALL_ID, label: "すべて" }].concat(FAQ_CATEGORIES);
  var categoryLabels = {};
  FAQ_CATEGORIES.forEach(function (c) {
    categoryLabels[c.id] = c.label;
  });

  var state = { category: ALL_ID, query: "" };
  var openIds = new Set();

  var tabsEl = document.getElementById("category-tabs");
  var listEl = document.getElementById("faq-list");
  var countEl = document.getElementById("result-count");
  var emptyEl = document.getElementById("empty-message");
  var searchEl = document.getElementById("search-input");
  var themeToggleBtn = document.getElementById("theme-toggle");
  var THEME_STORAGE_KEY = "theme";
  var DARK_THEME = "dark";
  var LIGHT_THEME = "light";

  function applyTheme(theme) {
    if (theme === DARK_THEME) {
      document.documentElement.setAttribute("data-theme", DARK_THEME);
      if (themeToggleBtn) {
        themeToggleBtn.setAttribute("aria-label", "ライトテーマに切り替える");
        var iconEl = themeToggleBtn.querySelector(".theme-toggle-icon");
        var textEl = themeToggleBtn.querySelector(".theme-toggle-text");
        if (iconEl) {
          iconEl.textContent = "☀️";
        }
        if (textEl) {
          textEl.textContent = "ライトテーマ";
        }
      }
    } else {
      document.documentElement.removeAttribute("data-theme");
      if (themeToggleBtn) {
        themeToggleBtn.setAttribute("aria-label", "ダークテーマに切り替える");
        var iconEl = themeToggleBtn.querySelector(".theme-toggle-icon");
        var textEl = themeToggleBtn.querySelector(".theme-toggle-text");
        if (iconEl) {
          iconEl.textContent = "🌙";
        }
        if (textEl) {
          textEl.textContent = "ダークテーマ";
        }
      }
    }
  }

  function initTheme() {
    var savedTheme = null;
    try {
      savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    } catch (e) {
      // localStorageがアクセス不能な環境への考慮
    }
    applyTheme(savedTheme === DARK_THEME ? DARK_THEME : LIGHT_THEME);
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", function () {
      var isDark = document.documentElement.getAttribute("data-theme") === DARK_THEME;
      var nextTheme = isDark ? LIGHT_THEME : DARK_THEME;
      applyTheme(nextTheme);
      try {
        localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
      } catch (e) {
        // localStorage保存失敗への考慮
      }
    });
  }

  // 検索用テキスト(回答のタグを除去し小文字化)を初期化時に一度だけ作る
  var tmp = document.createElement("div");
  var items = FAQ_DATA.map(function (faq) {
    tmp.innerHTML = faq.answer;
    return {
      faq: faq,
      text: (faq.question + " " + tmp.textContent).toLowerCase()
    };
  });

  function matches(item) {
    if (state.category !== ALL_ID && item.faq.category !== state.category) {
      return false;
    }
    return state.query === "" || item.text.indexOf(state.query) !== -1;
  }

  function renderTabs() {
    tabsEl.textContent = "";
    tabs.forEach(function (t) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "tab";
      btn.id = "tab-" + t.id;
      btn.setAttribute("role", "tab");
      btn.setAttribute("aria-selected", String(t.id === state.category));
      btn.setAttribute("aria-controls", "faq-list");
      btn.tabIndex = t.id === state.category ? 0 : -1;
      btn.dataset.id = t.id;
      btn.textContent = t.label;
      tabsEl.appendChild(btn);
    });
    listEl.setAttribute("aria-labelledby", "tab-" + state.category);
  }

  function createItem(faq) {
    var isOpen = openIds.has(faq.id);

    var item = document.createElement("div");
    item.className = "faq-item";

    var heading = document.createElement("h2");
    heading.className = "faq-heading";

    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "faq-question";
    btn.id = "q-" + faq.id;
    btn.setAttribute("aria-expanded", String(isOpen));
    btn.setAttribute("aria-controls", "a-" + faq.id);
    btn.dataset.id = faq.id;

    var body = document.createElement("span");
    body.className = "faq-question-body";
    var cat = document.createElement("span");
    cat.className = "faq-category";
    cat.textContent = categoryLabels[faq.category];
    var q = document.createElement("span");
    q.className = "faq-question-text";
    q.textContent = faq.question;
    body.appendChild(cat);
    body.appendChild(q);

    var icon = document.createElement("span");
    icon.className = "faq-icon";
    icon.setAttribute("aria-hidden", "true");

    btn.appendChild(body);
    btn.appendChild(icon);
    heading.appendChild(btn);

    var answer = document.createElement("div");
    answer.className = "faq-answer";
    answer.id = "a-" + faq.id;
    answer.setAttribute("role", "region");
    answer.setAttribute("aria-labelledby", btn.id);
    answer.hidden = !isOpen;
    // 回答は faq-data.js 内の固定の信頼済みデータ
    answer.innerHTML = faq.answer;

    item.appendChild(heading);
    item.appendChild(answer);
    return item;
  }

  function renderList() {
    var visible = items.filter(matches);
    listEl.textContent = "";
    visible.forEach(function (it) {
      listEl.appendChild(createItem(it.faq));
    });
    countEl.textContent = visible.length + "件のFAQ";
    emptyEl.hidden = visible.length !== 0;
  }

  function selectCategory(id, focus) {
    state.category = id;
    renderTabs();
    renderList();
    if (focus) {
      document.getElementById("tab-" + id).focus();
    }
  }

  tabsEl.addEventListener("click", function (e) {
    var btn = e.target.closest(".tab");
    if (btn) {
      selectCategory(btn.dataset.id, false);
    }
  });

  tabsEl.addEventListener("keydown", function (e) {
    var idx = tabs.findIndex(function (t) {
      return t.id === state.category;
    });
    var next;
    if (e.key === "ArrowRight") {
      next = (idx + 1) % tabs.length;
    } else if (e.key === "ArrowLeft") {
      next = (idx - 1 + tabs.length) % tabs.length;
    } else if (e.key === "Home") {
      next = 0;
    } else if (e.key === "End") {
      next = tabs.length - 1;
    } else {
      return;
    }
    e.preventDefault();
    selectCategory(tabs[next].id, true);
  });

  listEl.addEventListener("click", function (e) {
    var btn = e.target.closest(".faq-question");
    if (!btn) {
      return;
    }
    var id = btn.dataset.id;
    var willOpen = !openIds.has(id);
    if (willOpen) {
      openIds.add(id);
    } else {
      openIds.delete(id);
    }
    btn.setAttribute("aria-expanded", String(willOpen));
    document.getElementById("a-" + id).hidden = !willOpen;
  });

  searchEl.addEventListener("input", function () {
    state.query = searchEl.value.trim().toLowerCase();
    renderList();
  });

  initTheme();
  renderTabs();
  renderList();
})();
