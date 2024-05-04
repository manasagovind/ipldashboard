// Write your code here
import './index.css'

const MatchCard = props => {
  const {match} = props
  const {
    result,

    competingTeam,
    competingTeamLogo,

    matchStatus,
  } = match
  return (
    <li>
      <img
        src={competingTeamLogo}
        className="imae1"
        alt={`competing team ${competingTeam}`}
      />
      <p>{competingTeam}</p>
      <p>{result}</p>
      {matchStatus === 'Lost' ? (
        <p className="lost">{matchStatus}</p>
      ) : (
        <p className="won">{matchStatus}</p>
      )}
    </li>
  )
}
export default MatchCard
