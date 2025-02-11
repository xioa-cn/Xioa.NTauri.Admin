
export const pinkThemeOverrides = {
    common: {
      // 主色调
      primaryColor: '#FF69B4',           // 主粉色
      primaryColorHover: '#FF85C2',      // 悬浮时的粉色
      primaryColorPressed: '#FF4BA5',    // 按压时的粉色
      primaryColorSuppl: '#FF85C2',      // 补充粉色
      
      // 信息色
      infoColor: '#FF69B4',
      infoColorHover: '#FF85C2',
      infoColorPressed: '#FF4BA5',
      infoColorSuppl: '#FF85C2',
      
      // 成功色（保持柔和的绿色）
      successColor: '#8FBC8F',
      successColorHover: '#A7CAA7',
      successColorPressed: '#76A576',
      successColorSuppl: '#A7CAA7',
      
      // 警告色（柔和的橙色）
      warningColor: '#FFB6C1',
      warningColorHover: '#FFC1CC',
      warningColorPressed: '#FF9AA7',
      warningColorSuppl: '#FFC1CC',
      
      // 错误色（柔和的红色）
      errorColor: '#FF6B81',
      errorColorHover: '#FF8596',
      errorColorPressed: '#FF516C',
      errorColorSuppl: '#FF8596',
      
      // 文字颜色
      textColorBase: '#333333',
      textColor1: '#444444',
      textColor2: '#666666',
      textColor3: '#999999',
      
      // 边框颜色
      borderColor: '#FFE4E1',
      
      // 背景色
      bodyColor: '#FFF0F5',
      
      // 组件通用
      buttonColor2: '#ffffff',
      buttonColor2Hover: '#FFF0F5',
      buttonColor2Pressed: '#FFE4E1'
    },
    
    // 按钮样式
    Button: {
      textColor: '#FFF',
      borderRadius: '8px',
      fontWeight: '500',
      heightMedium: '38px',
      heightLarge: '44px',
      fontSize: '14px'
    },
    
    // 输入框样式
    Input: {
      borderRadius: '8px',
      heightMedium: '38px',
      heightLarge: '44px',
      boxShadowFocus: '0 0 0 2px rgba(255, 105, 180, 0.2)',
      borderHover: '1px solid #FF85C2',
      borderFocus: '1px solid #FF69B4'
    },
    
    // 卡片样式
    Card: {
      borderRadius: '12px',
      color: '#ffffff',
      colorModal: '#ffffff'
    },
    
    // 表单样式
    Form: {
      feedbackHeightMedium: '24px',
      feedbackFontSizeMedium: '14px',
      labelFontSizeMedium: '14px'
    }
  }