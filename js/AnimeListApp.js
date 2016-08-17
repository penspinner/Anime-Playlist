var AnimeList = React.createClass
({
    handleDelete: function() 
    {
        this.props.onDelete(this.props.whichItem)
    },

    render: function() {
        return (
            <li className="anime-item media">
                <div className="media-left">
                    <button className="anime-delete btn btn-xs btn-danger" onClick={this.handleDelete}>
                    <span className="glyphicon glyphicon-remove"></span></button>
                </div>
                <div className="anime-info media-body">
                    <div className="anime-head">
                        <span className="anime-title">{this.props.singleItem.animeTitle}</span>
                        <span className="anime-date-aired pull-right">{this.props.singleItem.animeDateAired}</span>
                    </div>
                    <div className="owner-name">
                        <span className="label-item">Owner: </span>
                        {this.props.singleItem.animeAuthor}
                    </div>
                    <div className="apt-notes">{this.props.singleItem.animeSummary}</div>
                </div>
            </li>
        ) 
    } 
}); 



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


var AddAnime = React.createClass
({

    togglelistDisplay: function() 
    {
        this.props.handleToggle();
    },

    handleAdd: function(e) 
    {
        e.preventDefault();
        var tempItem = 
        {
            animeTitle: this.refs.inputAnimeTitle.value,
            animeAuthor: this.refs.inputAnimeAuthor.value,
            animeDateAired: this.refs.inputAnimeDateAired.value,
            animeSummary: this.refs.inputAnimeSummary.value
        } 
        this.props.addApt(tempItem);
    },

    render: function() 
    {

        var displayAnimeBody = {display: this.props.bodyVisible ? 'block' : 'none'};

        return (
            <div className="panel panel-primary">
                <div className="panel-heading apt-addheading" onClick={ this.togglelistDisplay }>
                    <span className="glyphicon glyphicon-plus"></span> Add Anime
                </div>
                <div className="panel-body" style={ displayAnimeBody }>
                    <form className="add-appointment form-horizontal" onSubmit={ this.handleAdd }>
                        <div className="form-group">
                            <label className="col-sm-2 control-label" for="animeTitle">Anime Title</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="animeTitle" ref="inputAnimeTitle" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 control-label" for="animeAuthor">Author</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="animeAuthor" ref="inputAnimeAuthor" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 control-label" for="animeDateAired">Date</label>
                            <div className="col-sm-4">
                                <input type="date" className="form-control" id="animeDateAired" ref="inputAnimeDateAired" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 control-label" for="animeSummary">Apt. Notes</label>
                            <div className="col-sm-10">
                                <textarea className="form-control" rows="4" cols="50" id="animeSummary" ref="inputAnimeSummary"></textarea>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-sm-offset-2 col-sm-10">
                                <button type="submit" className="btn btn-primary pull-right">Add Anime to list</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
});



var MainInterface = React.createClass
({
    getInitialState: function()
    {
        return {
            animeBodyVisible: false,
            orderBy: 'animeTitle',
            orderDir: 'asc',
            queryText: '',
            myAnimeList: []
        }
    },
    
    componentDidMount: function()
    {
        this.serverRequest = $.getJSON('./data/data.json', function(result)
        {
            var tempAnimes = result;
            this.setState({myAnimeList: tempAnimes});
        }.bind(this));
    },
    
    componentWIllUnmount: function()
    {
        this.serverRequest.abort();
    },
    
    removeFromList: function(item)
    {
        var animeList = this.state.myAnimeList;
        var newAnimeList = _.without(animeList, item);
        this.setState({myAnimeList: newAnimeList});
    },
    
    toggleAddDisplay: function()
    {
        var tempVisibility = !this.state.animeBodyVisible;
        this.setState({animeBodyVisible: tempVisibility});
    },
    
    addAnime: function(anime)
    {
        var tempAnimes = this.state.myAnimeList;
        tempAnimes.push(anime);
        this.setState({myAnimeList: tempAnimes});
    },
    
    reOrder: function(orderBy, orderDir)
    {
        this.setState({orderBy: orderBy, orderDir: orderDir});
    },
    
    searchAnimes: function(q)
    {
        this.setState({queryText: q});
    },
    
    render: function()
    {
        var filteredAnimes = [];
        var orderBy = this.state.orderBy;
        var orderDir = this.state.orderDir;
        var queryText = this.state.queryText;
        var myAnimeList = this.state.myAnimeList;
        
        myAnimeList.forEach(function(item)
        {
            if ((item.animeTitle.toLowerCase().indexOf(queryText) != -1) ||
               (item.animeAuthor.toLowerCase().indexOf(queryText) != -1) ||
               (item.animeDateAired.toLowerCase().indexOf(queryText) != -1) ||
               (item.animeSummary.toLowerCase().indexOf(queryText) != -1))
            {
                filteredAnimes.push(item);
            }
        });
        
        filteredAnimes = _.orderBy(filteredAnimes, function(item, index)
        {
            return item[orderBy].toLowerCase();
        }, orderDir);
        
        filteredAnimes = filteredAnimes.map(function(item, index)
        {
            return (
                <AnimeList 
                    key = {index}
                    singleItem = {item}
                    whichItem = {item}
                    onDelete = {this.removeFromList}
                />
            )
        }.bind(this));
        
        return (
            <div className="interface">
                <AddAnime
                    bodyVisible = {this.state.animeBodyVisible}
                    handleToggle = {this.toggleAddDisplay}
                    addAnime = {this.addItem}
                />
                <SearchAnimeList
                    orderBy = {this.state.orderBy}
                    orderDir = {this.state.orderDir}
                    onReOrder = {this.reOrder}
                    onSearch = {this.searchAnimes}
                />
                <ul className="item-list media-list">{filteredAnimes}</ul>
            </div>
        )
    }
});

ReactDOM.render(<MainInterface />, document.getElementById('animeList'));
