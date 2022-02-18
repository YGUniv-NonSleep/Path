import PropTypes from "prop-types";

function HomePresenter(props) {
    return (
        <div>
            <h2>초기 홈 화면</h2>
            <strong>{props.nowTime}</strong><br/>
            <label htmlFor="userid">
                id: <input 
                    id="userid"
                    type={"text"}
                    value={props.userId} 
                    onChange={props.onChange}
                />
                <button 
                    onClick={props.postId}
                >button</button>
            </label><br/>
            {props.getId}
        </div>
    )
}

HomePresenter.propTypes = {
    // ex) prop: PropTypes.type.isRequired,
    nowTime: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    userId: PropTypes.string,
    postId: PropTypes.func,
    getId: PropTypes.string,
};

export default HomePresenter;