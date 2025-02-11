export const blueThemeOverrides = {
  common: {
    // 主色调 - 科技蓝
    primaryColor: '#2080F0',           // 主蓝色
    primaryColorHover: '#4098FC',      // 悬浮时的蓝色
    primaryColorPressed: '#1060C9',    // 按压时的蓝色
    primaryColorSuppl: '#4098FC',      // 补充蓝色
    
    // 信息色 - 保持蓝色系
    infoColor: '#2080F0',
    infoColorHover: '#4098FC',
    infoColorPressed: '#1060C9',
    infoColorSuppl: '#4098FC',
    
    // 成功色 - 清新绿色
    successColor: '#18A058',
    successColorHover: '#36AD6A',
    successColorPressed: '#0C7A43',
    successColorSuppl: '#36AD6A',
    
    // 警告色 - 温暖橙色
    warningColor: '#F0A020',
    warningColorHover: '#FCB040',
    warningColorPressed: '#C97C10',
    warningColorSuppl: '#FCB040',
    
    // 错误色 - 鲜明红色
    errorColor: '#D03050',
    errorColorHover: '#DE576D',
    errorColorPressed: '#AB1F3F',
    errorColorSuppl: '#DE576D',
    
    // 文字颜色
    textColorBase: '#333333',
    textColor1: '#2C3E50',
    textColor2: '#34495E',
    textColor3: '#7F8C8D',
    
    // 边框颜色
    borderColor: '#E5F1FF',
    
    // 背景色
    bodyColor: '#FFFFFF',
    
    // 组件通用
    buttonColor2: '#ffffff',
    buttonColor2Hover: '#F0F7FF',
    buttonColor2Pressed: '#E5F1FF',

    // 禁用状态
    opacity1: '0.82',
    opacity2: '0.72',
    opacity3: '0.38',
    opacity4: '0.24',
    opacity5: '0.12',

    // 字体
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    
    // 圆角
    borderRadius: '8px',
    borderRadiusSmall: '4px',
    borderRadiusMedium: '8px',
    borderRadiusLarge: '12px'
  },
  
  // 按钮样式
  Button: {
    textColor: '#FFF',
    textColorPrimary: '#FFF',
    textColorInfo: '#FFF',
    textColorSuccess: '#FFF',
    textColorWarning: '#FFF',
    textColorError: '#FFF',
    borderRadius: '8px',
    fontWeight: '500',
    heightMedium: '38px',
    heightLarge: '44px',
    fontSize: '14px',
    boxShadow: '0 2px 4px rgba(32, 128, 240, 0.1)',
    boxShadowHover: '0 4px 8px rgba(32, 128, 240, 0.2)',
    boxShadowPressed: '0 2px 4px rgba(32, 128, 240, 0.2)',
    boxShadowFocus: '0 2px 4px rgba(32, 128, 240, 0.2)'
  },
  
  // 输入框样式
  Input: {
    borderRadius: '8px',
    heightMedium: '38px',
    heightLarge: '44px',
    boxShadowFocus: '0 0 0 2px rgba(32, 128, 240, 0.2)',
    borderHover: '1px solid #4098FC',
    borderFocus: '1px solid #2080F0',
    color: '#FFFFFF',
    colorFocus: '#FFFFFF',
    textColor: '#333333',
    placeholderColor: '#909399'
  },
  
  // 卡片样式
  Card: {
    borderRadius: '12px',
    color: '#FFFFFF',
    colorModal: '#FFFFFF',
    boxShadow: '0 2px 12px 0 rgba(32, 128, 240, 0.05)'
  },
  
  // 表单样式
  Form: {
    feedbackHeightMedium: '24px',
    feedbackFontSizeMedium: '14px',
    labelFontSizeMedium: '14px',
    labelTextColor: '#34495E',
    asteriskColor: '#D03050'
  },

  // 下拉菜单
  Dropdown: {
    optionHeightMedium: '36px',
    optionFontSizeMedium: '14px',
    borderRadius: '8px',
    boxShadow: '0 2px 12px 0 rgba(0, 0, 0, 0.1)'
  },

  // 标签
  Tag: {
    borderRadius: '4px',
    heightMedium: '28px',
    fontSizeMedium: '13px'
  },

  // 消息提示
  Message: {
    borderRadius: '8px',
    padding: '12px 20px',
    fontSize: '14px',
    boxShadow: '0 2px 12px 0 rgba(32, 128, 240, 0.1)'
  },

  // 弹窗
  Dialog: {
    borderRadius: '12px',
    padding: '24px',
    titleFontSize: '18px',
    contentFontSize: '14px',
    boxShadow: '0 4px 24px 0 rgba(32, 128, 240, 0.1)'
  },

  // 分页
  Pagination: {
    itemSize: '32px',
    itemPadding: '0 4px',
    itemMargin: '0 4px',
    itemBorderRadius: '4px',
    buttonIconSize: '16px'
  },

  // 选择器
  Select: {
    peers: {
      InternalSelection: {
        borderRadius: '8px',
        heightMedium: '38px',
        paddingMedium: '0 12px'
      }
    }
  }
}
