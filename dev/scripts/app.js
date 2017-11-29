import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Qs from 'qs';
import GetRestByReviews from './getRestByReviews';


class App extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     accessToken : ''
  //   }
  // }
    render() {
      return (
        <div>
          Hello
          <GetAccessToken />
          <GetRestByReviews />
        </div>
      )
    }
}
class GetAccessToken extends React.Component {
  constructor() {
    super();
    this.state = {
      accessToken: ''
    }
  }

  componentDidMount() {
    axios.get('https://yelp-oauth.herokuapp.com/token', {
      params: {
        "token_type": "Bearer"
    }
    }).then((result) => {
      this.setState({
        accessToken: result.data.response.access_token
      })
      axios({
        method: 'GET',
        url: 'http://proxy.hackeryou.com',
        dataResponse: 'json',
        paramsSerializer: function (params) {
          return Qs.stringify(params, { arrayFormat: 'brackets' })
        },
        params: {
          reqUrl: 'https://api.yelp.com/v3/businesses/search',
          params: {
            categories: 'pizza',
            location: 'Miami',
            limit: 50,
          },
          proxyHeaders: {
            'Authorization': `Bearer ${this.state.accessToken}`,
          },
          xmlToJSON: false
        }
      }).then((result) => {
        const restaurantArray = result.data.businesses;
        // console.log(restaurantIdArray);

        restaurantArray.map((restaurant) => {
          console.log(restaurant.id);

        })
      });
    })
  }
  render() {
    return (
      <div>
        Hello!
      </div>
    )
  }
}
class FindPizza extends React.Component {
  constructor() {
    super();
    this.state = {

    }
    this.apiRequest = this.getApiInfo.bind(this);
  }
  apiRequest() {
    const clientId = "qi6sW2b_oEruLcSuZmseYw";
    const clientSecret = "DrHqfD7TingrCHS6k1tAitDTeYA1Z685pzx4EPeQ5nGuRBHj0YdaLxRUlg3SEYwf";
    const accessToken = "BWGAGDNvXUYONkHyC6-dKHlB3P8t9Imbuhzwu87GHbOhKjB0pBblO2Uxhzl8HBM_pN733XcCbq7mvpAFaSDY-kCIpSu2ubtRY3G-wlRfQyg-VbFvIGa2cWPnU5McWnYx";

    axios:({
      method: 'GET',
      url: "https://api.yelp.com/v3/businesses/search",
      params: {
        access_token: accessToken,
        format: 'json'
      }
    }).then((result) => {
      // console.log();
    })

  }
}

ReactDOM.render(<App />, document.getElementById('app'));
