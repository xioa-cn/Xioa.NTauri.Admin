import { ref } from 'vue';

export function useRandomImg() {
    const backgroundImages = [
        '/0.jpg',
        '/2.jpg',
        '/6.jpg',
        '/9.jpg'
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
        backgroundImage,
        refreshBackground
    }

}
