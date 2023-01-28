import { IValidation } from '../schema';

interface IValidationIssue {
  message: string;
}

interface IValidationResult {
  success: boolean;
  validation: IValidation;
  validationIssue?: IValidationIssue;
}

export type { IValidationResult };
