import React, { Component } from 'react'
import axios from 'axios'
import Card from "./Card"
import "../css/Deck.css"
const API_BASE_URL = "https://www.deckofcardsapi.com/api/deck"

class Game extends Component {

    state = {
        deck: null, drawn: []
    }

    async componentDidMount(){
        let url = await axios.get(`${API_BASE_URL}/new/shuffle/?deck_count=1`)
        this.setState({
            deck: url.data
        })
    }

     getCard = async () => {
        try{
          let cardUrl = `${API_BASE_URL}/${this.state.deck.deck_id}/draw`
          let cardRes = await axios.get(cardUrl)
          if(!cardRes.data.success){
            throw new Error ("no cards left")
          }
          let card = cardRes.data.cards[0]
        this.setState(st => ({
            drawn: [
                ...st.drawn,
                {
                    id: card.code, 
                    image: card.image, 
                    name: `${card.suit} ${card.value}`
                }
            ]
        }));
        } catch(e) {
            alert(e)
        }
        
    }

    render() {

        const cards = this.state.drawn.map(m=> (
            <Card key={m.id}  image={m.image} name={m.name}/>
        ))

        return (
            <div>
                <button onClick={this.getCard}>Get card!</button>
                <div className="Deck">{cards}</div>
            </div>
        )
    }
}

export default Game;
