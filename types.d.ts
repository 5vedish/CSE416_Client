interface User {
    displayName: string;
    currency: number;
    experience: number;
    level: number;
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
    quizzes: Quiz[];
    title: string;
    rating: number;
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
