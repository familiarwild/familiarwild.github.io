

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
      <div id={this.props.id} className="LayoutRow" style={{backgroundColor: this.props.row_data.color}}>
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

var LayoutContainerHeading = React.createClass({
  render: function() {
    return (
      <h1 className="heading">
        { this.props.children }
      </h1>
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
      isSmall: false,
      prev: false,
      next: false
    };
  },
  componentDidMount: function() {
    this.handleResize(false);
    this.getStateData(function(){
      //console.log(this.state.items[0])
      this.setState({ item: this.state.items[0] })
    }.bind(this));

    ST_windowResize(function(){
      this.handleResize(true);
    }.bind(this));

  },
  handleResize: function(get_data){
    if( ST_windowWidth()<=800){
      this.state.isSmall=true;
      this.setState({ isSmall: true});
    }else{
      this.setState({ isSmall: false});
    }
  },
  getStateData: function(callback){
    this.getItems(function(data){
      console.log(data)
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
          limit: 10,
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
    //this.state.offset = 5;
    // this.getStateData();
  },
  handleItemSelect: function(item){
    var item_c = item;
    this.setState({ item: item_c })
  },
  handlePrev: function(){
    alert("p")
  },
  handleNext: function(){

  },

  render: function() {
    var blog = null;
    var active_id = null;
    if(this.state.item){
      var item = this.state.item
      blog = <BlogItem key={item.id} data={item} onSelect={this.handleSelect} />
      var active_id = item.id;
    }
    
    return (
      <div className="Blog" onClick={this.handleClick}>
      <LayoutRow id="blog_nav" row_data={{color: "#c6e3ec", url: "/images/bg_every.jpg"}}>
        <LayoutContainer>
          <LayoutContainerHeading>Shows</LayoutContainerHeading>
          <BlogList prev={this.state.prev} next={this.state.next} onPrev={this.handlePrev} onNext={this.handleNext} active_id={active_id} isSmall={this.state.isSmall} items={this.state.items} onItemSelect={this.handleItemSelect} />
        </LayoutContainer>
      </LayoutRow>
      <LayoutRow id="blog_body" row_data={{color: "#eee", url: "/images/bg_every.jpg"}}>
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
  getInitialState: function() {
    return {
      loading: false,
      isScrollingForced: false
    };
  },
  handleSelect: function(item){
    this.props.onItemSelect(item);
  },
  handleScroll: function(e){
    window.clearTimeout(window.timeoutBloglist);

    var width = (this.props.isSmall ? 50 : 75);
    var scrollbase = (this.props.prev) ? 3 : 0.5;
    var scrollTo = (width*scrollbase);
    var scrollbaseNext = (this.props.prev) ? (this.props.next ? 3 : 0.5): 0.5;
    var scrollNext = (width*scrollbaseNext);
    var el = this.getDOMNode();
    var currentScrollPos=$(el).scrollLeft();

    if(this.state.loading || this.isScrollingForced){
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    
    if(currentScrollPos >= scrollNext-1 ){
      if(this.props.next){
        this.setState({ loading: true });
        this.props.onNext();
        return;
      }
    }else if(currentScrollPos <= 1 ){
      if(this.props.prev){
        this.setState({ loading: true });
        this.props.onPrev();
        return;
      } 
    }

    window.timeoutBloglist = window.setTimeout(function(){
      this.isScrollingForced=true;
      //console.log('isScrollingForced 1')
      $(el).animate({scrollLeft: scrollTo }, 100, function(){
        //console.log('isScrollingForced 0')
        this.isScrollingForced=false;
        // window.setTimeout(function(){
        //   $(el).scrollLeft( _scrollto );
        //   this.isScrollingForced=false;
        // }.bind(this), 1000);
        //this.state.isScrollingForced=false;
      }.bind(this));
    }.bind(this), 800);

  },
  componentDidMount: function() {
    window.timeoutBloglist=null;
    var el = this.getDOMNode();
    var width = (this.props.isSmall ? 50 : 75)
    var scrollbase = (this.props.prev) ? 3 : 0.5;
    var scrollTo = (width * scrollbase);
    $(el).scrollLeft( scrollTo );
  },
  render: function() {

    var width = (this.props.isSmall ? 50 : 75)
    var fontsize = (this.props.isSmall ? 2 : 3)

    var prevW = (this.props.prev) ? width*3 : width*1;
    var nextW = (this.props.next) ? width*3 : width*1;
    var contW = (width*10);
    var totW = (width*11);
    var totWInner = contW+prevW+nextW;

    var items = this.props.items.map(function(item, i) {
      return (
          <BlogItem isActive={this.props.active_id==item.id} key={item.id} data={item} width={width+"px"} font_size={fontsize+"px"} alt_size={3} padding="0px" isNav={true} onSelect={this.handleSelect}/>
      );
    }.bind(this));

    var itemprev;
    var itemnext;
    var prev_classname = "BlogItem Prev";
    var next_classname = "BlogItem Next";
    if(this.props.prev){
      prev_classname += " active";
    }
    if(this.props.next){
      next_classname += " active";
    }
    
    return (
        <div className="BlogList" onScroll={this.handleScroll} style={{width: (totW)+"px"}}>
          <div className="BlogListInner" style={{width: (totWInner)+"px"}}>
           <div className={prev_classname} style={{width: (prevW)+"px"}} ><div className="BIOverlay"></div><div className="BIContent">Previous</div></div>
             <div style={{display: "inline-block", width: (contW)+"px"}}>
             {items}
             </div>
           <div className={next_classname} style={{width: (nextW)+"px"}} ><div className="BIOverlay"></div><div className="BIContent">Next</div></div>
          </div>
        </div>
    );
  }
});


var BlogItem = React.createClass({
  getInitialState: function() {
    return {
      isHover: false
    };
  },
  getDefaultProps: function() {
    return {
      isActive: false,
      alt_size: 1,
      padding: "20px",
      font_size: "16px"
    };
  },
  handleClick: function(){
    if(typeof this.props.onSelect == "function"){
      this.props.onSelect(this.props.data);
    }
  },
  componentDidMount: function(){
    window.setTimeout(this.setOverlayHeight, 1000);
  },
  componentDidUpdate: function(){
    this.setOverlayHeight();
    //$("blog_"+this.props.data.id+" .BIOverlay").hide();
    //$("blog_"+this.props.data.id+" .BIOverlay").height( $("blog_"+this.props.data.id+" .BIContent").height() );
  },
  setOverlayHeight: function(){
    var h = $("#blog_"+this.props.data.id+" .BIContent").height();
    $("#blog_"+this.props.data.id+" .BIOverlay").height(h);
  },
  handleHover: function(){
    this.setState({isHover: true});
  },
  handleMouseOut: function(){
    this.setState({isHover: false});
  },
  render: function() {
    var sizeInfo;
    var class_name = "BlogItem";
    var arrow;

    if(this.props.isNav){
      class_name += " nav";
      if(this.props.isActive){
        class_name += " active";
      }
      if(this.state.isHover){
        //console.log('this.props.data.id')
        class_name += " hover";
      }
      arrow = <div className="BlogArrow"><div className="arrow"></div></div>
    }else{
      class_name += " full";
    }
    
    

    var content;
    if(this.props.data.type=="photo"){
      var imgs = null;
      if(this.props.data.photos && this.props.data.photos.length>0){
        imgs = <img src={this.props.data.photos[0].alt_sizes[this.props.alt_size].url} />
      }
      content = <div className="BIContent" style={{overflow: "hidden" }}>
          {imgs}
          <div style={{fontSize: this.props.font_size}} dangerouslySetInnerHTML={{__html: this.props.data.caption }} />
        </div>
    } 
    if(this.props.data.type=="text"){
      content = <div className="BIContent" style={{overflow: "hidden" }}>
          <div style={{fontSize: this.props.font_size}} dangerouslySetInnerHTML={{__html: "<h1>"+this.props.data.title+"</h1>" + this.props.data.body }} />
        </div>
    } 


   
    return (
       <div id={"blog_"+this.props.data.id} className={class_name} unselectable="on" 
        onMouseOver={this.handleHover} 
        onMouseOut={this.handleMouseOut} 
        onClick={this.handleClick} style={{width: this.props.width, padding: this.props.padding }}>
        <div className="BIOverlay" style={{width: this.props.width }} >&nbsp;</div>
        <div className="BIContent" style={{overflow: "hidden", overflowX: "scroll" }}>
        { content}
        </div>
        {arrow}
       </div>

    );
  }
});


//function load_components(){
  React.render( <Blog /> , document.getElementById('blog'));
//}



function ST_windowWidth(){
  return $(window).width();
}

var ST_windowResize_timeout = null;
function ST_windowResize(callback){
  $(window).resize(function(){
    window.clearTimeout(ST_windowResize_timeout);
    var ST_windowResize_timeout = window.setTimeout(function(){
      callback();
    }, 1000);
  }.bind(this));
}


// (function($){
//     $.fn.disableSelection = function() {
//         return this
//                  .attr('unselectable', 'on')
//                  .css('user-select', 'none')
//                  .on('selectstart', false);
//     };
// })(jQuery);

$(document).on("selectstart", ".BlogItem", function(){
  return false
});







