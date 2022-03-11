import PropTypes from "prop-types";

function PathPresenter(props) {
    return (
        <div className="App">
            {
                props.loading ? <p>맵 나왔다</p>
                : <h2>로드 중...</h2>
                }
        </div>
    )
}

PathPresenter.propTypes = {
    // ex) prop: PropTypes.type.isRequired,
    loading: PropTypes.bool.isRequired,
};

export default PathPresenter;