import express from 'express';
import formidable from 'formidable';
import { readFile } from 'xlsx';
import { IFile, IWorkbook, IWorksheet } from '@/types';
import ExcelJS from 'exceljs';
import pptxgen from 'pptxgenjs';
import { readFileSync } from 'fs';

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

router.post('/report', async (req, res) => {
  // const form = new formidable.IncomingForm();

  // form.parse(req, async (err, fields, files) => {
  //   if (err) {
  //     res.status(500);
  //   }
  //   const _workbook = new ExcelJS.Workbook();
  //   const workbook = await _workbook.xlsx.readFile(
  //     (files['payloadFile'] as IFile).filepath
  //   );

  //   console.log(workbook.worksheets[0].getRow(1).getCell('H').style);
  //   console.log(workbook.worksheets[0].getRow(1).getCell('H').value);
  //   return;
  // });

  let pptx = new pptxgen();

  let slide = pptx.addSlide();

  // slide.addText('hello');

  // var slide = pptx.addSlide();
  var opts = { x: 1.0, y: 1.0, fontSize: 42, color: '00FF00' };
  slide.addText('Hello World!', opts);
  const fileName = 'Browser-PowerPoint-Demo.pptx';

  await pptx.writeFile({ fileName });
  const file = readFileSync(
    '/Users/anishsaimitta/Desktop/Personal/repos/midas/' + fileName,
    'binary'
  );

  // res.writeHead(200, {
  //   'Content-disposition': 'attachment;filename=' + fileName,
  //   'Content-Length': data.length,
  // });
  // res.end(new Buffer(data, 'binary'));
  // await pptx.writeFile({ fileName });

  // const ab = await pptx.write({ outputType: '' });

  // res.setHeader('Content-Length', file.length);
  // res.write(file, 'binary');
  // res.end();
  res.sendFile('/Users/anishsaimitta/Desktop/Personal/repos/midas/' + fileName);
});

export default router;
