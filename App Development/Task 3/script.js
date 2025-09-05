      let tasks = [];
        let taskIdCounter = 1;

        // In-memory storage for this demo (replaces localStorage)
        const storage = {
            data: {
                todoTasks: [],
                taskIdCounter: 1
            },
            
            getItem(key) {
                return JSON.stringify(this.data[key] || null);
            },
            
            setItem(key, value) {
                this.data[key] = JSON.parse(value);
            }
        };

        // Load tasks on page load
        document.addEventListener('DOMContentLoaded', function() {
            loadTasks();
            
            // Add Enter key support
            document.getElementById('taskInput').addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    addTask();
                }
            });
            
            // Focus input on load
            document.getElementById('taskInput').focus();
        });

        function loadTasks() {
            const savedTasks = storage.getItem('todoTasks');
            const savedCounter = storage.getItem('taskIdCounter');
            
            if (savedTasks && savedTasks !== 'null') {
                tasks = JSON.parse(savedTasks);
            }
            
            if (savedCounter && savedCounter !== 'null') {
                taskIdCounter = parseInt(JSON.parse(savedCounter));
            }
            
            renderTasks();
        }

        function saveTasks() {
            storage.setItem('todoTasks', JSON.stringify(tasks));
            storage.setItem('taskIdCounter', JSON.stringify(taskIdCounter));
        }

        function addTask() {
            const input = document.getElementById('taskInput');
            const taskText = input.value.trim();
            
            if (taskText === '') {
                input.focus();
                return;
            }
            
            const task = {
                id: taskIdCounter++,
                text: taskText,
                completed: false,
                createdAt: new Date().toISOString()
            };
            
            tasks.unshift(task);
            input.value = '';
            
            saveTasks();
            renderTasks();
            
            // Focus back to input
            setTimeout(() => input.focus(), 100);
        }

        function toggleTask(taskId) {
            tasks = tasks.map(task => {
                if (task.id === taskId) {
                    return { ...task, completed: !task.completed };
                }
                return task;
            });
            
            saveTasks();
            renderTasks();
        }

        function deleteTask(taskId) {
            const taskElement = document.querySelector(`[data-task-id="${taskId}"]`);
            
            if (taskElement) {
                taskElement.classList.add('deleting');
                setTimeout(() => {
                    tasks = tasks.filter(task => task.id !== taskId);
                    saveTasks();
                    renderTasks();
                }, 300);
            }
        }

        function renderTasks() {
            const container = document.getElementById('tasksContainer');
            const taskStats = document.getElementById('taskStats');
            
            if (tasks.length === 0) {
                container.innerHTML = `
                    <div class="empty-state">
                        <div class="empty-state-icon">📝</div>
                        <h3>No tasks yet</h3>
                        <p>Add your first task above to get started on your productive journey!</p>
                    </div>
                `;
                taskStats.style.display = 'none';
                return;
            }
            
            // Show stats
            taskStats.style.display = 'block';
            const completedCount = tasks.filter(task => task.completed).length;
            const totalCount = tasks.length;
            const pendingCount = totalCount - completedCount;
            const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
            
            document.getElementById('totalCount').textContent = totalCount;
            document.getElementById('completedCount').textContent = completedCount;
            document.getElementById('pendingCount').textContent = pendingCount;
            document.getElementById('progressFill').style.width = `${progressPercentage}%`;
            
            // Render tasks
            container.innerHTML = tasks.map(task => `
                <div class="task-item ${task.completed ? 'completed' : ''}" data-task-id="${task.id}">
                    <div class="task-checkbox ${task.completed ? 'checked' : ''}" onclick="toggleTask(${task.id})"></div>
                    <div class="task-text ${task.completed ? 'completed' : ''}">${escapeHtml(task.text)}</div>
                    <button class="delete-btn" onclick="deleteTask(${task.id})" title="Delete task">×</button>
                </div>
            `).join('');
        }

        function escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }

        // Add some sample tasks for demo (remove in production)
        if (tasks.length === 0) {
            const sampleTasks = [
                "Review project documentation",
                "Complete task management app",
                "Plan weekend activities"
            ];
            
            sampleTasks.forEach(text => {
                tasks.push({
                    id: taskIdCounter++,
                    text: text,
                    completed: false,
                    createdAt: new Date().toISOString()
                });
            });
            
            // Mark first task as completed for demo
            if (tasks.length > 0) {
                tasks[2].completed = true;
            }
            
            saveTasks();
            renderTasks();
        }