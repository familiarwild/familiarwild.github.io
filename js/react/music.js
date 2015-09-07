var ALBUMDATA = { albums: [
  {
    id: 1,
    name: "adin", 
    artwork_url: "http://41.media.tumblr.com/5141270ad8c9859401bee264af9aa864/tumblr_nsn3khpYnE1spncn8o1_1280.jpg",
    link_url: "http://www.google.com"
  },
  {
    id: 2,
    name: "john", 
    artwork_url: "http://41.media.tumblr.com/5141270ad8c9859401bee264af9aa864/tumblr_nsn3khpYnE1spncn8o1_1280.jpg",
    link_url: "http://www.google.com"
  },
  {
    id: 3,
    name: "hello", 
    artwork_url: "http://40.media.tumblr.com/66ae8777fdf58bbd975df9b040110661/tumblr_nsn3a35DWr1spncn8o1_500.jpg",
    link_url: "http://www.google.com"
  }

]};



var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;







var LayoutRow = React.createClass({
  getInitialState: function() {
    return {
      margin: "0px"
    };
  },
  render: function() {
    return (
      <div className="LayoutRow" style={{backgroundColor: this.props.row_data.color}}>
        { this.props.children }
      </div>
    );
  }
});

var LayoutContainer = React.createClass({
  getInitialState: function() {
    return {
      margin: "0px"
    };
  },
  render: function() {
    return (
      <div className="container">
        { this.props.children }
      </div>
    );
  }
});


var Album = React.createClass({

  getInitialState: function() {
    return {
      hasShadow: true,
      showDetails: true,
      linkAlbum: true
    };
  },
  render: function() {
    return (
      <div className="Album" >
        {this.props.data.name}
        <AlbumCover artwork_url={this.props.data.artwork_url} hasShadow={this.state.hasShadow} link_url={this.state.linkAlbum ? this.props.data.link_url : null} />
      </div>
    );
  }
});

var AlbumCover = React.createClass({
  handleClick: function(){
    if(this.props.link_url){
      document.location.href=this.props.link_url;
    }
  },
  render: function() {
    var class_name = "AlbumArt";
    if(this.props.hasShadow){
      class_name += " shadow";
    }
    if(this.props.link_url){
      class_name += " linked";
    }
    return (
      <div className={class_name} >
        <img src={this.props.artwork_url} onClick={this.handleClick} />
      </div>
    );
  }
});




var Albums = React.createClass({

  getInitialState: function() {
    return {
      albums: ALBUMDATA.albums
    };
  },

  componentDidMount: function() {
  //this.state
  //this.setState({})
  },

  render: function() {

    var albums = [];
    for (var i=0; i < this.state.albums.length; i++) {
      var a = this.state.albums[i];
      albums.push(<Album key={a.id} data={a} />);
    }
    return (
      <div className="Albums">
        {albums}
      </div>
    );
  }

});












var BlogItem = React.createClass({
  getInitialState: function() {
    return {
      isSmall: true
    };
  },
  getDefaultProps: function() {
    return {
      sizeInfo: {
        small:{
          width: "50px",
          font_size: "2px"
        },
        large:{
          width: "100px",
          font_size: "16px"
        }
      }
    };
  },
  render: function() {
    var imgs = null;
    if(this.props.data.photos && this.props.data.photos.length>0){
      imgs = <img src={this.props.data.photos[0].alt_sizes[3].url} />
    }
    var sizeInfo = this.props.sizeInfo.small;
    return (
   
       <div className="BlogItem" style={{width: sizeInfo.width, fontSize: sizeInfo.font_size}}>
        {imgs}
        <div dangerouslySetInnerHTML={{__html: this.props.data.caption }} />
        <div className="BlogArrow" />
       </div>

    );
  }
});


var BlogList = React.createClass({
  
  render: function() {
    var items = this.props.items.map(function(item, i) {
      return (
          <BlogItem key={item.id} data={item} />
      );
    }.bind(this));

    // for (var i=0; i < this.state.items.length; i++) {
    //   var itemdata = this.state.items[i];
    //   var iadd = <ReactCSSTransitionGroup transitionName="example" transitionAppear={true}>
    //     <h1>Fading at Initial Mount</h1>
    //   </ReactCSSTransitionGroup>""
    //   items.push();
    // }
    return (
        <div className="BlogList clearfix">
          <ReactCSSTransitionGroup transitionName="trans_blogitem">
            {items}
          </ReactCSSTransitionGroup>
        </div>
    );
  }
});



var Blog = React.createClass({

  getInitialState: function() {
    return {
      items: [],
      offset: 0,
      limit: 10
    };
  },
  componentDidMount: function() {
    this.getStateData();
  },
  getStateData: function(){
    this.getItems(function(data){
      console.log(data)
      //this.state.items = data.response.posts
      this.setState({items: data.response.posts});
    }.bind(this));
  },
  getItems: function(success_callback){
    $.ajax({
      type:'GET',
      url: "http://api.tumblr.com/v2/blog/familiarwild.tumblr.com/posts",
      dataType:'jsonp',
      data: {
          api_key : "cm1eEmrZgqEcevWcnGhO6yCdhSgaNQyNKB1pLRnFOaIgRrZZsG",
          tag: "",
          limit: this.state.limit,
          offset: this.state.offset
      },
      success: function(data){
        success_callback(data);
      }.bind(this)
    });
  },
  handleClick: function(){
    this.state.offset = 5;
    this.getStateData();
  },
  render: function() {
    return (
      <div className="Blog" onClick={this.handleClick}>
      <LayoutRow row_data={{color: "transparent", url: "/images/bg_every.jpg"}}>
        <LayoutContainer>
          <BlogList items={this.state.items}/>
        </LayoutContainer>
      </LayoutRow>
      <LayoutRow row_data={{color: "#ff9900", url: "/images/bg_every.jpg"}}>
        <LayoutContainer>
          <div style={{minHeight: "100px"}}>
          hello world
          </div>
        </LayoutContainer>
      </LayoutRow>
      </div>
    );
  }
});





React.render( <Blog />, document.getElementById('blog'));


React.render(
  <Albums />,
  document.getElementById('albums')
);




