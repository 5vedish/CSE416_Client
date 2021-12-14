interface User {
    id: number;
    displayName: string;
    currency: number;
    experience: number;
    level: number;
    likedPlatforms: User[];
    // createdPlatforms: {
    //     id: number;
    //     title: string;
    //     rating: number;
    // };
}

interface Question {
    id: number;
    choices: string[];
    correctChoice: number;
    question: string;
}

interface Quiz {
    id: number;
    title: string;
    difficulty: string;
    questions: Question[];
    maxTime: number;
}

interface Platform {
    id: number;
    owner: string;
    ownerId: number;
    quizzes: Quiz[];
    title: string;
    yourRating: number;
    averageRating: number;
    likers: User[];
    comments: Comment[];
}

interface QuizAttempt {
    userId: number;
    questionsCompleted: number;
    questionsCorrect: number;
    totalQuestions: number;
    startTime: Date;
    endTime: Date;
    difficulty: string;
}

interface Badge {
    id: number;
    badgeId: number;
    name: string;
    description: string;
    tier: number;
    imageUrl: string;
    cost: number;
}

interface Comment {
    id: number;
    author: { id: number; displayName: string };
    createdAt: Date;
    content: string;
}

interface Statistics {
    lifetime: number[];
    easy: number[];
    med: number[];
    hard: number[];
}
