
const ShowError = ({ errorStatus, setErrorStatus }) => {
    return (
        <>
            <div className="overlay"></div>
            <div className="alertArea" >
                <i className="fa-solid fa-xmark" onClick={() => { setErrorStatus({ present: false }) }}></i>
                <h1>{errorStatus.code}</h1>
                <p>{errorStatus.message}</p>
            </div>
        </>
    )
}
export default ShowError;