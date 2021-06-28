const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

const app = express();
const db = require('./config/databases');
const Student = require('./models/student');
const path = require('path')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition: {
      info: {
        title: "Library API",
        version: '1.0.0',
      },
    },
    apis: ["routes/student.js"],
  };


const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));



db.authenticate().then(()=>
    console.log('Database Connected')
).catch(err => 
    console.log('Error' + err)
)


app.use('/',require('./routes/student'))


const PORT =   process.env.PORT ||5000;

app.listen(PORT,console.log(`server is started at ${PORT}`))