To-Do List Application
Features:
 - Add, edit, delete, and mark tasks as completed.
 - Form validation to ensure both the task name and description are filled.
 - Tasks persist between sessions using localStorage.
 - The ability to edit and update existing tasks.
Instructions:
1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd state-management
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the app**:
   ```bash
   npm run dev
   ```
   This will start the app locally on `http://localhost:5173`.

4. **Usage**:
   - Add a new task by filling out the form and submitting.
   - Edit an existing task by clicking on the 'Edit' button next to the task.
   - Delete tasks with the 'Delete' button.
   - Mark tasks as completed/incomplete by clicking on the 'Mark Complete' or 'Mark Incomplete' button.
   - All tasks will persist across browser sessions using localStorage.
Folder Structure:
- `src/`
  - `App.js` – Main component that handles state and renders `TaskForm` and `TaskList`.
  - `TaskList.js` – Displays a list of tasks.
  - `TaskForm.js` – Form for adding and editing tasks.
  - `TaskItem.js` – Component for each individual task, allowing for editing and deleting.
  - `App.css` – Basic styling for the app.
Technologies Used:
- React Vite
- localStorage for task persistence
- Basic CSS for styling
License:
MIT License.
---
Thank you for checking out the To-Do List application! Feel free to modify it as per your requirements and extend its functionality.