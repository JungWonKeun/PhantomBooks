document.addEventListener('DOMContentLoaded', async () => {
  // 데이터 먼저 불러오기
  try {
    const response = await fetch('/main');
    if (!response.ok) {
      console.error("Failed to load data");
    }
  } catch (error) {
    console.error("Error loading data:", error);
  }

  // 슬라이더 초기화 함수
  function initializeSlider(sliderId, interval, delay) {
    const slider = {
      init() {
        this.slider = document.getElementById(sliderId);
        this.books = document.querySelectorAll(`#${sliderId} .book`);
        
        if (this.books && this.books.length > 0) {
          this.currentIndex = 0;
          // 첫 번째 책을 활성화
          this.books[0].classList.add('active');
          
          // 자동 슬라이드 시작
          setTimeout(() => {
            this.startAutoSlide(interval);
          }, delay);
        }
      },

      showCurrentBook() {
        if (!this.books || this.books.length === 0) return;
        
        // 모든 책의 active 클래스 제거
        this.books.forEach(book => book.classList.remove('active'));
        
        // 현재 인덱스의 책에 active 클래스 추가
        this.books[this.currentIndex].classList.add('active');
      },

      nextBook() {
        if (!this.books || this.books.length === 0) return;
        
        // 현재 책의 active 클래스 제거
        this.books[this.currentIndex].classList.remove('active');
        
        // 다음 인덱스로 이동
        this.currentIndex = (this.currentIndex + 1) % this.books.length;
        this.showCurrentBook();
      },

      startAutoSlide(interval) {
        if (!this.books || this.books.length <= 1) return;
        setInterval(() => this.nextBook(), interval);
      }
    };

    return slider;
  }

  // 취향별 추천도서 스크롤 기능 (기존 코드 유지)
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
    const todaySlider = initializeSlider('bookSlider', 4000, 0);
    const bestsellerSlider = initializeSlider('bestsellerSlider', 4000, 350);
    const myTypeSlider = initializeSlider('myTypeSlider', 4000, 550);
    
    todaySlider.init();
    bestsellerSlider.init();
    myTypeSlider.init();
    
    recommendationScroller.init();
  } catch (error) {
    console.error("Error initializing components:", error);
  }
});
