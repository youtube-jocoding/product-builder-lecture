document.addEventListener('DOMContentLoaded', () => {
    const resultContainer = document.getElementById('result-container');
    const generateBtn = document.getElementById('generate-btn');
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    const menusKO = [
        '김치찌개', '된장찌개', '삼겹살', '치킨', '피자', '햄버거', 
        '초밥', '짜장면', '짬뽕', '탕수육', '떡볶이', '김밥', 
        '돈까스', '냉면', '파스타', '스테이크', '라멘', '우동',
        '부대찌개', '갈비탕', '순대국', '제육볶음', '오징어볶음', '보쌈'
    ];

    const menusEN = [
        'Kimchi Stew', 'Doenjang Stew', 'Samgyeopsal', 'Fried Chicken', 'Pizza', 'Hamburger', 
        'Sushi', 'Jajangmyeon', 'Jjamppong', 'Sweet and Sour Pork', 'Tteokbokki', 'Kimbap', 
        'Pork Cutlet', 'Cold Noodles', 'Pasta', 'Steak', 'Ramen', 'Udon',
        'Budae Jjigae', 'Galbi-tang', 'Sundae-guk', 'Spicy Stir-fried Pork', 'Stir-fried Squid', 'Bossam'
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
        const menus = lang === 'ko' ? menusKO : menusEN;

        // Randomly select one menu
        const randomIndex = Math.floor(Math.random() * menus.length);
        const selectedMenu = menus[randomIndex];

        const menuEl = document.createElement('div');
        menuEl.classList.add('menu-item');
        menuEl.textContent = selectedMenu;
        
        resultContainer.appendChild(menuEl);
    }
});