export default class AddTodo {

    constructor(
        title,
        desc = '',
        dueDate = null,
        priority = 'low',
        addedToProjectId
    ) {
        //数据校验
        if (title.trim() === '') throw new Error('title can\'t be empty!');
        if (
            !addedToProjectId || 
            typeof addedToProjectId !== 'string' ||
            !addedToProjectId.startsWith('Project-')
        ) throw new Error('target project ID is invalid!')

        this.id = `todo-${Date.now()}-${Math.floor(Math.random()*100)}`;
        this.title = title;
        this.description = desc;
        this.dueDate = dueDate;
        this.priority = priority;
        this.isCompleted = false;
        this.addedToProjectId = addedToProjectId;
    }
    //切换完成状态
    toggleCompleted() {
        this.isCompleted = !this.isCompleted;
    }

    //移动todo（切换project）
    moveTodo(targetProjectId, allProjects) {
        //验证id有效性
        if (!targetProjectId) {
            console.error('Failed to move! empty project ID detected!')
            return false;
        }
        if (typeof targetProjectId !== 'string') {
            console.error('Failed to move! project ID 必须是字符串！');
            return false;
        }
        if (!targetProjectId.startsWith('Project-')) {
            console.error('Fail to move! project ID must start with "Project-"!');
            return false;
        }
        const isProjectIdExisted = allProjects.some(projectId => projectId === targetProjectId);
        if (!isProjectIdExisted) {
            console.error('Failed to move! project has been deleted or never exsited');
            return false;
        }
        this.addedToProjectId = targetProjectId;
        console.log('todo移动成功');
        return true;
    }
    //修改todo信息，这里不允许调整归属project，顾不传入projectid
    editTodo(
        title,
        desc = '',
        dueDate = null,
        priority = 'low'
    ) {

    }
}

const todo = new AddTodo('title','this is desc', 'today','low', 'Project-1');

console.log(todo);