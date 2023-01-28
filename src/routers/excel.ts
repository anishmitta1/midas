import express from 'express';
import formidable from 'formidable';
import { readFile } from 'xlsx';
import { PayloadKeys } from '../constants';

import type { File } from 'formidable';
import type { IWorkbook, IWorksheet } from '@/types';

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

router.post('/validate', (req, res) => {
  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.status(500);
    }
    const workbook = readFile(
      (files[PayloadKeys.PAYLOAD_FILE] as File).filepath
    );
    const worksheets = getWorksheets(workbook);
    worksheets.forEach((workSheet) => {
      console.log(`Showing contents of ${workSheet.name}`);
      console.log(workSheet.sheet);
      res.status(200);
    });
  });
});

export default router;
