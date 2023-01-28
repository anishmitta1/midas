import { ValidationConditionTypes } from '@/constants';
import {
  dataTypeValidator,
  formattingValidator,
  formulaValidator,
} from './validators';

import type { IValidation, IWorksheet } from '@/types';
import type { IValidationResult } from '@/types';

const validate = (
  validation: IValidation,
  sheet: IWorksheet
): IValidationResult => {
  const { validationConditionType } = validation.validationCondition;

  let result: IValidationResult | null = null;

  switch (validationConditionType) {
    case ValidationConditionTypes.DATA_TYPE:
      result = dataTypeValidator(validation, sheet);
    case ValidationConditionTypes.FORMATTING:
      result = formattingValidator(validation, sheet);
    case ValidationConditionTypes.FORMULA:
      result = formulaValidator(validation, sheet);
    default:
      result = {
        success: false,
        validation,
        validationIssue: {
          message: 'Unknown validation type',
        },
      };
  }

  return result;
};

export default validate;
