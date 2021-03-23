import _ from 'lodash';
import he from 'he';
import QuizFetcher from '../data_fetchers/QuizFetcher';


class Quiz {
    // constructor(quizData) {
    //     const question = quizData.question;
    //     const correctAnswer = quizData.correctAnswer;
    //     const incorrectAnswers = quizData.incorrectAnswers;
    //     this._question = question;
    //     this._correctAnswer = correctAnswer;
    //     this._incorrectAnswers = [...incorrectAnswers]; // コピーを渡す
    // }

    constructor({ question, correctAnswer, incorrectAnswers }) {
        this._question = question;
        this._correctAnswer = correctAnswer;
        this._incorrectAnswers = [...incorrectAnswers]; // コピーを渡す
    }


    // getキーワードを使って、getterを実装できる
    get question() {
        return this._question;
    }

    get correctAnswer() {
        return this._correctAnswer;
    }
    
    shuffleAnswers() {
        // _.shuffleの_(アンダーバー)は、Lo Dashというライブラリを使っている
        // Lo Dashについては、「https://lodash.com/docs/#shuffle」
        return _.shuffle([
            this._correctAnswer,
            ...this._incorrectAnswers
        ]);
    }

    judgeCorrectAnswer(answer) {
        return answer === this._correctAnswer;
    }

    static async fetchAndCreateQuizzes() {
        const quizDataList = await QuizFetcher.fetch();

        return Quiz.createQuizInstancesWithData(quizDataList.results);
        // return quizDataList.results.map(result => {
        //     return {
        //         question: he.decode(result.question),
        //         correctAnswer: he.decode(result.correct_answer),
        //         incorrectAnswers: result.incorrect_answers.map(str => he.decode(str))
        //     };
        // })
        // .map(quizData => {
        //     return new Quiz(quizData);
        // })
    }

    static createQuizInstancesWithData(quizDataList) {
        return quizDataList.map(quizData => {
            return {
                question: he.decode(quizData.question),
                correctAnswer: he.decode(quizData.correct_answer),
                incorrectAnswers: quizData.incorrect_answers.map(str => he.decode(str))
            };
        })
        .map(quizData => {
            return new Quiz(quizData);
        })
    }

}

export default Quiz;
