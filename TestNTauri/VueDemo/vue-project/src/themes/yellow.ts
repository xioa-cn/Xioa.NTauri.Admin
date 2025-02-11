export const yellowThemeOverrides = {
  common: {
    // 主色调 - 明亮黄色
    primaryColor: '#FFB800',           // 主黄色
    primaryColorHover: '#FFC633',      // 悬浮时的黄色
    primaryColorPressed: '#E6A600',    // 按压时的黄色
    primaryColorSuppl: '#FFC633',      // 补充黄色
    
    // 信息色 - 保持黄色系
    infoColor: '#FFB800',
    infoColorHover: '#FFC633',
    infoColorPressed: '#E6A600',
    infoColorSuppl: '#FFC633',
    
    // 成功色 - 暖色调绿色
    successColor: '#8BBF4D',
    successColorHover: '#9FCC6B',
    successColorPressed: '#76A642',
    successColorSuppl: '#9FCC6B',
    
    // 警告色 - 橙色
    warningColor: '#FF9900',
    warningColorHover: '#FFAD33',
    warningColorPressed: '#E68A00',
    warningColorSuppl: '#FFAD33',
    
    // 错误色 - 暖红色
    errorColor: '#FF6B6B',
    errorColorHover: '#FF8585',
    errorColorPressed: '#E65C5C',
    errorColorSuppl: '#FF8585',
    
    // 文字颜色
    textColorBase: '#333333',
    textColor1: '#2C3E50',
    textColor2: '#34495E',
    textColor3: '#7F8C8D',
    
    // 边框颜色
    borderColor: '#FFF3D9',
    
    // 背景色
    bodyColor: '#FFFFFF',
    
    // 组件通用
    buttonColor2: '#ffffff',
    buttonColor2Hover: '#FFF9E6',
    buttonColor2Pressed: '#FFF3D9',

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
    boxShadow: '0 2px 4px rgba(255, 184, 0, 0.1)',
    boxShadowHover: '0 4px 8px rgba(255, 184, 0, 0.2)',
    boxShadowPressed: '0 2px 4px rgba(255, 184, 0, 0.2)',
    boxShadowFocus: '0 2px 4px rgba(255, 184, 0, 0.2)'
  },
  
  // 输入框样式
  Input: {
    borderRadius: '8px',
    heightMedium: '38px',
    heightLarge: '44px',
    boxShadowFocus: '0 0 0 2px rgba(255, 184, 0, 0.2)',
    borderHover: '1px solid #FFC633',
    borderFocus: '1px solid #FFB800',
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
    boxShadow: '0 2px 12px 0 rgba(255, 184, 0, 0.05)'
  },
  
  // 表单样式
  Form: {
    feedbackHeightMedium: '24px',
    feedbackFontSizeMedium: '14px',
    labelFontSizeMedium: '14px',
    labelTextColor: '#34495E',
    asteriskColor: '#FF6B6B'
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
    boxShadow: '0 2px 12px 0 rgba(255, 184, 0, 0.1)'
  },

  // 弹窗
  Dialog: {
    borderRadius: '12px',
    padding: '24px',
    titleFontSize: '18px',
    contentFontSize: '14px',
    boxShadow: '0 4px 24px 0 rgba(255, 184, 0, 0.1)'
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
