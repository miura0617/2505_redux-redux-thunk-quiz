import React from 'react';
import './Button.css';


// クラスコンポーネントで作成
const Button = (props) => {

    let { onClickHandler } = props;

    // onClickHandlerに関数以外の値がセットされていたら、
    // ボタンクリック時にエラーを出さないために何も中身のない
    // 関数を実行する
    if (typeof onClickHandler !== 'function') {
        onClickHandler = () => {};
    }

    return (
        <div
            className="Button"
            onClick={onClickHandler}
        >
            {props.children}
        </div>
    );
};

export default Button;
