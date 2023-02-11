import express from 'express';
import formidable from 'formidable';
import { readFile } from 'xlsx';
import { IFile, IWorkbook, IWorksheet } from '@/types';
import ExcelJS from 'exceljs';

const router = express.Router();

const getWorksheets = (workbook: IWorkbook): IWorksheet[] => {
  const worksheetNames = workbook.SheetNames;
  return worksheetNames.map((sheet) => {
    return {
      name: sheet,
      sheet: workbook.Sheets[sheet],
    };
  });
};

router.post('/report', (req, res) => {
  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.status(500);
    }
    const _workbook = new ExcelJS.Workbook();
    const workbook = await _workbook.xlsx.readFile(
      (files['payloadFile'] as IFile).filepath
    );

    // console.log(workbook.worksheets[0].columns[7].style);
    // console.log(workbook.worksheets[0].columns[7].fill);
    // console.log(workbook.worksheets[0].columns[7].values);
    console.log(workbook.worksheets[0].getRow(1).getCell('H').style);
    console.log(workbook.worksheets[0].getRow(1).getCell('H').value);
    // const workbook = readFile((files['payloadFile'] as IFile).filepath, {
    //   cellStyles: true,
    //   cellHTML: true,
    // });
    // const [worksheet] = getWorksheets(workbook);
    // console.log(worksheet.sheet.H1);
    // worksheets.forEach((workSheet) => {
    //   console.log(`Showing contents of ${workSheet.name}`);
    //   console.log(workSheet.sheet.A4);
    // });
    return;
  });

  res.status(200);
});

export default router;
