import type { IValidation, IValidationResult, IWorksheet } from '@/types';

const validator = (
  validation: IValidation,
  sheet: IWorksheet
): IValidationResult => {
  return { success: true, validation };
};

export default validator;
