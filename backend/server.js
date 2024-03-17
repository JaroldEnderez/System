const express = require("express");
const dotenv = require("dotenv");
const {chats} = require("./data/data");
const connectDB = require("./config/db");
const userRoutes = require('./routes/userRoutes')
const projectRoutes = require('./routes/projectRoutes')
const taskRoutes = require('./routes/taskRoutes')
const {notFound,errorHandler} = require('./middleware/errorMiddlewares')

dotenv.config();
connectDB();
const app = express();
app.use(express.json())
app.use('/api/user', userRoutes)
app.use('/api/project', projectRoutes)
app.use('/api/tasks', taskRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 7000

app.listen(`${PORT}`, console.log(`Server started on PORT ${PORT}`));

  
