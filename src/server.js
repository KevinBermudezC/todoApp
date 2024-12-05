import express from 'express';
import path, {dirname} from 'path';
import {fileURLToPath} from 'url';
import authRoutes from "./routes/authRoutes.js";
import todoRoutes from './routes/todoRoutes.js'

const app = express();
const PORT = process.env.PORT || 5000;

//Get the file path from the url of the current module
const __filename = fileURLToPath(import.meta.url);

//Get the directory path from the file path
const __dirname = dirname(__filename);

//middleware
app.use(express.json())

// Serves the HTML file from the /public directory
// Tells express to serve all files from the public folder as static assets / file. Any requests for the css files will be resolved to the public directory.
app.use(express.static(path.join(__dirname,'../public')));

//serving up the html file from the public folder
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname,'public', 'index.html'))
})

//Routes
app.use('/auth', authRoutes);

//todos routes
app.use('/todos', todoRoutes);

app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`);
})