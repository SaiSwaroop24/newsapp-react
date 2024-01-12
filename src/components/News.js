import React, { Component } from 'react'
import NewsItems from './NewsItems'
import Loading from './Loading';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
export default class News extends Component {
  static defaultProps={
      country:'in',
      pageSize:8,
      category:'general'
      
  }
  static propTypes={
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category:PropTypes.string
    
}
    constructor(){
        super();
        this.state={
            articles:[],
            loading:false,
            page:1,
            totalResults:0
        }
    }
    async componentDidMount(){ 
      this.props.setProgress(10);
        let myurl=`https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=027ca712516e4b0fba0fd13a231888af&page=1&pageSize=${this.props.pageSize}`
        this.setState({
          loading:true
        })
        let data=await fetch(myurl);
        let parsedData= await data.json();
        this.setState(
            {articles:parsedData.articles,
              totalResults:parsedData.totalResults,
              loading:false
            }
        )
        this.props.setProgress(100);

    }
     prevButton=async()=>{
      this.props.setProgress(10);
      let myurl=`https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=027ca712516e4b0fba0fd13a231888af&page=${this.state.page-1}&pageSize=${this.props.pageSize}`
      this.setState({
        loading:true
      })
      let data=await fetch(myurl);
      let parsedData= await data.json();
      this.setState(
          {articles:parsedData.articles,
          page:this.state.page-1,
          loading:false
        }
      )
      this.props.setProgress(100);
     }
     nextButton=async ()=>{
      this.props.setProgress(10);
      let myurl=`https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=027ca712516e4b0fba0fd13a231888af&page=${this.state.page+1}&pageSize=${this.props.pageSize}`
      this.setState({
        loading:true
      })
      let data=await fetch(myurl);
      let parsedData= await data.json();
      this.setState(
          {articles:parsedData.articles,
          page:this.state.page+1,
          loading:false
        }
      )
      this.props.setProgress(100);
    }
  captial=(string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1);
    }
    fetchMoreData = async () => {
      let nextPage = this.state.page + 1;
    
      let myurl = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=027ca712516e4b0fba0fd13a231888af&page=${nextPage}&pageSize=${this.props.pageSize}`;
    
      this.setState({
        loading: true,
        page: nextPage,  // Update the page before making the API call
      });
    
  
        let data = await fetch(myurl);
        let parsedData = await data.json();
    
        this.setState((prevState) => ({
          articles: prevState.articles.concat(parsedData.articles),
          totalResults: parsedData.totalResults,
          loading: false,
        }));
    };
    
  render() {
    //USING PREV AND NEXT BUTTON
   // return (
     // <div>
       //  <div className='container my-5'>
         //<h1 className='text-center'><i>Daily News - Top {this.captial(this.props.category)} HeadLines</i></h1><br/>
       //  {this.state.loading&&<Loading/>} {/* if loading is false then display the newsitems else show nothing*/}
         //   <div className='row' >
           //     {!this.state.loading&&this.state.articles.map((elements)=>{
             //       return <div className='col md-3'>
               //     <NewsItems title={elements.title?elements.title.slice(0,42):""} description={elements.description?elements.description.slice(0,90):""} imgurl={elements.urlToImage?elements.urlToImage:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO69HxzkcCOoGhYyJwo6dyUFicirC7Z-SOaJYeYmfT8Q&s"} url={elements.url} auther={elements.author?elements.author:"unKnown"} time={new Date(elements.publishedAt).toGMTString()}/>
                 //</div>
                //})}
                
           // </div>
    //        <div className='d-flex justify-content-between'>
      ///      <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.prevButton}>&laquo;Previous</button>
         //   <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.nextButton}>Next&raquo;</button>
           // </div>
      //  </div>
     // </div>
   // )
   //--------------------------------infinite loop------------------
   return (
    <div>
       
       <h1 className='text-center my-5'><i>Daily News - Top {this.captial(this.props.category)} HeadLines</i></h1><br/>
       {this.state.loading&&<Loading/>}
       <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!=this.state.totalResults}
          loader={<Loading/>}>
        <div className='container my-2'>
          <div className='row' >
              {this.state.articles.map((elements)=>{
                  return <div className='col md-3'>
                  <NewsItems title={elements.title?elements.title.slice(0,42):""} description={elements.description?elements.description.slice(0,90):""} imgurl={elements.urlToImage?elements.urlToImage:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO69HxzkcCOoGhYyJwo6dyUFicirC7Z-SOaJYeYmfT8Q&s"} url={elements.url} auther={elements.author?elements.author:"unKnown"} time={new Date(elements.publishedAt).toGMTString()}/>
               </div>
              })}
              
          </div>
          </div>
        </InfiniteScroll>
      </div>

  )
  }
}
