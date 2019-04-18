import React, { Component } from 'react';
import { Search, Grid } from 'semantic-ui-react'
import _ from 'lodash'
import { generatePath, withRouter } from 'react-router-dom';

class SearchBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading: false,
      value: '',
      results: [],
      source: this.props.source
    }
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.source !== this.props.source){
      this.setState({ source: nextProps.source})
    }
  }

  componentWillMount(){
    this.resetComponent();
  }
  resetComponent(){
    this.setState({
      isLoading: false,
      value: '',
      results: []
    })
  }

  handleResultSelect = (e, {result})=>{
    this.setState({value: result.title})
    this.props.history.push(generatePath("/classes/:id", {id: result.id}))
  }
  handleSearchChange = (e, data)=>{
    if (data)
      this.setState({isLoading: true, value: data.value})

    setTimeout(()=>{
      if(this.state.value.length < 1)
        return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = item => re.test(`${item.subject}${item.course_num}`)

      this.setState({
        isLoading: false, 
        results: _.filter(this.state.source, isMatch)
      })
    }, 300)
  }

  render(){
    const { isLoading, value, results } = this.state
    let SearchResults = results.map((el)=>(
      { 
        title: `${el.subject}${el.course_num}`,
        description: el.title.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        id: el.id
      }
    ))
    return(
      <div>
        <Grid centered columns={2}>
          <Grid.Column textAlign='center'>
            <Search
              loading={isLoading}
              onResultSelect={this.handleResultSelect}
              onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
              results={SearchResults}
              value={value}
              {..._.omit(this.props, ['staticContext'])}
            />
            <Search.Results />
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default withRouter(SearchBar);