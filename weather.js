
const fetch = require("node-fetch")

const api_url = "http://api.apixu.com/v1/current.json?key=04a82262d4ad4a1c946213151191907&q="

let api_info;
let location_to_search = "";


//collect args from commandline
let args = process.argv.slice(2)
for(let i = 0; i < args.length; i++){
  args[i] = args[i].replace(/\s+/g, '')
  //console.log(args[i][args[i].length - 1])
}
let argsv = []
console.log(args)

for(let i = 0; i < args.length; i++){

    if(i < args.length && args[i][args[i].length-1] != ","){
      args[i] += "%20"
    }
    argsv += args[i]
}
console.log(argsv)
async function main(){
  for(let i = 0; i < args.length; i++){
    //console.log(args)\
    location_to_search = args[i]
    let api_call = api_url + location_to_search
    await fetch(api_call)
      .then(res => res.json())
      .then(body => ParseData(body))
  }
}


function ParseData(body){

  console.log(location_to_search + ":")
  console.log(body.current.temp_f)
  console.log(body.location.localtime)
}

main()
//}
