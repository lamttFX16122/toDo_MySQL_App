import Search from './SearchChild';
import Sort from './SortChild';
const Control = () => {
    return (
        <div className="d-flex">
            {/* Search */}
            <div className="col-lg-6 col-md-6 col-sm-9 col-xs-9">
                <Search></Search>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-3 col-xs-3 px-2">
                <Sort></Sort>
            </div>
        </div>
    )
}
export default Control;