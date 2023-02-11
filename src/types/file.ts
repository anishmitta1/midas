import type { File } from 'formidable';
import type { WorkSheet, WorkBook, CellObject } from 'xlsx';

type IFile = File;

interface IWorksheet {
  name: string;
  sheet: WorkSheet;
}

type IWorkbook = WorkBook;

type ICell = CellObject;

export type { IFile, IWorkbook, IWorksheet };
