document.addEventListener('DOMContentLoaded', () => {
    const images = [
        { src: 'mountain_lake.jpeg', category: 'nature', title: 'Mountain Lake' },
        { src: 'serene_waters.jpeg', category: 'nature', title: 'Serene Waters' },
        { src: 'cityscape.jpeg', category: 'city', title: 'Cityscape' },
        { src: 'nightclub.jpg', category: 'city', title: 'Night Life' },
        { src: 'pastel_hues.jpeg', category: 'abstract', title: 'Pastel Hues' },
        { src: 'marble_swirl.jpeg', category: 'abstract', title: 'Marble Swirl' },
        { src: 'forest_path.jpeg', category: 'nature', title: 'Forest Path' },
        { src: 'Metropolis.jpg', category: 'city', title: 'Metropolis' },
    ];

    const gallery = document.getElementById('image-gallery');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    let currentIndex = 0;
    let currentImages = [];

    function displayImages(filter = 'all') {
        gallery.innerHTML = '';
        currentImages = (filter === 'all') ? images : images.filter(img => img.category === filter);
        
        currentImages.forEach((img, index) => {
            const item = document.createElement('div');
            item.classList.add('gallery-item');
            item.innerHTML = `
                <img src="${img.src}" alt="${img.title}">
                <div class="overlay"><span>${img.title}</span></div>
            `;
            item.addEventListener('click', () => openLightbox(index));
            gallery.appendChild(item);
        });
    }

    function openLightbox(index) {
        currentIndex = index;
        lightboxImg.src = currentImages[currentIndex].src;
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    function showNextImage() {
        currentIndex = (currentIndex + 1) % currentImages.length;
        lightboxImg.src = currentImages[currentIndex].src;
    }

    function showPrevImage() {
        currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
        lightboxImg.src = currentImages[currentIndex].src;
    }
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            document.querySelector('.filter-btn.active').classList.remove('active');
            button.classList.add('active');
            displayImages(button.dataset.filter);
        });
    });

    closeBtn.addEventListener('click', closeLightbox);
    nextBtn.addEventListener('click', showNextImage);
    prevBtn.addEventListener('click', showPrevImage);
    
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    
    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'flex') {
            if (e.key === 'ArrowRight') showNextImage();
            if (e.key === 'ArrowLeft') showPrevImage();
            if (e.key === 'Escape') closeLightbox();
        }
    });

    displayImages();
});
