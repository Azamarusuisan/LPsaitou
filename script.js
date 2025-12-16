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
        
        // エラーリセット
        document.querySelectorAll('.error-message').forEach(el => el.remove());
        document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
        
        let isValid = true;
        const formData = {
            company: document.getElementById('company'),
            name: document.getElementById('name'),
            email: document.getElementById('email'),
            phone: document.getElementById('phone'),
            budget: document.getElementById('budget'),
            inquiry_type: document.getElementById('inquiry_type'),
            privacy: document.querySelector('input[name="privacy"]')
        };
        
        // 必須チェックヘルパー関数
        const showError = (element, message) => {
            const errorDiv = document.createElement('span');
            errorDiv.className = 'error-message';
            errorDiv.textContent = message;
            element.classList.add('error');
            // チェックボックスの場合は親要素の末尾に追加
            if (element.type === 'checkbox') {
                 element.closest('.checkbox-label').parentElement.appendChild(errorDiv);
            } else {
                element.parentElement.appendChild(errorDiv);
            }
            isValid = false;
        };

        // バリデーション実行
        if (!formData.company.value.trim()) showError(formData.company, '会社名を入力してください');
        if (!formData.name.value.trim()) showError(formData.name, 'お名前を入力してください');
        
        if (!formData.email.value.trim()) {
            showError(formData.email, 'メールアドレスを入力してください');
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.value)) {
            showError(formData.email, '正しいメールアドレス形式で入力してください');
        }
        
        if (!formData.budget.value) showError(formData.budget, '予算を選択してください');
        if (!formData.inquiry_type.value) showError(formData.inquiry_type, 'お問い合わせ種別を選択してください');
        if (!formData.privacy.checked) showError(formData.privacy, 'プライバシーポリシーへの同意が必要です');

        if (isValid) {
            // 送信成功UIへ切り替え
            const formContainer = form.parentElement; // .container inside .contact-form or similar
            // フォーム自体を非表示にしてメッセージを表示、あるいはフォームの中身を書き換え
            const successHTML = `
                <div class="success-message-container">
                    <span class="success-icon">✓</span>
                    <h3 class="success-title">送信が完了しました</h3>
                    <p class="success-text">
                        お問い合わせありがとうございます。<br>
                        担当者より3営業日以内にご連絡いたします。<br>
                        ご入力いただいたメールアドレスへ確認メールをお送りしました。
                    </p>
                </div>
            `;
            
            // フェードアウト効果などをつけるならここで
            form.style.display = 'none';
            // タイトルなども非表示にする場合
            const title = document.querySelector('.form-title');
            const subtitle = document.querySelector('.form-subtitle');
            if(title) title.style.display = 'none';
            if(subtitle) subtitle.style.display = 'none';

            formContainer.insertAdjacentHTML('beforeend', successHTML);
            
            // 実際はここでAPI送信などを行う
            console.log('Form submitted successfully');
            
            // スクロール位置を調整（フォーム位置へ）
            document.getElementById('contact-form').scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
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

