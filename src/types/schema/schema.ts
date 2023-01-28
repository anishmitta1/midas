import type { ICellGroup } from './cell';
import type { IValidationConditionDataType } from './dataType';
import type { IValidationConditionFormatting } from './formatting';
import type { IValidationConditionFormula } from './formula';

enum ValidationConditionTypes {
  DATA_TYPE = 'data_type',
  FORMATTING = 'formatting',
  FORMULA = 'formula',
}

interface IValidationCondition {
  validationConditionType: ValidationConditionTypes;
  validationCondition:
    | IValidationConditionDataType
    | IValidationConditionFormatting
    | IValidationConditionFormula;
}

interface IValidation {
  cellGroup: ICellGroup;
  validationCondition: IValidationCondition;
}

type ISchema = IValidation[];

export type { ISchema, IValidation, ValidationConditionTypes };
