
// Use this Template
// --------------------
// export function getPage(count) { 
//     const offset = (count-1) * limit
//     return <fectch> or <string>
// }
// --------------------------------

// Write code below


// Use this Template
// --------------------
// export function getPage(count) { 
//     return {
//         url: "<url of the api>",
//         method: "<method>",
//         data: "<body>",
//         headers: "<headers>"
//     }
// }
// --------------------------------

// Write code below


export function getPage(count) { 
    const skip = (count-1)*100;
    return `https://stripe.com/jobs/search?office_locations=Asia+Pacific--Bengaluru&remote_locations=Asia+Pacific--Australia+Remote&remote_locations=Asia+Pacific--Hong+Kong+Remote&remote_locations=Asia+Pacific--India+Remote&remote_locations=Asia+Pacific--Indonesia+Remote&remote_locations=Asia+Pacific--Japan+Remote&remote_locations=Asia+Pacific--Malaysia+Remote&remote_locations=Asia+Pacific--New+Zealand+Remote&remote_locations=Asia+Pacific--South+Korea+Remote&remote_locations=Asia+Pacific--Thailand+Remote&remote_locations=Europe--Austria+Remote&remote_locations=Europe--Belgium+Remote&remote_locations=Europe--Czechia+Remote&remote_locations=Europe--Estonia+Remote&remote_locations=Europe--France+Remote&remote_locations=Europe--Germany+Remote&remote_locations=Europe--Great+Britain+Remote&remote_locations=Europe--Ireland+Remote&remote_locations=Europe--Israel+Remote&remote_locations=Europe--Italy+Remote&remote_locations=Europe--Netherlands+Remote&remote_locations=Europe--Poland+Remote&remote_locations=Europe--Portugal+Remote&remote_locations=Europe--Romania+Remote&remote_locations=Europe--Spain+Remote&remote_locations=Europe--Sweden+Remote&remote_locations=Europe--Switzerland+Remote&remote_locations=Latin+America--Argentina+Remote&remote_locations=Latin+America--Brazil+Remote&remote_locations=Latin+America--Chile+Remote&remote_locations=Latin+America--Mexico+Remote&remote_locations=North+America--Canada+Remote&remote_locations=North+America--Mexico+Remote&remote_locations=North+America--US+Remote&skip=${skip}`
}

