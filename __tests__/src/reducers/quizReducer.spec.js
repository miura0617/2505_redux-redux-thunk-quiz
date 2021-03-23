import { quizReducer } from '../../../src/reducers/quizReducer';
import {
    FETCH_QUIZZES_REQUEST,
    FETCH_QUIZZES_SUCCESS,
    FETCH_QUIZZES_FAILURE
} from '../../../src/actions/quizActionCreator';
import { iteratee } from 'lodash';

describe('quizReducerのテスト', () => {
    it('action.type === FETCH_QUIZZES_REQUESTのとき', () => {
        const action = {
            type: FETCH_QUIZZES_REQUEST
        };

        const newState = quizReducer(undefined, action);

        expect(newState).toStrictEqual(
            {
                isLoading: true,
                quizzes: [],
                error: null
            }
        );
    });

    it('action.type === FETCH_QUIZZES_SUCCESSのとき', () => {
        const dummyQuizData = [
            {
            question: 'a',
            correct_answer: 'b',
            incorrect_answers: ['a', 'b', 'c']
            }
        ];
        const action = {
            type: FETCH_QUIZZES_SUCCESS,
            data: dummyQuizData
        };
        const currentState = {
            isLoading: true,
            quizzes: [],
            error: 'dummy error'
        };

        const newState = quizReducer(currentState, action);

        expect(newState).toStrictEqual(
            {
                isLoading: false,
                quizzes: dummyQuizData,
                error: null
            }
        );
    });

    it('action.type === FETCH_QUIZZES_FAILUREのとき', () => {
        const dummyErrorMessage = 'dummy error';
        const action = {
            type: FETCH_QUIZZES_FAILURE,
            error: dummyErrorMessage
        };
        const currentState = {
            isLoading: true,
            quizzes: [],
            error: null
        };

        const newState = quizReducer(currentState, action);

        expect(newState).toStrictEqual(
            {
                isLoading: false,
                quizzes: [],
                error: dummyErrorMessage
            }
        );
    });
});