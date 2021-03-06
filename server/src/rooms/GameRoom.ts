import { Room, EntityMap, Client, nosync } from 'colyseus'

import { Hero, TimeOfDay, GameState } from '../models'

export class GameRoom extends Room<GameState> {
    onInit(options) {
        this.setState(new GameState())
        this.setSimulationInterval(() => {
            if (this.state.isGameEnded()) {
                this.disconnect().catch(error => {
                    console.error('GameRoom.disconnect', error)
                })
            } else {
                this.state.advanceFrame()
            }
        })
    }

    onJoin(client) {
        this.state.createHero(client.sessionId)
    }

    onLeave(client) {
        this.state.removeHero(client.sessionId)
    }

    onMessage(client, data: ClientAction) {
        switch (data.type) {
            case 'Movement':
                const movement = data as Movement
                this.state.moveHero(client.sessionId, movement)
                break

            case 'Attack':
                this.state.attackWithHero(client.sessionId)
                break

            default:
                console.info('GameRoom.onMessage', client.sessionId, data)
                break
        }
    }

    onDispose() {
        console.info('GameRoom.onDispose')
    }
}
