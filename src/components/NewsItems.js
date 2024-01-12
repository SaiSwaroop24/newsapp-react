import React, { Component } from 'react'
export default class NewsItems extends Component {
  render() {
    let {title,description,imgurl,url,time,auther}=this.props;
    return (
      <div>
       <div className="card my-3" style={{width: "18rem", position:"relative",
    left:"10px" }}>
            <img className="card-img-top" src={imgurl} alt="Card"/>
             <div className="card-body">
             <h5 className="card-title">{title}...</h5>
             <p className="card-text">{description}...</p>
             <p className="card-text"><small className="text-body-secondary">By {auther} on {time}</small></p>

               <a href={url} target='_blank' className="btn btn-mb2 btn-dark">Read More</a>
         </div>
        </div>  
         
     </div>
     
      
    )
  }
}
