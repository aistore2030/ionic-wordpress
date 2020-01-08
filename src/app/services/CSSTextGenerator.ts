export function CSSTextGenerator(colors: {
  primary: any;
  secondary: any;
  danger: any;
  light: any;
  sliderColor: any;
  colorIcon: any;
  colorIconText: any;
  category: any;
  listBackgroundColor: any;
  backgroundColor: any;
  toobarBackground: any;
  toobarButton: any;
  toobarText: any;
}) {
  const defaults = {
    primary: '#ffffff',
    secondary: '#fafafa',
    danger: '#f53d3d',
    light: '#1b1e28',
    sliderColor: '#ffffff',
    colorIcon: '#CCCBDA',
    colorIconText: '#7F7E96',
    category: '#ffffff',
    listBackgroundColor: '#ffffff',
    backgroundColor: '#fafafa',
    toobarBackground: '#ffffff',
    toobarButton: '#AAB2B7',
    toobarText: '#FFFFFF'
  };
  colors = { ...defaults, ...colors };
  const {
    primary,
    secondary,
    danger,
    light,
    sliderColor,
    colorIcon,
    colorIconText,
    category,
    listBackgroundColor,
    backgroundColor,
    toobarBackground,
    toobarButton,
    toobarText
  } = colors;
  return `
    --deco-primary: ${primary};
    --deco-secondary: ${secondary};
    --deco-danger: ${danger};
    --deco-light: ${light};
    --deco-sliderColor: ${sliderColor};
    --deco-colorIcon: ${colorIcon};
    --deco-colorIconText: ${colorIconText};
    --deco-category: ${category};
    --deco-listBackgroundColor: ${listBackgroundColor};
    --deco-backgroundColor: ${backgroundColor};
    --deco-toobarBackground: ${toobarBackground};
    --deco-toobarButton: ${toobarButton};
    --deco-toobarText: ${toobarText};
  `;
}
