
var FamiliarLayout = React.createClass({displayName: "FamiliarLayout",
  getInitialState: function() {
    return {
      loaded: false,
      countLoad: 0,
      agent: false,
      validcode: false,
      codetext: "",
      IMG: this.getImgMain()
    };
  },
  handleImageChange: function(){
    this.setState({IMG: this.getImgMain()});
  },
  handleTextInput: function(e){
    var textme = e.target.value.replace(/[^0-9A-Za-z\-]/g, "")
    var RegPattTest = /^[0-9A-Za-z]{0,4}\-?[0-9A-Za-z]{0,4}$/g;
    if(RegPattTest.test(textme)){
      var RegPattDash = /^[0-9A-Za-z]{5}$/;
      if(RegPattDash.test(textme)){
        textmeA = textme.substring(0, 4);
        textmeB = textme.substring(4, 5);
        textme = textmeA + "-" + textmeB;
      }
      this.setState({codetext: textme});
      
      var RegPattFin = /^[0-9A-Za-z]{4}\-[0-9A-Za-z]{4}$/;
      if(RegPattFin.test(textme)){
        this.handleAgentCode()
      }
    }    
  },
  handleAgent: function(){
    this.setState({ agent: (!this.state.agent) });
  },
  handleAgentCode: function(){
    var text = React.findDOMNode(this.refs.code).value;
    var RegPattFin = /^[0-9A-Za-z]{4}\-[0-9A-Za-z]{4}$/;
    if(RegPattFin.test(text)){
      this.setState({ validcode: true });
      window.open("http://bandcode.familiarwild.com/?code="+text, "_blank");
    }else{
      this.setState({ validcode: false, agent: false });
    }   
  },
  handleLoaded: function(){
    this.setState({ countLoad: this.state.countLoad+1 });
    var loadNumber = 4 - 1;
    if(this.state.countLoad==loadNumber){
      this.setState({ loaded: true });
    }
  },
  getImgMain: function(){
    var type = maintypes[Math.floor(Math.random()*maintypes.length)];
    var retIMG = IMGS[type];
    if(this.state!=null){
      while (retIMG==this.state.IMG) {
        type = maintypes[Math.floor(Math.random()*maintypes.length)];
        retIMG = IMGS[type];
      }
    }
    return retIMG;
  },
  render: function(info) {
    var logoText = React.createElement("span", null, "Loading...");
    if(this.state.loaded){
      logoText = React.createElement("span", null, "FAMILIAR WILD");
    } 

    var downcodeheight = this.state.agent ? "auto" : "auto";
    var agentInfo;
    if(this.state.agent){
      // if(this.state.validcode){
      //    agentInfo = <div style={{padding: "40px 0px"}}>
      //    <iframe width="100%" height="480" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/145965754%3Fsecret_token%3Ds-uWIqP&amp;color=00aabb&amp;auto_play=true&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false"></iframe>
      //   </div>
      // }else{
        agentInfo = React.createElement("div", {className: "SubmitCode clearfix", style: {padding: "40px 0px"}}, 
          React.createElement("span", null, "Enter Code"), 
          React.createElement("input", {ref: "code", type: "text", onChange: this.handleTextInput, value: this.state.codetext}), 
          React.createElement("div", {onClick: this.handleAgentCode}, "Submit Code")
        )
      //}
    }else{
      agentInfo = React.createElement("div", {className: "ButtonContain clearfix"}, 
        React.createElement("a", {className: "Button", onClick: this.handleAgent}, "Stream Samples")
      )
    }
     

    return (
      React.createElement(TopContainer, null, 
        React.createElement(ParallaxContainer, {backgroundColor: this.state.IMG.color, height: "100%", imgSrc: this.state.IMG.url, img_h: this.state.IMG.img_h, img_w: this.state.IMG.img_w}, 
          React.createElement("div", {onClick: this.handleImageChange, className: "Logo", style: {position: "relative", top: "20%", height: "50%"}}, 
            React.createElement("img", {src: "/images/logo_w.svg", className: "DropShadowed", style: {display: "block", height: "80%", margin: "0 auto"}}), 
            React.createElement("div", {className: "DropShadowed", style: {display: "block", height: "20%", textAlign: "center", color: "#fff", fontWeight: "200", fontSize: "36px", fontFamily: "Raleway, Helvettica, Arial, sans-serif"}}, 
            logoText
            )
          )
        ), 
        
        React.createElement(AlbumsView, {onLoaded: this.handleLoaded, data: {id: "albums", ratioW: 40, ratioH: 18, title:"Albums", height: "auto", titleIMG: IMGS.none, backgroundIMG: IMGS.musicback}}), 
        React.createElement(Blog, {data: {id: "vid", ratioW: 40, ratioH: 18, tag: "fwvideo", title:"Videos", height: "620", titleIMG: IMGS.none, backgroundIMG: IMGS.bgrock}, onLoaded: this.handleLoaded, ratioW: 40, ratioH: 18}), 
        React.createElement(Blog, {data: {id: "show", ratioW: 40, ratioH: 30, tag: "fwshows", title:"Shows", height: "auto", titleColor: "#000", titleIMG: IMGS.none, backgroundIMG: IMGS.bgice}, titleColor: "#000", onLoaded: this.handleLoaded, ratioW: 40, ratioH: 25}), 
        

        React.createElement(ParallaxContainer, {backgroundColor: "#db455f", height: downcodeheight, imgSrc: IMGS.bgblurvid.url, img_h: IMGS.bgblurvid.img_h, img_w: IMGS.bgblurvid.img_w}, 
          React.createElement("div", {style: {display: "block", overflow: "hidden"}}, 
          React.createElement(LayoutRow, {row_data: { fontColor: "#fff", backgroundColor: "transparent"}}, 
            React.createElement(LayoutContainer, null, 
              React.createElement(LayoutContainerHeading, null, "Download Codes")
            )
          ), 
          React.createElement(LayoutRow, {className: "DownloadCodes", row_data: { fontColor: "#fff", backgroundColor: "transparent"}}, 
            React.createElement(LayoutContainer, null, 
              React.createElement("p", null, "If you received a download card from one of our events you can redeem your code here. Once you have downloaded your music simply drag the files into your itunes or your favorite player."), 
              React.createElement("div", {className: "ButtonContain clearfix"}, 
              React.createElement("a", {className: "Button", target: "_blank", href: "http://bandcode.familiarwild.com"}, "Redeem Code")
              ), 

              React.createElement("h3", null, "Agent Information"), 
              React.createElement("div", null, "We thank you for taking the time to listen to our music. ISRC codes are part of the song title in the samples provided... Unmastered samples do not have ISRC codes. Please contact a Familiar Wild representative we would love to hear from you."), 
              React.createElement("div", null, "If you are unable to Download the Samples right now you can use your code to get a *streaming version*. Click the Samples button below to get started."), 
              agentInfo
              
            )
          )
          )
        ), 

        
        React.createElement(Booking, null), 

        React.createElement(Quotes, {onLoaded: this.handleLoaded, data: {id: "vid", ratioW: 40, ratioH: 18, title:"Quotes", height: "350", titleIMG: IMGS.none, backgroundIMG: IMGS.bgmountsm}})

      )
    );
  

  }

});

function handleBookingComplete(){
  bookingObject.handleThankYou();
}
bookingObject = null;

var Booking = React.createClass({displayName: "Booking",
  getInitialState: function() {
    return {
      type: "contact"
    };
  },
  componentDidMount: function() {
    bookingObject = this;
  },
  handleContact: function(){
    this.handleScrollTo();
    if(this.state.type=="contact"){
      this.setState({type: "none"})
    }else{
      this.setState({type: "contact"})
    }
  },
  handleEPK: function(){
    this.handleScrollTo();
    if(this.state.type=="epk"){
      this.setState({type: "none"})
    }else{
      this.setState({type: "epk"})
    }
  },

  

  handleThankYou: function(){
    this.handleScrollTo();
    if(this.state.type=="thanks"){
      this.setState({type: "none"})
    }else{
      this.setState({type: "thanks"})
    }
  },
  handleScrollTo: function(){
    if(this.state.toScroll){
      var el = this.getDOMNode();
      var ts = $(el).offset().top;
      ST_setScrollPos(ts);
    }
  },
  render: function() {

    var content = null;
    if(this.state.type=="contact"){
      content = React.createElement("div", null, 
      React.createElement("p", null, 
      "Regan Harney: ", React.createElement("a", {href: "mailto:managementfamiliarwild@gmail.com"}, "managementfamiliarwild@gmail.com")
      )
      )
      
    }
    if(this.state.type=="thankyou"){
      content = React.createElement("div", null, React.createElement("h2", null, "Thank you for sumbiting your information."))
    }
    if(this.state.type=="epk"){
      content = React.createElement("div", null, 
      React.createElement("h2", null, "Biography Short/Press"), 
      React.createElement("p", null, "Familiar Wild writes \"pop music with heart and soul...and brain...and kindness\" (DJ Champion). This Pacific Northwest band creates music with stirring atmospheres, rare melodic angles and inviting textures. Their new album could be the love child of Indie Folk band Daughter, Scandi-Pop artist Susanne Sundfor and Electro-based Postal Service and will be released with Abandon Building Records, 2016."), 
      React.createElement("h2", null, "Biography Full"), 
      React.createElement("p", null, 
      "The Tame sing like Wolves."
      ), React.createElement("p", null, 
      "What can you say about the music of Familiar Wild? It’s a weave of fibre optic branches forming a cradle of symphonic melody that you want to fold yourself into and float away on. It's \"disarming, unusual and inviting\" (Nothing But Hope And Passion) with \"stories [that] are contemplative and evocative in nature\" (Vue Weekly). \"It's pop music with heart and soul...and brain...and kindness\" (DJ Champion)."
      ), React.createElement("p", null, 
      "Regardless how you spin it, Familiar Wild is a Pacific Northwest band that creates music with stirring atmospheres, rare melodic angles and inviting textures."
      ), React.createElement("p", null, 
      "Their debut album, Dark Dreams, is rich in orchestral arrangements akin to Sufjan Stevens and intimate like Agnes Obel. The music is reminiscent of something lost, but almost within grasp. The sound is quoted as \"atmospheric\" and \"stirring\" with a \"warm sweetness\" that \"draws you in on the immense possibility that something might escape you\" (AlanCross, A Journal of Musical Things).   "
      ), React.createElement("p", null, 
      "Their sophomore album, Things We Forgot (released 2016), takes a spatial turn towards the geometric; adding edgy soundscapes, manipulated synth pads and hard hitting percussion to their organic instrumentation and melodic tendencies. These \"warm synth tones and electronic beats...pair nicely with the voice of [their] lead singer\" (Exclaim), creating an album that sounds like the love child of Indie Folk band Daughter, Scandi-Pop artist Susanne Sundfor and Electro-based Postal Service. "
      ), React.createElement("p", null, 
      "Familiar Wild blends their new genre with matching imagery at their shows and online; using geometry and nature as inspiration, they evoke the \"other\" in all of us through escapism to sound. Their music is intimate and radiant, with a live show that is equally generous in its gifts of feathered shadows and lingering joy."
      ), 
      React.createElement("h2", null, "Notable Events"), 
      React.createElement("div", null, 
        React.createElement("div", {style: {display: "list-item", marginLeft: "20px"}}, "Nominated for a Toronto Indie Music Award for Every Cloud - 2015"), 
        React.createElement("div", {style: {display: "list-item", marginLeft: "20px"}}, "Familiar Wild highlighted in Exclaim, Nothing But Hope And Passion (Vice affiliate), Silent Shout, Permanent Rain Press and Electric Sound of Joy (2015)"), 
        React.createElement("div", {style: {display: "list-item", marginLeft: "20px"}}, "Familiar Wild/Adin Wridgway (modfusion media)/Kristian Adam nominated for Western Canadian Music Award 2014 (Dark Dreams)"), 
        React.createElement("div", {style: {display: "list-item", marginLeft: "20px"}}, "Familiar Wild plays West Coast folk giant Vancouver Island MusicFest"), 
        React.createElement("div", {style: {display: "list-item", marginLeft: "20px"}}, "Familiar Wild highlighted in Vue Weekly, Vancouver Sun and The Province, CTV performance, Global TV performance, Shaw TV performance"), 
        React.createElement("div", {style: {display: "list-item", marginLeft: "20px"}}, "Familiar Wild plays Canadian Music Week 2014, Toronto"), 
        React.createElement("div", {style: {display: "list-item", marginLeft: "20px"}}, "Slide highlighted in Episode 304 of CBC’s Arctic Air (January 28 2013)"), 
        React.createElement("div", {style: {display: "list-item", marginLeft: "20px"}}, "Familiar Wild charts high on !earshot (national campus/community radio report)"), 
        React.createElement("div", {style: {display: "list-item", marginLeft: "20px"}}, "Oregon places as Finalist in UK Songwriting Contest 2013 and Semi-Finalist in the International Songwriting Competition 2014"), 
        React.createElement("div", {style: {display: "list-item", marginLeft: "20px"}}, "Familiar Wild plays West Coast Indie Festival giant, Rifflandia, 2013"), 
        React.createElement("div", {style: {display: "list-item", marginLeft: "20px"}}, "Familiar Wild showcases at Toronto’s NXNE, 2013"), 
        React.createElement("div", {style: {display: "list-item", marginLeft: "20px"}}, "Familiar Wild debuts at Vancouver’s top, mid-sized venues: The Rio and The Biltmore Cabaret, 2013")
      ), 

      React.createElement("h2", null, "Press Images"), 
      React.createElement("div", null, React.createElement("a", {href: "/images/famw_pr03.jpg", target: "_blank"}, "Download High Res Image 01"))
      


      )
    }
    
    return (
    React.createElement("div", {className: "BookingCont", style: { backgroundColor:"transparent"}}, 
          React.createElement("div", {style: {display: "block", overflow: "hidden"}}, 


          React.createElement(LayoutRow, {className: "Booking", row_data: { fontColor: "#111", backgroundColor: "transparent"}}, 
            React.createElement(LayoutContainer, null, 
              React.createElement("div", {className: "ButtonContain clearfix"}, 
                React.createElement("a", {className: "Button" + ((this.state.type=='contact') ? ' Active' : ''), target: "_blank", onClick: this.handleContact}, "Booking & Inquiries"), 
                React.createElement("a", {className: "Button" + ((this.state.type=='epk') ? ' Active' : ''), target: "_blank", onClick: this.handleEPK}, "Bio + EPK")
              )
            )
          ), 

          React.createElement(LayoutRow, {className: "BookingContent", row_data: { fontColor: "#333", backgroundColor: "transparent"}}, 
            React.createElement(LayoutContainer, null, 
              content
            )
          )

          )
    )
    )
  }

});










var TopContainer = React.createClass({displayName: "TopContainer",
  render: function() {
    var style={ 
      display: "block", 
      position: "relative", 
      width: "100%", 
      height: "auto", 
      overflow: "hidden", 
      margin: 0, 
      padding: 0 
    };
    return (
      React.createElement("div", {className: "ParaMain", style: style}, 
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
    var style_top={ 
      display: "block", 
      position: "relative", 
      width: "100%", 
      height: setHeight,
      margin: 0, 
      padding: 0,
      backgroundColor: this.props.backgroundColor
    };

    var bgimg;
    if(this.props.height!="auto" && !setHeight.isNaN ){
      imgDimensions = this.calcImageDimensions( this.state.paneWidth, imageContainHeight );
      var imgStyle = this.imgStyle(imgDimensions);
      bgimg = React.createElement("img", {className: "ParaBGImg", "data-topoffset": imgDimensions.offsetTop, src: this.props.imgSrc, style: imgStyle})
    }else{
      style_top.background = "transparent url('"+this.props.imgSrc+"') no-repeat center center";
      style_top.backgroundSize = "cover";
    }

    return (
      React.createElement("div", {className: "ParaContainer", style: style_top}, 
        React.createElement("div", {className: "ParaBG", style: { position: "relative", overflow: "hidden", width: "100%", height: imageContainHeight, margin: 0, padding: 0}}, 
          bgimg
        ), 
        React.createElement("div", {className: "ParaContent", style: { position: "relative", overflow: "hidden", width: "100%", top: "-"+imageContainHeight, height: setHeight, margin: 0, padding: 0}}, 
           this.props.children
        )
      )
    );
  }
});










// var DATABLOG = [
//   {id: "vid", ratioW: 40, ratioH: 18, tag: "fwvideo", title:"Videos", height: "620", titleIMG: IMGS.none, backgroundIMG: IMGS.bgrock}
//   {id: "show", ratioW: 40, ratioH: 25, tag: "fwshows", title:"Shows", height: "auto", titleColor: "#000", titleIMG: IMGS.none, backgroundIMG: IMGS.bgice}
// ];





var FamiliarWildBlogs = React.createClass({displayName: "FamiliarWildBlogs",
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





































var IMGS = { 
  none: {url: null, img_w: null, img_h: null, color: "#fff"},
  main: {url:  "/images/bg_main3.jpg", img_w: 2190, img_h: 800, color: "#444"},
  main2: {url:  "/images/bg_main4.jpg", img_w: 2092, img_h: 800, color: "#444"},
  main3: {url:  "/images/bg_main5.jpg", img_w: 1885, img_h: 800, color: "#444"},
  main4: {url:  "/images/bg_main6.jpg", img_w: 1986, img_h: 800, color: "#444"},
  main5: {url:  "/images/bg_main7.jpg", img_w: 2233, img_h: 1100, color: "#444"},
  mainback: {url:  "/images/section_top_1.jpg", img_w: 2310, img_h: 800, color: "#eee"},
  musicback: {url:  "/images/bg_album.jpg", img_w: 833, img_h: 526, color: "#eee"},
  bgice: {url: "/images/bg_ice.jpg", img_w: 1000, img_h: 679, color: "#d4f1fe"},
  bgrock: {url: "/images/bg_rock.jpg", img_w: 1000, img_h: 679, color: "#e5dac3"},
  bghorizon: {url: "/images/bg_horizon_a.jpg", img_w: 1280, img_h: 258, color: "#ddd"},
  bgblurvid: {url: "/images/bg_every.jpg", img_w: 833, img_h: 526, color: "#e13251"},
  bgmountsm:  {url: "/images/bg_mountsm.jpg", img_w: 1000, img_h: 260, color: "#ddd"},
}

maintypes = ["main2", "main3"];




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


        // <LayoutRow className="AlbumTitle" row_data={{ fontColor: "#fff", backgroundColor: "transparent" }}>
        //   <LayoutContainer>
        //     <LayoutContainerHeading>{this.props.data.title}</LayoutContainerHeading>
        //   </LayoutContainer>
        // </LayoutRow>


var AlbumsView = React.createClass({displayName: "AlbumsView",
  render: function() {
    return (
      React.createElement("div", {className: "AlbumsView", style: {display: "block", margin: "0px auto"}}, 
      React.createElement(ParallaxContainer, {backgroundColor: this.props.data.backgroundIMG.color, height: this.props.data.height, imgSrc: this.props.data.backgroundIMG.url, img_h: this.props.data.backgroundIMG.img_h, img_w: this.props.data.backgroundIMG.img_w}, 

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
      nextActive: false,
      innerHeight: "auto",
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
    // var h = $(el).find(".AlbumBodyInnerC").height();
    // $(el).find(".AlbumBodyInnerC").css({height: h, overflow: "hidden"});

    // var el = this.getDOMNode();
    // $(el).find(".AlbumBodyInnerC").fadeIn(5000);
  },
  componentWillUpdate: function(){
    var el = this.getDOMNode();
    var h = $(el).find(".AlbumBodyInner").height();
    $(el).find(".AlbumBodyInner").height(h).css({overflow: "hidden"});
    //this.setState({ innerHeight: $(this.getDOMNode()).height() });
  },
  componentDidUpdate: function(){
    //this.setState({ innerHeight: "auto" });
    var el = this.getDOMNode();
    $(el).find(".AlbumBodyInner").css({height: "auto", overflow: "visible"});
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

    var albnav1 = null;
    var albnav2 = null;
    if(this.state.items.length>1){
      albnav1 = (React.createElement(LayoutRow, {className: "AlbumNav", row_data: { fontColor: "#fff", backgroundColor: "transparent"}}, 
          React.createElement(LayoutContainer, null, 
            React.createElement(AlbumList, {ratioW: 100, ratioH: 100, prev: this.state.prev, next: this.state.next, onPrev: this.handlePrev, onNext: this.handleNext, active_id: active_id, isSmall: this.state.isSmall, items: this.state.items, onItemSelect: this.handleItemSelect})
          )
        ));
      albnav2 = (React.createElement("div", {className: "ButtonContain clearfix", style: {height: "80px", padding: "20px"}}, 
              React.createElement("div", {className: "Button Prev", onClick: this.handlePrev}, "Newer"), 
              React.createElement("div", {className: "Button Next", onClick: this.handleNext}, "Older")
            ))
    }

    return (
      React.createElement("div", {className: "Albums", style: {display: "block", margin: "0px auto"}}, 
        albnav1, 
        React.createElement(LayoutRow, {className: "AlbumBody", row_data: { fontColor: "#fff", backgroundColor: "transparent"}}, 
          React.createElement(LayoutContainer, null, 
            React.createElement("div", {className: "AlbumBodyInner", style: { minHeight: "100px", height: this.state.innerHeight}}, 
              alb
            ), 
            albnav2
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
    width = (width>80) ? 80 : width;

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
  handleAlbumSelect: function(){
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
    //this.setState({isHover: true});
  },
  handleMouseOut: function(){
    //this.setState({isHover: false});
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

    var content = React.createElement("div", {className: "ALBContent AlbumShadow_sm", style: {position: "relative", zIndex: "1", overflow: "hidden", margin: "5px"}}, React.createElement("img", {src: this.props.data.artwork_thumb, style: {width: this.props.width-10, height: this.props.nav_height-10}}))
    
    return (
       React.createElement("div", {className: class_name, 
        onMouseOver: this.handleHover, 
        onMouseOut: this.handleMouseOut, 
        onClick: this.handleAlbumSelect, 
        style: {position: "relative", display: "inline-block", width: this.props.width, padding: this.props.padding}}, 

        content

       )

    );
  }
});


var AlbumLayout = React.createClass({displayName: "AlbumLayout",
  render: function() {
    var width = this.props.width > 800 ? 800 : this.props.width;
    var purcase;
    var aitunes;
    var listen;

    if(this.props.data.purchase_url){
      purcase = React.createElement("div", {style: { margin: "10px auto"}}, React.createElement("a", {href: this.props.data.purchase_url, style: {display: "inline-block", margin: "10px", padding: "10px", border: "solid 1px #eee", background: "#fff", color:"#333"}}, "Purchase on Bandcamp"));
    } 
    if(this.props.data.preorder_url) {
      purcase = React.createElement("div", {style: { margin: "10px auto"}}, React.createElement("a", {href: this.props.data.preorder_url, style: {display: "inline-block", margin: "10px", padding: "10px", border: "solid 1px #eee", background: "#fff", color:"#333"}}, "Pre Order Now (Bandcamp)"));
    }

    if(this.props.data.itunes_url){
      aitunes = (
       React.createElement("div", {style: { margin: "10px auto"}}, React.createElement("a", {href: this.props.data.itunes_url, style: {display: "inline-block", margin: "10px", padding: "10px", border: "solid 1px #eee", background: "#fff", color:"#333"}}, "iTunes")
       ) );
    }

    if(this.props.data.bandcamp_listen_id){
      listen = React.createElement("div", {style: { margin: "10px auto"}}, React.createElement("iframe", {style: { border: "0", width: "100%", height: "42px"}, src: "http://bandcamp.com/EmbeddedPlayer/album="+this.props.data.bandcamp_listen_id+"/size=small/bgcol=333333/linkcol=0f91ff/artwork=none/transparent=true/", seamless: true}, React.createElement("a", {href: "http://familiarwild.bandcamp.com/album/dark-dreams"}, "Dark Dreams by Familiar Wild")))
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
            
            purcase, 

            aitunes

          )
        )

      )

    );
  }
});



var ALBUMDATA = { 
  current_albums: [
  {
    id: 4,
    selected: true,
    itunes_url: "https://itunes.apple.com/ca/album/things-we-forgot/id1161869022",
    year: "2016", 
    name: "Things We Forgot", 
    artwork_img: "/images/cd_things_we_forgot.jpg",
    artwork_thumb: "/images/cd_things_we_forgot_thumb.jpg",
    bandcamp_listen_id: "3551550047",
    preorder_url: "http://familiarwild.bandcamp.com/album/things-we-forgot"
    
  },
  // {
  //   id: 3,
  //   selected: true,
  //   year: "2016", 
  //   name: "We Better Run ( Single )", 
  //   artwork_img: "/images/cd_we_better_run.jpg",
  //   artwork_thumb: "/images/cd_we_better_run_thumb.jpg",
  //   bandcamp_listen_id: "1789577777",
  //   purchase_url: "http://familiarwild.bandcamp.com/album/we-better-run-single"
  // },
  // {
  //   id: 2,
  //   selected: true,
  //   year: "2015", 
  //   name: "Every Cloud ( Single )", 
  //   artwork_img: "/images/cd_everycloud.jpg",
  //   artwork_thumb: "/images/cd_everycloud_thumb.jpg",
  //   bandcamp_listen_id: "1342195243",
  //   purchase_url: "http://familiarwild.bandcamp.com/album/every-cloud-single"
  // },
  // {
  //   id: 1,
  //   selected: true,
  //   name: "Dark Dreams", 
  //   year: "2013", 
  //   artwork_img: "/images/cd_darkdreams.jpg",
  //   artwork_thumb: "/images/cd_darkdreams_thumb.jpg",
  //   purchase_url: "http://familiarwild.bandcamp.com/album/dark-dreams",
  //   bandcamp_listen_id: "3869561879",
  //   itunes_url: "https://itunes.apple.com/ca/album/dark-dreams/id722391559"
  // }
  ]

};








//--------======================================================================================
//--------======================================================================================
//--------======================================================================================
//--------======================================================================================
















































//<LayoutContainerHeading>{this.props.data.title}</LayoutContainerHeading>
            




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
  componentWillUpdate: function(){
    var el = this.getDOMNode();
    var h = $(el).find(".BlogBodyInner").height();
    $(el).find(".BlogBodyInner").height(h).css({overflow: "hidden"});
    //this.setState({ innerHeight: $(this.getDOMNode()).height() });
  },
  componentDidUpdate: function(){
    //this.setState({ innerHeight: "auto" });
    var el = this.getDOMNode();
    $(el).find(".BlogBodyInner").css({height: "auto", overflow: "visible"});
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
          if(this.props.data.type=="video"){
            if(this.props.data.video_type=="youtube" && this.props.data.permalink_url) {
              posts.push(post);
              count++;
            } 
          }else{
            posts.push(post);
            count++;
          }
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
    //index = ((index-1) >= 0) ? (index-1) : this.state.items.length-1;
    index = ((index-1) >= 0) ? (index-1) : index;
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
    
    //index = ((index+1) < this.state.items.length) ? (index+1) : 0;
    index = ((index+1) < this.state.items.length) ? (index+1) : index;
    this.setState({ item: this.state.items[index], toScroll: true });
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

    var itemnav1 = null;
    var itemnav2 = null;
    if(this.state.items.length>1){
      itemnav1 =(React.createElement(LayoutRow, {className: "BlogNav", row_data: { fontColor: this.props.titleColor, backgroundColor: "transparent", backgroundImage: this.props.data.titleIMG.url}}, 
          React.createElement(LayoutContainer, null, 
            React.createElement(BlogList, {ratioW: this.props.data.ratioW, ratioH: this.props.data.ratioH, prev: this.state.prev, next: this.state.next, onPrev: this.handlePrev, onNext: this.handleNext, active_id: active_id, isSmall: this.state.isSmall, items: this.state.items, onItemSelect: this.handleItemSelect})
          )
        ))
      itemnav2 = (React.createElement("div", {className: "ButtonContain clearfix", style: {height: "80px", padding: "20px"}}, 
              React.createElement("div", {className: "Button Prev", onClick: this.handlePrev}, "Newer"), 
              React.createElement("div", {className: "Button Next", onClick: this.handleNext}, "Older")
            ))
    }
    
    if(this.props.data.id=="show"){
      itemnav1 = null;
    }

    return (
      React.createElement("div", {className: "Blog"}, 
      React.createElement(ParallaxContainer, {backgroundColor: this.props.data.backgroundIMG.color, height: this.props.data.height, imgSrc: this.props.data.backgroundIMG.url, img_h: this.props.data.backgroundIMG.img_h, img_w: this.props.data.backgroundIMG.img_w}, 
        itemnav1, 
      
        React.createElement(LayoutRow, {className: "BlogBody", row_data: { backgroundColor: "transparent"}}, 
          React.createElement(LayoutContainer, null, 
            React.createElement("div", {className: "BlogBodyInner", style: {minHeight: "100px"}}, 
            blog
            ), 
            itemnav2
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
    width = (width>100) ? 100 : width;
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
      padding: "5px",
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
    
    class_name += " blogtype_"+this.props.data.type;

    var exinfo;
    for(var i=0; i<this.props.data.tags.length;i++){
      if(this.props.data.tags[i].indexOf("fwinfo_") >= 0){
        exinfo = React.createElement("div", {style: {background: "#aaa", color: "#FFF", width: "100%", overflow: "hidden", textAlign: "center"}}, this.props.data.tags[i].replace("fwinfo_", "").replace(/_/g, " "))
      }
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
      content = React.createElement("div", {className: "BIContent BIText", style: {overflow: "hidden"}}, 
        React.createElement("div", {style: {fontSize: this.props.font_size}, dangerouslySetInnerHTML: {__html: "<h1>"+this.props.data.title+"</h1>" + this.props.data.body}})
      )
    } 
    if(this.props.data.type=="video"){
      if(this.props.data.video_type=="youtube" && this.props.data.permalink_url) {
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
            React.createElement("div", {style: {fontSize: this.props.font_size, lineHeight: 0}, dangerouslySetInnerHTML: {__html: this.props.data.player[0].embed_code.replace(/width\=\"\d\d\d\"/g, "width=\""+vidw+"\"").replace(/heightxxx\=\"\d\d\d\"/g, "height=\""+vidh+"\"")}})
          )
        }
      }else{
        content = React.createElement("div", {className: "BIContent", style: {overflow: "hidden"}}, 
          "Video Unavailable"

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
          exinfo, 
          content
        ), 
        arrow
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
    this.setState({paused: false});
  },
  handlePause: function(){
    window.clearInterval(this.intervalS)
    this.intervalS = null;
    this.setState({paused: true});
  },
  handlePauseToggle: function(){
    if(this.intervalS!=null){
      this.handlePause();
    }else{
      this.handlePlay();
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
    this.handlePause();
    var index = 0;
    for(var i=0; i<this.state.items.length;i++){
      if(this.state.items[i]===this.state.item){
        index=i;
        break;
      }
    }
    var el = this.getDOMNode();
    var index = ((index-1) >= 0) ? (index-1) : this.state.items.length-1;

    $(el).find(".QuoteText").fadeOut(200, function(){
      this.setState({ item: this.state.items[index], toScroll: true });
      $(el).find(".QuoteText").fadeIn(200);
    }.bind(this));
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
    var index = ((index+1) < this.state.items.length) ? (index+1) : 0;

    $(el).find(".QuoteText").fadeOut(200, function(){
      this.setState({ item: this.state.items[index], toScroll: true });
      $(el).find(".QuoteText").fadeIn(200);
    }.bind(this));
  },
  handleNextClick: function(){
    this.handlePause();
    this.handleNext();
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
              React.createElement("div", {className: "Button Next", onClick: this.handleNextClick}, "Next")
            )
          )
        )
      )
      )
    );
  }
});










//==================














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
  // var body = $("body");
  console.log($("html, body").animate)
  $("html, body").animate({ scrollTop: number }, 200, 'swing');
  //$(window).scrollTop(number, 200);
}

$(document).on("selectstart", ".BlogItem, .Logo, .Button", function(){
  return false
});






function render_music(){
  React.render(  React.createElement(AlbumsView, {onLoaded: this.handleLoaded, data: {id: "albums", ratioW: 40, ratioH: 18, title:"Albums", height: "auto", titleIMG: IMGS.none, backgroundIMG: IMGS.none}}) ,
  document.getElementById('app_music'));
}
function render_video(){
  React.render(  React.createElement(Blog, {data: {id: "vid", ratioW: 40, ratioH: 18, tag: "fwvideo", title:"Videos", height: "600", titleIMG: IMGS.none, backgroundIMG: IMGS.none}, onLoaded: this.handleLoaded, ratioW: 40, ratioH: 18}) ,
  document.getElementById('app_video'));
}
function render_bio(){
  React.render(  React.createElement(Booking, null) ,
  document.getElementById('app_bio'));
}

function render_quotes(){
  React.render(  React.createElement(Quotes, {onLoaded: this.handleLoaded, data: {id: "vid", ratioW: 40, ratioH: 18, title:"Quotes", height: "350", titleIMG: IMGS.none, backgroundIMG: IMGS.bgmountsm}}) ,
  document.getElementById('app_quotes'));
}

function render_shows(){
  React.render( React.createElement(Blog, {data: {id: "show", ratioW: 40, ratioH: 30, tag: "fwshows", title:"Shows", height: "auto", titleColor: "#000", titleIMG: IMGS.none, backgroundIMG: IMGS.none}, titleColor: "#000", onLoaded: this.handleLoaded, ratioW: 40, ratioH: 25}) ,
  document.getElementById('app_shows'));
}
        
        

       


function render_main(){
 React.render( React.createElement(FamiliarLayout, null) , document.getElementById('FamiliarWildApp'));
}



