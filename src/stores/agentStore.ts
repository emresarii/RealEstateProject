import axios from "@/lib/axios";
import { defineStore } from 'pinia'
import type {Agent} from "@/models/agent";


export const useAgentStore = defineStore("agent", {
    state: () => ({
        agents: Array<Agent>,
        agent: null,
    }),
    getters: {
        getAgents(state){
            return state.agents
        }
    },
    actions: {
        async fetchAgents() : Promise<Array<Agent>> {
            try {
                const data = await axios.get('Agents')
                this.agents = data.data.records

            }
            catch (error) {
                alert(error)
                console.log(error)
                return []
            }
        },
        async fetchAgent() : Promise<Array<Agent>> {
            try {
                const data = await axios.get('Agents')
                this.agents = data.data.records

            }
            catch (error) {
                alert(error)
                console.log(error)
                return []
            }
        },

    },

})