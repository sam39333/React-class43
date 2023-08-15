# TODO App


This React app represents a dynamic and interactive To-Do application. Users can manage their tasks through different stages using status columns, such as "Not Started," "Working on it," "Stuck," and "Done." The app offers the ability to add, edit, and delete tasks, assign due dates, and categorize tasks using tags like "Work," "Personal," "School," and "Non-profit." The user interface is designed to be user-friendly, enabling users to easily update task details, change task statuses, and organize tasks based on filters like tags. The app is built using modern React functional components and utilizes Redux for efficient state management, allowing tasks to be managed seamlessly across the application's components.



# File Structure

React-class43/
├── week4/
│   ├── todo-app/
│   │   ├── routes/
│   │   │   ├── columnRoutes.js
│   │   │   └── userRoutes.js
│   │   ├── src/
│   │   │   ├── pages/
│   │   │   │   ├── HomePage.js
│   │   │   │   ├── KanbanViewPage.js
│   │   │   │   └── NamePage.js
│   │   │   ├── redux/
│   │   │   │   ├── user/
│   │   │   │   │   ├── userActions.js
│   │   │   │   │   ├── userActionTypes.js
│   │   │   │   │   └── userReducer.js
│   │   │   │   ├── columnsSlice.js
│   │   │   │   └── store.js
│   │   │   ├── App.css
│   │   │   ├── App.js
│   │   │   └── index.js
│   │   └── server.js

