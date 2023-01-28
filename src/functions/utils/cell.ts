import type { IWorksheet } from '@/types';
import type { ICell, ICellAddress, ICellGroup } from '@/types/schema/cell';

const getAllCellAddressesFromCellGroup = (
  cellGroup: ICellGroup
): ICellAddress[] => {
  return [];
};

const getCellValue = (cellAddress: ICellAddress, sheet: IWorksheet): ICell => {
  return {
    value: '',
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

export { getAllCellsFromCellGroup, getCellValue };
