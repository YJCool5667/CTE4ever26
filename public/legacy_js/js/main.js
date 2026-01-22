// 네비게이션 관련 기능
document.addEventListener('DOMContentLoaded', function() {
    // 모바일 메뉴 토글
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // 스크롤 시 네비게이션 스타일 변경
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
    
    // 현재 페이지 하이라이트
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('text-green-600', 'font-semibold');
            link.classList.remove('text-gray-700');
        }
    });
    
    // 스크롤 애니메이션
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
            }
        });
    }, observerOptions);
    
    // 애니메이션 대상 요소들 관찰
    const animateElements = document.querySelectorAll('.card-hover, .bg-white');
    animateElements.forEach(el => observer.observe(el));
    
    // 부드러운 스크롤
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // 연락처 폼 기능 (contact.html에서 사용)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // 여기에 실제 폼 제출 로직 추가
            alert('문의가 성공적으로 전송되었습니다. 빠른 시일 내에 연락드리겠습니다.');
        });
    }
});

// 유틸리티 함수들
function showLoading(element) {
    element.innerHTML = '<div class="loading"></div>';
}

function hideLoading(element, originalContent) {
    element.innerHTML = originalContent;
}

// 숫자 카운트 애니메이션
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start).toLocaleString();
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString();
        }
    }
    
    updateCounter();
}

// 페이지 로드 시 카운터 애니메이션 실행
window.addEventListener('load', function() {
    const counters = document.querySelectorAll('[data-counter]');
    counters.forEach(counter => {
        const target = parseInt(counter.dataset.counter);
        animateCounter(counter, target);
    });
});
