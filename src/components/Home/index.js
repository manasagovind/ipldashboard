// Write your code here
import {Component} from 'react'

import Loader from 'react-loader-spinner'

import TeamCard from '../TeamCard'

import './index.css'

class Home extends Component {
  state = {
    teams: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getmatchTeams()
  }

  getmatchTeams = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()
    const formatData = data.teams.map(eachData => ({
      name: eachData.name,
      id: eachData.id,
      teamImageUrl: eachData.team_image_url,
    }))
    this.setState({teams: formatData, isLoading: false})
  }

  render() {
    const {teams, isLoading} = this.state
    return (
      <div className="HomeCont">
        <div className="dashboardCont">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
            alt="ipl logo"
            className="logo"
          />
          <h1 className="dashboard">IPL Dashboard</h1>
        </div>

        {isLoading ? (
          <div testid="loader">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          <ul className="teams">
            {teams.map(eachTeam => (
              <TeamCard teamDe={eachTeam} key={eachTeam.id} />
            ))}
          </ul>
        )}
      </div>
    )
  }
}
export default Home
