document.addEventListener('DOMContentLoaded', () => {
  // 오늘의 추천 도서 슬라이더
  const bookSlider = {
    init() {
      this.books = document.querySelectorAll(".book");
      // 책이 존재하는지 확인
      if (this.books && this.books.length > 0) {
        this.currentIndex = 0;
        this.showCurrentBook();
        this.startAutoSlide();
      } else {
        console.log("조회되는 책 엄쪄용");
      }
    },

    showCurrentBook() {
      if (!this.books || this.books.length === 0) return;
      
      this.books.forEach((book, index) => {
        if (index === this.currentIndex) {
          book.classList.add("active");
        } else {
          book.classList.remove("active");
        }
      });
    },

    nextBook() {
      if (!this.books || this.books.length === 0) return;
      
      this.currentIndex = (this.currentIndex + 1) % this.books.length;
      this.showCurrentBook();
    },

    startAutoSlide() {
      if (!this.books || this.books.length <= 1) return; // 책이 1개 이하면 슬라이드 불필요
      
      setInterval(() => this.nextBook(), 5000);
    }
  };

  

  // 취향별 추천도서 스크롤 기능
  const recommendationScroller = {
    init() {
      this.container = document.getElementById('scroll-container');
      if (!this.container) {
        console.log("Scroll container not found");
        return;
      }
      
      this.isDragging = false;
      this.startX = 0;
      this.scrollLeft = 0;
      
      this.setupEventListeners();
    },

    setupEventListeners() {
      if (!this.container) return;
      
      this.container.addEventListener('mousedown', (e) => this.startDragging(e));
      this.container.addEventListener('mousemove', (e) => this.drag(e));
      this.container.addEventListener('mouseup', () => this.stopDragging());
      this.container.addEventListener('mouseleave', () => this.stopDragging());
    },

    startDragging(e) {
      this.isDragging = true;
      this.container.classList.add('grabbing');
      this.startX = e.pageX - this.container.offsetLeft;
      this.scrollLeft = this.container.scrollLeft;
    },

    drag(e) {
      if (!this.isDragging) return;
      e.preventDefault();
      const x = e.pageX - this.container.offsetLeft;
      const walk = (x - this.startX) * 2;
      this.container.scrollLeft = this.scrollLeft - walk;
    },

    stopDragging() {
      this.isDragging = false;
      this.container.classList.remove('grabbing');
    }
  };

  // 초기화
  try {
    bookSlider.init();
    recommendationScroller.init();
  } catch (error) {
    console.error("Error initializing components:", error);
  }
});
