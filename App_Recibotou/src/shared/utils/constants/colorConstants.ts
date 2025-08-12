import theme from '../../../../theme.json';

export const styleTypeConst = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  SUCCESS: 'success',
  INFO: 'info',
  WARNING: 'warning',
  DANGER: 'danger',
} as const;

export const weightConst = {
  LIGHT: '300',
  REGULAR: '500',
  BOLD: '700',
  100: '100',
  200: '200',
  300: '300',
  400: '400',
  500: '500',
  600: '600',
  700: '700',
  800: '800',
  900: '900',
} as const;

export type StyleType =
  | keyof typeof styleTypeConst
  | (typeof styleTypeConst)[keyof typeof styleTypeConst];
export type Weight =
  | keyof typeof weightConst
  | (typeof weightConst)[keyof typeof weightConst];

export const retrieveColorString = (
  styleType: StyleType = 'PRIMARY',
  weight: Weight = weightConst[500],
): string | undefined => {
  let weightString: string;

  switch (weight) {
    case weightConst.LIGHT:
      weightString = weightConst.LIGHT;
      break;
    case weightConst.REGULAR:
      weightString = weightConst.REGULAR;
      break;
    case weightConst.BOLD:
      weightString = weightConst.BOLD;
      break;
    default:
      weightString = typeof weight === 'string' ? weight : weightConst[weight];
  }

  const colorString =
    `color-${styleType.toLowerCase()}-${weightString}` as keyof typeof theme;
  return theme[colorString];
};
