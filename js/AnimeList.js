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