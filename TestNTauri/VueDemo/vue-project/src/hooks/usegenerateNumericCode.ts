import {
    generateNumericCode,
    generateMixedCode,
    generateRandomNumber,
    generateGraphicCode
} from '@/utils/randomCode';
import { callWithAsyncErrorHandling, ref } from 'vue';

export function useGenerateNumericCode() {
    const currentCode = ref('');
    const codeImage = ref('');
    const refreshCode = () => {
        const { code, dataURL } = generateGraphicCode({
            width: 100,
            height: 40,
            length: 4,
            noise: true
        });
        codeImage.value = dataURL;
        currentCode.value = code;
    };
    // 验证用户输入
    const validateCode = (inputCode: string) => {
        console.log(inputCode.toUpperCase());
        console.log(currentCode.value.toUpperCase());
        return inputCode.toUpperCase() === currentCode.value.toUpperCase();
    };

    return {
        codeImage,
        refreshCode,
        validateCode
    }
}
