const express = require('express')
const fileUpload = require('express-fileupload')
const excel = require('exceljs')
const uniqid = require('uniqid')
const cors = require('cors')
const fs = require('fs')
const XLSX = require('xlsx');

const app = express()

app.use(cors())
app.use(fileUpload())

app.get('/check-health', (req, res) => {
	const path = __dirname;
	res.json({ status: 'ready!' })
})

app.post('/xlsx', (req, res) => {
	let file = req.files.file
	let filename = `./files/json/${uniqid()}.json`
	file.mv(filename, () => {
		let json = fs.readFileSync(filename, 'utf-8')
		const workbook = new excel.Workbook()
		const sheet = workbook.addWorksheet('MySheet')
		let data = JSON.parse(json)
		sheet.addRow().values = Object.keys(data[0])

		data.forEach(function(item) {
			let valueArray = []
			valueArray = Object.values(item)
			var row = []

			valueArray.forEach(function(item) {
				if (Array.isArray(item)) {
					row.push(item.join(', '))
					return
				}
				row.push(item)
			})

			sheet.addRow().values = row

		})
		let xlsx = `./files/xlsx/${uniqid()}.xlsx`
		workbook.xlsx.writeFile(xlsx).then(() => {
			res.json({file : xlsx})
		})
	});
})

app.post('/json', (req, res) => {

	//TODO handle invalid file format
	const file = req.files.document;

	//TODO handle duplicated id and insufficient memory space
	const filename = `./files/xlsx/${uniqid()}.xlsx`;

	file.mv(filename,(error) => {
		if (error)
			return res.status(500).send(error);

		//TODO handle not found file error here
		const workbook = XLSX.readFile(filename,  {sheetStubs: true});

		const sheet_name_list = workbook.SheetNames;
		let jsonPagesArray = [];
		sheet_name_list.forEach(function(sheet) {
				const jsonPage = {
					name: sheet,
					content: XLSX.utils.sheet_to_json(workbook.Sheets[sheet], {defval:""})
				};
				jsonPagesArray.push(jsonPage);
			});
		res.json(
			{
				data:jsonPagesArray
			}
		);
		});
	});

module.exports = app;

