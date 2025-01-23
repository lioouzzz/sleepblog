document.addEventListener('DOMContentLoaded', () => {
    // 獲取所有的 "navbar-burger" 元素
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  
    // 檢查是否有 "navbar-burger" 元素
    if ($navbarBurgers.length > 0) {
      // 為每個 "navbar-burger" 添加點擊事件
      $navbarBurgers.forEach(el => {
        el.addEventListener('click', () => {
          // 獲取目標元素的 ID
          const target = el.dataset.target;
          const $target = document.getElementById(target);
  
          // 切換 "is-active" 類
          el.classList.toggle('is-active');
          $target.classList.toggle('is-active');
        });
      });
    }
  });
  