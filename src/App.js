import React from 'react';
import $ from "jquery";
import './App.css';







class App extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        text:{quoteText:"Click On Me to get a new Quote"},
        rotation:0,
        width: 0, 
        height: 0,
        posX:window.innerWidth/2,
        posY:window.innerHeight/2 
      };
  this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
}

    


componentDidMount() {
/*  this.getQuote()*/
  this.updateWindowDimensions();
  window.addEventListener('resize', this.updateWindowDimensions);
}

componentWillUnmount() {
  window.removeEventListener('resize', this.updateWindowDimensions);
}

updateWindowDimensions() {

  this.setState({ width: window.innerWidth, height: window.innerHeight });
}


 getQuote = () => {
          $.ajax({
          
      url: "https://api.forismatic.com/api/1.0/",
      jsonp: "jsonp",
      dataType: "jsonp",
      data: {method: "getQuote",lang: "en",format: "jsonp"}
    })
      .done( data => {        
      console.log({data});
          this.setState({
            text:data,
            rotation:Math.floor(Math.random() * 16) - 8,
            posY:Math.floor( Math.random() * (this.state.height-256) ),
            posX:Math.floor( Math.random() * (this.state.width-236) )

          })         
    })
    .fail(function(err) {
      console.log('Error: ' + err.status);
    });
}
/*translate(${this.state.posX/2}px, ${this.state.posY/2}px) */
  
  render() {

    console.log(this.state)
     return  <div className="test" onClick={this.getQuote}
     style={{position:"absolute",padding:10,top:`${this.state.posY}px`,left:`${this.state.posX}px`,
     transform:`rotate(${this.state.rotation}deg)`}} 
id="quote-box" >

      <h3 id="text">{this.state.text.quoteText}</h3>
    <h4 style={{fontSize:16,marginTop:"10px",display:"flex",justifyContent:"flex-end"}}  id="author">- {this.state.text.quoteAuthor===""?"unknown":this.state.text.quoteAuthor}</h4>       
           

     
      </div>

    
    
  }
}

export default App;



/*

  


  //---------------------------------------
  
$('#test').html("");
  
    var docHeight = $(document).height(),
        docWidth = $(document).width(),             
        $div = $('#test'),
        divWidth = $div.width(),
        divHeight = $div.height(),
        heightMax = docHeight - divHeight,
        widthMax = docWidth - divWidth;
//console.log($('.container-fluid').height());
    $div.css({
        left: Math.floor( Math.random() * widthMax ),
        top: Math.floor( Math.random() * heightMax )
    });
    $.ajax({
      url: "https://api.forismatic.com/api/1.0/",
      jsonp: "jsonp",
      dataType: "jsonp",
      data: {method: "getQuote",lang: "en",format: "jsonp"}
    })
      .done(function(data) {
      //console.log(data);
      $("#test").html(data.quoteText +"<br>"+"<br>"+ " - " + data.quoteAuthor);
      //.blur to remove focus of the button so the blue border is not visible
      $("#test").blur();
    })
    .fail(function(err) {
      console.log('Error: ' + err.status);
    });
});*/