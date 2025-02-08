
export function useblogHeaderText() {
    const text: string[] = [
        '此情不待因缘见，波底垂杨春又深。',
        '身无彩凤双飞翼，心有灵犀一点通。',
        '天长地久有时尽，此恨绵绵无绝期。',
        '两情若是久长时，又岂在朝朝暮暮。',
        '春心莫共花争发，一寸相思一寸灰。',
        '此生愿作青石在，重劫他生愿再逢。',
        '多情只有春庭月，犹为离人照落花。',
        '相思相见知何日，此时此夜难为情。',
        '愿我如星君如月，夜夜流光相皎洁。',
    ]
    function getText():string {
        return text[Math.floor(Math.random() * text.length)]
    }

    return {
        getText
    }
}