
        // Mobile Menu Toggle
        const menuBtn = document.getElementById('menuBtn');
        const mobileMenu = document.getElementById('mobileMenu');
        const menuIcon = document.getElementById('menuIcon');

        menuBtn.addEventListener('click', function () {
            mobileMenu.classList.toggle('active');

            // Toggle menu icon
            if (mobileMenu.classList.contains('active')) {
                menuIcon.innerHTML = '<path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>';
            } else {
                menuIcon.innerHTML = '<path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>';
            }
        });

        // Close mobile menu when clicking on a link
        function closeMobileMenu() {
            mobileMenu.classList.remove('active');
            menuIcon.innerHTML = '<path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>';
        }

        // Handle navigation clicks
        function openShop() {
            console.log('Shop clicked');
            closeMobileMenu();
        }

        // Handle Shop Now button
        function handleShopNow() {
            console.log('Shop Now clicked');
            // Add your shop navigation logic here
        }

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href !== '#') {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });

        // Close mobile menu when window is resized
        window.addEventListener('resize', function () {
            if (window.innerWidth >= 1024) {
                closeMobileMenu();
            }
        });

        // Animated Counter for Stats
        function animateCounter(element, target, duration = 2000) {
            let current = 0;
            const increment = target / (duration / 16); // 60fps
            const suffix = element.getAttribute('data-suffix') || '';

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                element.textContent = Math.floor(current) + suffix;
            }, 16);
        }

        // Intersection Observer for triggering animation when in view
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                    const statNumbers = entry.target.querySelectorAll('.stat-number');
                    statNumbers.forEach(stat => {
                        const target = parseInt(stat.getAttribute('data-target'));
                        animateCounter(stat, target);
                        stat.classList.add('animated');
                    });
                }
            });
        }, observerOptions);

        // Observe stats container when DOM is loaded
        window.addEventListener('load', () => {
            const statsContainer = document.querySelector('.stats-container');
            if (statsContainer) {
                observer.observe(statsContainer);
            }
        });

        // Stats Counter Section - Animated Counter
        function animateStatsCounter(element, target, duration = 2000) {
            let startTime = null;
            const suffix = element.getAttribute('data-suffix') || '';

            function easeOutQuart(t) {
                return 1 - Math.pow(1 - t, 4);
            }

            function animate(currentTime) {
                if (!startTime) startTime = currentTime;
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easedProgress = easeOutQuart(progress);
                const currentValue = Math.floor(easedProgress * target);

                element.textContent = currentValue + suffix;

                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    element.textContent = target + suffix;
                }
            }

            requestAnimationFrame(animate);
        }

        // Intersection Observer for Stats Counter Section
        const statsCounterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counter-animated')) {
                    entry.target.classList.add('counter-animated');
                    const counterNumbers = entry.target.querySelectorAll('.stats-counter-number');
                    counterNumbers.forEach((counter, index) => {
                        const target = parseInt(counter.getAttribute('data-target'));
                        // Stagger the animations slightly
                        setTimeout(() => {
                            animateStatsCounter(counter, target, 7000);
                        }, index * 100);
                    });
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '0px'
        });

        // Observe stats section when DOM is loaded
        window.addEventListener('load', () => {
            const statsSection = document.querySelector('.stats-section');
            if (statsSection) {
                statsCounterObserver.observe(statsSection);
            }
        });

        // Accordion functionality
        document.querySelectorAll('.accordion-header').forEach(header => {
            header.addEventListener('click', function() {
                const accordionItem = this.parentElement;
                const isActive = accordionItem.classList.contains('active');

                // Close all accordion items
                document.querySelectorAll('.accordion-item').forEach(item => {
                    item.classList.remove('active');
                    item.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
                });

                // If the clicked item wasn't active, open it
                if (!isActive) {
                    accordionItem.classList.add('active');
                    this.setAttribute('aria-expanded', 'true');
                }
            });
        });

        // Product Gallery and Subscription Selection

         $(document).ready(function () {
            // Gallery images
            const galleryImages = [
                'assets/images/perfume1.webp',
                'assets/images/perfume2.webp',
                'assets/images/perfume3.webp',
                'assets/images/perfume4.webp',
                'assets/images/perfume5.webp'
            ];

            let currentImageIndex = 0;

            showImage(0);

            // Initialize gallery
            function initGallery() {
                // Create dots
                galleryImages.forEach((img, index) => {
                    const dot = $('<span class="dot"></span>');
                    if (index === 0) dot.addClass('active');
                    dot.on('click', () => showImage(index));
                    $('#galleryDots').append(dot);
                });

                // Create thumbnails
                galleryImages.forEach((img, index) => {
                    const thumbnail = $(`
                        <div class="thumbnail ${index === 0 ? 'active' : ''}">
                            <img src="${img}" alt="Thumbnail ${index + 1}">
                        </div>
                    `);
                    thumbnail.on('click', () => showImage(index));
                    $('#thumbnailGrid').append(thumbnail);
                });
            }

            // Show specific image
            function showImage(index) {
                currentImageIndex = index;
                $('#mainImage').attr('src', galleryImages[index]);

                // Update dots
                $('.dot').removeClass('active');
                $('.dot').eq(index).addClass('active');

                // Update thumbnails
                $('.thumbnail').removeClass('active');
                $('.thumbnail').eq(index).addClass('active');
            }

            // Previous button
            $('#prevBtn').on('click', function () {
                currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
                showImage(currentImageIndex);
            });

            // Next button
            $('#nextBtn').on('click', function () {
                currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
                showImage(currentImageIndex);
            });

            // Function to toggle fragrance selectors visibility
            function toggleFragranceSelectors(animate = true) {
                const subscription = $('input[name="subscription"]:checked').val();
                const duration = animate ? 300 : 0;

                if (subscription === 'single') {
                    // Show single subscription fragrance selector
                    $('.subscription-option[data-subscription="single"] .fragrance-selector').slideDown(duration);
                    $('.subscription-option[data-subscription="single"] .includes-section').slideDown(duration);
                    // Hide double subscription fragrance selector
                    $('.subscription-option[data-subscription="double"] .fragrance-selector').slideUp(duration);
                    $('.subscription-option[data-subscription="double"] .includes-section').slideUp(duration);
                } else if (subscription === 'double') {
                    // Hide single subscription fragrance selector
                    $('.subscription-option[data-subscription="single"] .fragrance-selector').slideUp(duration);
                    $('.subscription-option[data-subscription="single"] .includes-section').slideUp(duration);
                    // Show double subscription fragrance selector
                    $('.subscription-option[data-subscription="double"] .fragrance-selector').slideDown(duration);
                    $('.subscription-option[data-subscription="double"] .includes-section').slideDown(duration);
                }
            }

            // Subscription selection
            $('.subscription-option').on('click', function () {
                const $this = $(this);
                $('.subscription-option').removeClass('selected');
                $this.addClass('selected');
                $this.find('input[name="subscription"]').prop('checked', true);
                toggleFragranceSelectors();
            });

            // Fragrance selection
            $('.fragrance-option').on('click', function () {
                const $this = $(this);
                const parentSelector = $this.closest('.fragrance-selector');

                // Remove selection from siblings only
                parentSelector.find('.fragrance-option').removeClass('selected');
                $this.addClass('selected');
                $this.find('input[type="radio"]').prop('checked', true);
            });

            // Initialize
            initGallery();
            toggleFragranceSelectors(false);

            // Add to cart button click handler (for demonstration)
            $('#addToCartBtn').on('click', function (e) {
                e.preventDefault();

                // Generate cart link when button is clicked
                const subscription = $('input[name="subscription"]:checked').val();
                let link = 'https://example.com/cart/add?';

                if (subscription === 'single') {
                    const fragrance = $('input[name="single-fragrance"]:checked').val();
                    link += `subscription=single&fragrance=${fragrance}`;
                } else if (subscription === 'double') {
                    const fragrance1 = $('input[name="double-fragrance1"]:checked').val();
                    const fragrance2 = $('input[name="double-fragrance2"]:checked').val();
                    link += `subscription=double&fragrance1=${fragrance1}&fragrance2=${fragrance2}`;
                }

                alert('Add to Cart clicked!\n\nGenerated Link:\n' + link);
            });
        });