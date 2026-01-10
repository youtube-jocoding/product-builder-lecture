
document.addEventListener('DOMContentLoaded', () => {
    const numbersContainer = document.getElementById('numbers-container');
    const generateBtn = document.getElementById('generate-btn');

    generateBtn.addEventListener('click', () => {
        generateNumbers();
    });

    function generateNumbers() {
        numbersContainer.innerHTML = '';
        const numbers = new Set();
        while (numbers.size < 6) {
            const randomNumber = Math.floor(Math.random() * 45) + 1;
            numbers.add(randomNumber);
        }

        const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);

        sortedNumbers.forEach((number, index) => {
            setTimeout(() => {
                const numberEl = document.createElement('div');
                numberEl.classList.add('number');
                numberEl.textContent = number;
                numberEl.style.animationDelay = `${index * 100}ms`;
                numbersContainer.appendChild(numberEl);
            }, index * 100);
        });
    }
});
