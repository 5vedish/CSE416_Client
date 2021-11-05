interface Question {
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
}
