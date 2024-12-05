document.addEventListener('DOMContentLoaded', async () => {
  // 슬라이더 초기화 함수
  function initializeSlider(sliderId, interval, delay) {
    const slider = {
      init() {
        this.slider = document.getElementById(sliderId);
        this.books = this.slider.querySelectorAll('.book');
        this.prevBtn = this.slider.querySelector('.prev-btn');
        this.nextBtn = this.slider.querySelector('.next-btn');
        this.currentPageEl = this.slider.querySelector('.current-page');
        this.totalPagesEl = this.slider.querySelector('.total-pages');
        
        // total-pages 업데이트
        if (this.totalPagesEl && this.books) {
          this.totalPagesEl.textContent = `/ ${this.books.length}`;
        }
        
        // 오늘의 추천도서 슬라이더인 경우
        if (sliderId === 'bookSlider') {
          this.sliderTrack = this.slider.querySelector('.slider-track');
          this.currentIndex = 0;
          
          // 첫 번째 책을 마지막에도 복제하여 추가
          if (this.books.length > 0) {
            const firstBookClone = this.books[0].cloneNode(true);
            this.sliderTrack.appendChild(firstBookClone);
          }
          
          this.updateSliderPosition();
        } else {
          if (this.books && this.books.length > 0) {
            this.currentIndex = 0;
            this.books[0].classList.add('active');
          }
        }
        
        if (this.prevBtn && this.nextBtn) {
          this.prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.prevBook();
            // 타이머 재설정
            if (this.autoSlideTimer) {
              clearInterval(this.autoSlideTimer);
              this.startAutoSlide(interval);
            }
          });
          
          this.nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.nextBook();
            // 타이머 재설정
            if (this.autoSlideTimer) {
              clearInterval(this.autoSlideTimer);
              this.startAutoSlide(interval);
            }
          });
        }
        
        setTimeout(() => {
          this.startAutoSlide(interval);
        }, delay);
      },

      updateSliderPosition() {
        if (this.slider.id === 'bookSlider') {
          const offset = -this.currentIndex * 100;
          this.sliderTrack.style.transform = `translateX(${offset}%)`;
        } else {
          this.books.forEach(book => book.classList.remove('active'));
          this.books[this.currentIndex].classList.add('active');
        }
        
        if (this.currentPageEl) {
          this.currentPageEl.textContent = (this.currentIndex % this.books.length) + 1;
        }
      },

      prevBook() {
        if (!this.books || this.books.length === 0) return;
        
        this.currentIndex = (this.currentIndex - 1 + this.books.length) % this.books.length;
        this.updateSliderPosition();
      },

      nextBook() {
        if (!this.books || this.books.length === 0) return;
        
        if (this.slider.id === 'bookSlider') {
          if (this.currentIndex === this.books.length) {
            this.sliderTrack.style.transition = 'none';
            this.currentIndex = 0;
            this.updateSliderPosition();
            
            this.sliderTrack.offsetHeight;
            
            this.sliderTrack.style.transition = 'transform 0.5s ease';
          } else {
            this.currentIndex++;
            this.updateSliderPosition();
          }
        } else {
          this.currentIndex = (this.currentIndex + 1) % this.books.length;
          this.updateSliderPosition();
        }
        
        if (this.currentPageEl) {
          this.currentPageEl.textContent = (this.currentIndex % this.books.length) + 1;
        }
      },

      startAutoSlide(interval) {
        if (!this.books || this.books.length <= 1) return;
        // 기존 타이머가 있다면 제거
        if (this.autoSlideTimer) {
          clearInterval(this.autoSlideTimer);
        }
        // 새로운 타이머 설정
        this.autoSlideTimer = setInterval(() => this.nextBook(), interval);
      }
    };

    return slider;
  }

  // 초기화
  try {
    const bookSliderElement = document.getElementById('bookSlider');
    const bestsellerSliderElement = document.getElementById('bestsellerSlider');
    const myTypeSliderElement = document.getElementById('myTypeSlider');
    
    if (bookSliderElement) {
      const todaySlider = initializeSlider('bookSlider', 5000, 0);
      todaySlider.init();
    }
    
    if (bestsellerSliderElement) {
      const bestsellerSlider = initializeSlider('bestsellerSlider', 5000, 350);
      bestsellerSlider.init();
    }
    
    if (myTypeSliderElement) {
      const myTypeSlider = initializeSlider('myTypeSlider', 5000, 550);
      myTypeSlider.init();
    }
  } catch (error) {
    console.error("Error initializing components:", error);
  }
});
