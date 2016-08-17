var SearchAnimeList = React.createClass
({
    handleSort: function(e)
    {
        this.props.onReOrder(e.target.id, this.props.orderBy);
    },
    
    handleOrder: function(e)
    {
        this.props.onReOrder(this.props.orderBy, e.target.id);
    },
    
    handleSearch: function(e)
    {
        this.props.onSearch(e.target.value);
    },
    
    render: function()
    {
        return (
            <div className="row">
                <div className="col-sm-offset-3 col-sm-6">
                    <div className="input-group">
                        <input id="SearchAnimeList" onChange={this.handleSearch} placeholder="Search" type="text" className="form-control" aria-label="Search Anime List" />
                        <div className="input-group-btn">
                            <button type="button" className="btn btn-primary dropdown-toggle"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Sort by: <span className="caret"></span>
                            </button>
                            <ul className="dropdown-menu dropdown-menu-right">
                                <li><a href="#" id="animeTitle" onClick={ this.handleSort }>Anime Title { (this.props.orderBy === 'animeTitle') ? <span className="glyphicon glyphicon-ok"></span>: null }</a></li>
                                <li><a href="#" id="animeAuthor" onClick={ this.handleSort }>Author { (this.props.orderBy === 'animeAuthor') ? <span className="glyphicon glyphicon-ok"></span>: null }</a></li>
                                <li><a href="#" id="animeDateAired" onClick={ this.handleSort }>Date Aired { (this.props.orderBy === 'animeDateAired') ? <span className="glyphicon glyphicon-ok"></span>: null }</a></li>
                                <li><a href="#" id="animeSummary" onClick={ this.handleSort }>Summary { (this.props.orderBy === 'animeSummary') ? <span className="glyphicon glyphicon-ok"></span>: null }</a></li>
        
                                <li role="separator" className="divider"></li>
        
                                <li><a href="#" id="asc" onClick={ this.handleOrder }>Asc { (this.props.orderDir === 'asc') ? <span className="glyphicon glyphicon-ok"></span>: null }</a></li>
                                <li><a href="#" id="desc" onClick={ this.handleOrder }>Desc { (this.props.orderDir === 'desc') ? <span className="glyphicon glyphicon-ok"></span>: null }</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});