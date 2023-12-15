export interface ScorePackageInterface {
    id: number;
    nickname: string;
    score: number;
    date: Date;
    quiz: {
        id: string;
        title: string;
        description: string;
        image: string;
    };
}