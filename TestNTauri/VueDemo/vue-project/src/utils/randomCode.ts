/**
 * 生成指定长度的纯数字验证码
 * @param length 验证码长度，默认为 6
 * @returns 数字验证码字符串
 */
export function generateNumericCode(length: number = 6): string {
    return Array.from({ length }, () => 
        Math.floor(Math.random() * 10)
    ).join('');
}

/**
 * 生成指定长度的数字字母混合验证码
 * @param length 验证码长度，默认为 6
 * @param options 配置选项
 * @returns 混合验证码字符串
 */
export function generateMixedCode(length: number = 6, options = {
    numbers: true,    // 是否包含数字
    uppercase: true,  // 是否包含大写字母
    lowercase: true,  // 是否包含小写字母
    excludeSimilar: true, // 是否排除容易混淆的字符(0,O,1,I,L等)
}): string {
    let chars = '';
    
    // 数字
    const numbers = options.excludeSimilar ? '23456789' : '0123456789';
    if (options.numbers) chars += numbers;
    
    // 大写字母
    const uppercase = options.excludeSimilar ? 'ABCDEFGHJKMNPQRSTUVWXYZ' : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (options.uppercase) chars += uppercase;
    
    // 小写字母
    const lowercase = options.excludeSimilar ? 'abcdefghjkmnpqrstuvwxyz' : 'abcdefghijklmnopqrstuvwxyz';
    if (options.lowercase) chars += lowercase;
    
    // 如果没有选择任何字符集，默认使用数字
    if (!chars) chars = numbers;
    
    return Array.from({ length }, () => 
        chars[Math.floor(Math.random() * chars.length)]
    ).join('');
}

/**
 * 生成指定范围内的随机数字
 * @param min 最小值
 * @param max 最大值
 * @returns 随机数字
 */
export function generateRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * 生成图形验证码配置
 */
export interface GraphicCodeOptions {
    width?: number;      // 图片宽度
    height?: number;     // 图片高度
    length?: number;     // 验证码长度
    bgColor?: string;    // 背景色
    textColor?: string;  // 文字颜色
    fontSize?: number;   // 字体大小
    noise?: boolean;     // 是否添加干扰线
}

/**
 * 生成图形验证码
 * @param options 配置选项
 * @returns { code: string, dataURL: string } 验证码文本和图片的 base64 字符串
 */
export function generateGraphicCode(options: GraphicCodeOptions = {}) {
    const {
        width = 120,
        height = 40,
        length = 4,
        bgColor = '#f8f8f8',
        textColor = '#000',
        fontSize = 24,
        noise = true
    } = options;

    // 创建 canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    canvas.width = width;
    canvas.height = height;

    // 绘制背景
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);

    // 生成验证码文本
    const code = generateMixedCode(length, {
        numbers: true,
        uppercase: true,
        lowercase: false,
        excludeSimilar: true
    });

    // 绘制文字
    ctx.font = `${fontSize}px Arial`;
    ctx.textBaseline = 'middle';
    
    // 随机绘制每个字符
    for (let i = 0; i < code.length; i++) {
        const x = (width / (length + 1)) * (i + 1);
        const y = height / 2;
        const rotation = (Math.random() - 0.5) * 0.3; // 随机旋转角度
        
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation);
        ctx.fillStyle = textColor;
        ctx.fillText(code[i], -fontSize/3, 0);
        ctx.restore();
    }

    // 添加干扰线
    if (noise) {
        for (let i = 0; i < 3; i++) {
            ctx.beginPath();
            ctx.strokeStyle = textColor;
            ctx.globalAlpha = 0.2;
            ctx.moveTo(Math.random() * width, Math.random() * height);
            ctx.lineTo(Math.random() * width, Math.random() * height);
            ctx.stroke();
        }
    }

    return {
        code,
        dataURL: canvas.toDataURL('image/png')
    };
}
