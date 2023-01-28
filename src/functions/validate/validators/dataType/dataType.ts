import { getAllCellsFromCellGroup } from '@/functions/utils/cell';

import type { IValidation, IValidationResult, IWorksheet } from '@/types';
import type { ICell } from '@/types/schema/cell';

const validateCells = (
  cells: ICell[],
  sheet: IWorksheet,
  validation: IValidation
): IValidationResult => {
  for (let i = 0; i < cells.length; i++) {
    //
  }

  return { success: true, validation };
};

const validator = (
  validation: IValidation,
  sheet: IWorksheet
): IValidationResult => {
  const { cellGroup } = validation;

  const cells = getAllCellsFromCellGroup(cellGroup, sheet);
  return validateCells(cells, sheet, validation);
};

export default validator;
