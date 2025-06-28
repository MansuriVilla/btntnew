import { gsap } from "gsap";
import Draggable from "gsap/Draggable";
gsap.registerPlugin(Draggable);

class CustomSlider {
  constructor(container, options) {
    this.container = container;
    this.options = {
      loop: false,
      margin: 0,
      nav: true,
      showTracker: true,
      enableSlider: true,
      drag: false,
      autoplay: false,
      responsive: { 0: { items: 1 } },
      ...options,
    };
    this.track = container.querySelector(".slider-track");
    this.slides = this.track.querySelectorAll(".slide");
    this.prevBtn = container.querySelector(".prev-btn");
    this.nextBtn = container.querySelector(".next-btn");
    this.trackerContainer = container.querySelector(".tracker-container");
    this.trackerThumb = this.trackerContainer
      ? this.trackerContainer.querySelector(".tracker-thumb")
      : null;
    this.currentIndex = 0;
    this.visibleSlides = this.getVisibleSlides();
    this.startX = 0;
    this.currentX = 0;
    this.isDragging = false;
    this.autoplayTimer = null;
    this.lastWidth = this.container.offsetWidth;

    this.container.style.touchAction = "pan-y";

    if (this.options.enableSlider) {
      this.setupSlider();
      this.updateSlider();
      this.initEvents();
      this.initAutoplay();
    } else {
      this.track.style.display = "flex";
      this.track.style.overflow = "visible";
      this.slides.forEach((slide) => {
        slide.style.width = "auto";
      });
    }
  }

  getVisibleSlides() {
    const width = window.innerWidth;
    const responsive = this.options.responsive;
    const breakpoints = Object.keys(responsive)
      .map(Number)
      .sort((a, b) => a - b);
    let items = responsive[breakpoints[0]].items;
    for (let bp of breakpoints) {
      if (width >= bp) {
        items = responsive[bp].items;
      } else {
        break;
      }
    }
    return Math.min(items, this.slides.length);
  }

  setupSlider() {
    const gap = this.options.margin;
    this.track.style.gap = `${gap}px`;
    this.calculateSlideWidth();
    if (!this.options.nav) {
      this.prevBtn.style.display = "none";
      this.nextBtn.style.display = "none";
    }
    if (!this.options.showTracker && this.trackerContainer) {
      this.trackerContainer.style.display = "none";
    }
    if (this.trackerThumb && this.options.showTracker) {
      this.adjustThumbWidth();
    }
  }

  calculateSlideWidth() {
    this.slides.forEach((slide) => {
      slide.style.width = "auto";
      slide.style.minWidth = "0";
    });

    const firstSlideWidth = this.slides[0].getBoundingClientRect().width;
    this.visibleSlides = this.getVisibleSlides();
    const containerWidth = this.container.offsetWidth;
    const gap = this.options.margin;

    if (this.visibleSlides === 1) {
      this.slideWidth = containerWidth;
    } else {
      this.slideWidth = Math.min(
        firstSlideWidth,
        (containerWidth - gap * (this.visibleSlides - 1)) / this.visibleSlides
      );
    }

    this.slides.forEach((slide) => {
      slide.style.width = `${this.slideWidth}px`;
    });

    this.trackWidth =
      this.slideWidth * this.slides.length + gap * (this.slides.length - 1);
    this.track.style.width = `${this.trackWidth}px`;
  }

  adjustThumbWidth() {
    if (this.trackerThumb && this.options.showTracker) {
      const containerWidth = this.container.offsetWidth;
      const totalSlides = this.slides.length;
      const baseThumbWidth = containerWidth / totalSlides;
      const thumbWidth = Math.max(20, baseThumbWidth * 2);
      this.trackerThumb.style.width = `${Math.min(
        thumbWidth,
        containerWidth
      )}px`;
      this.trackerThumb.style.height = "100%";
      this.trackerThumb.style.borderRadius = "0";
    }
  }

  updateSlider() {
    const containerWidth = this.container.offsetWidth;
    const maxOffset = -(this.trackWidth - containerWidth);
    const newX = -this.currentIndex * (this.slideWidth + this.options.margin);
    const distance = Math.abs(this.track._gsap?.x || 0) - Math.abs(newX);
    const duration = Math.min(1.0, Math.abs(distance) / 500 + 0.3);

    gsap.to(this.track, {
      x: Math.max(maxOffset, Math.min(0, newX)),
      duration: duration,
      ease: "linear",
    });

    if (
      this.trackerThumb &&
      this.visibleSlides < this.slides.length &&
      this.options.showTracker
    ) {
      const thumbWidth = this.trackerThumb.offsetWidth;
      const thumbX =
        (this.currentIndex / (this.slides.length - this.visibleSlides)) *
        (containerWidth - thumbWidth);
      gsap.to(this.trackerThumb, {
        x: Math.min(Math.max(0, thumbX), containerWidth - thumbWidth),
        duration: duration,
        ease: "linear",
      });
    }
  }

  initEvents() {
    if (this.prevBtn && this.options.nav) {
      this.prevBtn.addEventListener("click", () => {
        this.stopAutoplay();
        if (this.options.loop) {
          this.currentIndex =
            this.currentIndex > 0
              ? this.currentIndex - 1
              : this.slides.length - this.visibleSlides;
        } else {
          this.currentIndex = Math.max(0, this.currentIndex - 1);
        }
        this.updateSlider();
        if (this.options.autoplay) {
          this.initAutoplay();
        }
      });
    }
    if (this.nextBtn && this.options.nav) {
      this.nextBtn.addEventListener("click", () => {
        this.stopAutoplay();
        const maxIndex = this.slides.length - this.visibleSlides;
        if (this.options.loop) {
          this.currentIndex =
            this.currentIndex < maxIndex ? this.currentIndex + 1 : 0;
        } else {
          this.currentIndex = Math.min(maxIndex, this.currentIndex + 1);
        }
        this.updateSlider();
        if (this.options.autoplay) {
          this.initAutoplay();
        }
      });
    }
    if (
      this.trackerThumb &&
      this.trackerContainer &&
      this.options.showTracker
    ) {
      this.draggable = Draggable.create(this.trackerThumb, {
        type: "x",
        bounds: {
          minX: 0,
          maxX: this.container.offsetWidth - this.trackerThumb.offsetWidth,
        },
        onDrag: () => {
          this.stopAutoplay();
          if (this.visibleSlides < this.slides.length) {
            const containerWidth = this.container.offsetWidth;
            const thumbWidth = this.trackerThumb.offsetWidth;
            const progress =
              Draggable.get(this.trackerThumb).x /
              (containerWidth - thumbWidth);
            this.currentIndex = Math.round(
              progress * (this.slides.length - this.visibleSlides)
            );
            this.currentIndex = Math.max(
              0,
              Math.min(
                this.currentIndex,
                this.slides.length - this.visibleSlides
              )
            );
            this.updateSlider();
          }
        },
      })[0];
    }

    if (this.options.drag && this.options.enableSlider) {
      this.touchStartHandler = (e) => this.handleTouchStart(e);
      this.touchMoveHandler = (e) => this.handleTouchMove(e);
      this.touchEndHandler = () => this.handleTouchEnd();
      this.track.addEventListener("touchstart", this.touchStartHandler, {
        passive: true,
      });
      this.track.addEventListener("touchmove", this.touchMoveHandler, {
        passive: true,
      });
      this.track.addEventListener("touchend", this.touchEndHandler, {
        passive: true,
      });
    }

    this.resizeObserver = new ResizeObserver(() => {
      const newVisibleSlides = this.getVisibleSlides();
      if (
        newVisibleSlides !== this.visibleSlides ||
        this.container.offsetWidth !== this.lastWidth
      ) {
        this.lastWidth = this.container.offsetWidth;
        this.calculateSlideWidth();
        this.adjustThumbWidth();
        this.updateSlider();
      }
    });
    this.resizeObserver.observe(this.container);
  }

  handleTouchStart(e) {
    this.stopAutoplay();
    this.startX = e.touches[0].clientX;
    this.currentX = this.startX;
    this.isDragging = true;
    this.track.style.transition = "none";
  }

  handleTouchMove(e) {
    if (!this.isDragging) return;
    const touchX = e.touches[0].clientX;
    const diffX = touchX - this.currentX;
    this.currentX = touchX;

    const containerWidth = this.container.offsetWidth;
    const currentTranslateX =
      parseFloat(getComputedStyle(this.track).transform.split(",")[4]) || 0;
    const newTranslateX = currentTranslateX + diffX;

    const maxOffset = -(this.trackWidth - containerWidth);
    this.track.style.transform = `translateX(${Math.max(
      maxOffset,
      Math.min(0, newTranslateX)
    )}px)`;
  }

  handleTouchEnd() {
    if (!this.isDragging) return;
    this.isDragging = false;
    this.track.style.transition = "transform 0.5s ease";

    const diffX = this.startX - this.currentX;
    const slideWidthWithGap = this.slideWidth + this.options.margin;
    const draggedSlides = diffX / slideWidthWithGap;

    if (Math.abs(draggedSlides) >= 0.5) {
      this.currentIndex = Math.round(this.currentIndex + draggedSlides);
    } else {
      this.currentIndex = Math.round(this.currentIndex);
    }

    this.currentIndex = Math.max(
      0,
      Math.min(this.currentIndex, this.slides.length - this.visibleSlides)
    );
    this.updateSlider();
    if (this.options.autoplay) {
      this.initAutoplay();
    }
  }

  initAutoplay() {
    if (this.options.autoplay) {
      this.stopAutoplay();
      const delay = this.options.autoplay.delay || 3000;
      this.autoplayTimer = setInterval(() => {
        const maxIndex = this.slides.length - this.visibleSlides;
        if (this.options.loop) {
          this.currentIndex = (this.currentIndex + 1) % (maxIndex + 1);
        } else {
          this.currentIndex = Math.min(maxIndex, this.currentIndex + 1);
        }
        this.updateSlider();
      }, delay);
    }
  }

  stopAutoplay() {
    if (this.autoplayTimer) {
      clearInterval(this.autoplayTimer);
      this.autoplayTimer = null;
    }
  }

  destroy() {
    if (this.autoplayTimer) {
      clearInterval(this.autoplayTimer);
    }
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    if (this.draggable) {
      this.draggable.kill();
    }
    if (this.options.drag && this.options.enableSlider) {
      this.track.removeEventListener("touchstart", this.touchStartHandler);
      this.track.removeEventListener("touchmove", this.touchMoveHandler);
      this.track.removeEventListener("touchend", this.touchEndHandler);
    }
  }
}

export default CustomSlider;
