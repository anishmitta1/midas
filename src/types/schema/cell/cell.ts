type ICellAddress = string;
// Cell address validations will be needed, a utility perhaps.
// A valid cell address is defined by a string which contains
// x letters and then y numbers. Anything else is an invalid cell
// address

interface ICell {
  value: unknown;
  address: ICellAddress;
}

interface ICellGroup {
  startCell: ICell;
  endCell: ICell;
}

export type { ICellAddress, ICellGroup, ICell };
