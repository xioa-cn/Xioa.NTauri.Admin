export const blogContent = [
    {
        type: 'section',
        title: '部署',
        content: [
            {
                type: 'image-grid',
                title: 'XIOA - 专属部署',
                image: '/0.jpg',
            },
            {
                type: 'warning',
                content: '强烈建议：强烈建议网站使用 `域名` 访问，后续如果有网站注释的需求...'
            },
            {
                type: 'link',
                text: 'POETIZE - 部署文档和资源',
                url: '#'
            },
            {
                type: 'list',
                description: '里面有五种部署方式任选其一：',
                items: [
                    'Linux部署教程（适合程序员）',
                    '宝塔部署教程（不莱客其他网站，已废弃，谨慎使用）',
                ]
            },
            {
                type: 'info',
                content: '注意：请注重数据安全，定时对 `MySQL` 数据库的 `db` 库进行数据备份...'
            }
        ]
    }
];