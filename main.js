document.addEventListener('DOMContentLoaded', () => {
    const resultContainer = document.getElementById('result-container');
    const generateBtn = document.getElementById('generate-btn');
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

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
    }
});
