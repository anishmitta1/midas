import type { File } from 'formidable';
import type { WorkSheet, WorkBook } from 'xlsx';

type IFile = File;

interface IWorksheet {
  name: string;
  sheet: WorkSheet;
}

type IWorkbook = WorkBook;

export type { IFile, IWorkbook, IWorksheet };
