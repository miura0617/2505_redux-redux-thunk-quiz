import React from 'react';
import { Link } from 'react-router-dom';
// Quizコンポーネントをreact-reduxを使ってコンテナ化するためconnectを読み込み
import { connect } from 'react-redux';
// action createrも読み込み
import { fetchQuizzes } from '../../actions/quizActionCreator';
import Button from '../Button/Button';
import './Quiz.css';


class Quiz extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentIndex: 0,
            numberOfCorrects: 0
        };
    }

    componentDidMount() {
        this.restart();
    }

    restart() {
        // stateをリセット
        this.setState({
            currentIndex: 0,
            numberOfCorrects: 0
        });

        // react-reduxでコンテナ化したので、redux内のstateのquizzesをpropsで受け取ってクイズデータを取得する
        this.props.fetchQuizzes();

    }

    selectAnswer(quiz, answer) {
        let { currentIndex, numberOfCorrects } = this.state;
        const isCorrect = quiz.judgeCorrectAnswer(answer);

        if(isCorrect) {
            numberOfCorrects++;
            alert('Correct answer!!');
        }else{
            alert(`Wrong answer... (The correct answer is "${quiz.correctAnswer}"`);
        }
        currentIndex++;

        this.setState({
            currentIndex,
            numberOfCorrects
        });
    }


    render() {
        const { currentIndex } = this.state;
        const { quizzes } = this.props.quizInfo;

        // 【読込中】quizzesが0個の場合に読込中
        if(quizzes.length === 0) {
            return this.renderLoading();
        }

        // 【クイズ中】
        if(quizzes.length > 0 && currentIndex < quizzes.length)  {
            return this.renderQuiz();
        }

        // 【クイズ結果】
        if (quizzes.length > 0 && currentIndex >= quizzes.length) {
            return this.renderResult();
        }
    }

    renderLoading() {
        return (
            <div>
                <h1>クイズページ</h1>
                <p>Now loading...</p>
                <hr/>
                <Link to="/">トップページへ</Link>
            </div>
        );
    }

    renderQuiz() {
        const { currentIndex } = this.state;
        const { quizzes } = this.props.quizInfo;

        const quiz = quizzes[currentIndex];
        // shuffleAnswers()でincorrectAnswerとcorrectAnswerが混じった配列を取得
        const answers = quiz.shuffleAnswers().map((answer, index) => {
            return (
                <li key={index}>
                    <Button
                        onClickHandler={() => { this.selectAnswer(quiz, answer) }}
                    >
                        {answer}
                    </Button>
                </li>
            );
        });

        return(
            <div>
                <h1>クイズページ</h1>
                <div>
                    <p>{quiz.question}</p>
                    <ul className="QuizList">{answers}</ul>
                </div>
                <hr/>
                <Link to="/">トップページへ</Link>
            </div>
        );
    }

    renderResult() {
        const { numberOfCorrects } = this.state;
        const { quizzes } = this.props.quizInfo;

        return (
            <div>
                <h1>クイズページ</h1>
                <div>
                    <p id="result">{`${numberOfCorrects}/${quizzes.length} corrects.`}</p>
                    <Button
                        onClickHandler={() => {this.restart()}}
                    >
                        Restart
                    </Button>
                </div>
                <hr/>
                <Link to="/">トップページへ</Link>
            </div>
        );
    }

}

// Quizコンポーネントをreact-reduxを使ってコンテナ化するためconnectを読み込み
const mapStateToProps = (state) => {
    return {
        quizInfo: state.quizInfo
    };
};

const mapDispatchToProps = {
    fetchQuizzes
};

// // 以下は、上記と同じ処理になる
// const mapDispatchToProps = (dispatch) => {
//     return {
//         fetchQuizzes: () => {
//             dispatch( fetchQuizzes() );
//         }
//     };
// };


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Quiz);