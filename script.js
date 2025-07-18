const galleryItems = document.querySelectorAll('.gallery-item img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const filterButtons = document.querySelectorAll('.filter-btn');

let currentIndex = 0;
let visibleImages = [];

// Open lightbox
galleryItems.forEach((img, index) => {
  img.addEventListener('click', () => {
    visibleImages = [...document.querySelectorAll('.gallery-item:not([style*="display: none"]) img')];
    currentIndex = visibleImages.indexOf(img);
    lightboxImg.src = img.src;
    lightbox.classList.remove('hidden');
  });
});

// Close lightbox
closeBtn.addEventListener('click', () => {
  lightbox.classList.add('hidden');
});

// Navigation
nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % visibleImages.length;
  lightboxImg.src = visibleImages[currentIndex].src;
});

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + visibleImages.length) % visibleImages.length;
  lightboxImg.src = visibleImages[currentIndex].src;
});

// Filter by category
filterButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelector('.filter-btn.active').classList.remove('active');
    btn.classList.add('active');

    const category = btn.getAttribute('data-filter');

    document.querySelectorAll('.gallery-item').forEach((item) => {
      const itemCat = item.getAttribute('data-category');
      item.style.display = (category === 'all' || itemCat === category) ? 'block' : 'none';
    });

    // Also hide section titles that have no visible images under them
    document.querySelectorAll('.section-title').forEach((title) => {
      const section = title.nextElementSibling;
      const visible = [...section.parentNode.querySelectorAll(`[data-category="${category}"]`)]
        .some(item => item.style.display !== 'none');
      title.style.display = (category === 'all' || visible) ? 'block' : 'none';
    });
  });
});
