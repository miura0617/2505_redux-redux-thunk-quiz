import React from 'react';
import Button from '../Button/Button';

// Homeはreact routerで呼ばれるので、
// reaact routerのprops(history/location/match)を受け取れる
const Home = ({history}) => {

    console.log(history, '@@@@@@@@@@');

    return (
        <div>
            <h1>ホーム</h1>
            <Button onClickHandler={() => {
                // history.push()を使うと、SPAでもページ履歴を使ってページ戻ったりできる
                history.push('/quiz');
            }}>
                クイズページへ移動
            </Button>
        </div>
    );
};


export default Home;
