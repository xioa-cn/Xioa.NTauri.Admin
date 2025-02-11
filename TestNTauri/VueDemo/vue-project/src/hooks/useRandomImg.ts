import { ref } from 'vue';

export function useRandomImg() {
    const backgroundImages = [
        '/0.jpg',
        '/1.webp',
        '/2.jpg',
        '/3.webp',
        '/4.jpg',
        '/5.jpg',
        '/6.jpg',
        '/7.jpg',
        '/8.jpg',
        '/9.jpg',
        '/rem.jpg'
    ];

    function getRandomBackground(): string {
        const randomIndex = Math.floor(Math.random() * backgroundImages.length);
        return backgroundImages[randomIndex];
    }

    const backgroundImage = ref('/9.jpg');
    const refreshBackground = () => {
        backgroundImage.value = getRandomBackground();
    }

    return {
        backgroundImage, getRandomBackground,
        refreshBackground
    }

}
