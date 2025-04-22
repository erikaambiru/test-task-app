import { TaskStatus, TaskPriority } from '../types/Task';

export const gradients = {
  header: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
  todo: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  inProgress: 'linear-gradient(135deg, #0093E9 0%, #80D0C7 100%)',
  done: 'linear-gradient(135deg, #06BEB6 0%, #48B1BF 100%)',
  lowPriority: 'linear-gradient(135deg, #74EBD5 0%, #9FACE6 100%)',
  mediumPriority: 'linear-gradient(135deg, #C9D6FF 0%, #E2E2E2 100%)',
  highPriority: 'linear-gradient(135deg, #FBAB7E 0%, #F7CE68 100%)',
  darkMode: 'linear-gradient(135deg, #434343 0%, #000000 100%)'
};

export const statusColorMap: Record<TaskStatus, string> = {
  'todo': 'purple',
  'in-progress': 'teal',
  'done': 'cyan'
};

export const priorityColorMap: Record<TaskPriority, string> = {
  'low': 'cyan',
  'medium': 'purple',
  'high': 'red'
};

export const getGradient = (type: string, priority?: TaskPriority) => {
  switch(type) {
    case 'header': return gradients.header;
    case 'todo': return gradients.todo;
    case 'inProgress': return gradients.inProgress;
    case 'done': return gradients.done;
    case 'priority':
      if (priority === 'low') return gradients.lowPriority;
      if (priority === 'medium') return gradients.mediumPriority;
      if (priority === 'high') return gradients.highPriority;
      return gradients.lowPriority;
    default: return gradients.header;
  }
};

export const getPriorityGradient = (priority: TaskPriority) => {
  switch(priority) {
    case 'low': return gradients.lowPriority;
    case 'medium': return gradients.mediumPriority;
    case 'high': return gradients.highPriority;
    default: return gradients.lowPriority;
  }
};

export const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      type: 'spring',
      stiffness: 300,
      damping: 25
    }
  },
  hover: { 
    y: -5,
    boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
    transition: { 
      type: 'spring',
      stiffness: 500,
      damping: 25
    }
  },
  drag: {
    boxShadow: "0 15px 25px rgba(0,0,0,0.15)",
    scale: 1.02,
    transition: { 
      type: 'spring',
      stiffness: 500,
      damping: 25
    }
  }
};
