import { Spinner } from "react-activity";
import "react-activity/dist/Spinner.css";

const PageVisitCounter = (props) => {
    const { currentPageCount } = props;
    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10em' }}>
            <p style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            Page Visitor Count: {currentPageCount === null ? <Spinner style={{ marginLeft: 10 }} /> : currentPageCount}
            </p>
        </div>
    )
}

export default PageVisitCounter;