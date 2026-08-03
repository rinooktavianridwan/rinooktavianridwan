// Technology data aligned with backend schema
// Backend: { name, description, iconUrl, color, isVisible, category }

export interface Technology {
    id: number;
    name: string;
    iconUrl: string; // Using emoji for mock data
    color: string;
    category: 'Frontend' | 'Backend' | 'Database' | 'DevOps' | 'Tools' | 'Mobile';
    isVisible: boolean;
}

export const technologies: Technology[] = [
    // Frontend
    { id: 1, name: 'React', iconUrl: '⚛️', color: '#61DAFB', category: 'Frontend', isVisible: true },
    { id: 2, name: 'TypeScript', iconUrl: '📘', color: '#3178C6', category: 'Frontend', isVisible: true },
    { id: 3, name: 'JavaScript', iconUrl: '💛', color: '#F7DF1E', category: 'Frontend', isVisible: true },
    { id: 4, name: 'Next.js', iconUrl: '▲', color: '#000000', category: 'Frontend', isVisible: true },
    { id: 5, name: 'Tailwind CSS', iconUrl: '🎨', color: '#06B6D4', category: 'Frontend', isVisible: true },
    { id: 6, name: 'HTML5', iconUrl: '🌐', color: '#E34F26', category: 'Frontend', isVisible: true },
    { id: 7, name: 'CSS3', iconUrl: '🎭', color: '#1572B6', category: 'Frontend', isVisible: true },
    { id: 8, name: 'Vite', iconUrl: '⚡', color: '#646CFF', category: 'Frontend', isVisible: true },

    // Backend
    { id: 9, name: 'Node.js', iconUrl: '🟢', color: '#339933', category: 'Backend', isVisible: true },
    { id: 10, name: 'NestJS', iconUrl: '🔺', color: '#E0234E', category: 'Backend', isVisible: true },
    { id: 11, name: 'Express', iconUrl: '🚂', color: '#000000', category: 'Backend', isVisible: true },
    { id: 12, name: 'PHP', iconUrl: '🐘', color: '#777BB4', category: 'Backend', isVisible: true },
    { id: 13, name: 'Laravel', iconUrl: '🔴', color: '#FF2D20', category: 'Backend', isVisible: true },
    { id: 14, name: 'REST API', iconUrl: '🔌', color: '#009688', category: 'Backend', isVisible: true },
    { id: 15, name: 'GraphQL', iconUrl: '📊', color: '#E10098', category: 'Backend', isVisible: true },

    // Database
    { id: 16, name: 'PostgreSQL', iconUrl: '🐘', color: '#4169E1', category: 'Database', isVisible: true },
    { id: 17, name: 'MySQL', iconUrl: '🐬', color: '#4479A1', category: 'Database', isVisible: true },
    { id: 18, name: 'MongoDB', iconUrl: '🍃', color: '#47A248', category: 'Database', isVisible: true },
    { id: 19, name: 'Redis', iconUrl: '📮', color: '#DC382D', category: 'Database', isVisible: true },
    { id: 20, name: 'TypeORM', iconUrl: '💾', color: '#FE0803', category: 'Database', isVisible: true },

    // DevOps
    { id: 21, name: 'Docker', iconUrl: '🐳', color: '#2496ED', category: 'DevOps', isVisible: true },
    { id: 22, name: 'Git', iconUrl: '🌿', color: '#F05032', category: 'DevOps', isVisible: true },
    { id: 23, name: 'GitHub', iconUrl: '🐙', color: '#181717', category: 'DevOps', isVisible: true },
    { id: 24, name: 'Linux', iconUrl: '🐧', color: '#FCC624', category: 'DevOps', isVisible: true },
    { id: 25, name: 'CI/CD', iconUrl: '🔄', color: '#4A90E2', category: 'DevOps', isVisible: true },
    { id: 26, name: 'Nginx', iconUrl: '🌐', color: '#009639', category: 'DevOps', isVisible: true },

    // Tools
    { id: 27, name: 'VS Code', iconUrl: '📝', color: '#007ACC', category: 'Tools', isVisible: true },
    { id: 28, name: 'Postman', iconUrl: '📬', color: '#FF6C37', category: 'Tools', isVisible: true },
    { id: 29, name: 'Figma', iconUrl: '🎨', color: '#F24E1E', category: 'Tools', isVisible: true },
    { id: 30, name: 'npm', iconUrl: '📦', color: '#CB3837', category: 'Tools', isVisible: true },
];
