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















var Blog = React.createClass({

  getInitialState: function() {
    return {
      items: [],
      item: null,
      offset: 0,
      isSmall: false
    };
  },
  componentDidMount: function() {
    this.handleResize(false);
    alert(this.state.isSmall);

    this.getStateData(function(){
      console.log(this.state.items[0])
      this.setState({ item: this.state.items[0] })
    }.bind(this));

    ST_windowResize(function(){
      this.handleResize(true);
    }.bind(this));

  },
  handleResize: function(get_data){
    if( ST_windowWidth()<=780){
      //console.log(ST_windowWidth());
      this.state.isSmall=true;
      //this.setState();
    }else{
      this.state.isSmall=false;
      //this.setState();
    }
    console.log(this.state);
    if(get_data==true){
      this.getStateData();
    }
  },
  getStateData: function(callback){
    this.getItems(function(data){
      //console.log(data)
      //this.state.items = data.response.posts
      this.setState({items: data.response.posts});
      if(typeof callback==='function'){
        callback();
      }
    }.bind(this));
  },
  getItems: function(callback){
    $.ajax({
      type:'GET',
      url: "http://api.tumblr.com/v2/blog/familiarwild.tumblr.com/posts",
      dataType:'jsonp',
      data: {
          api_key : "cm1eEmrZgqEcevWcnGhO6yCdhSgaNQyNKB1pLRnFOaIgRrZZsG",
          tag: "",
          limit: (this.state.isSmall) ? 5 : 10,
          offset: this.state.offset
      },
      success: function(data){
        if(typeof callback==='function'){
          callback(data);
        }
      }.bind(this)
    });
  },
  handleClick: function(){
    this.state.offset = 5;
    // this.getStateData();
  },
  handleItemSelect: function(item){
    var item_c = item;
    this.setState({ item: item_c })
    //console.log(item);
  },
  render: function() {
    var blog = null;
    if(this.state.item){
      var item = this.state.item
      blog = <BlogItem key={item.id} data={item} onSelect={this.handleSelect}/>
    }
    return (
      <div className="Blog" onClick={this.handleClick}>
      <LayoutRow row_data={{color: "transparent", url: "/images/bg_every.jpg"}}>
        <LayoutContainer>
          <BlogList items={this.state.items} onItemSelect={this.handleItemSelect} />
        </LayoutContainer>
      </LayoutRow>
      <LayoutRow row_data={{color: "#ff9900", url: "/images/bg_every.jpg"}}>
        <LayoutContainer>
          <div style={{minHeight: "100px"}}>
          {blog}
          </div>
        </LayoutContainer>
      </LayoutRow>
      </div>
    );
  }
});
var BlogList = React.createClass({
  handleSelect: function(item){
    this.props.onItemSelect(item);
  },
  render: function() {
    var items = this.props.items.map(function(item, i) {
      return (
          <BlogItem key={item.id} data={item} isSmall={true} onSelect={this.handleSelect}/>
      );
    }.bind(this));
    return (
        <div className="BlogList clearfix">
          <ReactCSSTransitionGroup transitionName="trans_blogitem">
            {items}
          </ReactCSSTransitionGroup>
        </div>
    );
  }
});
var BlogItem = React.createClass({
  getDefaultProps: function() {
    return {
      sizeInfo: {
        small:{
          width: "70px",
          font_size: "3px",
          alt_size: 3
        },
        large:{
          width: "500px",
          font_size: "16px",
          alt_size: 1
        }
      }
    };
  },
  handleClick: function(){
    this.props.onSelect(this.props.data);
  },
  render: function() {
    var sizeInfo;
    var class_name = "BlogItem";
    if(this.props.isSmall){
      class_name += " small";
      sizeInfo = this.props.sizeInfo.small;
    }else{
      class_name += " large";
      sizeInfo = this.props.sizeInfo.large;
    }

    var imgs = null;
    if(this.props.data.photos && this.props.data.photos.length>0){
      imgs = <img src={this.props.data.photos[0].alt_sizes[3].url} />
    }
   
    return (
   
       <div className={class_name} onClick={this.handleClick} style={{width: sizeInfo.width, fontSize: sizeInfo.font_size}}>
        {imgs}
        <div dangerouslySetInnerHTML={{__html: this.props.data.caption }} />
        <div className="BlogArrow" />
       </div>

    );
  }
});






React.render( <Blog />, document.getElementById('blog'));
React.render( <Albums />, document.getElementById('albums'));



function ST_windowWidth(){
  return $(window).width();
}

var ST_windowResize_timeout;
function ST_windowResize(callback){
  $(window).resize(function(){
    var ST_windowResize_timeout = window.setTimeout(function(){
      window.clearTimeout(ST_windowResize_timeout);
      callback();
    },300);
  }.bind(this));
}


