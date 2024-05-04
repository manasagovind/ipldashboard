import {Link} from 'react-router-dom'

import './index.css'

// Write your code here
const TeamCard = props => {
  const {teamDe} = props
  const {id, name, teamImageUrl} = teamDe
  return (
    <Link to={`/team-matches/${id}`}>
      <li className="teamCard">
        <img src={teamImageUrl} alt={name} className="teamImage" />
        <p className="teamHead">{name}</p>
      </li>
    </Link>
  )
}
export default TeamCard
