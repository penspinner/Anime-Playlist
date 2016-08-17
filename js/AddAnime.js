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