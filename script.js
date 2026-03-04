// 等待页面加载完成
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. 导航栏滚动时改变样式
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        }
    });

    // 2. 平滑滚动 - 点击导航链接
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 3. 向下滚动提示点击
    const scrollHint = document.querySelector('.scroll-hint');
    if (scrollHint) {
        scrollHint.addEventListener('click', function() {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        });
    }

    // 4. 画廊占位点击提示
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            alert('这里是留给同人作品的展示区，等上传图片后就可以看到啦！');
        });
    });

    // 5. 卡片点击展示详情（糖点档案馆）
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('h3').innerText;
            const desc = this.querySelector('p').innerText;
            alert(`🍬 ${title}\n\n${desc}\n\n（这里是详情弹窗）`);
        });
    });

    // 6. 滚动时显示/隐藏回到顶部按钮（可选）
    const createBackToTop = () => {
        const btn = document.createElement('button');
        btn.innerHTML = '↑';
        btn.className = 'back-to-top';
        btn.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: var(--primary-orange);
            color: white;
            border: none;
            border-radius: 50%;
            font-size: 24px;
            cursor: pointer;
            display: none;
            z-index: 999;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            transition: all 0.3s;
        `;
        document.body.appendChild(btn);

        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                btn.style.display = 'block';
            } else {
                btn.style.display = 'none';
            }
        });

        btn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    };
    createBackToTop();

    // 7. 简单的打字机效果（首页副标题）
    const heroText = document.querySelector('.hero-text');
    if (heroText) {
        const text = heroText.innerText;
        heroText.innerText = '';
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroText.innerText += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        // 页面加载完成后开始打字效果
        setTimeout(typeWriter, 500);
    }

    // 8. 当前导航高亮
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
                link.style.color = 'var(--primary-orange)';
            } else {
                link.style.color = '';
            }
        });
    });

    // 9. 淡入动画 - 当元素进入视口
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // 给所有卡片和区块添加初始样式
    const animatedElements = document.querySelectorAll('.card, .timeline-item, .gallery-item, .quote-card, .charity-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease';
        observer.observe(el);
    });

});