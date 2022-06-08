const express=require("express")
const formidable = require("formidable")

const app = express()
app.use(express.static("static"))

app.post('/upload', function (req, res) {

    let form = formidable({});

    form.keepExtensions = true
    form.multiples = true
    form.uploadDir = __dirname + '/static/upload/' // folder do zapisu zdjęcia
    form.parse(req, function (err, fields, files) {

        console.log("----- przesłane pola z formularza ------");

        console.log(fields);

        console.log("----- przesłane formularzem pliki ------");

        console.log(files);

        res.send("plik przesłany!")
    });
});


app.listen(3000,()=>console.log("serwer działa na porcie 3000"))