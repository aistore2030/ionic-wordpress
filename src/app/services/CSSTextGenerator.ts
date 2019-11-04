import { defaults } from './theme.service';
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
  colors = { ...defaults, ...colors };
  const { primary,
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
