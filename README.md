# JSON to XLSX
NodeJs microapp to convert your json to xlsx.

## Installing / Getting started

```shell
git clone https://github.com/gmoqa/json-to-xlsx.git
cd json-to-xlsx
npm install
```

setup your .env file 

run `bin/www`

Now send to `POST /xlsx` with your `file` `.json`  and the response looks like this. 

```json
{
    "file": "http://localhost:8000/files/xlsx/1m1klsh7qbjplnm63j.xlsx"
}
```

You can send to `POST /json` with your `file` `.xlsx` and the response looks like this. 

```json
{
    "data": [
      {
        "name": "pageOne",
        "content": {
          "item1": "value",
          "item2": "value"
        }
      },
      {
         "name": "pageTwo",
         "content": {
         "item1": "value",
         "item2": "value"
         }
       }
    ]
}
```