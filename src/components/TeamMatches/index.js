// Write your code here
import {Component} from 'react'

import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import LatestMatch from '../LatestMatch'

import MatchCard from '../MatchCard'

import './index.css'

class TeamMatches extends Component {
  state = {teamDet: {}, isLoading: true}

  componentDidMount() {
    this.getTeamMatchDet()
  }

  changeRoute = () => {
    const {history} = this.props
    history.replace('/')
  }

  getTeamMatchDet = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()
    const updateData = {
      teamBannerUrl: data.team_banner_url,
      latestMatchDetails: {
        umpires: data.latest_match_details.umpires,
        result: data.latest_match_details.result,
        manOfTheMatch: data.latest_match_details.man_of_the_match,
        id: data.latest_match_details.id,
        date: data.latest_match_details.date,
        venue: data.latest_match_details.venue,
        competingTeam: data.latest_match_details.competing_team,
        competingTeamLogo: data.latest_match_details.competing_team_logo,
        firstInnings: data.latest_match_details.first_innings,
        secondInnings: data.latest_match_details.second_innings,
        matchStatus: data.latest_match_details.match_status,
      },

      recentMatches: data.recent_matches.map(each => ({
        umpires: each.umpires,
        result: each.result,
        manOfTheMatch: each.man_of_the_match,
        id: each.id,
        date: each.date,
        venue: each.venue,
        competingTeam: each.competing_team,
        competingTeamLogo: each.competing_team_logo,
        firstInnings: each.first_innings,
        secondInnings: each.secondInnings,
        matchStatus: each.match_status,
      })),
    }
    this.setState({teamDet: updateData, isLoading: false})
  }

  renderteamDet = () => {
    const {teamDet} = this.state
    const {teamBannerUrl, latestMatchDetails, recentMatches} = teamDet
    return (
      <div className="teamMatchC">
        <img src={teamBannerUrl} alt="team banner" className="teamBanner" />
        <h1>Latest Matches</h1>
        <div className="latestMatch">
          <LatestMatch
            latestMatchDetails={latestMatchDetails}
            key={latestMatchDetails.id}
          />
        </div>
        <ul className="MatchList">
          {recentMatches.map(match => (
            <MatchCard match={match} key={match.id} />
          ))}
        </ul>
        <button type="button" className="backButt" onClick={this.changeRoute}>
          Back
        </button>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div className="teamMatchesCont">
        {isLoading ? (
          <div data-testid="loader">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />{' '}
          </div>
        ) : (
          this.renderteamDet()
        )}
      </div>
    )
  }
}
export default TeamMatches
