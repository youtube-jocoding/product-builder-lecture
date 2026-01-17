// 현재 선택된 메뉴 저장
let currentMenu = null;
const siteUrl = 'https://jocoding.cc/';
const siteName = '저녁 메뉴 추천';

document.addEventListener('DOMContentLoaded', () => {
    const resultContainer = document.getElementById('result-container');
    const generateBtn = document.getElementById('generate-btn');
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    const resultShare = document.getElementById('result-share');

    // Menu data with Korean name, English name, and Keyword for image generation
    const menuData = [
        { ko: '김치찌개', en: 'Kimchi Stew', keyword: 'Kimchi Stew' },
        { ko: '된장찌개', en: 'Doenjang Stew', keyword: 'Doenjang Stew' },
        { ko: '삼겹살', en: 'Samgyeopsal', keyword: 'Korean BBQ Pork Belly' },
        { ko: '치킨', en: 'Fried Chicken', keyword: 'Korean Fried Chicken' },
        { ko: '피자', en: 'Pizza', keyword: 'Delicious Pizza' },
        { ko: '햄버거', en: 'Hamburger', keyword: 'Juicy Hamburger' },
        { ko: '초밥', en: 'Sushi', keyword: 'Sushi platter' },
        { ko: '짜장면', en: 'Jajangmyeon', keyword: 'Jajangmyeon noodles' },
        { ko: '짬뽕', en: 'Jjamppong', keyword: 'Jjamppong spicy noodle soup' },
        { ko: '탕수육', en: 'Sweet and Sour Pork', keyword: 'Tangbuyuk sweet and sour pork' },
        { ko: '떡볶이', en: 'Tteokbokki', keyword: 'Tteokbokki spicy rice cakes' },
        { ko: '김밥', en: 'Kimbap', keyword: 'Kimbap korean roll' },
        { ko: '돈까스', en: 'Pork Cutlet', keyword: 'Tonkatsu pork cutlet' },
        { ko: '냉면', en: 'Cold Noodles', keyword: 'Naengmyeon cold noodles' },
        { ko: '파스타', en: 'Pasta', keyword: 'Creamy Pasta' },
        { ko: '스테이크', en: 'Steak', keyword: 'Beef Steak' },
        { ko: '라멘', en: 'Ramen', keyword: 'Japanese Ramen' },
        { ko: '우동', en: 'Udon', keyword: 'Udon noodle soup' },
        { ko: '부대찌개', en: 'Budae Jjigae', keyword: 'Budae Jjigae army stew' },
        { ko: '갈비탕', en: 'Galbi-tang', keyword: 'Galbi-tang beef rib soup' },
        { ko: '순대국', en: 'Sundae-guk', keyword: 'Korean blood sausage soup' },
        { ko: '제육볶음', en: 'Spicy Stir-fried Pork', keyword: 'Jeyuk Bokkeum spicy pork' },
        { ko: '오징어볶음', en: 'Stir-fried Squid', keyword: 'Ojing-eo Bokkeum spicy squid' },
        { ko: '보쌈', en: 'Bossam', keyword: 'Bossam boiled pork' }
    ];

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeToggleBtn.textContent = 'Light Mode';
    }

    themeToggleBtn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            themeToggleBtn.textContent = 'Light Mode';
        } else {
            localStorage.setItem('theme', 'light');
            themeToggleBtn.textContent = 'Dark Mode';
        }
    });

    generateBtn.addEventListener('click', () => {
        generateMenu();
    });

    function generateMenu() {
        resultContainer.innerHTML = '';
        const lang = document.documentElement.lang;

        // Randomly select one menu
        const randomIndex = Math.floor(Math.random() * menuData.length);
        const selectedData = menuData[randomIndex];
        const menuName = lang === 'ko' ? selectedData.ko : selectedData.en;

        // 현재 메뉴 저장
        currentMenu = {
            ko: selectedData.ko,
            en: selectedData.en,
            name: menuName
        };

        // Create Menu Text Element
        const menuEl = document.createElement('div');
        menuEl.classList.add('menu-item');
        menuEl.textContent = menuName;
        resultContainer.appendChild(menuEl);

        // Generate AI Image URL (using pollination.ai)
        // seed ensures different images, width/height for optimization
        const seed = Math.floor(Math.random() * 1000);
        const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(selectedData.keyword)} delicious food photography?width=512&height=512&seed=${seed}&nologo=true`;

        // Create Image Element
        const imgEl = document.createElement('img');
        imgEl.src = imageUrl;
        imgEl.alt = menuName;
        imgEl.classList.add('menu-image');

        // Add loading state or placeholder could be good, but keeping it simple
        resultContainer.appendChild(imgEl);

        // 공유 버튼 표시
        if (resultShare) {
            resultShare.style.display = 'block';
        }
    }
});

// ===== SNS 공유 기능 =====

// 토스트 알림 표시
function showToast(message, type = '') {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.textContent = message;
    toast.className = 'toast show' + (type ? ' ' + type : '');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// 플로팅 메뉴 토글
function toggleFloatingMenu() {
    const menu = document.getElementById('floating-menu');
    if (menu) {
        menu.classList.toggle('show');
    }
}

// 클릭 외부 감지하여 플로팅 메뉴 닫기
document.addEventListener('click', (e) => {
    const floatingShare = document.querySelector('.floating-share');
    const menu = document.getElementById('floating-menu');
    if (floatingShare && menu && !floatingShare.contains(e.target)) {
        menu.classList.remove('show');
    }
});

// ===== 메뉴 결과 공유 =====

function shareKakao() {
    if (!currentMenu) {
        showToast('먼저 메뉴를 추천받으세요!');
        return;
    }

    const text = `오늘 저녁은 "${currentMenu.name}" 어때요? 🍽️`;
    const url = siteUrl;

    // 카카오톡 공유 (웹에서는 카카오스토리로 대체하거나 링크 공유)
    if (navigator.share) {
        navigator.share({
            title: `오늘의 저녁 메뉴: ${currentMenu.name}`,
            text: text,
            url: url
        }).catch(() => {});
    } else {
        // 카카오톡 링크 (모바일에서 동작)
        const kakaoUrl = `https://story.kakao.com/share?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
        window.open(kakaoUrl, '_blank', 'width=600,height=400');
    }
}

function shareTwitter() {
    if (!currentMenu) {
        showToast('먼저 메뉴를 추천받으세요!');
        return;
    }

    const text = `오늘 저녁은 "${currentMenu.name}" 어때요? 🍽️\n\n저녁 메뉴 고민될 때 여기서 추천받아보세요!`;
    const url = siteUrl;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank', 'width=600,height=400');
}

function shareFacebook() {
    if (!currentMenu) {
        showToast('먼저 메뉴를 추천받으세요!');
        return;
    }

    const url = siteUrl;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(`오늘 저녁은 "${currentMenu.name}" 어때요? 🍽️`)}`;
    window.open(facebookUrl, '_blank', 'width=600,height=400');
}

function copyResultLink() {
    if (!currentMenu) {
        showToast('먼저 메뉴를 추천받으세요!');
        return;
    }

    const text = `오늘 저녁은 "${currentMenu.name}" 어때요? 🍽️\n${siteUrl}`;

    navigator.clipboard.writeText(text).then(() => {
        showToast('링크가 복사되었습니다!', 'success');
        const btn = document.querySelector('#result-share .copy-link');
        if (btn) {
            btn.classList.add('copied');
            setTimeout(() => btn.classList.remove('copied'), 2000);
        }
    }).catch(() => {
        showToast('복사에 실패했습니다.');
    });
}

// ===== 사이트 전체 공유 =====

function shareKakaoSite() {
    const text = '저녁 뭐 먹을지 고민될 때! 버튼 하나로 메뉴 추천받기 🍽️';

    if (navigator.share) {
        navigator.share({
            title: siteName,
            text: text,
            url: siteUrl
        }).catch(() => {});
    } else {
        const kakaoUrl = `https://story.kakao.com/share?url=${encodeURIComponent(siteUrl)}&text=${encodeURIComponent(text)}`;
        window.open(kakaoUrl, '_blank', 'width=600,height=400');
    }
    toggleFloatingMenu();
}

function shareTwitterSite() {
    const text = '저녁 뭐 먹을지 고민될 때! 버튼 하나로 메뉴 추천받기 🍽️';
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(siteUrl)}`;
    window.open(twitterUrl, '_blank', 'width=600,height=400');
    toggleFloatingMenu();
}

function shareFacebookSite() {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(siteUrl)}`;
    window.open(facebookUrl, '_blank', 'width=600,height=400');
    toggleFloatingMenu();
}

function copySiteLink() {
    navigator.clipboard.writeText(siteUrl).then(() => {
        showToast('링크가 복사되었습니다!', 'success');
    }).catch(() => {
        showToast('복사에 실패했습니다.');
    });
    toggleFloatingMenu();
}
