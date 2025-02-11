export const greenThemeOverrides = {
  common: {
    // 主色调 - 清新绿色
    primaryColor: '#00B578',           // 主绿色
    primaryColorHover: '#07C160',      // 悬浮时的绿色
    primaryColorPressed: '#009F6B',    // 按压时的绿色
    primaryColorSuppl: '#07C160',      // 补充绿色
    
    // 信息色 - 保持绿色系
    infoColor: '#00B578',
    infoColorHover: '#07C160',
    infoColorPressed: '#009F6B',
    infoColorSuppl: '#07C160',
    
    // 成功色 - 翠绿色
    successColor: '#00B578',
    successColorHover: '#07C160',
    successColorPressed: '#009F6B',
    successColorSuppl: '#07C160',
    
    // 警告色 - 柔和的橙色
    warningColor: '#FF9800',
    warningColorHover: '#FFA726',
    warningColorPressed: '#F57C00',
    warningColorSuppl: '#FFA726',
    
    // 错误色 - 柔和的红色
    errorColor: '#F44336',
    errorColorHover: '#EF5350',
    errorColorPressed: '#E53935',
    errorColorSuppl: '#EF5350',
    
    // 文字颜色
    textColorBase: '#333333',
    textColor1: '#2C3E50',
    textColor2: '#34495E',
    textColor3: '#7F8C8D',
    
    // 边框颜色
    borderColor: '#E8F5E9',
    
    // 背景色
    bodyColor: '#FFFFFF',
    
    // 组件通用
    buttonColor2: '#ffffff',
    buttonColor2Hover: '#F1F8E9',
    buttonColor2Pressed: '#E8F5E9',

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
    boxShadow: '0 2px 4px rgba(0, 181, 120, 0.1)',
    boxShadowHover: '0 4px 8px rgba(0, 181, 120, 0.2)',
    boxShadowPressed: '0 2px 4px rgba(0, 181, 120, 0.2)',
    boxShadowFocus: '0 2px 4px rgba(0, 181, 120, 0.2)'
  },
  
  // 输入框样式
  Input: {
    borderRadius: '8px',
    heightMedium: '38px',
    heightLarge: '44px',
    boxShadowFocus: '0 0 0 2px rgba(0, 181, 120, 0.2)',
    borderHover: '1px solid #07C160',
    borderFocus: '1px solid #00B578',
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
    boxShadow: '0 2px 12px 0 rgba(0, 0, 0, 0.05)'
  },
  
  // 表单样式
  Form: {
    feedbackHeightMedium: '24px',
    feedbackFontSizeMedium: '14px',
    labelFontSizeMedium: '14px',
    labelTextColor: '#34495E',
    asteriskColor: '#F44336'
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
    boxShadow: '0 2px 12px 0 rgba(0, 0, 0, 0.1)'
  },

  // 弹窗
  Dialog: {
    borderRadius: '12px',
    padding: '24px',
    titleFontSize: '18px',
    contentFontSize: '14px',
    boxShadow: '0 4px 24px 0 rgba(0, 0, 0, 0.1)'
  }
}
