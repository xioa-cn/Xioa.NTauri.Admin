import { pinkThemeOverrides } from '@/themes/pink';
// import { greenThemeOverrides } from '@/themes/green';
// import { yellowThemeOverrides } from '@/themes/yellow';
// import { blueThemeOverrides } from '@/themes/blue';
import { ref } from 'vue'

export function useThemes() {
    const ThemeOverrides = ref<any>({})
    ThemeOverrides.value = pinkThemeOverrides;
    return {
        ThemeOverrides
    }
}