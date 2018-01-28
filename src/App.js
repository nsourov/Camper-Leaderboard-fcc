import React, { Component } from "react";
import { Table, Button } from "antd";
import "antd/dist/antd.css";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      thirtyDays: [],
      allTime: [],
      current: true
    };
    this.fetchData = this.fetchData.bind(this);
    this.showThirtyDays = this.showThirtyDays.bind(this);
    this.showAllDays = this.showAllDays.bind(this);
  }
  fetchData(url, state) {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        this.setState({
          [state]: data
        });
      });
  }
  showThirtyDays(){
    this.setState({current: true})
  }
  showAllDays(){
    this.setState({current: false})
  }
  componentWillMount() {
    this.fetchData(
      "https://fcctop100.herokuapp.com/api/fccusers/top/recent",
      "thirtyDays"
    );
    this.fetchData(
      "https://fcctop100.herokuapp.com/api/fccusers/top/alltime",
      "allTime"
    );
  }
  render() {
    const {thirtyDays, allTime, current} = this.state;
    let dataSource = [];
    let obj = {};
    for(let i = 0; i < thirtyDays.length; i++){
      obj = {
        key: i,
        name : thirtyDays[i].username,
        past: thirtyDays[i].recent,
        all: thirtyDays[i].alltime
      }
      dataSource.push(obj);
    }
    const columns = [
      {
        title: "#",
        dataIndex: "key",
        key: "key"
      },
      {
        title: "Camper Name",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "Points in past 30 days",
        dataIndex: "past",
        key: "past"
      },
      {
        title: "All time points",
        dataIndex: "all",
        key: "all"
      }
    ];

    let dataSource2 = [];
    let obj2 = {};
    for(let i = 0; i < allTime.length; i++){
      obj2 = {
        key: i,
        name : allTime[i].username,
        past: allTime[i].recent,
        all: allTime[i].alltime
      }
      dataSource2.push(obj2);
    }
    const columns2 = [
      {
        title: "#",
        dataIndex: "key",
        key: "key"
      },
      {
        title: "Camper Name",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "Points in past 30 days",
        dataIndex: "past",
        key: "past"
      },
      {
        title: "All time points",
        dataIndex: "all",
        key: "all"
      }
    ];
    return (
      <div className="App">
      <Button type={current ? 'primary' : ''} onClick ={this.showThirtyDays}>Point in past 30 days</Button>
      <Button type={!!current ? '' : 'primary'} onClick ={this.showAllDays}>All time points</Button>
      {current ? <Table bordered dataSource={dataSource} columns={columns} title={() => 'Leaderboard'}/> : <Table bordered dataSource={dataSource2} columns={columns2} title={() => 'Leaderboard'}/>}
      </div>
    );
  }
}

export default App;
