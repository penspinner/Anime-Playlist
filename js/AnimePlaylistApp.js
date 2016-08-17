var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('lodash');

var AnimePlaylist = require('./AnimePlaylist');
var AddAnime = require('./AddAnime');
var SearchAnimes = require('./SearchAnimes');

var MainInterface = React.createClass
({
    getInitialState: function()
    {
        return 
        {
            animeBodyVisible: false,
            orderBy: 'animeTitle',
            orderDir: 'asc',
            queryText: '',
            myAnimes: []
        }
    },
    
    componentDidMount: function()
    {
        this.serverRequest = $.getJSON('./js/data.json', function(result)
        {
            var tempAnimes = result;
            this.setState({myAnimes: tempAnimes});
        });
    },
    
    componentWIllUnmount: function()
    {
        this.serverRequest.abort();
    },
    
    deleteMessage: function()
    {
        
    },
    
    toggleAddDisplay: function()
    {
        var tempVisibility = !this.state.animeBodyVisible;
        this.setState({animeBodyVisible: tempVisibility});
    },
    
    addAnime: function(anime)
    {
        var tempAnimes = this.state.myAnimes;
        tempAnimes.push(anime);
        this.setState({myAnimes: tempAnimes});
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
        var myAnimes = this.state.myAnimes;
        
        myAnimes.forEach(function(item)
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
            return 
            (
                <AnimePlaylist 
                    key = {index}
                    singledItem = {item}
                    whichItem = {item}
                    onDelete = {this.deleteMessage}
                />
            )
        }).bind(this);
        
        return
        (
            <div className="interface">
                <AddAnime
                    bodyVisible = {this.state.animeBodyVisible}
                    handleToggle = {this.toggleAddDisplay}
                    addAnime = {this.addItem}
                />
                <SearchAnimes
                    orderBy = {this.state.orderBy}
                    orderDir = {this.state.orderDir}
                    onReOrder = {this.reOrder}
                    onSearch = {this.searchAnimes}
                />
            </div>
            <ul className="item-list media-list">{filteredAnimes}</ul>
        )
    }
});

ReactDOM.render(<MainInterface />, document.getElementById('animePlaylist'));
