// スムーズスクロール
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

// スクロール時のアニメーション
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// アニメーション対象要素を監視
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.benefit-card, .service-card, .media-item, .bubble');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// フォーム送信処理
const form = document.querySelector('.form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // フォームデータの取得
        const formData = {
            company: document.getElementById('company').value,
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            budget: document.getElementById('budget').value,
            message: document.getElementById('message').value
        };
        
        // バリデーション
        if (!formData.company || !formData.name || !formData.email) {
            alert('必須項目を入力してください。');
            return;
        }
        
        // メールアドレスのバリデーション
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert('正しいメールアドレスを入力してください。');
            return;
        }
        
        // 送信処理（実際の実装では、サーバーに送信する）
        console.log('フォーム送信:', formData);
        
        // 送信成功メッセージ
        alert('お問い合わせありがとうございます。\n担当者より3営業日以内にご連絡いたします。');
        
        // フォームリセット
        form.reset();
    });
}

// ヘッダーのスクロール時の表示/非表示（必要に応じて）
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // スクロール位置に応じた処理を追加可能
    lastScroll = currentScroll;
});

// 数値カウントアップアニメーション（必要に応じて）
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// メガホンのアニメーション
const megaphone = document.querySelector('.megaphone');
if (megaphone) {
    setInterval(() => {
        megaphone.style.transform = 'translateX(-50%) scale(1.1)';
        setTimeout(() => {
            megaphone.style.transform = 'translateX(-50%) scale(1)';
        }, 200);
    }, 2000);
}

// チャート要素のアニメーション
const chartElements = document.querySelectorAll('.pie-chart, .bar-chart, .line-chart');
chartElements.forEach((chart, index) => {
    chart.style.animation = `pulse 2s ease-in-out infinite`;
    chart.style.animationDelay = `${index * 0.3}s`;
});

// CSSアニメーションを動的に追加
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% {
            opacity: 0.7;
            transform: scale(1);
        }
        50% {
            opacity: 1;
            transform: scale(1.05);
        }
    }
`;
document.head.appendChild(style);

