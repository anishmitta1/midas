import type { WorkSheet, WorkBook } from 'xlsx';

interface IWorksheet {
  name: string;
  sheet: WorkSheet;
}

type IWorkbook = WorkBook;

export type { IWorksheet, IWorkbook };
