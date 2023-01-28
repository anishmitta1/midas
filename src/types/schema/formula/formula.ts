import type { ICellGroup } from '../cell';

enum Formulas {
  SUM = 'SUM',
  AVERAGE = 'AVERAGE',
}

// Leaving this record here to stay vigilant
// about formulas which follow the associative property.
// Also we will need to check if it is not the shorthand
// syntax. eg: both =A1+B1 and =SUM(A1, B1) should pass the
// validation tests.
const associativeProperties: Record<Formulas, boolean> = {
  SUM: true,
  AVERAGE: true,
};

interface IValidationConditionFormula {
  formulaType: Formulas;
  // Allowing this to be an empty array implies that
  // we are allowing the user to enter a hardcoded values
  // instead of just cell references as well
  operandCellGroups: ICellGroup[];
}

export type { IValidationConditionFormula };
