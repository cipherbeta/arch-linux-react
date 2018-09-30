import React, { Component } from 'react';
import axios from 'axios';
import backgroundimg from '../assets/img/landing-background.jpg';

const news_url = 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.archlinux.org%2Ffeeds%2Fnews%2F';
const packages_url = 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.archlinux.org%2Ffeeds%2Fpackages%2F';

class Home extends Component {
    state = {
        news: [],
        packages: []
    }

    componentDidMount(){
        this.requestNewsDataFeed();
        this.requestPackageDataFeed();
    }

    requestNewsDataFeed = () => {
        axios.get(news_url)
            .then(res => {
                let news = res.data.items;
                this.setState({news});
            });
    }

    requestPackageDataFeed = () => {
        axios.get(packages_url)
            .then(res => {
                let packages = res.data.items;
                this.setState({packages});
            })
    }

    mapNewsDataFeed = () => {
        let data;
        if(this.state.news.length > 0){
            data = this.state.news.map((item, i) => {
                return(
                    <div className="news_article" key={i}>
                        <div className="news_meta">
                        <small>{item.pubDate} - {item.author}</small>
                        </div>
                        <h1><a href={item.link} dangerouslySetInnerHTML={{__html: item.title}}></a></h1>
                        <div className="news_content" dangerouslySetInnerHTML={{__html: item.description }}/>
                    </div>
                )
            });
        }
        return data;
    }

    mapPackageDataFeed = () => {
        let data;
        if(this.state.packages.length > 0){
            data = this.state.packages.map((item, i) => {
                return(
                    <div key={i}>
                        <a href={item.link}>{item.title}</a>
                    </div>
                )
            })
        }
        return data;
    }

    render(){
        return(
            <React.Fragment>
            <div className="hero_wrapper" style={{backgroundImage: `linear-gradient(to bottom, rgba(23, 147, 209, .65), rgba(23, 147, 209, .65)), url(${backgroundimg})`}}>
                <h1>Welcome to Arch Linux.</h1>
                <h2>A lightweight, flexible linux distro that aims to <b>keep it simple</b>.</h2>
            </div>
            <div className="page_content_wrapper">
                <div className="home_content_news">
                    <h1>Recent News</h1>
                    {this.mapNewsDataFeed()}
                </div>
                <div className="home_content_sidebar">
                    <div className="home_content_packageupdates">
                    <h6>Recent Package Updates</h6>
                    {this.mapPackageDataFeed()}
                    </div>
                </div>
            </div>
            </React.Fragment>
        )
    }   
}

export default Home;