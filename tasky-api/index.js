import dotenv from 'dotenv';
import express from 'express';
import tasksRouter from './api/tasks';

dotenv.config();

const app = express();

const port = process.env.PORT;

// 添加 JSON 解析中间件
app.use(express.json());

// 添加任务路由
app.use('/api/tasks', tasksRouter);

// 启动服务器
app.listen(port, () => {
  console.info(`Server running at ${port}`);
});
