









var IMGS = { 
  none: {url: null, img_w: null, img_h: null, color: "#fff"},
  main: {url:  "/images/bg_main3.jpg", img_w: 2190, img_h: 800, color: "#eee"},
  mainback: {url:  "/images/section_top_1.jpg", img_w: 2310, img_h: 800, color: "#eee"},
  musicback: {url:  "/images/bg_album.jpg", img_w: 833, img_h: 526, color: "#eee"},
  bgice: {url: "/images/bg_ice.jpg", img_w: 1000, img_h: 679, color: "#d4f1fe"},
  bgrock: {url: "/images/bg_rock.jpg", img_w: 1000, img_h: 679, color: "#e5dac3"},
  bghorizon: {url: "/images/bg_horizon_a.jpg", img_w: 1280, img_h: 258, color: "#fff"},
  bgblurvid: {url: "/images/bg_vidblur.jpg", img_w: 800, img_h: 40, color: "#fff"},
  bgmountsm:  {url: "/images/bg_mountsm.jpg", img_w: 1000, img_h: 260, color: "#fff"},
}



var DATABLOG = [
  {id: "vid", ratioW: 40, ratioH: 18, tag: "fwvideo", title:"Videos", height: "620", titleIMG: IMGS.none, backgroundIMG: IMGS.bgrock},
  {id: "show", ratioW: 40, ratioH: 25, tag: "fwshows", title:"Shows", height: "auto", titleColor: "#000", titleIMG: IMGS.none, backgroundIMG: IMGS.bgice}
];









var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;



var LayoutRow = React.createClass({displayName: "LayoutRow",
  render: function() {
    var rowStyle = { color: this.props.row_data.fontColor, background: this.props.row_data.backgroundColor }
    if(this.props.row_data.backgroundImage){
      rowStyle.background = this.props.row_data.fontColor + " url('"+ this.props.row_data.backgroundImage+"') no-repeat center center";
      rowStyle.backgroundSize= "cover";
    }
    return (
      React.createElement("div", {id: this.props.id, className: "LayoutRow "+this.props.className, style: rowStyle}, 
         this.props.children
      )
    );
  }
});

var LayoutContainer = React.createClass({displayName: "LayoutContainer",
  getInitialState: function() {
    return {
      margin: "0px"
    };
  },
  render: function() {
    return (
      React.createElement("div", {className: "LayoutContainer"}, 
         this.props.children
      )
    );
  }
});

var LayoutContainerHeading = React.createClass({displayName: "LayoutContainerHeading",
  render: function() {
    return (
      React.createElement("h1", {className: "LayoutHeading"}, 
         this.props.children
      )
    );
  }
});






















//--------======================================================================================
//--------======================================================================================
//--------======================================================================================
//--------======================================================================================

var AlbumsView = React.createClass({displayName: "AlbumsView",
  render: function() {
    return (
      React.createElement("div", {className: "AlbumsView", style: {display: "block", margin: "0px auto"}}, 
      React.createElement(ParallaxContainer, {backgroundColor: this.props.data.backgroundIMG.color, height: this.props.data.height, imgSrc: this.props.data.backgroundIMG.url, img_h: this.props.data.backgroundIMG.img_h, img_w: this.props.data.backgroundIMG.img_w}, 
        React.createElement(LayoutRow, {className: "AlbumTitle", row_data: { fontColor: "#fff", backgroundColor: "transparent"}}, 
          React.createElement(LayoutContainer, null, 
            React.createElement(LayoutContainerHeading, null, this.props.data.title)
          )
        ), 

        React.createElement("div", {className: "AlbumsViewMain"}, 
          React.createElement(Albums, {albums_type: "current_albums", data: { title: this.props.data.title}})
        )

      )
      )
    )
  }
});

var Albums = React.createClass({displayName: "Albums",
  getInitialState: function() {
    return {
      items: [],
      item: null,
      toScroll: false,
      offset: 0,
      isSmall: false,
      prevActive: false,
      nextActive: false
    };
  },
  getDefaultProps: function() {
    return {
      ratioW: 40,
      ratioH: 25,
      titleColor: "#fff",
      albums_type: "current_albums"
    };
  },
  componentDidMount: function() {
    this.handleResize(false);
    this.getStateData(function(){
      //this.props.onLoaded();
    }.bind(this));

    ST_windowResize(function(){
      this.handleResize(true);
    }.bind(this));

    // var el = this.getDOMNode();
    // $(el).find(".AlbumBodyInnerC").fadeIn(5000);
  },
  handleResize: function(get_data){
    if( ST_windowWidth()<=800){
      this.setState({ isSmall: true});
    }else{
      this.setState({ isSmall: false});
    }
  },
  getStateData: function(callback){
    this.getItems(function(data){

      var selectedindex = 0;
      for(var i=0; i<data.length; i++){
        if(data[i].selected==true){
          selectedindex = i;
          break;
        }
      }
      this.setState({item: data[selectedindex]});
      this.setState({items: data});
      
      if(typeof callback==='function'){
        callback();
      }
    }.bind(this));
  },
  getItems: function(callback){
    //console.log(this.props.albums_type)
    var data = ALBUMDATA[this.props.albums_type];
    callback( data );
  },
  handleItemSelect: function(item){
    var item_c = item;
    this.setState({ item: item_c, toScroll: true })
  },
  handleScrollTo: function(){
    if(this.state.toScroll){
      var el = this.getDOMNode();
      var ts = $(el).offset().top;
      ST_setScrollPos(ts);
    }
  },
  handlePrev: function(){
    this.handleScrollTo();
    var index = 0;
    for(var i=0; i<this.state.items.length;i++){
      if(this.state.items[i]===this.state.item){
        index=i;
        break;
      }
    }
    var el = this.getDOMNode();
    var h = $(el).find(".BlogBodyInner").height();
    $(el).find(".AlbumBodyInner").css({height: h, overflow: "hidden"});
    
    window.setTimeout(function(){
      $(el).find(".AlbumBodyInner").css({height: "auto", overflow: "hidden"});
    }, 500);

    index = ((index-1) >= 0) ? (index-1) : 0;
    this.setState({ item: this.state.items[index], toScroll: true });
  },
  handleNext: function(){
    this.handleScrollTo();
    var index = 0;
    for(var i=0; i<this.state.items.length;i++){
      if(this.state.items[i]===this.state.item){
        index=i;
        break;
      }
    }

    var el = this.getDOMNode();
    var h = $(el).find(".BlogBodyInner").height();
    $(el).find(".AlbumBodyInner").css({height: h, overflow: "hidden"});
    
    window.setTimeout(function(){
      $(el).find(".AlbumBodyInner").css({height: "auto", overflow: "hidden"});
    }, 500);
    
    if ((index+1) < this.state.items.length){
      this.setState({ item: this.state.items[index+1], toScroll: true });
    }else{
      //this.setState({ item: this.state.items[index], toScroll: true });
    }
  },
  render: function() {
    var docW = $(".ParaMain").width()-50;
    var alb = null;
    var active_id = null;

    if(this.state.item){
      alb = React.createElement(AlbumLayout, {key: "album"+this.state.item.id, width: docW, data: this.state.item})
      var active_id = this.state.item.id;
    }

    return (
      React.createElement("div", {className: "Albums", style: {display: "block", margin: "0px auto"}}, 
        React.createElement(LayoutRow, {className: "AlbumNav", row_data: { fontColor: "#fff", backgroundColor: "transparent"}}, 
          React.createElement(LayoutContainer, null, 
            React.createElement(AlbumList, {ratioW: 100, ratioH: 100, prev: this.state.prev, next: this.state.next, onPrev: this.handlePrev, onNext: this.handleNext, active_id: active_id, isSmall: this.state.isSmall, items: this.state.items, onItemSelect: this.handleItemSelect})
          )
        ), 
      

        React.createElement(LayoutRow, {className: "AlbumBody", row_data: { fontColor: "#fff", backgroundColor: "transparent"}}, 
          React.createElement(LayoutContainer, null, 
            React.createElement("div", {className: "AlbumBodyInner", style: { minHeight: "100px"}}, 
              React.createElement("div", {className: "AlbumBodyInnerC"}, 
              alb
              )
            ), 
            React.createElement("div", {className: "ButtonContain clearfix", style: {height: "80px", padding: "20px"}}, 
              React.createElement("div", {className: "Button Prev", onClick: this.handlePrev}, "Newer"), 
              React.createElement("div", {className: "Button Next", onClick: this.handleNext}, "Older")
            )
          )
        )
      )
    );
  }
});








var AlbumList = React.createClass({displayName: "AlbumList",
  getInitialState: function() {
    return {
      loading: false,
      isScrollingForced: false
    };
  },
  getDefaultProps: function() {
    return {
      ratioW: 40,
      ratioH: 40
    };
  },
  handleSelect: function(item){
    this.props.onItemSelect(item);
  },
  componentDidMount: function() {
  },
  componentDidUpdate: function(){
  },
  render: function() {
    var docW = $(".ParaMain").width()-50;

    var fontSize600 = 3;
    var fontSize = (docW / 600) * fontSize600;

    var maxPerRow = 10;

    var countItems = this.props.items.length;
    var width = Math.floor( docW / (countItems) );
    width = (width>100) ? 100 : width;

    this.renderedWidth = width;

    var w_ratio = (width / this.props.ratioW);
    var heightRate = Math.floor(w_ratio * (this.props.ratioH * 1.2));

    var totW = (width*(countItems-1)+heightRate);
    var totWInner = totW;

    var items = this.props.items.map(function(item, i) {
      var isActive = false;
      var newheight = Math.floor(w_ratio * this.props.ratioH);
      var newwidth = width;
      if(this.props.active_id==item.id){
        isActive = true;
        newheight = heightRate;
        newwidth = heightRate;
      }
      return (
          React.createElement(AlbumItem, {isActive: isActive, key: item.id, data: item, width: newwidth+"px", nav_height: newheight, font_size: fontSize+"px", alt_size: 3, padding: "0px", isNav: true, onSelect: this.handleSelect})
      );
    }.bind(this));
    
    return (
      React.createElement("div", {className: "AlbumList", onScroll: this.handleScroll, style: {width: (totW)+"px", margin: "0px auto"}}, 
        React.createElement("div", {className: "AlbumListInner", style: {width: (totWInner)+"px"}}, 
          items
        )
      )
    );
  }
});







var AlbumItem = React.createClass({displayName: "AlbumItem",
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
      font_size: "16px",
      nav_height: 40
    };
  },
  handleClick: function(){
    if(typeof this.props.onSelect == "function"){
      this.props.onSelect(this.props.data);
    }
  },
  componentDidMount: function(){
    window.setTimeout(this.setOverlayHeight, 1000);
    if(typeof this.props.onScrollTo == "function"){
      this.props.onScrollTo();
    }
  },
  componentDidUpdate: function(){
    this.setOverlayHeight();
    //$("blog_"+this.props.data.id+" .BIOverlay").hide();
    //$("blog_"+this.props.data.id+" .BIOverlay").height( $("blog_"+this.props.data.id+" .BIContent").height() );
  },
  setOverlayHeight: function(){
    // var h = $("#blog_"+this.props.data.id+" .BIContent").height();
    // $("#blog_"+this.props.data.id+" .BIOverlay").height(h);
  },
  handleHover: function(){
    this.setState({isHover: true});
  },
  handleMouseOut: function(){
    this.setState({isHover: false});
  },
  render: function() {
    var sizeInfo;
    var class_name = "ALB";

    if(this.props.isNav){
      class_name += " nav";
      if(this.props.isActive){
        class_name += " ITMactive";
      }
      if(this.state.isHover){
        //console.log('this.props.data.id')
        class_name += " ITMhover";
      }
    }else{
      class_name += " full";
    }

    var content = React.createElement("div", {className: "ALBContent", style: {overflow: "hidden", margin: "5px"}}, React.createElement("img", {src: this.props.data.artwork_thumb, style: {width: this.props.width-10, height: this.props.nav_height-10}}))
    
    return (
       React.createElement("div", {id: "art_"+this.props.data.id, className: class_name, unselectable: "on", 
        onMouseOver: this.handleHover, 
        onMouseOut: this.handleMouseOut, 
        onClick: this.handleClick, style: {display: "inline-block", width: this.props.width, padding: this.props.padding}}, 

        React.createElement("div", {className: "ITM ALBOverlay", style: {width: this.props.width, height: (this.props.nav_height ? this.props.nav_height : "auto"), marginBottom: (this.props.nav_height ? "-"+this.props.nav_height+"px" : "0px")}}, " "), 
        content

       )

    );
  }
});


var AlbumLayout = React.createClass({displayName: "AlbumLayout",
  render: function() {
    var width = this.props.width > 800 ? 800 : this.props.width;

    var purcase;
    var listen;
    if(this.props.data.purchase_url){
      purcase = React.createElement("div", {style: { margin: "10px auto"}}, React.createElement("a", {href: this.props.data.purchase_url, style: {display: "inline-block", margin: "10px", padding: "10px", border: "solid 1px #eee", background: "#fff", color:"#333"}}, "Purchase on Bandcamp"));
      if(this.props.data.bandcamp_listen_id){
        listen = React.createElement("div", {style: { margin: "10px auto"}}, React.createElement("iframe", {style: { border: "0", width: "100%", height: "42px"}, src: "http://bandcamp.com/EmbeddedPlayer/album="+this.props.data.bandcamp_listen_id+"/size=small/bgcol=333333/linkcol=0f91ff/artwork=none/transparent=true/", seamless: true}, React.createElement("a", {href: "http://familiarwild.bandcamp.com/album/dark-dreams"}, "Dark Dreams by Familiar Wild")))
      }
    } else if(this.props.data.preorder_url) {
      purcase = React.createElement("div", {style: { width: "100", margin: "20px auto"}}, React.createElement("a", {href: this.props.data.preorder_url}, "Pre Order Now"));
    }

    
    

    return (
      React.createElement("div", {className: "AlbumLayout clearfix", style: {width: width, margin: "0px auto"}}, 
        React.createElement("div", {className: "AlbumLayoutPart"}, 
          React.createElement("div", null, 
            React.createElement("img", {className: "AlbumShadow", src: this.props.data.artwork_img, style: { width: "100%"}})
          )
        ), 
        React.createElement("div", {className: "AlbumLayoutPart"}, 
          React.createElement("div", {style: { padding: "0px 10px", textAlign: "center"}}, 
            React.createElement("div", {style: { fontSize: "1.6em", marginBottom: "1em"}}, this.props.data.name), 
            listen, 

            purcase

           
          )
        )

      )

    );
  }
});




var ALBUMDATA = { 
  current_albums: [
  // {
  //   id: 3,
  //   selected: true,
  //   year: "2015", 
  //   name: "Every Cloud ( Single )", 
  //   artwork_img: "/images/cd_everycloud.jpg",
  //   artwork_thumb: "/images/cd_everycloud_thumb.jpg",
  //   bandcamp_listen_id: null,
  //   purchase_url: "http://familiarwild.bandcamp.com/"
  // },
  {
    id: 2,
    selected: true,
    year: "2015", 
    name: "Every Cloud ( Single )", 
    artwork_img: "/images/cd_everycloud.jpg",
    artwork_thumb: "/images/cd_everycloud_thumb.jpg",
    bandcamp_listen_id: "1342195243",
    purchase_url: "http://familiarwild.bandcamp.com/"
  },
  {
    id: 1,
    selected: true,
    name: "Dark Dreams", 
    year: "2013", 
    artwork_img: "/images/cd_darkdreams.jpg",
    artwork_thumb: "/images/cd_darkdreams_thumb.jpg",
    purchase_url: "http://familiarwild.bandcamp.com/album/dark-dreams",
    bandcamp_listen_id: "3869561879",
    itunes_url: "https://itunes.apple.com/ca/album/dark-dreams/id722391559"
  }
  ]

};








//--------======================================================================================
//--------======================================================================================
//--------======================================================================================
//--------======================================================================================





















// var Album = React.createClass({

//   getInitialState: function() {
//     return {
//       hasShadow: true,
//       showDetails: true,
//       linkAlbum: true
//     };
//   },
//   render: function() {
//     return (
//       <div className="Album" >
//         {this.props.data.name}
//         <AlbumCover artwork_url={this.props.data.artwork_url} hasShadow={this.state.hasShadow} link_url={this.state.linkAlbum ? this.props.data.link_url : null} />
//       </div>
//     );
//   }
// });

// var AlbumCover = React.createClass({
//   handleClick: function(){
//     if(this.props.link_url){
//       document.location.href=this.props.link_url;
//     }
//   },
//   render: function() {
//     var class_name = "AlbumArt";
//     if(this.props.hasShadow){
//       class_name += " shadow";
//     }
//     if(this.props.link_url){
//       class_name += " linked";
//     }
//     return (
//       <div className={class_name} >
//         <img src={this.props.artwork_url} onClick={this.handleClick} />
//       </div>
//     );
//   }
// });




// var Albums = React.createClass({

//   getInitialState: function() {
//     return {
//       albums: ALBUMDATA.albums
//     };
//   },

//   componentDidMount: function() {
//   //this.state
//   //this.setState({})
//   },

//   render: function() {

//     var albums = [];
//     for (var i=0; i < this.state.albums.length; i++) {
//       var a = this.state.albums[i];
//       albums.push(<Album key={a.id} data={a} />);
//     }
//     return (
//       <div className="Albums">
//         {albums}
//       </div>
//     );
//   }

// });



















































var Blog = React.createClass({displayName: "Blog",
  getInitialState: function() {
    return {
      items: [],
      item: null,
      toScroll: false,
      offset: 0,
      isSmall: false,
      prevActive: false,
      nextActive: false
    };
  },
  getDefaultProps: function() {
    return {
      ratioW: 40,
      ratioH: 25,
      titleColor: "#fff"
    };

  },
  componentDidMount: function() {
    this.handleResize(false);
    this.getStateData(function(){
      this.setState({ item: this.state.items[0] })
      this.props.onLoaded();
    }.bind(this));

    ST_windowResize(function(){
      this.handleResize(true);
    }.bind(this));
    
  },
  handleResize: function(get_data){
    if( ST_windowWidth()<=800){
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
          tag: this.props.data.tag ? this.props.data.tag : "",
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
  handleItemSelect: function(item){
    var item_c = item;
    this.setState({ item: item_c, toScroll: true })
  },
  handleScrollTo: function(){
    if(this.state.toScroll){
      var el = this.getDOMNode();
      var ts = $(el).offset().top;
      ST_setScrollPos(ts);
    }
  },
  handlePrev: function(){
    this.handleScrollTo();
    var index = 0;
    for(var i=0; i<this.state.items.length;i++){
      if(this.state.items[i]===this.state.item){
        index=i;
        break;
      }
    }
    index = ((index-1) >= 0) ? (index-1) : this.state.items.length-1;
    this.setState({ item: this.state.items[index], toScroll: true });
  },
  handleNext: function(){
    this.handleScrollTo();
    var index = 0;
    for(var i=0; i<this.state.items.length;i++){
      if(this.state.items[i]===this.state.item){
        index=i;
        break;
      }
    }
    
    var el = this.getDOMNode();
    var h = $(el).find(".BlogBodyInner").height();
    $(el).find(".BlogBodyInner").css({height: h, overflow: "hidden"});
    window.setTimeout(function(){
      $(el).find(".BlogBodyInner").css({height: "auto", overflow: "hidden"});
    }, 500);
    
    if ((index+1) < this.state.items.length){
      this.setState({ item: this.state.items[index+1], toScroll: true });
    }else{
      this.setState({ item: this.state.items[0], toScroll: true });
    }
  },
  render: function() {
    var docW = $(".ParaMain").width()-50;
    var blog = null;
    var active_id = null;

    if(this.state.item){
      var item = this.state.item
      blog = React.createElement(BlogItem, {width: docW, key: "full"+item.id, data: item, nav_height: null, onSelect: this.handleSelect, onScrollTo: this.handleScrollTo})
      var active_id = item.id;
    }
    //console.log(this.props.data)
    
    return (
      React.createElement("div", {className: "Blog"}, 
      React.createElement(ParallaxContainer, {backgroundColor: this.props.data.backgroundIMG.color, height: this.props.data.height, imgSrc: this.props.data.backgroundIMG.url, img_h: this.props.data.backgroundIMG.img_h, img_w: this.props.data.backgroundIMG.img_w}, 
        React.createElement(LayoutRow, {className: "BlogNav", row_data: { fontColor: this.props.titleColor, backgroundColor: "transparent", backgroundImage: this.props.data.titleIMG.url}}, 
          React.createElement(LayoutContainer, null, 
            React.createElement(LayoutContainerHeading, null, this.props.data.title), 
            React.createElement(BlogList, {ratioW: this.props.data.ratioW, ratioH: this.props.data.ratioH, prev: this.state.prev, next: this.state.next, onPrev: this.handlePrev, onNext: this.handleNext, active_id: active_id, isSmall: this.state.isSmall, items: this.state.items, onItemSelect: this.handleItemSelect})
          )
        ), 
      

        React.createElement(LayoutRow, {className: "BlogBody", row_data: { fontColor: "#fff", backgroundColor: "transparent"}}, 
          React.createElement(LayoutContainer, null, 
            React.createElement("div", {className: "BlogBodyInner", style: {minHeight: "100px"}}, 
            blog
            ), 
            React.createElement("div", {className: "ButtonContain clearfix", style: {height: "80px", padding: "20px"}}, 
              React.createElement("div", {className: "Button Prev", onClick: this.handlePrev}, "Prev"), 
              React.createElement("div", {className: "Button Next", onClick: this.handleNext}, "Next")
            )
          )
        )
      )
      )
    );
  }
});


var BlogList = React.createClass({displayName: "BlogList",
  getInitialState: function() {
    return {
      loading: false,
      isScrollingForced: false
    };
  },
  getDefaultProps: function() {
    return {
      ratioW: 40,
      ratioH: 25
    };
  },
  handleSelect: function(item){
    this.props.onItemSelect(item);
  },
  handleScroll: function(e){
    window.clearTimeout(window.timeoutBloglist);

    
    // var fontSize600 = 3;
    // var fontSize = (this.docW / 600) * fontSize600;
    // var maxPerRow = 10;
    // var countItems = this.props.items.length;
    // var width = Math.floor( this.docW / (countItems + 1) );


    var width = this.renderedWidth;
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
        // console.log('isScrollingForced 0')
        this.isScrollingForced=false;
        // window.setTimeout(function(){
        //   $(el).scrollLeft( _scrollto );
        //   this.isScrollingForced=false;
        // }.bind(this), 1000);
        //this.state.isScrollingForced=false;
      }.bind(this));
    }.bind(this), 400);

  },
  componentDidMount: function() {
    //console.log("me");
    window.timeoutBloglist=null;
    var el = this.getDOMNode();
    var width = this.renderedWidth;
    var scrollbase = (this.props.prev) ? 3 : 0.5;
    var scrollTo = (width * scrollbase);
    //console.log(this.renderedWidth);

    $(el).scrollLeft( scrollTo );
  },
  componentDidUpdate: function(){
    var el = this.getDOMNode();
    var width = this.renderedWidth;
    var scrollbase = (this.props.prev) ? 3 : 0.5;
    var scrollTo = (width * scrollbase);
    $(el).scrollLeft( scrollTo );
  },
  render: function() {
    var docW = $(".ParaMain").width()-50;

    var fontSize600 = 3;
    var fontSize = (docW / 600) * fontSize600;

    var maxPerRow = 10;

    var countItems = this.props.items.length;
    var width = Math.floor( docW / (countItems + 1) );
    width = (width>150) ? 150 : width;
    this.renderedWidth = width;

    var prevW = (this.props.prev) ? width*3 : width*1;
    var nextW = (this.props.next) ? width*3 : width*1;
    var contW = (width*countItems);
    var totW = (width*(countItems+1));
    var totWInner = contW+prevW+nextW;

    var w_ratio = (width / this.props.ratioW);

    var items = this.props.items.map(function(item, i) {
      var isActive = false;
      var newheight = Math.floor(w_ratio * this.props.ratioH);
      if(this.props.active_id==item.id){
        isActive = true;
        newheight = Math.floor(w_ratio * (this.props.ratioH * 1.2));
      }
      return (
          React.createElement(BlogItem, {isActive: isActive, key: item.id, data: item, width: width+"px", nav_height: newheight, font_size: fontSize+"px", alt_size: 3, padding: "0px", isNav: true, onSelect: this.handleSelect})
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
        React.createElement("div", {className: "BlogList", onScroll: this.handleScroll, style: {width: (totW)+"px"}}, 
          React.createElement("div", {className: "BlogListInner", style: {width: (totWInner)+"px"}}, 
           React.createElement("div", {className: prev_classname, style: {width: (prevW)+"px"}}, React.createElement("div", {className: "BIOverlay"}), React.createElement("div", {className: "BIContent"}, "Previous")), 
             React.createElement("div", {style: {display: "inline-block", width: (contW)+"px"}}, 
             items
             ), 
           React.createElement("div", {className: next_classname, style: {width: (nextW)+"px"}}, React.createElement("div", {className: "BIOverlay"}), React.createElement("div", {className: "BIContent"}, "Next"))
          )
        )
    );
  }
});












var BlogItem = React.createClass({displayName: "BlogItem",
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
      font_size: "16px",
      nav_height: 40
    };
  },
  handleClick: function(){
    if(typeof this.props.onSelect == "function"){
      this.props.onSelect(this.props.data);
    }
  },
  componentDidMount: function(){
    window.setTimeout(this.setOverlayHeight, 1000);
    if(typeof this.props.onScrollTo == "function"){
      this.props.onScrollTo();
    }
  },
  componentDidUpdate: function(){
    this.setOverlayHeight();
    //$("blog_"+this.props.data.id+" .BIOverlay").hide();
    //$("blog_"+this.props.data.id+" .BIOverlay").height( $("blog_"+this.props.data.id+" .BIContent").height() );
  },
  setOverlayHeight: function(){
    // var h = $("#blog_"+this.props.data.id+" .BIContent").height();
    // $("#blog_"+this.props.data.id+" .BIOverlay").height(h);
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
      arrow = React.createElement("div", {className: "BlogArrow"}, React.createElement("div", {className: "arrow"}))
    }else{
      class_name += " full";
    }
    
    var content;
    if(this.props.data.type=="photo"){
      var imgs = null;
      if(this.props.data.photos && this.props.data.photos.length>0){
        imgs = React.createElement("img", {src: this.props.data.photos[0].alt_sizes[this.props.alt_size].url})
      }
      content = React.createElement("div", {className: "BIContent", style: {overflow: "hidden"}}, 
          imgs, 
          React.createElement("div", {style: {fontSize: this.props.font_size}, dangerouslySetInnerHTML: {__html: this.props.data.caption}})
        )
    } 
    if(this.props.data.type=="text"){
      content = React.createElement("div", {className: "BIContent", style: {overflow: "hidden"}}, 
          React.createElement("div", {style: {fontSize: this.props.font_size}, dangerouslySetInnerHTML: {__html: "<h1>"+this.props.data.title+"</h1>" + this.props.data.body}})
        )
    } 
    if(this.props.data.type=="video"){
      if(this.props.isNav){
        var vidsrc = this.props.data.permalink_url.replace("https://www.youtube.com/watch?v=", "");
        vidsrc = "http://img.youtube.com/vi/"+vidsrc+"/mqdefault.jpg"
        content = React.createElement("div", {className: "BIContent", style: {overflow: "hidden"}}, 
          React.createElement("img", {src: vidsrc, width: "100%"})
        )
      }else{
        var vidw = "100%";
        var vidh = "350";
        content = React.createElement("div", {className: "BIContent", style: {overflow: "hidden"}}, 
          React.createElement("div", {style: {fontSize: this.props.font_size}, dangerouslySetInnerHTML: {__html: this.props.data.player[0].embed_code.replace("width=\"250", "width=\""+vidw).replace("height=\"141", "height=\""+vidh)}})
        )
      }
    } 

    return (
       React.createElement("div", {id: "blog_"+this.props.data.id, className: class_name, unselectable: "on", 
        onMouseOver: this.handleHover, 
        onMouseOut: this.handleMouseOut, 
        onClick: this.handleClick, style: {width: this.props.width, padding: this.props.padding}}, 

        React.createElement("div", {className: "BIOverlay", style: {width: this.props.width, height: (this.props.nav_height ? this.props.nav_height : "auto"), marginBottom: (this.props.nav_height ? "-"+this.props.nav_height+"px" : "0px")}}, " "), 
        React.createElement("div", {className: "BIContent", style: {overflow: "hidden", height: (this.props.nav_height ? this.props.nav_height : "auto")}}, 
         content
        ), 
        arrow
       )

    );
  }
});











var TopContainer = React.createClass({displayName: "TopContainer",
  render: function() {
    return (
      React.createElement("div", {className: "ParaMain", style: { width: "100%", height: "auto", margin: 0, padding: 0}}, 
         this.props.children
      )
    );
  }
});

var ParallaxContainer = React.createClass({displayName: "ParallaxContainer",
  getInitialState: function() {
    return {
      paneHeight: this.getWindowHeight(),
      paneWidth: this.getDocumentWidth()
    };
  },
  getDefaultProps: function() {
    return {
      parallax: true,
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
  getDocumentWidth: function(){
    return Math.ceil(ST_docWidth());
  },
  checkImageHorizontal: function(){
    return this.props.img_w >= this.props.img_h;
  },
  calcPaneHeight: function(){
    if(this.props.height.indexOf("%") > -1) {
      // console.log(this.props.height.replace("%"))
      var percent = (parseInt(this.props.height) / 100);
      return Math.ceil(percent * this.state.paneHeight);
    }else{
      return this.props.height=="auto" ? "auto" : parseInt(this.props.height);
    }
    // return (this.props.height.indexOf("%") > -1) ? this.state.windowHeight : this.props.height; 
  },
  calcImageDimensions: function(containW, containH){
    var paneIsHorizontal = (containW >= containH);
    var returnDimensions = {
      offsetLeft: 0,
      offsetTop: -10
    };
    if(this.checkImageHorizontal()){
      var newH = containH+20;
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
    if(this.props.parallax){
      ST_windowScroll(function(){
        this.handleWindowScroll();
      }.bind(this));
    }
  },
  handleResize: function(){
    var h = this.getWindowHeight();
    if( h!==this.state.paneHeight){
      this.setState({ paneHeight: h });
      return;
    }
    var w = this.getDocumentWidth();
    if( w!==this.state.paneWidth){
      this.setState({ paneWidth: w });
      return;
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
      style.transform = "translate3d(0px, "+imgDimensions.offsetTop+"px, 0px)";
    }else{
      style.top = imgDimensions.offsetTop+"px";
    }
    return style;
  },
  handleWindowScroll: function(){
    window.clearTimeout(this.timeoutScroll);
    var el = this.getDOMNode();
    var offsetTop =  $(el).offset().top;
    var h = $(el).height();
    var offsetH = offsetTop+h;
    var element_img = $(el).find(".ParaBGImg");
    var current_offset = parseInt( element_img.attr("data-topoffset") );
    // console.log(current_offset)
    if($(window).scrollTop()>=offsetTop &&  $(window).scrollTop()<=offsetH){
      var diff = $(window).scrollTop() - offsetTop;
      var change = current_offset+(diff*0.5);
      if(Modernizr && Modernizr.csstransforms3d){
        element_img.css({transform: "translate3d(0px, "+change+"px, 0px)"});
      }else{
        element_img.css("top", change);
      }
    }else{
      this.timeoutScroll = window.setTimeout(function(){
        if(Modernizr && Modernizr.csstransforms3d){
          element_img.css({transform: "translate3d(0px, "+current_offset+"px, 0px)"});
        }else{
          element_img.css("top", current_offset);
        }
      }, 300);
      
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
    
    var mainStyle = {
      position: "relative", 
      width: "100%", 
      height: setHeight, margin: 0, padding: 0, backgroundColor: this.props.backgroundColor };
   
    var bgimg;
    if(this.props.height!="auto" && !setHeight.isNaN ){
      imgDimensions = this.calcImageDimensions( this.state.paneWidth, imageContainHeight );
      var imgStyle = this.imgStyle(imgDimensions);
      bgimg = React.createElement("img", {className: "ParaBGImg", "data-topoffset": imgDimensions.offsetTop, src: this.props.imgSrc, style: imgStyle})
    }else{
      mainStyle.background = "transparent url('"+this.props.imgSrc+"') no-repeat center center";
      mainStyle.backgroundSize = "cover";
    }

    return (
      React.createElement("div", {className: "ParaContainer", style: mainStyle}, 
        React.createElement("div", {className: "ParaBG", style: { position: "relative", overflow: "hidden", width: "100%", height: imageContainHeight, margin: 0, padding: 0}}, 
          bgimg
        ), 
        React.createElement("div", {className: "ParaContent", style: { position: "relative", width: "100%", top: "-"+imageContainHeight, height: setHeight, margin: 0, padding: 0}}, 
          React.createElement("div", {style: { position: "relative", width: "100%", height: "100%", zoom: "1"}}, 
             this.props.children
          )
        )
      )
    );
  }
});





































var Quotes = React.createClass({displayName: "Quotes",
  getInitialState: function() {
    return {
      items: [],
      item: null,
      toScroll: false,
      offset: 0,
      isSmall: false,
      prevActive: false,
      nextActive: false,
      paused: false,
    };
  },
  componentDidMount: function() {
    this.getStateData(function(){
      this.setState({ item: this.state.items[0] })
      this.props.onLoaded();
      this.handlePlay();
    }.bind(this));
  },
  getStateData: function(callback){
    this.getItems(function(data){

      //console.log(data.response.posts)
      var posts = [];
      var count = 0;
      for(var i=0; i<data.response.posts.length; i++){
        var post = data.response.posts[i];
        if(post.status=="published"){
          posts.push(post);
          count++;
        }
        if(count==40){
          break;
        }
      }

      this.setState({items: data.response.posts});
      if(typeof callback==='function'){
        callback();
      }
    }.bind(this));
  },
  handlePlay: function(){
    this.intervalS = window.setInterval(function(){
      this.handleNext();
    }.bind(this), 6000);
  },
  handlePauseToggle: function(){
    if(this.intervalS!=null){
      window.clearInterval(this.intervalS)
      this.intervalS = null;
      this.setState({paused: true});
    }else{
      this.handlePlay();
      this.setState({paused: false});
    } 
  },
  getItems: function(callback){
    $.ajax({
      type:'GET',
      url: "http://api.tumblr.com/v2/blog/familiarwild.tumblr.com/posts",
      dataType:'jsonp',
      data: {
          api_key : "cm1eEmrZgqEcevWcnGhO6yCdhSgaNQyNKB1pLRnFOaIgRrZZsG",
          tag: "fwquoteshow",
          limit: 100,
          offset: this.state.offset
      },
      success: function(data){
        if(typeof callback==='function'){
          callback(data);
        }
      }.bind(this)
    });
  },
  handleItemSelect: function(item){
    var item_c = item;
    this.setState({ item: item_c, toScroll: true })
  },
  handleScrollTo: function(){
    // if(this.state.toScroll){
    //   var el = this.getDOMNode();
    //   var ts = $(el).offset().top;
    //   ST_setScrollPos(ts);
    // }
  },
  handlePrev: function(){
    this.handleScrollTo();
    var index = 0;
    for(var i=0; i<this.state.items.length;i++){
      if(this.state.items[i]===this.state.item){
        index=i;
        break;
      }
    }
    index = ((index-1) >= 0) ? (index-1) : 0;
    this.setState({ item: this.state.items[index], toScroll: true });
  },
  handleNext: function(){
    this.handleScrollTo();
    var index = 0;
    for(var i=0; i<this.state.items.length;i++){
      if(this.state.items[i]===this.state.item){
        index=i;
        break;
      }
    }
    var el = this.getDOMNode();
    $(el).find(".QuoteText").fadeOut(200, function(){
      if ((index+1) < this.state.items.length){
        this.setState({ item: this.state.items[index+1], toScroll: true });
      }else{
        this.setState({ item: this.state.items[0], toScroll: true });
      }
      $(el).find(".QuoteText").fadeIn(200);
    }.bind(this));
  },
  render: function() {
    var quote = null;
    if(this.state.item){
      var item = this.state.item
      quote = React.createElement("div", {className: "QuoteText"}, React.createElement("span", {dangerouslySetInnerHTML: {__html: item.text}}), React.createElement("div", {className: "QuoteSource"}, React.createElement("span", {dangerouslySetInnerHTML: {__html: "- "+item.source}})))
    }

    return (
      React.createElement("div", {className: "Quotes"}, 
      React.createElement(ParallaxContainer, {backgroundColor: this.props.data.backgroundIMG.color, height: this.props.data.height, imgSrc: this.props.data.backgroundIMG.url, img_h: this.props.data.backgroundIMG.img_h, img_w: this.props.data.backgroundIMG.img_w}, 
        React.createElement(LayoutRow, {className: "QuoteBody", row_data: { fontColor: "#fff", backgroundColor: "transparent"}}, 
          React.createElement(LayoutContainer, null, 
            React.createElement(LayoutContainerHeading, null, this.props.data.title), 
            React.createElement("div", {style: {minHeight: "100px"}}, 
            quote
            ), 
            React.createElement("div", {className: "ButtonContain clearfix", style: {height: "80px", padding: "20px"}}, 
              React.createElement("div", {className: "Button Prev", onClick: this.handlePrev}, "Prev"), 
              React.createElement("div", {className: "Button Pause", onClick: this.handlePauseToggle}, (this.state.paused ? "Play" : "Pause")), 
              React.createElement("div", {className: "Button Next", onClick: this.handleNext}, "Next")
            )
          )
        )
      )
      )
    );
  }
});





























//==================


var Stuff = React.createClass({displayName: "Stuff",
  getInitialState: function() {
    return {
      loaded: false,
    };
  },
  handleLoaded: function(){
    this.setState({loaded: true});
  },
  render: function() {
    var text = React.createElement("span", null, "loading...");
    if(this.state.loaded){
      text = React.createElement("span", null, "FAMILIAR WILD");
    } 

    return (
      React.createElement(TopContainer, null, 

        React.createElement(ParallaxContainer, {backgroundColor: IMGS.main.color, height: "100%", imgSrc: IMGS.main.url, img_h: IMGS.main.img_h, img_w: IMGS.main.img_w}, 
          React.createElement("div", {id: "test", style: {position: "relative", top: "20%", height: "50%"}}, 
            React.createElement("img", {src: "/images/logo.svg", className: "DropShadowed", style: {display: "block", height: "80%", margin: "0 auto"}}), 
            React.createElement("div", {className: "DropShadowed", style: {display: "block", height: "20%", textAlign: "center", color: "#fff", fontWeight: "200", fontSize: "36px", fontFamily: "Raleway, Helvettica, Arial, sans-serif"}}, 
            text
            )
          )
        ), 
        
        React.createElement("div", {style: {display: (this.state.loaded ? "block" : "none")}}, 
          React.createElement(AlbumsView, {data: {id: "albums", ratioW: 40, ratioH: 18, title:"Albums", height: "auto", titleIMG: IMGS.none, backgroundIMG: IMGS.musicback}}), 

          React.createElement(StuffBlogs, {onLoaded: this.handleLoaded, blogdata: DATABLOG, isHidden: !this.state.loaded}), 
          
          React.createElement(Quotes, {onLoaded: this.handleLoaded, data: {id: "vid", ratioW: 40, ratioH: 18, title:"Quotes", height: "350", titleIMG: IMGS.none, backgroundIMG: IMGS.bgmountsm}}), 

          React.createElement(LayoutRow, {className: "BlogNav", row_data: { fontColor: "#fff", backgroundColor: "#444"}}, 
            React.createElement(LayoutContainer, null, 
              React.createElement(LayoutContainerHeading, null, "Booking+Press+Contact"), 
              "hel"
            )
          )
        )
      )
    );
  
  }
});








var StuffBlogs = React.createClass({displayName: "StuffBlogs",
  getInitialState: function() {
    return {
      loaded: false,
      countLoad: 0
    };
  },
  handleLoaded: function(){
    this.setState({ countLoad: this.state.countLoad+1 });
    var totalItems = this.props.blogdata.length + 1; //Quotes
    var loadNumber = totalItems-1;
    if(this.state.countLoad==loadNumber){
      this.setState({ loaded: true });
      this.props.onLoaded();
    }
  },
  render: function() {
    var loadNumber = (this.state.countLoad < this.props.blogdata.length) ? this.state.countLoad : this.props.blogdata.length-1;

    var showBlogs = [];
    for(var i=0; i<=loadNumber; i++){
      showBlogs.push(this.props.blogdata[i]);
    }

    return (
      React.createElement("div", {style: {display: (this.props.isHidden ? "block": "block")}}, 
       React.createElement(StuffBlogsList, {data: showBlogs, onLoaded: this.handleLoaded})
      )
    );
  }
});

var StuffBlogsList = React.createClass({displayName: "StuffBlogsList",
  handleLoaded: function(){
    this.props.onLoaded();
  },
  render: function() {
    var blogs;
    if(this.props.data.length>0){
      blogs = this.props.data.map(function(item, i) {
        return (
          React.createElement(Blog, {key: item.id, data: item, titleColor: item.titleColor, onLoaded: this.handleLoaded, ratioW: this.ratioW, ratioH: this.ratioH})
        );
      }.bind(this));
    }

    return (
      React.createElement("div", null, 
       blogs
      )
    );
  }
});






React.render( React.createElement(Stuff, null) , document.getElementById('ppp'));











































function ST_windowWidth(){
  return $(window).width();
}
function ST_docWidth(){
  return $(document).width();
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
function ST_setScrollPos(number){
  var body = $("html, body");
  body.stop().animate({scrollTop:number}, '500', 'swing');
  //return $(window).scrollTop(number, 200);
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


// $(document).ready(function(){
//   $(window).resize(function(){
//       setViewportMeta();
//   });
//   setViewportMeta()
// })


// function setViewportMeta(){
//   var winW = $(window).width();
//   if(winW < 600){
//     //var times = winW / 600;
//     alert('d')
//     $('meta[name=viewport]').attr('content','width=600');
//   }else{
//     $('meta[name=viewport]').attr('content','width=device-width, initial-scale=1');
//   }
// }




// $(window).scroll(function(){

//     var scroll_h = $(window).scrollTop();
//     var diff = t_h - scroll_h;
//     diff = (diff < 0) ? t_h : t_h - diff;
//     var percent_h = ( diff / t_h  );
//     //$("#top-para-img").css({top: "-"+( percent_h * change_h )+"px"}, 0);
//     $("#top-para-img").css({transform: "translate3d(0px, -"+( percent_h * change_h )+"px, 0px)"});

//   });















