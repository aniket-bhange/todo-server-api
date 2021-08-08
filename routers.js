const express = require('express');
const { TaskHandlers, UserHandlers } = require('./handler');
const { AuthMiddleware } = require('./middleware/auth_middleware');
const router = express.Router();
router.use(AuthMiddleware);
const routeDashboard = router.route('/dashboard');
const routeTaskList = router.route('/tasks')
const routeTaskEdit = router.route('/tasks/:id');
routeTaskList.post(TaskHandlers.Create);
routeTaskList.get(TaskHandlers.GetAll);
routeTaskEdit.put(TaskHandlers.Update);
routeTaskEdit.delete(TaskHandlers.Delete);
routeDashboard.get(UserHandlers.GetDashboard);

module.exports = router