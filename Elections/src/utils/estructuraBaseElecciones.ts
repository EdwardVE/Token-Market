import { Contract } from '@algorandfoundation/tealscript';

type MetaDataCandidate = { firstName: string; lastName: string; email: string };

class Elections extends Contract {
    owner = GlobalStateKey<Address>();
    votes = LocalStateKey<Address[]>();
    candidates = BoxMap<Address, number>();

    registerCandidate(address: Address, candidate: MetaDataCandidate) {
        // Ensure the current contract owner is the application address
        assert(this.owner.value == this.app.address);
        
        // Convert the votes list to a set for checking existence
        // const votesList = this.votes.value;
        // assert(votesList.includes(address));

        // // Register the candidate with 0 votes
        // this.candidates.set(address, 0);
    }

    // Constructor method to initialize the application
    createApplication() {
        this.owner.value = this.app.address;
    }

    vote(address: Address) {
        // Convert the votes list to a set for checking existence
        // const votesList = this.votes.value;
        // assert(votesList.includes(address));

        // // Increment the candidate's vote count
        // let currentVotes = this.candidates.get(address) || 0;
        // this.candidates.set(address, currentVotes + 1);
    }
}

//! Original 

// import { Contract } from '@algorandfoundation/tealscript';

// type MetaDataCandidate = { fistName: string; lastName: string; email: string };

// class Elections extends Contract {
//     owner = GlobalStateKey<Adress>();
//     votes = LocalStateKey<Adress[]>();
//     candidates = BoxMap<Adress, Number>;

//     registryCandidate(addres: addres, candiate: MetaDataCandidate){
//         assert(this.owner.value == this.app.address)
//         assert(this.votes.has(addres))
//         this.candidates.value = { addres, 0 }
//     }

//     // Constructor
//     createApplication(){
//         this.owner.value = this.app.address;
//     }

//     votes(addres){
//         assert(this.votes.has(addres))
//         this.votes[addres].value = this.app.address;
//         this.votes.candidate[addres] = this.votes.candidate[addres] + 1
//     }
// }