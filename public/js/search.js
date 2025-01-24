// 添加 Toast 樣式
const style = document.createElement('style');
style.textContent = `
.toast {
 position: fixed;
 top: 20px;
 right: 20px;
 padding: 15px;
 background: #6786AD;
 color: white;
 border-radius: 4px;
 opacity: 0;
 transition: 0.3s;
 z-index: 1000;
}
.toast.show {
 opacity: 1;
}`;
document.head.appendChild(style);

function showToast(message) {
 const toast = document.createElement('div');
 toast.className = 'toast';
 toast.textContent = message;
 document.body.appendChild(toast);
 setTimeout(() => toast.classList.add('show'), 100);
 setTimeout(() => {
   toast.classList.remove('show');
   setTimeout(() => toast.remove(), 300);
 }, 3000);
}

document.addEventListener('DOMContentLoaded', () => {
 const searchInput = document.getElementById('search-input');
 if (searchInput) {
   searchInput.addEventListener('keypress', function(e) {
     if (e.key === 'Enter') {
       e.preventDefault();
       const searchQuery = this.value.trim();
       if (searchQuery) {
         const articles = document.querySelectorAll('article');
         let count = 0;
         
         articles.forEach(article => {
           const text = article.textContent.toLowerCase();
           if (text.includes(searchQuery.toLowerCase())) {
             article.style.display = 'block';
             count++;
           } else {
             article.style.display = 'none';
           }
         });
         
         showToast(count > 0 ? 
           `找到 ${count} 個含「${searchQuery}」的結果` : 
           `沒有找到「${searchQuery}」的相關結果`);
       }
     }
   });
 }
});