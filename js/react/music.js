

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

      //console.log(data.response.posts)
      var posts = [];
      var count = 0;
      for(var i=0; i<data.response.posts.length; i++){
        var post = data.response.posts[i];
        //console.log(post.state)
        if(post.status=="published"){
          posts.push(post);
          count++;
        }
        if(count==10){
          break;
        }
      }

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
          tag: this.props.tag ? this.props.tag : "",
          limit: 50,
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
  },
  handleNext: function(){
  },

  render: function() {
    var blog = null;
    var active_id = null;
    if(this.state.item){
      var item = this.state.item
      blog = <BlogItem width={500} key={item.id} data={item} onSelect={this.handleSelect} />
      var active_id = item.id;
    }
    
    return (
      <div className="Blog" onClick={this.handleClick}>
      <LayoutRow id="blog_nav" row_data={{color: "#c6e3ec", url: "/images/bg_every.jpg"}}>
        <LayoutContainer>
          <LayoutContainerHeading>{this.props.title}</LayoutContainerHeading>
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

    var count = this.props.items.length;
    var prevW = (this.props.prev) ? width*3 : width*1;
    var nextW = (this.props.next) ? width*3 : width*1;
    var contW = (width*count);
    var totW = (width*(count+1));
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
    if(this.props.data.type=="video"){
      if(this.props.isNav){
        var vidsrc = this.props.data.permalink_url.replace("https://www.youtube.com/watch?v=", "");
        vidsrc = "http://img.youtube.com/vi/"+vidsrc+"/mqdefault.jpg"
        //console.log(this.props.data)
        content = <div className="BIContent" style={{overflow: "hidden" }}>
          <img src={vidsrc} width="100%" />
        </div>
      }else{
        var vidw = this.props.width-40;
        var vidh = Math.round(vidw*0.6);
        content = <div className="BIContent" style={{overflow: "hidden" }}>
          <div style={{fontSize: this.props.font_size}} dangerouslySetInnerHTML={{__html: this.props.data.player[0].embed_code.replace("width=\"250", "width=\""+vidw).replace("height=\"141", "height=\""+vidh) }} />
        </div>
      }
    } 


   
    return (
       <div id={"blog_"+this.props.data.id} className={class_name} unselectable="on" 
        onMouseOver={this.handleHover} 
        onMouseOut={this.handleMouseOut} 
        onClick={this.handleClick} style={{width: this.props.width, padding: this.props.padding }}>
        <div className="BIOverlay" style={{width: this.props.width }} >&nbsp;</div>
        <div className="BIContent" style={{overflow: "hidden" }}>
        { content}
        </div>
        {arrow}
       </div>

    );
  }
});

  React.render( <Blog tag="fwshows" title="Shows" /> , document.getElementById('shows'));
  React.render( <Blog tag="fwvideo" title="Videos" /> , document.getElementById('videos'));







var TopContainer = React.createClass({
  render: function() {
    return (
      <div className="ParaMain" style={{ width: "100%", height: "auto", margin: 0, padding: 0 }} >
        { this.props.children }
      </div>
    );
  }
});

var ParallaxContainer = React.createClass({
  getInitialState: function() {
    return {
      windowHeight: this.getWindowHeight(),
      windowWidth: this.getWindowWidth()
    };
  },
  getDefaultProps: function() {
    return {
      height: "auto",
      img_h: 100,
      img_w: 100,
      imgSrc: null,
      backgroundColor: "#ffffff"
    };
  },
  getWindowHeight: function(){
    return Math.ceil(ST_windowHeight());
  },
  getWindowWidth: function(){
    return Math.ceil(ST_windowWidth());
  },
  checkImageHorizontal: function(){
    return this.props.img_w >= this.props.img_h;
  },
  calcPaneHeight: function(){
    if(this.props.height.indexOf("%") > -1) {
      // console.log(this.props.height.replace("%"))
      var percent = (parseInt(this.props.height) / 100);
      return Math.ceil(percent * this.state.windowHeight);
    }else{
      return this.props.height=="auto" ? "auto" : parseInt(this.props.height);
    }
    // return (this.props.height.indexOf("%") > -1) ? this.state.windowHeight : this.props.height; 
  },
  calcImageDimensions: function(containW, containH){
    var paneIsHorizontal = (containW >= containH);
    var returnDimensions = {
      offsetLeft: 0,
      offsetTop: 0
    };
    if(this.checkImageHorizontal()){
      var newH = containH;
      var newW = Math.round( (containH / this.props.img_h) * this.props.img_w );

      var widthDiff = containW - newW;
      var heightDiff;
      if(widthDiff>0){
        returnDimensions.width = containW;
        returnDimensions.height = Math.round((containW / newW) * newH);
        heightDiff = containH - returnDimensions.height;
        returnDimensions.offsetTop = Math.floor( heightDiff/2 );
      }else{
        returnDimensions.height = newH;
        returnDimensions.width = newW;
        returnDimensions.offsetLeft = Math.floor( widthDiff/2 );
      }
    }else{
      console.log("todo")
    }
    return returnDimensions;

  },
  componentDidMount: function() {
    this.handleResize();
    ST_windowResize(function(){
      this.handleResize();
    }.bind(this));
    ST_windowScroll(function(){
      this.handleWindowScroll();
    }.bind(this));
  },
  handleResize: function(){
    
    if(this.props.height=="auto"){
      var el = this.getDOMNode();
      $(el).find(".ParaBG").height(1);
      $(el).find(".ParaContent").css("top", "-1px");
    }

    var h = this.getWindowHeight();
    if( h!==this.state.windowHeight){
      this.setState({ windowHeight: h });
      return;
    }
    var w = this.getWindowWidth();
    if( w!==this.state.windowWidth){
      this.setState({ windowWidth: w });
      return;
    }

    if(this.props.height=="auto"){
      var h = $(el).height();
      $(el).find(".ParaBG").height(h);
      $(el).find(".ParaContent").css("top", "-"+h+"px");
      var imgDimensions = this.calcImageDimensions( this.state.windowWidth, h );
      $(el).find(".ParaBG img").css(this.imgStyle(imgDimensions));
    }

  },
  imgStyle: function(imgDimensions){
    var style = {
      display: "block", 
      width: imgDimensions.width, 
      height: imgDimensions.height, 
      position: "relative", 
      left: imgDimensions.offsetLeft+"px"
    };

    if(Modernizr && Modernizr.csstransforms3d){
      style.transform = "translate3d(0px, -"+imgDimensions.offsetTop+"px, 0px)";
    }else{
      style.top = imgDimensions.offsetTop+"px";
    }
    return style;
  },
  handleWindowScroll: function(){
    var el = this.getDOMNode();
    var offsetTop =  $(el).offset().top;
    var h = $(el).height();
    var offsetH = offsetTop+h;
    if($(window).scrollTop()>=offsetTop &&  $(window).scrollTop()<=offsetH){
      var diff = $(window).scrollTop() - offsetTop;
      var elimg = $(el).find(".ParaBGImg");
      var Ctop = parseInt(elimg.data("topoffset"));
      var change = Ctop+(diff*0.5);
      if(Modernizr && Modernizr.csstransforms3d){
        elimg.css({transform: "translate3d(0px, "+change+"px, 0px)"});
      }else{
        elimg.css("top", change);
      }
    }
  },
  render: function() {
    var setHeight = this.calcPaneHeight();
    var imgDimensions;
    var imageContainHeight;
    if(setHeight!="auto"){
      imageContainHeight = setHeight;
    }else{
      imageContainHeight = 1;
    }
    
    var bgimg;
    if(!setHeight.isNaN){
      imgDimensions = this.calcImageDimensions( this.state.windowWidth, imageContainHeight );
      var imgStyle = this.imgStyle(imgDimensions);
      bgimg = <img className="ParaBGImg" data-topoffset={imgDimensions.offsetTop} src={this.props.imgSrc} style={imgStyle} />
    }

    return (
      <div className="ParaMain" style={{ position: "relative", width: "100%", height: setHeight, margin: 0, padding: 0, backgroundColor: this.props.backgroundColor }} >
        <div className="ParaBG" style={{ position: "relative", overflow: "hidden", width: "100%", height: imageContainHeight, margin: 0, padding: 0}}>
          {bgimg}
        </div>
        <div className="ParaContent" style={{ position: "relative", width: "100%", top: "-"+imageContainHeight, height: setHeight, margin: 0, padding: 0}}>
          <div style={{ position: "absolute", width: "100%", height: "100%"}}>
          { this.props.children }
          </div>
        </div>
      </div>
    );
  }
});



var Stuff = React.createClass({
  render: function() {
    return (
      <TopContainer>
        <ParallaxContainer imgSrc="/images/section_top_1.jpg" img_h={800} img_w={2310} height="100%" >
        
          <div id="test" style={{height: "50%", marginTop: "10%" }} >
            <img src="/images/logo.svg" className="DropShadowed" style={{display: "block", height: "80%", margin: "0 auto"}} /> 
            <div className="DropShadowed" style={{display: "block", height: "20%", textAlign: "center", color: "#fff"}} ><h1>FAMILIAR&nbsp;WILD</h1></div>
          </div>

        </ParallaxContainer>
        <ParallaxContainer backgroundColor="#ff9900" height="auto" imgSrc="/images/section_top_1.jpg" img_h={800} img_w={2310} >
        <div>test
        fdslkajfskla
        <br />
        fdsa
        </div>
        </ParallaxContainer>
      </TopContainer>
    );
  }
});







React.render( <Stuff /> , document.getElementById('ppp'));










function ST_windowWidth(){
  return $(window).width();
}

function ST_windowHeight(){
  return $(window).height();
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

function ST_windowScroll(callback){
  $(window).scroll(callback);
}

function ST_getScrollPos(){
  return $(window).scrollTop();
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





// $(window).scroll(function(){

//     var scroll_h = $(window).scrollTop();
//     var diff = t_h - scroll_h;
//     diff = (diff < 0) ? t_h : t_h - diff;
//     var percent_h = ( diff / t_h  );
//     //$("#top-para-img").css({top: "-"+( percent_h * change_h )+"px"}, 0);
//     $("#top-para-img").css({transform: "translate3d(0px, -"+( percent_h * change_h )+"px, 0px)"});

//   });





