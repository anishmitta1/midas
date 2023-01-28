type IValidationConditionFormattingTypes =
  | 'assert_backgroundcolor'
  | 'assert_borderstyle'
  | 'assert_textcolor';

// Add more as you go, hex codes are also allowed
type IColor = 'black' | 'blue' | 'green' | 'red' | string;

type IBorderStyle = 'dotted' | 'solid' | 'double-lined';

interface IFormattingData {
  backgroundColor: IColor;
  borderColor: IColor;
  borderStyle: IBorderStyle;
  textColor: IColor;
}

interface IValidationConditionFormatting {
  formattingType: IValidationConditionFormattingTypes;
  formattingData: Partial<IFormattingData>;
}

export type { IValidationConditionFormatting };
