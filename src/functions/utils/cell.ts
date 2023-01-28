import { isNumber, nextNumber, toNumber } from './number';
import { colToColNumber, nextCol } from './column';

import type { IWorksheet } from '@/types';
import type {
  ICell,
  ICellAddress,
  ICellGroup,
  ICellRowCol,
} from '@/types/schema/cell';

const getCellRowCol = (cellAddress: ICellAddress): ICellRowCol => {
  let isLetter = true;
  const rowValueArray = [];
  const columnValueArray = [];

  for (let i = 0; i < cellAddress.length; i++) {
    const character = cellAddress[i];
    isLetter = !isNumber(character);

    if (isLetter) {
      columnValueArray.push(cellAddress[i]);
    } else {
      rowValueArray.push(cellAddress[i]);
    }
  }

  const row = rowValueArray.join('');
  const column = columnValueArray.join('');

  return { row, column };
};

const getCellAddressFromRowCol = (cellRowCol: ICellRowCol): ICellAddress => {
  const { column, row } = cellRowCol;
  return `${column}${row}`;
};

const compareColLetters = (rowStart: string, rowEnd: string): boolean => {
  return colToColNumber(rowStart) < colToColNumber(rowEnd);
};

const getAllCellAddressesFromCellGroup = (
  cellGroup: ICellGroup
): ICellAddress[] => {
  const { startCell, endCell } = cellGroup;

  const { row: startCellRow, column: startCellColumn } = getCellRowCol(
    startCell.address
  );

  const { row: endCellRow, column: endCellColumn } = getCellRowCol(
    endCell.address
  );

  // This logic needs to be revisited, it doesnt account for double lettered stuff
  const [rowStart, rowEnd] =
    toNumber(startCellRow) < toNumber(endCellRow)
      ? [startCellRow, endCellRow]
      : [endCellRow, startCellRow];

  const [colStart, colEnd] = compareColLetters(startCellColumn, endCellColumn)
    ? [startCellColumn, endCellColumn]
    : [endCellColumn, startCellColumn];

  let cellAddresses: ICellAddress[] = [];

  let currentRow = rowStart;
  let currentCol = colStart;

  while (true) {
    while (true) {
      cellAddresses.push(
        getCellAddressFromRowCol({ column: currentCol, row: currentRow })
      );
      currentRow = nextNumber(toNumber(currentRow)).toString();
      if (currentRow > rowEnd) {
        break;
      }
    }
    currentCol = nextCol(currentCol);
    if (currentCol > colEnd) {
      break;
    }
  }

  return cellAddresses;
};

const getCellValue = (cellAddress: ICellAddress, sheet: IWorksheet): ICell => {
  return {
    value: sheet.sheet[cellAddress as string],
    address: cellAddress,
  };
};

const getAllCellsFromCellGroup = (
  cellGroup: ICellGroup,
  sheet: IWorksheet
): ICell[] => {
  const cellAddresses = getAllCellAddressesFromCellGroup(cellGroup);

  return cellAddresses.map((cellAddress) => getCellValue(cellAddress, sheet));
};

export { getAllCellsFromCellGroup, getCellValue, getCellRowCol };
