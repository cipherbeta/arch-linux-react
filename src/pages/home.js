import React, { Component } from 'react';
import axios from 'axios';
import posed, { PoseGroup } from 'react-pose';
import { Link } from 'react-router-dom';
import backgroundimg from '../assets/img/landing-background.jpg';

const news_url = 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.archlinux.org%2Ffeeds%2Fnews%2F';
const packages_url = 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.archlinux.org%2Ffeeds%2Fpackages%2F';

const Article = posed.div({
    enter: { opacity: 1, y: 0, delay: (i) => i * 50 },
    exit: { opacity: 0, y: 100 }
});

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
                    <Article className="news_article" key={i}>
                        <div className="news_meta">
                        <small>{item.pubDate} - {item.author}</small>
                        </div>
                        <h1><a href={item.link} dangerouslySetInnerHTML={{__html: item.title}}></a></h1>
                        <div className="news_content" dangerouslySetInnerHTML={{__html: item.description }}/>
                    </Article>
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
                <Link to="/download"><button className="outline">Download Arch Linux</button></Link>
            </div>
            <div className="page_content_wrapper">
                <div className="home_content_news">
                    <PoseGroup>
                        {this.mapNewsDataFeed()}
                    </PoseGroup>
                   
                </div>
                <div className="home_content_sidebar">
                    <div className="home_content_description">
                        <p>
                            You've reached the website for Arch Linux,
                             a lightweight and flexible Linux® distribution that tries to Keep It Simple.
                             Currently we have official packages optimized for the x86-64 architecture.</p><p>
                             We complement our official package sets with a <Link to="/aur">community-operated package repository</Link> that grows in size and quality each and every day.
                             </p><p>Our strong community is diverse and helpful, and we pride ourselves on the range of skillsets and uses for Arch that stem from it. 
                             Please check out our forums and mailing lists to get your feet wet. Also glance through our wiki if you want to learn more about Arch.
                        </p>
                    </div>
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